import React from 'react'
import { ChevronLeft } from 'lucide-react'
import Head from 'next/head'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import {
	fetchServiceBySlug,
	richTextToHTML,
	richTextToPlainText,
} from '@/lib/strapi'
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
				<meta
					name='description'
					content={richTextToPlainText(service.description)}
				/>
			</Head>
			<Header />
			{/* Main Container: Off-white bg */}
			<div className='relative min-h-screen overflow-hidden bg-stone-50 font-sans'>
				<div
					className='absolute inset-0 bg-left-top bg-no-repeat opacity-5'
					style={{
						backgroundImage: 'url(/about-us-bg.png)',
						backgroundSize: '1000px 1000px',
					}}
				/>
				{/* Content wrapper with responsive padding */}
				<div className='relative z-10 px-4 py-8 sm:px-6 md:px-10 lg:px-20 lg:py-16 xl:px-24'>
					{/* Back Button with specific color and smooth transition */}
					<a
						href='/'
						className='mb-8 inline-flex items-center text-[#4B2615] text-sm transition-colors duration-300 hover:text-[#6D4734] sm:text-base lg:mb-12'
					>
						<ChevronLeft className='mr-1 h-5 w-5' />
						Back
					</a>

					{/* Header Title with specific color and adjusted size */}
					<h1 className='mb-6 font-bold font-serif text-3xl text-[#4B2615] sm:mb-8 sm:text-4xl md:text-5xl lg:mb-12'>
						{service.title}
					</h1>

					{/* Introduction Paragraph with specific color */}
					{service.description && (
						<div
							className='prose mb-10 max-w-none text-[#1E1E1E] text-lg md:mb-12 lg:mb-16'
							dangerouslySetInnerHTML={{
								__html: richTextToHTML(service.description),
							}}
						/>
					)}

					{/* Service Categories */}
					<div className='space-y-10 lg:space-y-12'>
						{service.services?.map((section) => (
							<div key={section.id} className='relative'>
								{/* Vertical decorative line */}
								<div
									aria-hidden='true'
									className='absolute top-1 bottom-0 left-0 hidden w-px bg-stone-300 md:block'
								/>
								<div className='md:pl-10 lg:pl-12'>
									<h2 className='font-bold font-serif text-[#4B2615] text-xl sm:text-2xl'>
										{section.title}
									</h2>
									<div className='relative mt-4 pl-7'>
										<div
											aria-hidden='true'
											className='absolute top-[9px] left-0 h-2 w-2 bg-[#4B2615]'
										/>
										<div
											className="prose prose-p:mt-0 prose-ul:mt-3 max-w-none prose-ul:list-['–_'] prose-ul:pl-2 text-[#1E1E1E] text-base lg:text-lg"
											dangerouslySetInnerHTML={{
												__html: richTextToHTML(section.content), //not safe but works
											}}
										/>
									</div>
								</div>
							</div>
						))}
					</div>

					{/* Closing Paragraph with specific color */}
					<div className='mt-12 border-stone-200 border-t pt-8 sm:mt-16 sm:pt-10 lg:mt-20 lg:pt-12'>
						<p className='max-w-4xl text-[#1E1E1E] text-base leading-relaxed lg:text-lg'>
							At Law Firm, we aim to provide the best legal services to ensure
							your rights and offer effective legal solutions. Contact us today
							to receive professional and comprehensive legal consultation.
						</p>
					</div>
				</div>
			</div>
			<Footer />
		</>
	)
}

export default ServicePage
