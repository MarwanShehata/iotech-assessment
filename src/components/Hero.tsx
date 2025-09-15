'use client'
import React, { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import Image from 'next/image'

interface SlideData {
	id: number
	title: string
	description: string
	readMoreLink: string
	image: string
}

const Hero: React.FC = () => {
	const swiperRef = useRef<SwiperType | null>(null)
	const [isHovered, setIsHovered] = useState(false)

	const slides: SlideData[] = [
		{
			id: 1,
			title: 'Backend Developer',
			description:
				'Designing and maintaining server-side applications with Node.js, Express, and secure APIs.',
			readMoreLink: '/services/backend-development',
			image:
				'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
		},
		{
			id: 2,
			title: 'Frontend Developer',
			description:
				'Creating responsive and interactive user interfaces with React, Next.js, and modern CSS frameworks.',
			readMoreLink: '/services/frontend-development',
			image:
				'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
		},
		{
			id: 3,
			title: 'Full Stack Developer',
			description:
				'Building complete web applications from database design to user interface implementation.',
			readMoreLink: '/services/fullstack-development',
			image:
				'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
		},
		{
			id: 4,
			title: 'UI/UX Designer',
			description:
				'Crafting beautiful and intuitive user experiences through research, wireframing, and prototyping.',
			readMoreLink: '/services/ui-ux-design',
			image:
				'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
		},
		{
			id: 5,
			title: 'DevOps Engineer',
			description:
				'Streamlining development workflows with CI/CD pipelines, cloud infrastructure, and automation.',
			readMoreLink: '/services/devops',
			image:
				'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
		},
	]

	return (
		<div className='relative h-screen w-full overflow-hidden'>
			{/* Background Image */}
			<div
				className='absolute inset-0 bg-center bg-cover bg-no-repeat'
				style={{
					backgroundImage:
						'url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
				}}
			/>

			{/* Dark Overlay */}
			<div className='absolute inset-0 bg-black bg-opacity-60' />

			{/* Content Container */}
			<div className='relative z-10 flex h-full w-full items-center justify-center'>
				<div className='container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
					<div
						className='hero-swiper-container'
						onMouseEnter={() => setIsHovered(true)}
						onMouseLeave={() => setIsHovered(false)}
					>
						<Swiper
							modules={[Navigation, Pagination, Autoplay]}
							spaceBetween={0}
							slidesPerView={1}
							loop={true}
							autoplay={{
								delay: 4000,
								disableOnInteraction: false,
								pauseOnMouseEnter: true,
							}}
							navigation={{
								nextEl: '.hero-swiper-button-next',
								prevEl: '.hero-swiper-button-prev',
							}}
							pagination={{
								el: '.hero-swiper-pagination',
								clickable: true,
								renderBullet: (index, className) => {
									return `<span class="${className} hero-pagination-bullet"></span>`
								},
							}}
							onSwiper={(swiper) => {
								swiperRef.current = swiper
							}}
							className='hero-swiper'
						>
							{slides.map((slide) => (
								<SwiperSlide key={slide.id}>
									<div className='flex min-h-[400px] items-center justify-center py-8 sm:py-12'>
										{/* Mobile and Tablet Layout (Stacked) */}
										<div className='flex flex-col items-center space-y-6 text-center lg:hidden'>
											{/* Image First on Mobile/Tablet */}
											<div className='flex items-center justify-center'>
												<div className='relative overflow-hidden rounded-lg shadow-2xl'>
													<img
														src={slide.image}
														alt={slide.title}
														className='h-48 w-64 object-cover sm:h-56 sm:w-72 md:h-64 md:w-80'
														width={320}
														height={256}
													/>
													<div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent' />
												</div>
											</div>

											{/* Text Content Below Image */}
											<div className='flex max-w-lg flex-col justify-center text-white'>
												<h3 className='mb-4 font-bold text-3xl sm:text-4xl md:text-5xl'>
													{slide.title}
												</h3>
												<p className='mb-6 text-base leading-relaxed sm:text-lg md:text-xl'>
													{slide.description}
												</p>
												<div>
													<a
														href={slide.readMoreLink}
														className='inline-block rounded-md bg-blue-600 px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-blue-700 hover:shadow-lg sm:px-8'
													>
														Read More
													</a>
												</div>
											</div>
										</div>

										{/* Desktop Layout (Side by Side) */}
										<div className='hidden grid-cols-1 gap-8 lg:grid lg:grid-cols-2 lg:gap-12'>
											{/* Text Content - Left Side */}
											<div className='flex flex-col justify-center text-white'>
												<h3 className='mb-6 text-left font-bold text-4xl lg:text-5xl xl:text-6xl'>
													{slide.title}
												</h3>
												<p className='mb-8 text-left text-lg leading-relaxed lg:text-xl'>
													{slide.description}
												</p>
												<div className='text-left'>
													<a
														href={slide.readMoreLink}
														className='inline-block rounded-md bg-blue-600 px-8 py-3 font-semibold text-white transition-all duration-300 hover:bg-blue-700 hover:shadow-lg'
													>
														Read More
													</a>
												</div>
											</div>

											{/* Image - Right Side */}
											<div className='flex items-center justify-center lg:justify-end'>
												<div className='relative overflow-hidden rounded-lg shadow-2xl'>
													<img
														src={slide.image}
														alt={slide.title}
														className='h-80 w-96 object-cover lg:h-96 lg:w-[420px]'
														width={420}
														height={384}
													/>
													<div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent' />
												</div>
											</div>
										</div>
									</div>
								</SwiperSlide>
							))}
						</Swiper>

						{/* Custom Navigation Buttons */}
						<div className='swiper-button-prev hero-swiper-button-prev -translate-y-1/2 absolute top-1/2 left-2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-opacity-20 text-white transition-all duration-300 hover:bg-opacity-30 sm:left-4 sm:h-12 sm:w-12 md:left-6 lg:left-8 lg:h-16 lg:w-16' />

						<div className='swiper-button-next hero-swiper-button-next -translate-y-1/2 absolute top-1/2 right-2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-opacity-20 text-white transition-all duration-300 hover:bg-opacity-30 sm:right-4 sm:h-12 sm:w-12 md:right-6 lg:right-8 lg:h-16 lg:w-16' />

						{/* Custom Vertical Pagination */}
						<div className='hero-swiper-pagination -translate-y-1/2 absolute top-3/4 left-2 z-20 flex flex-col gap-1 space-y-2 sm:left-4 sm:space-y-3 md:left-6 lg:left-8' />
					</div>
				</div>
			</div>

			{/* Custom Styles */}
			<style jsx global>{`
        .hero-swiper {
          width: 100%;
          height: 100%;
        }

        .hero-pagination-bullet {
          display: block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.5);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .hero-pagination-bullet:hover {
          background: rgba(255, 255, 255, 0.8);
          transform: scale(1.2);
        }

        .hero-pagination-bullet.swiper-pagination-bullet-active {
          background: white;
          transform: scale(1.3);
        }

        .hero-swiper-button-prev,
        .hero-swiper-button-next {
          margin-top: 0;
        }

        .hero-swiper-button-prev:after,
        .hero-swiper-button-next:after {
          display: none;
        }

        @media (min-width: 640px) {
          .hero-pagination-bullet {
            width: 10px;
            height: 10px;
          }
        }

        @media (min-width: 1024px) {
          .hero-pagination-bullet {
            width: 12px;
            height: 12px;
          }
        }
      `}</style>
		</div>
	)
}

export default Hero
