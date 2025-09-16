const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'

export interface ServiceSection {
	id: number
	title: string
	content: string
}

export interface Service {
	id: number
	title: string
	slug: string
	description: string
	sections: ServiceSection[]
	createdAt: string
	updatedAt: string
	publishedAt: string
}

interface StrapiResponse<T> {
	data: T
	meta?: any
}

interface StrapiData<T> {
	id: number
	attributes: T
}

export const testStrapiConnection = async (): Promise<boolean> => {
	try {
		const response = await fetch(`${STRAPI_URL}/api`, {
			method: 'HEAD',
			headers: {
				'Content-Type': 'application/json',
			},
		})
		return response.ok
	} catch (error) {
		console.error('Strapi connection test failed:', error)
		return false
	}
}

export const fetchServiceBySlug = async (
	slug: string,
): Promise<Service | null> => {
	try {
		const response = await fetch(
			`${STRAPI_URL}/api/services?filters[slug][$eq]=${slug}&populate=*`,
			{
				headers: {
					'Content-Type': 'application/json',
				},
				next: { revalidate: 60 },
				cache: 'force-cache',
			},
		)

		if (!response.ok) {
			console.error(
				`Strapi API error: ${response.status} ${response.statusText}`,
			)
			return null
		}

		const data: StrapiResponse<StrapiData<Omit<Service, 'id'>>[]> =
			await response.json()

		if (!data.data || data.data.length === 0) {
			return null
		}

		return {
			id: data.data[0].id,
			...data.data[0].attributes,
		}
	} catch (error) {
		console.error('Error fetching service:', error)
		return null
	}
}

export const fetchServices = async (): Promise<Service[]> => {
	try {
		const response = await fetch(
			`${STRAPI_URL}/api/services?populate=*&pagination[limit]=-1`,
			{
				headers: {
					'Content-Type': 'application/json',
				},
				next: { revalidate: 60 },
				cache: 'force-cache',
			},
		)

		if (!response.ok) {
			console.error(
				`Strapi API error: ${response.status} ${response.statusText}`,
			)
			return []
		}

		const data: StrapiResponse<StrapiData<Omit<Service, 'id'>>[]> =
			await response.json()

		return data.data.map((item) => ({
			id: item.id,
			...item.attributes,
		}))
	} catch (error) {
		console.error('Error fetching services:', error)
		return []
	}
}
