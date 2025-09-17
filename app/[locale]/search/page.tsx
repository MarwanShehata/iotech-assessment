import React from 'react'
import { ChevronLeft } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { fetchServices, richTextToPlainText } from '@/lib/strapi'

interface SearchPageProps {
	params: Promise<{
		locale: string
	}>
	searchParams: Promise<{
		q?: string
	}>
}

const SearchPage: React.FC<SearchPageProps> = async ({
	params,
	searchParams,
}) => {
	const { locale } = await params
	const { q: query = '' } = await searchParams
	
	let searchResults: any[] = []
	let error = null

	if (query) {
		try {
			const services = await fetchServices(locale)
			searchResults = services.filter((service) => {
				const titleMatch = service.title
					.toLowerCase()
					.includes(query.toLowerCase())
				const descriptionMatch = richTextToPlainText(service.description)
					.toLowerCase()
					.includes(query.toLowerCase())
				return titleMatch || descriptionMatch
			})
		} catch (err) {
			console.error('Search error:', err)
			error = err
		}
	}

	return (
		<>
			<Header />
			<div className='relative min-h-screen overflow-hidden bg-white'>
				<div
					className='absolute inset-0 bg-repeat opacity-5'
					style={{
						backgroundImage: 'url(/about-us-bg.png)',
						backgroundSize: '1000px 100px',
						backgroundRepeat: 'no-repeat',
					}}
				/>
				<div className='relative z-10 px-4 py-6 sm:px-6 sm:py-8 md:px-10 lg:px-20 lg:py-12 xl:px-24'>
					<Link
						href={`/${locale}`}
						className='mb-6 flex items-center text-gray-600 transition-colors duration-200 hover:text-gray-800 sm:mb-8'
					>
						<ChevronLeft className='mr-1 h-4 w-4 sm:h-5 sm:w-5' />
						<span className='text-sm sm:text-base'>Back</span>
					</Link>
					<h1 className='mb-6 font-bold font-serif text-2xl text-gray-900 sm:mb-8 sm:text-3xl md:text-4xl lg:mb-12 lg:text-5xl'>
						Search Results
					</h1>
					{query && (
						<p className='mb-8 text-gray-700 text-lg'>
							Showing results for: <strong>"{query}"</strong>
						</p>
					)}
					{error ? (
						<div className='text-center py-12'>
							<p className='text-red-600 text-lg'>
								Error loading search results
							</p>
							<p className='text-gray-500 mt-2'>Please try again later.</p>
						</div>
					) : searchResults.length > 0 ? (
						<div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
							{searchResults.map((service) => (
								<Link
									key={service.slug}
									href={`/${locale}/services/${service.slug}`}
									className='group block rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-amber-300'
								>
									<h3 className='font-semibold text-gray-900 text-lg group-hover:text-amber-700 transition-colors'>
										{service.title}
									</h3>
									<div className='mt-2 text-gray-600 text-sm line-clamp-2'>
										{richTextToPlainText(service.description).substring(0, 150)}
										...
									</div>
								</Link>
							))}
						</div>
					) : query ? (
						<div className='text-center py-12'>
							<p className='text-gray-600 text-lg mb-4'>
								No services found for "{query}"
							</p>
							<p className='text-gray-500'>
								Try searching with different keywords or browse our services.
							</p>
						</div>
					) : (
						<div className='text-center py-12'>
							<p className='text-gray-600 text-lg'>
								Enter a search term to find our legal services.
							</p>
						</div>
					)}
				</div>
			</div>
			<Footer />
		</>
	)
}

export default SearchPage
