import React from 'react'
import { Twitter, Facebook } from 'lucide-react'

const Footer: React.FC = () => {
	return (
		<footer className='bg-amber-900 text-white'>
			{/* Top Section */}
			<div className='px-20 py-16'>
				<div className='flex items-center justify-end space-x-6'>
					{/* Newsletter Subscription */}
					<div className='flex items-center space-x-2'>
						<input
							type='email'
							placeholder='Email'
							className='rounded bg-white px-4 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-700'
						/>
						<button
							type='button'
							className='rounded bg-amber-800 px-6 py-2 text-white transition-colors duration-200 hover:bg-amber-700'
						>
							Subscribe
						</button>
					</div>

					{/* Contacts Link */}
					<a
						href='/contacts'
						className='transition-colors duration-200 hover:text-amber-200'
					>
						Contacts
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

			{/* Horizontal Divider Can be done with hr instead (later) */}
			<div className='border-amber-800 border-t px-20' />

			{/* Bottom Section */}
			<div className='flex items-center justify-between px-20 py-6'>
				{/* Navigation Links */}
				<nav className='flex space-x-8'>
					<a
						href='/about'
						className='transition-colors duration-200 hover:text-amber-200'
					>
						About
					</a>
					<a
						href='/strategy'
						className='transition-colors duration-200 hover:text-amber-200'
					>
						Our Strategy
					</a>
					<a
						href='/advantages'
						className='transition-colors duration-200 hover:text-amber-200'
					>
						Our Advantages
					</a>
					<a
						href='/social-responsibility'
						className='transition-colors duration-200 hover:text-amber-200'
					>
						Social Responsibility
					</a>
					<a
						href='/services'
						className='transition-colors duration-200 hover:text-amber-200'
					>
						Our Services
					</a>
				</nav>

				{/* Copyright */}
				<p className='text-sm'>© 2024 . All rights reserved.</p>
			</div>
		</footer>
	)
}

export default Footer
