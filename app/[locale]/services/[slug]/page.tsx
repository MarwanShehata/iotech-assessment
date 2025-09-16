import React from 'react'
import { ChevronLeft } from 'lucide-react'
import Head from 'next/head'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { fetchServiceBySlug } from '@/lib/strapi'
import { notFound } from 'next/navigation'

interface ServicePageProps {
	params: {
		locale: string
		slug: string
	}
}

const ServicePage: React.FC<ServicePageProps> = async ({ params }) => {
	const { slug } = params
	const service = await fetchServiceBySlug(slug)

	if (!service) {
		notFound()
	}

	return (
		<>
			<Head>
				<title>{service.title}</title>
				<meta name='description' content={service.description?.replace(/<[^>]*>/g, '') || ''} />
			</Head>
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
					<a
						type='button'
						href='/'
						className='mb-6 flex items-center text-gray-600 transition-colors duration-200 hover:text-gray-800 sm:mb-8'
					>
						<ChevronLeft className='mr-1 h-4 w-4 sm:h-5 sm:w-5' />
						<span className='text-sm sm:text-base'>Back</span>
					</a>
					<h1 className='mb-6 font-bold font-serif text-2xl text-gray-900 sm:mb-8 sm:text-3xl md:text-4xl lg:mb-12 lg:text-5xl'>
						{service.title}
					</h1>
					{service.description && (
						<div
							className='mb-8 sm:mb-10 lg:mb-12 prose max-w-none'
							dangerouslySetInnerHTML={{ __html: service.description }}
						/>
					)}
					<div className='space-y-8 sm:space-y-10 lg:space-y-12'>
						{service.sections?.map((section) => (
							<div key={section.id} className='relative'>
								<div className='absolute top-0 bottom-0 left-0 hidden w-px bg-gray-300 md:block' />
								<div className='md:pl-8 lg:pl-12'>
									<h2 className='mb-4 font-bold font-serif text-gray-900 text-lg sm:text-xl lg:text-2xl'>
										{section.title}
									</h2>
									<div
										className='prose max-w-none'
										dangerouslySetInnerHTML={{ __html: section.content }}
									/>
								</div>
							</div>
						))}
					</div>
					<div className='mt-10 sm:mt-12 lg:mt-16'>
						<p className='max-w-4xl text-gray-700 text-sm leading-relaxed sm:text-base lg:text-lg'>
							At Law Firm, we are committed to providing exceptional{' '}
							{service.title.toLowerCase()} services. Contact us today to
							discuss how we can assist you with your legal needs.
						</p>
					</div>
				</div>
			</div>
			<Footer />
		</>
	)
}

export default ServicePage