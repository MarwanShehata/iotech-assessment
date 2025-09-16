'use client'
import React from 'react'
import { Twitter, Facebook } from 'lucide-react'
import { Trans, useLingui } from '@lingui/react'

const Footer: React.FC = () => {
	const { i18n } = useLingui()

	return (
		<footer className='bg-amber-900 text-white'>
			{/* Top Section */}
			<div className='px-6 py-12 md:px-10 lg:px-16 xl:px-20'>
				<div className='flex flex-col items-start justify-between space-y-6 md:flex-row md:items-center md:space-x-6 md:space-y-0'>
					{/* Newsletter Subscription */}
					<div className='flex w-full flex-col items-start space-y-4 md:flex-row md:items-center md:space-x-2 md:space-y-0'>
						<input
							type='email'
							placeholder={i18n._('Email')}
							className='w-full rounded bg-white px-4 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-700 md:w-auto'
						/>
						<button
							type='button'
							className='w-full rounded bg-amber-800 px-6 py-2 text-white transition-colors duration-200 hover:bg-amber-700 md:w-auto'
						>
							<Trans id='Subscribe' />
						</button>
					</div>

					{/* Contacts Link & Social Icons - Grouped on small screens */}
					<div className='flex flex-col items-start space-y-4 md:flex-row md:items-center md:space-x-6 md:space-y-0'>
						<a
							href='/contacts'
							className='transition-colors duration-200 hover:text-amber-200'
						>
							<Trans id='Contacts' />
						</a>

						{/* Social Media Icons */}
						<div className='flex space-x-3'>
							<a
								href='#'
								className='transition-colors duration-200 hover:text-amber-200'
							>
								<Twitter size={20} />
							</a>
							<a
								href='#'
								className='transition-colors duration-200 hover:text-amber-200'
							>
								<Facebook size={20} />
							</a>
							<a
								href='#'
								className='transition-colors duration-200 hover:text-amber-200'
							>
								<div className='flex h-5 w-5 items-center justify-center rounded bg-red-600 font-bold text-white text-xs'>
									G+
								</div>
							</a>
						</div>
					</div>
				</div>
			</div>

			{/* Horizontal Divider */}
			<div className='border-amber-800 border-t px-6 md:px-10 lg:px-16 xl:px-20' />

			{/* Bottom Section */}
			<div className='flex flex-col items-start justify-between gap-6 px-6 py-6 md:flex-row md:items-center md:px-10 lg:px-16 xl:px-20'>
				{/* Navigation Links - Stack vertically on small, horizontal on md+ */}
				<nav className='flex flex-col space-y-3 md:flex-row md:space-x-6 md:space-y-0'>
					<a
						href='/about'
						className='transition-colors duration-200 hover:text-amber-200'
					>
						<Trans id='About' />
					</a>
					<a
						href='/strategy'
						className='transition-colors duration-200 hover:text-amber-200'
					>
						<Trans id='Our Strategy' />
					</a>
					<a
						href='/advantages'
						className='transition-colors duration-200 hover:text-amber-200'
					>
						<Trans id='Our Advantages' />
					</a>
					<a
						href='/social-responsibility'
						className='transition-colors duration-200 hover:text-amber-200'
					>
						<Trans id='Social Responsibility' />
					</a>
					<a
						href='/services'
						className='transition-colors duration-200 hover:text-amber-200'
					>
						<Trans id='Our Services' />
					</a>
				</nav>

				{/* Copyright - Always at bottom on small, aligned right on md+ */}
				<p className='text-center text-sm md:text-right'>
					<Trans id='© 2024 . All rights reserved.' />
				</p>
			</div>
		</footer>
	)
}

export default Footer
