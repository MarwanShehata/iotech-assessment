import React from 'react'
import { ChevronLeft } from 'lucide-react'
import Header from '@/src/components/Header'
import Footer from '@/src/components/Footer'
import Head from 'next/head'

const IndividualLegalConsultationPage: React.FC = () => {
	return (
		<>
			<Head>
				<title>Individual Legal Consultation</title>
				<meta name='description' content='Individual Legal Consultation services' />
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
						Individual Legal Consultation
					</h1>

					{/* Introduction paragraph */}
					<div className='mb-8 sm:mb-10 lg:mb-12'>
						<p className='max-w-4xl text-gray-700 text-sm leading-relaxed sm:text-base lg:text-lg'>
							Personalized legal consultation services for individuals facing various legal challenges in their personal and professional lives.
						</p>
					</div>

					{/* Service categories */}
					<div className='space-y-8 sm:space-y-10 lg:space-y-12'>
						{/* Service 1 */}
						<div className='relative'>
							<div className='absolute top-0 bottom-0 left-0 hidden w-px bg-gray-300 md:block' />
							<div className='md:pl-8 lg:pl-12'>
								<h2 className='mb-4 font-bold font-serif text-gray-900 text-lg sm:text-xl lg:text-2xl'>
									Personal Legal Matters
								</h2>
								<div className='flex items-start'>
									<div className='mt-2 mr-3 h-2 w-2 flex-shrink-0 bg-gray-900 sm:mr-4' />
									<p className='text-gray-700 text-sm leading-relaxed sm:text-base lg:text-lg'>
										We provide comprehensive personal legal matters services with professional expertise and attention to detail.
									</p>
								</div>
							</div>
						</div>

						{/* Service 2 */}
						<div className='relative'>
							<div className='absolute top-0 bottom-0 left-0 hidden w-px bg-gray-300 md:block' />
							<div className='md:pl-8 lg:pl-12'>
								<h2 className='mb-4 font-bold font-serif text-gray-900 text-lg sm:text-xl lg:text-2xl'>
									Family Law Issues
								</h2>
								<div className='flex items-start'>
									<div className='mt-2 mr-3 h-2 w-2 flex-shrink-0 bg-gray-900 sm:mr-4' />
									<p className='text-gray-700 text-sm leading-relaxed sm:text-base lg:text-lg'>
										Our family law issues ensures your legal requirements are met with precision and compliance.
									</p>
								</div>
							</div>
						</div>

						{/* Service 3 */}
						<div className='relative'>
							<div className='absolute top-0 bottom-0 left-0 hidden w-px bg-gray-300 md:block' />
							<div className='md:pl-8 lg:pl-12'>
								<h2 className='mb-4 font-bold font-serif text-gray-900 text-lg sm:text-xl lg:text-2xl'>
									Employment Disputes
								</h2>
								<div className='flex items-start'>
									<div className='mt-2 mr-3 h-2 w-2 flex-shrink-0 bg-gray-900 sm:mr-4' />
									<p className='text-gray-700 text-sm leading-relaxed sm:text-base lg:text-lg'>
										We specialize in employment disputes to protect your interests and ensure legal compliance.
									</p>
								</div>
							</div>
						</div>

						{/* Service 4 */}
						<div className='relative'>
							<div className='absolute top-0 bottom-0 left-0 hidden w-px bg-gray-300 md:block' />
							<div className='md:pl-8 lg:pl-12'>
								<h2 className='mb-4 font-bold font-serif text-gray-900 text-lg sm:text-xl lg:text-2xl'>
									Consumer Rights Protection
								</h2>
								<div className='flex items-start'>
									<div className='mt-2 mr-3 h-2 w-2 flex-shrink-0 bg-gray-900 sm:mr-4' />
									<p className='text-gray-700 text-sm leading-relaxed sm:text-base lg:text-lg'>
										Our consumer rights protection provides strategic guidance for optimal outcomes.
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* Closing paragraph */}
					<div className='mt-10 sm:mt-12 lg:mt-16'>
						<p className='max-w-4xl text-gray-700 text-sm leading-relaxed sm:text-base lg:text-lg'>
							At Law Firm, we are committed to providing exceptional individual legal consultation services. Contact us today to discuss how we can assist you with your legal needs.
						</p>
					</div>
				</div>
			</div>
			<Footer />
		</>
	)
}

export default IndividualLegalConsultationPage
