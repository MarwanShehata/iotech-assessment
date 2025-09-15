'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import {
	ChevronLeft,
	ChevronRight,
	Phone,
	MessageCircle,
	Mail,
} from 'lucide-react'
import { Trans, useLingui } from "@lingui/react";

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
interface TeamMember {
	id: number
	name: string
	position: string
	image: string
	phone: string
	message: string
	email: string
}

interface TeamMemberCardProps {
	member: TeamMember
}

interface OurTeamProps {
	teamMembers?: TeamMember[]
	className?: string
}

// Define base team data structure without translations
const baseTeamMembers = [
	{
		id: 1,
		nameKey: 'Ahmed Taha',
		positionKey: 'Senior Project Manager',
		image: 'https://ph.loremipsums.org/300/CCCCCC/333333/webp',
		phone: '#',
		message: '#',
		email: '#',
	},
	{
		id: 2,
		nameKey: 'Yasmine Abdelaziz',
		positionKey: 'Marketing Specialist',
		image: 'https://ph.loremipsums.org/300/77767B/333333/webp',
		phone: '#',
		message: '#',
		email: '#',
	},
	{
		id: 3,
		nameKey: 'Mohamed Khaled',
		positionKey: 'Software Engineer',
		image: 'https://ph.loremipsums.org/300/DEDDDA/000000/webp',
		phone: '#',
		message: '#',
		email: '#',
	},
	{
		id: 4,
		nameKey: 'Nada Hassan',
		positionKey: 'Financial Analyst',
		image: 'https://ph.loremipsums.org/300/DEDDDA/000000/webp',
		phone: '#',
		message: '#',
		email: '#',
	},
	{
		id: 5,
		nameKey: 'Karim Saad',
		positionKey: 'Sales Director',
		image: 'https://ph.loremipsums.org/300/DEDDDA/000000/webp',
		phone: '#',
		message: '#',
		email: '#',
	},
	{
		id: 6,
		nameKey: 'Farida Adel',
		positionKey: 'HR Manager',
		image: 'https://ph.loremipsums.org/300/DEDDDA/000000/webp',
		phone: '#',
		message: '#',
		email: '#',
	},
]

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member }) => {
  const { i18n } = useLingui();
  const isRTL = i18n.locale === 'ar';
	const handleContactClick = (
		e: React.MouseEvent<HTMLAnchorElement>,
		url: string,
	): void => {
		if (url === '#') {
			e.preventDefault()
		}
	}

	return (
		<div className='flex flex-col items-center rounded-lg bg-white p-6 text-center shadow-sm'>
			<div className='relative mb-4'>
				<img
					src={member.image}
					alt={`${member.name} - ${member.position}`}
					className='h-48 w-48 rounded-lg object-cover sm:h-56 sm:w-56 lg:h-64 lg:w-64'
					loading='lazy'
				/>
			</div>

			<h3 className='mb-1 font-semibold text-gray-800 text-lg'>
				{member.name}
			</h3>

			<p className='mb-4 text-gray-500 text-sm uppercase tracking-wide'>
				{member.position}
			</p>

			<div className='flex space-x-3'>
				<a
					href={member.phone}
					onClick={(e) => handleContactClick(e, member.phone)}
					className='flex h-8 w-8 items-center justify-center text-gray-600 transition-colors hover:text-blue-600'
					aria-label={`Call ${member.name}`}
				>
					<Phone size={18} />
				</a>
				<a
					href={member.message}
					onClick={(e) => handleContactClick(e, member.message)}
					className='flex h-8 w-8 items-center justify-center text-gray-600 transition-colors hover:text-blue-600'
					aria-label={`Message ${member.name}`}
				>
					<MessageCircle size={18} />
				</a>
				<a
					href={member.email}
					onClick={(e) => handleContactClick(e, member.email)}
					className='flex h-8 w-8 items-center justify-center text-gray-600 transition-colors hover:text-blue-600'
					aria-label={`Email ${member.name}`}
				>
					<Mail size={18} />
				</a>
			</div>
		</div>
	)
}

const OurTeam: React.FC<OurTeamProps> = ({
	teamMembers,
	className = '',
}) => {
	const { i18n } = useLingui();
	const isRTL = i18n.locale === 'ar';

	// Create translated team member data
	const translatedTeamMembers = teamMembers || baseTeamMembers.map(member => ({
		...member,
		name: i18n._(member.nameKey),
		position: i18n._(member.positionKey)
	}));
	return (
		<section className={`bg-gray-50 py-16 ${className}`}>
			<div className='container mx-auto max-w-7xl px-4'>
				{/* Header */}
				<div className='mb-12 text-center'>
					<h2 className='mb-4 font-serif text-3xl text-amber-900 md:text-4xl lg:text-5xl'>
						<Trans id="Our Team" />
					</h2>
					<p className='mx-auto max-w-2xl text-gray-600 text-sm leading-relaxed md:text-base'>
						<Trans id="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s" />
					</p>
				</div>

				{/* Team Carousel */}
				<div className='relative' dir={isRTL ? 'rtl' : 'ltr'}>
					<Swiper
						modules={[Navigation, Pagination]}
						spaceBetween={24}
						slidesPerView={1}
						navigation={{
							prevEl: '.team-prev, .team-prev-mobile',
							nextEl: '.team-next, .team-next-mobile',
						}}
						key={isRTL ? 'rtl' : 'ltr'}
						pagination={{
							clickable: true,
							el: '.team-pagination',
						}}
						breakpoints={{
							640: {
								slidesPerView: 1,
								spaceBetween: 20,
							},
							768: {
								slidesPerView: 2,
								spaceBetween: 24,
							},
							1024: {
								slidesPerView: 3,
								spaceBetween: 32,
							},
						}}
						className='pb-12 team-carousel'
						// role='region'
						aria-label='Team members carousel'
					>
						{translatedTeamMembers.map((member: TeamMember) => (
							<SwiperSlide key={member.id}>
								<TeamMemberCard member={member} />
							</SwiperSlide>
						))}
					</Swiper>

					{/* Custom Navigation Arrows */}
					{/* Custom Navigation Arrows */}
					{/* Custom Navigation Arrows - Responsive positioning */}
					<button
						type='button'
						className='team-prev -translate-y-1/2 absolute top-1/2 left-0 z-10 hidden h-12 w-12 items-center justify-center text-gray-600 transition-all duration-200 hover:bg-gray-50 hover:text-amber-900 disabled:cursor-not-allowed disabled:opacity-50 lg:flex'
					>
						<ChevronLeft size={20} />
					</button>

					<button
						type='button'
						className='team-next -translate-y-1/2 absolute top-1/2 right-0 z-10 hidden h-12 w-12 items-center justify-center text-gray-600 transition-all duration-200 hover:bg-gray-50 hover:text-amber-900 disabled:cursor-not-allowed disabled:opacity-50 lg:flex'
					>
						<ChevronRight size={20} />
					</button>
					{/* Mobile/Tablet Navigation Buttons - Below carousel */}
					<div className='mt-8 flex justify-center gap-4 lg:hidden'>
						<button
							type='button'
							className='team-prev-mobile flex h-12 w-12 items-center justify-center rounded-full bg-white text-gray-600 shadow-md transition-all duration-200 hover:bg-gray-50 hover:text-amber-900 disabled:cursor-not-allowed disabled:opacity-50'
						>
							<ChevronLeft size={20} />
						</button>

						<button
							type='button'
							className='team-next-mobile flex h-12 w-12 items-center justify-center rounded-full bg-white text-gray-600 shadow-md transition-all duration-200 hover:bg-gray-50 hover:text-amber-900 disabled:cursor-not-allowed disabled:opacity-50'
						>
							<ChevronRight size={20} />
						</button>
					</div>

					{/* Custom Pagination */}
					<div
						className='team-pagination mt-8 flex justify-center'
						role='tablist'
						aria-label='Team carousel navigation'
					/>
				</div>
			</div>
			<style jsx global>{`
        .team-pagination .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          opacity: 1;
          margin: 0 4px;
          transition: all 0.3s ease;
          background-color: #d1d5db; /* Inactive dot color (gray-300) */
        }

        .team-pagination .swiper-pagination-bullet-active {
          background-color: #78350f; /* This is bg-amber-900 */  
          transform: scale(1.2);
        }

        /* Hide default Swiper navigation buttons */
        .team-carousel .swiper-button-next,
        .team-carousel .swiper-button-prev {
          display: none;
        }
          
      `}</style>
		</section>
	)
}

export default OurTeam
export type { TeamMember, TeamMemberCardProps, OurTeamProps }
