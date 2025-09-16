const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_FULL_ACCESS_TOKEN

console.log(`STRAPI_URL: ${STRAPI_URL}`)
console.log(`STRAPI_TOKEN: ${STRAPI_TOKEN}`)
export interface RichTextNode {
	type: string
	text?: string
	children?: RichTextNode[]
}

export interface ServiceSection {
	id: number
	title: string
	content: RichTextNode[] // Rich text array
}

export interface Service {
	id: number
	documentId: string
	title: string
	slug: string
	description: RichTextNode[] // Rich text array
	services: ServiceSection[] // Not `sections`
	createdAt: string
	updatedAt: string
	publishedAt: string
}

export interface ApiResponse {
	data: Service[]
	meta: {
		pagination: {
			page: number
			pageSize: number
			pageCount: number
			total: number
		}
	}
}

// Helper function to convert rich text to plain text
export const richTextToPlainText = (richText: RichTextNode[]): string => {
	if (!richText || !Array.isArray(richText)) return ''

	return richText
		.map((node) => {
			if (node.text) {
				return node.text
			}
			if (node.children && Array.isArray(node.children)) {
				return richTextToPlainText(node.children)
			}
			return ''
		})
		.join(' ')
		.trim()
}

// Helper function to convert rich text to HTML
export const richTextToHTML = (richText: RichTextNode[]): string => {
	if (!richText || !Array.isArray(richText)) return ''

	return richText
		.map((node) => {
			if (node.type === 'paragraph') {
				const content = node.children ? richTextToHTML(node.children) : ''
				return `<p>${content}</p>`
			}
			if (node.type === 'heading') {
				const content = node.children ? richTextToHTML(node.children) : ''
				return `<h2>${content}</h2>`
			}
			if (node.type === 'list') {
				const content = node.children ? richTextToHTML(node.children) : ''
				return `<ul>${content}</ul>`
			}
			if (node.type === 'list-item') {
				const content = node.children ? richTextToHTML(node.children) : ''
				return `<li>${content}</li>`
			}
			if (node.text) {
				return node.text
			}
			if (node.children && Array.isArray(node.children)) {
				return richTextToHTML(node.children)
			}
			return ''
		})
		.join('')
}

// Add headers with authentication
const getHeaders = () => {
	const headers: Record<string, string> = {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${STRAPI_TOKEN}`,
	}

	// Log token for debugging
	console.log('STRAPI_TOKEN in getHeaders:', STRAPI_TOKEN)

	if (STRAPI_TOKEN) {
		headers.Authorization = `Bearer ${STRAPI_TOKEN}`
	} else {
		console.warn('STRAPI_FULL_ACCESS_TOKEN is not set in environment variables')
	}

	return headers
}

export const testStrapiConnection = async (): Promise<boolean> => {
	try {
		const response = await fetch(`${STRAPI_URL}/api`, {
			method: 'HEAD',
			headers: getHeaders(),
		})
		return response.ok
	} catch (error) {
		console.error('Strapi connection test failed:', error)
		return false
	}
}

// Fetch services from service-collections endpoint
export const fetchServices = async (locale?: string): Promise<Service[]> => {
	try {
		console.log('STRAPI_URL:', STRAPI_URL)
		console.log(
			'Making request to:',
			`${STRAPI_URL}/api/service-collections?populate=services`,
		)

		const response = await fetch(
			`${STRAPI_URL}/api/service-collections?populate=services`,
			{
				headers: getHeaders(),
				next: { revalidate: 60 },
			},
		)

		console.log('Response status:', response.status)
		console.log('Response headers:', response.headers)

		if (!response.ok) {
			const errorText = await response.text()
			console.error('Error response body:', errorText)
			console.error(
				`Strapi API error: ${response.status} ${response.statusText}`,
			)
			return []
		}

		const data = await response.json()
		console.log('Raw API data:', data)
		console.log('API Response:', JSON.stringify(data, null, 2))

		// Parse the response based on actual structure
		if (data.data && Array.isArray(data.data)) {
			const allServices: Service[] = []

			data.data.forEach((serviceData: any) => {
				// Direct mapping since services are at the root level of each item
				if (serviceData.id && serviceData.title && serviceData.slug) {
					const service: Service = {
						id: serviceData.id,
						documentId: serviceData.documentId,
						title: serviceData.title,
						slug: serviceData.slug,
						description: serviceData.description,
						services: serviceData.services || [], // This is the nested services array
						createdAt: serviceData.createdAt,
						updatedAt: serviceData.updatedAt,
						publishedAt: serviceData.publishedAt,
					}

					allServices.push(service)
				}
			})

			console.log('Parsed services count:', allServices.length)
			return allServices
		}
		return []
	} catch (error) {
		console.error('Error fetching services:', error)
		return []
	}
}

export const fetchServiceBySlug = async (
	slug: string,
): Promise<Service | null> => {
	try {
		// Get all services and find by slug
		const services = await fetchServices()
		return services.find((service) => service.slug === slug) || null
	} catch (error) {
		console.error('Error fetching service by slug:', error)
		return null
	}
}
