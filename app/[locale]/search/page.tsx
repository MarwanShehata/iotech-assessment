'use client'
import React, { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
import Header from '@/src/components/Header'
import Footer from '@/src/components/Footer'
import Link from 'next/link'

const servicesData = [
	{ title: 'General Legal Consultation', slug: 'general-legal-consultation' },
	{ title: 'Legal Consultation Services', slug: 'legal-consultation-services' },
	{
		title: 'Establishing National and Foreign Companies',
		slug: 'establishing-companies',
	},
	{ title: 'Arbitration Services', slug: 'arbitration' },
	{ title: 'Corporate Governance Services', slug: 'corporate-governance' },
	{ title: 'Notarization Services', slug: 'notarization' },
	{ title: 'Estate Services', slug: 'estates' },
	{
		title: 'Corporate Legal Consultation',
		slug: 'corporate-legal-consultation',
	},
	{ title: 'Defense in All Cases', slug: 'defense-in-all-cases' },
	{ title: 'Foreign Investment Services', slug: 'foreign-investment' },
	{ title: 'Commercial Agencies', slug: 'commercial-agencies' },
	{ title: 'Intellectual Property', slug: 'intellectual-property' },
	{ title: 'Companies Liquidation', slug: 'companies-liquidation' },
	{ title: 'Insurance Legal Services', slug: 'insurance' },
	{
		title: 'Individual Legal Consultation',
		slug: 'individual-legal-consultation',
	},
	{
		title: 'Services for Companies and Institutions',
		slug: 'companies-institutions',
	},
	{ title: 'Banks and Financial Institutions', slug: 'banks-financial' },
	{ title: 'Contracts', slug: 'contracts' },
	{ title: 'Supporting Vision 2030', slug: 'vision-2030' },
	{
		title: 'Corporate Restructuring and Reorganization',
		slug: 'corporate-restructuring',
	},
	{ title: 'Internal Regulations for Companies', slug: 'internal-regulations' },
]

const SearchContent: React.FC = () => {
	const searchParams = useSearchParams()
	const [searchResults, setSearchResults] = useState<typeof servicesData>([])
	const [query, setQuery] = useState<string>('')

	useEffect(() => {
		const searchQuery = searchParams.get('q') || ''
		setQuery(searchQuery)

		if (searchQuery.trim()) {
			const filteredServices = servicesData.filter((service) =>
				service.title.toLowerCase().includes(searchQuery.toLowerCase()),
			)
			setSearchResults(filteredServices)
		} else {
			setSearchResults([])
		}
	}, [searchParams])

	return (
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
				<a
					href='/'
					className='mb-6 flex items-center text-gray-600 transition-colors duration-200 hover:text-gray-800 sm:mb-8'
				>
					<ChevronLeft className='mr-1 h-4 w-4 sm:h-5 sm:w-5' />
					<span className='text-sm sm:text-base'>Back</span>
				</a>

				<h1 className='mb-6 font-bold font-serif text-2xl text-gray-900 sm:mb-8 sm:text-3xl md:text-4xl lg:mb-12 lg:text-5xl'>
					Search Results
				</h1>

				{query && (
					<p className='mb-8 text-gray-700 text-lg'>
						Showing results for: <strong>"{query}"</strong>
					</p>
				)}

				{searchResults.length > 0 ? (
					<div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
						{searchResults.map((service) => (
							<Link
								key={service.slug}
								href={`/services/${service.slug}`}
								className='group block rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-amber-300'
							>
								<h3 className='font-semibold text-gray-900 text-lg group-hover:text-amber-700 transition-colors'>
									{service.title}
								</h3>
								<p className='mt-2 text-gray-600 text-sm'>
									Click to learn more about our {service.title.toLowerCase()}{' '}
									services.
								</p>
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
	)
}

const SearchPage: React.FC = () => {
	return (
		<>
			<Header />
			<Suspense
				fallback={
					<div className='min-h-screen flex items-center justify-center'>
						<div className='text-gray-600'>Loading search results...</div>
					</div>
				}
			>
				<SearchContent />
			</Suspense>
			<Footer />
		</>
	)
}

export default SearchPage
