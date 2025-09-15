'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Trans, useLingui } from "@lingui/react";

interface Testimonial {
	id: number
	name: string
	position: string
	company: string
	quote: string
	image: string
}

// Base testimonials data structure
const baseTestimonials = [
	{
		id: 1,
		name: 'Mohammed Saif',
		position: 'CEO',
		company: 'Company',
		quote: 'With the help of the hospitable staff of AI Safar and Partners I was able to get my work done without any hassle. The help I received helped me a great deal to overcome the issues that I faced. I was always updated about my case and my queries never went unanswered.',
		image: 'https://ph.loremipsums.org/300x400/CCCCCC/333333/webp',
	},
	{
		id: 2,
		name: 'Sarah Chen',
		position: 'Investment Director',
		company: 'Global Ventures Ltd',
		quote: 'AI Safar and Partners provided exceptional service throughout our investment process. Their expertise in international markets and attention to detail made all the difference. I highly recommend their professional services to any serious investor.',
		image: 'https://ph.loremipsums.org/300x400/77767B/333333/webp',
	},
	{
		id: 3,
		name: 'David Rodriguez',
		position: 'CFO',
		company: 'Fortune Tech Solutions',
		quote: 'Working with AI Safar and Partners has been a game-changer for our company. Their strategic insights and personalized approach helped us navigate complex financial decisions with confidence. Outstanding results every time.',
		image: 'https://ph.loremipsums.org/300x400/DEDDDA/000000/webp',
	},
	{
		id: 4,
		name: 'Emily Johnson',
		position: 'Portfolio Manager',
		company: 'Sunrise Capital',
		quote: "The team at AI Safar and Partners combines deep market knowledge with genuine care for their clients. They've consistently delivered results that exceed our expectations and have become our trusted financial partners.",
		image: 'https://ph.loremipsums.org/300x400/DEDDDA/000000/webp',
	},
	{
		id: 5,
		name: 'Ahmed Hassan',
		position: 'Managing Director',
		company: 'International Holdings',
		quote: "From individual investments to large-scale corporate solutions, AI Safar and Partners has proven time and again why they're the best in the business. Their professionalism and results speak for themselves.",
		image: 'https://ph.loremipsums.org/300x400/DEDDDA/000000/webp',
	},
]

const TestimonialSlider: React.FC = () => {
  const { i18n } = useLingui();
  const isRTL = i18n.locale === 'ar';
	return (
		<div className='min-h-fit w-full bg-gradient-to-br from-amber-900 to-amber-800 px-8 py-16'>
			{/* Header Section */}
			<div className='mx-auto mb-12 max-w-6xl'>
				<h1 className='mb-6 font-bold text-4xl text-white md:text-5xl'>
					<Trans id="What our clients are saying" />
				</h1>
				<p className='text-amber-100 text-lg leading-relaxed md:text-xl'>
					<Trans id="Our clients range from individual investors, to local, international as well as fortune 500 companies. Bla Bla Bla Blaaa" />
				</p>
			</div>

			{/* Testimonial Slider */}
			<div className='mx-auto max-w-6xl' dir={isRTL ? 'rtl' : 'ltr'}>
				<Swiper
					modules={[Navigation, Pagination, Autoplay]}
					spaceBetween={30}
					slidesPerView={1}
					navigation={{
						nextEl: '.swiper-button-next-custom',
						prevEl: '.swiper-button-prev-custom',
					}}
					key={isRTL ? 'rtl' : 'ltr'}
					pagination={{
						clickable: true,
						bulletClass: 'swiper-pagination-bullet-custom',
						bulletActiveClass: 'swiper-pagination-bullet-active-custom',
					}}
					autoplay={{
						delay: 5000,
						disableOnInteraction: false,
					}}
					loop={true}
					className='testimonial-swiper'
				>
					{baseTestimonials.map((testimonial) => (
						<SwiperSlide key={testimonial.id}>
							<div className='flex flex-col items-center gap-8 py-8 lg:flex-row lg:items-start lg:gap-12'>
								{/* Client Image */}
								<div className='flex-shrink-0'>
									<div className='h-80 w-64 overflow-hidden rounded-lg shadow-xl'>
										<img
											src={testimonial.image}
											alt={`${i18n._(testimonial.name)} - ${i18n._(testimonial.position)} at ${i18n._(testimonial.company)}`}
											className='h-full w-full object-cover'
											loading='lazy'
										/>
									</div>
								</div>

								{/* Testimonial Content */}
								<div className='flex-1 text-center lg:text-left'>
									<blockquote className='mb-8 font-light text-white text-xl leading-relaxed md:text-2xl'>
										"{i18n._(testimonial.quote)}"
									</blockquote>

									<div className='text-amber-100'>
										<h3 className='mb-2 font-bold text-2xl md:text-3xl'>
											{i18n._(testimonial.name)}
										</h3>
										<p className='text-lg md:text-xl'>
											{i18n._(testimonial.position)}/{i18n._(testimonial.company)}
										</p>
									</div>
								</div>
							</div>
						</SwiperSlide>
					))}
				</Swiper>

				{/* Custom Navigation Buttons mt-8 */}
				<div className='flex justify-center gap-4 lg:justify-end'>
					<button
						type='button'
						className='swiper-button-prev-custom group flex h-14 w-14 items-center justify-center rounded-full bg-amber-700 transition-colors duration-300 hover:bg-amber-600'
					>
						<svg
							className='h-6 w-6 transform text-white transition-transform duration-200 group-hover:scale-110'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
							role='graphics-symbol img'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M15 19l-7-7 7-7'
							/>
						</svg>
					</button>
					<button
						type='button'
						className='swiper-button-next-custom group flex h-14 w-14 items-center justify-center rounded-full bg-white transition-colors duration-300 hover:bg-gray-100'
					>
						<svg
							className='h-6 w-6 transform text-amber-800 transition-transform duration-200 group-hover:scale-110'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
							role='graphics-symbol img'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M9 5l7 7-7 7'
							/>
						</svg>
					</button>
				</div>
			</div>

			{/* Custom Styles */}
			<style jsx global>{`
        .testimonial-swiper .swiper-pagination {
          position: static !important;
          margin-top: 2rem;
        }

        .swiper-pagination-bullet-custom {
          width: 12px;
          height: 12px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          margin: 0 6px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .swiper-pagination-bullet-active-custom {
          background: white;
          transform: scale(1.2);
        }

        .testimonial-swiper .swiper-slide {
          opacity: 0.7;
          transition: opacity 0.3s ease;
        }

        .testimonial-swiper .swiper-slide-active {
          opacity: 1;
        }
      `}</style>
		</div>
	)
}

export default TestimonialSlider
