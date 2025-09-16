import React from 'react'
import { ChevronLeft } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Head from 'next/head'

const LegalConsultationServices: React.FC = () => {
	return (
		<>
			<Head>
				<title>About us</title>
				<meta name='description' content='know more about us' />
			</Head>
			<Header />

			<div className='relative min-h-screen overflow-hidden bg-white'>
				{/* Subtle background texture/watermark */}
				<div
					className='absolute inset-0 bg-repeat opacity-5'
					style={{
						backgroundImage: 'url(/about-us-bg.png)',
						backgroundSize: '1000px 100px',
						backgroundRepeat: 'no-repeat',
					}}
				/>

				{/* Main content container */}
				<div className='relative z-10 px-4 py-6 sm:px-6 sm:py-8 md:px-10 lg:px-20 lg:py-12 xl:px-24'>
					{/* Back button */}
					<a
						type='button'
						href='/'
						className='mb-6 flex items-center text-gray-600 transition-colors duration-200 hover:text-gray-800 sm:mb-8'
					>
						<ChevronLeft className='mr-1 h-4 w-4 sm:h-5 sm:w-5' />
						<span className='text-sm sm:text-base'>Back</span>
					</a>

					{/* Main title */}
					<h1 className='mb-6 font-bold font-serif text-2xl text-gray-900 sm:mb-8 sm:text-3xl md:text-4xl lg:mb-12 lg:text-5xl'>
						Legal Consultation Services
					</h1>

					{/* Introduction paragraph */}
					<div className='mb-8 sm:mb-10 lg:mb-12'>
						<p className='max-w-4xl text-gray-700 text-sm leading-relaxed sm:text-base lg:text-lg'>
							Law Firm is one of the leading legal offices that offer
							exceptional advisory services for both individuals and companies.
							Our mission is to provide comprehensive and specialized legal
							support to meet our clients' needs and offer the best legal
							solutions in various cases and legal fields, we provide our legal
							consultations services as a follow:
						</p>
					</div>

					{/* Service categories */}
					<div className='space-y-8 sm:space-y-10 lg:space-y-12'>
						{/* General Legal Consultations */}
						<div className='relative'>
							{/* Vertical divider line */}
							<div className='absolute top-0 bottom-0 left-0 hidden w-px bg-gray-300 md:block' />
							<div className='md:pl-8 lg:pl-12'>
								<h2 className='mb-4 font-bold font-serif text-gray-900 text-lg sm:text-xl lg:text-2xl'>
									General Legal Consultations
								</h2>
								<div className='flex items-start'>
									<div className='mt-2 mr-3 h-2 w-2 flex-shrink-0 bg-gray-900 sm:mr-4' />
									<p className='text-gray-700 text-sm leading-relaxed sm:text-base lg:text-lg'>
										At Law Firm, we provide comprehensive legal consultations
										covering all legal aspects that our clients may encounter in
										their daily lives or business activities. Our goal is to
										offer accurate legal advice based on a deep understanding of
										local and international laws.
									</p>
								</div>
							</div>
						</div>

						{/* Corporate Legal Consultations */}
						<div className='relative'>
							{/* Vertical divider line */}
							<div className='absolute top-0 bottom-0 left-0 hidden w-px bg-gray-300 md:block' />
							<div className='md:pl-8 lg:pl-12'>
								<h2 className='mb-4 font-bold font-serif text-gray-900 text-lg sm:text-xl lg:text-2xl'>
									Corporate Legal Consultations
								</h2>
								<div className='mb-4 flex items-start'>
									<div className='mt-2 mr-3 h-2 w-2 flex-shrink-0 bg-gray-900 sm:mr-4' />
									<p className='text-gray-700 text-sm leading-relaxed sm:text-base lg:text-lg'>
										We at the Law Firm understand the importance of legal
										consultations for companies in building and enhancing their
										businesses.
									</p>
								</div>

								<div className='mb-4'>
									<p className='mb-3 font-medium text-gray-800 text-sm sm:text-base lg:text-lg'>
										Our advisory services about:
									</p>
									<div className='ml-4 space-y-1 sm:ml-6 sm:space-y-2'>
										<div className='flex items-start'>
											<span className='mr-2 text-gray-600 sm:mr-3'>-</span>
											<span className='text-gray-700 text-sm sm:text-base'>
												Establishing and registering companies.
											</span>
										</div>
										<div className='flex items-start'>
											<span className='mr-2 text-gray-600 sm:mr-3'>-</span>
											<span className='text-gray-700 text-sm sm:text-base'>
												All kinds of contracts and agreements.
											</span>
										</div>
										<div className='flex items-start'>
											<span className='mr-2 text-gray-600 sm:mr-3'>-</span>
											<span className='text-gray-700 text-sm sm:text-base'>
												Commercial disputes.
											</span>
										</div>
										<div className='flex items-start'>
											<span className='mr-2 text-gray-600 sm:mr-3'>-</span>
											<span className='text-gray-700 text-sm sm:text-base'>
												Compliance with local and international laws and
												regulations.
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Individual Legal Consultations */}
						<div className='relative'>
							{/* Vertical divider line */}
							<div className='absolute top-0 bottom-0 left-0 hidden w-px bg-gray-300 md:block' />
							<div className='md:pl-8 lg:pl-12'>
								<h2 className='mb-4 font-bold font-serif text-gray-900 text-lg sm:text-xl lg:text-2xl'>
									Individual Legal Consultations
								</h2>
								<div className='mb-4 flex items-start'>
									<div className='mt-2 mr-3 h-2 w-2 flex-shrink-0 bg-gray-900 sm:mr-4' />
									<p className='text-gray-700 text-sm leading-relaxed sm:text-base lg:text-lg'>
										Law Firm offers customized advisory services for
										individuals, including:
									</p>
								</div>

								<div className='ml-4 space-y-1 sm:ml-6 sm:space-y-2'>
									<div className='flex items-start'>
										<span className='mr-2 text-gray-600 sm:mr-3'>-</span>
										<span className='text-gray-700 text-sm sm:text-base'>
											Family issues such as divorce, alimony, and custody.
										</span>
									</div>
									<div className='flex items-start'>
										<span className='mr-2 text-gray-600 sm:mr-3'>-</span>
										<span className='text-gray-700 text-sm sm:text-base'>
											Real estate matters like buying, selling, and renting
											properties.
										</span>
									</div>
									<div className='flex items-start'>
										<span className='mr-2 text-gray-600 sm:mr-3'>-</span>
										<span className='text-gray-700 text-sm sm:text-base'>
											Employment issues such as hiring and wrongful termination.
										</span>
									</div>
									<div className='flex items-start'>
										<span className='mr-2 text-gray-600 sm:mr-3'>-</span>
										<span className='text-gray-700 text-sm sm:text-base'>
											Criminal cases and defending personal rights.
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Closing paragraph */}
					<div className='mt-10 sm:mt-12 lg:mt-16'>
						<p className='max-w-4xl text-gray-700 text-sm leading-relaxed sm:text-base lg:text-lg'>
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

export default LegalConsultationServices
