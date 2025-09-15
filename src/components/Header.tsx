'use client'
import Image from 'next/image'
import type React from 'react'
import { useState, useRef, useEffect } from 'react'

interface Language {
	code: string
	name: string
}

const Header: React.FC = () => {
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
	const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false)
	const [isServicesOpen, setIsServicesOpen] = useState<boolean>(false)
	const [isLanguageOpen, setIsLanguageOpen] = useState<boolean>(false)
	const [searchQuery, setSearchQuery] = useState<string>('')
	const [selectedLanguage, setSelectedLanguage] = useState<string>('EN')

	const searchInputRef = useRef<HTMLInputElement>(null)
	const servicesRef = useRef<HTMLDivElement>(null)
	const languageRef = useRef<HTMLDivElement>(null)

	// Close dropdowns when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as Node

			if (servicesRef.current && !servicesRef.current.contains(target)) {
				setIsServicesOpen(false)
			}
			if (languageRef.current && !languageRef.current.contains(target)) {
				setIsLanguageOpen(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	// Focus search input when opened
	useEffect(() => {
		if (isSearchOpen && searchInputRef.current) {
			searchInputRef.current.focus()
		}
	}, [isSearchOpen])

	const toggleMenu = (): void => {
		setIsMenuOpen(!isMenuOpen)
	}

	const toggleSearch = (): void => {
		if (isSearchOpen && searchQuery.trim()) {
			// Perform search
			console.log('Searching for:', searchQuery)
			setSearchQuery('')
			setIsSearchOpen(false)
		} else {
			setIsSearchOpen(!isSearchOpen)
		}
	}

	const handleSearchSubmit = (
		e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>,
	): void => {
		e.preventDefault()
		if (searchQuery.trim()) {
			console.log('Searching for:', searchQuery)
			setSearchQuery('')
			setIsSearchOpen(false)
		}
	}

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
		if (e.key === 'Enter') {
			handleSearchSubmit(e as any)
		}
	}

	const servicesItems: string[] = [
		'Web Development',
		'Mobile Apps',
		'Digital Marketing',
		'UI/UX Design',
		'Consulting',
		'Support & Maintenance',
	]

	const languages: Language[] = [
		{ code: 'EN', name: 'English' },
		{ code: 'AR', name: 'العربية' },
	]

	return (
		<header className='relative z-50 flex min-h-[70px] border-amber-700 border-b bg-amber-900 tracking-wide'>
			{' '}
			<div className='flex w-full items-center px-4 py-3'>
				<div className='mx-auto flex w-full max-w-screen-xl flex-wrap items-center justify-between gap-4 sm:px-10'>
					{/* Logo */}
					<div className='flex items-center'>
						<a href='/' className='max-sm:hidden'>
							<Image
								src='/navbar-logo.png'
								alt='logo'
								className='w-[50px]'
								width={50}
								height={50}
							/>
						</a>
						<a href='/' className='hidden max-sm:block'>
							<Image
								src='/navbar-logo.png'
								alt='logo'
								className='w-9'
								width={36}
								height={36}
							/>
						</a>
					</div>

					{/* Desktop Navigation */}
					<nav className='hidden items-center space-x-8 lg:flex'>
						<a
							href='/about'
							className='font-semibold text-[15px] text-amber-50 transition-colors hover:text-amber-200'
						>
							About Us
						</a>

						{/* Services Dropdown */}
						<div className='relative' ref={servicesRef}>
							<button
								type='button'
								onClick={() => setIsServicesOpen(!isServicesOpen)}
								className='flex items-center font-semibold text-[15px] text-amber-50 transition-colors hover:text-amber-200'
							>
								Services
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='16px'
									height='16px'
									className={`ml-1 transform fill-current transition-transform ${
										isServicesOpen ? 'rotate-180' : ''
									}`}
									viewBox='0 0 24 24'
									role='graphics-symbol img'
								>
									<path d='M12 16a1 1 0 0 1-.71-.29l-6-6a1 1 0 0 1 1.42-1.42l5.29 5.3 5.29-5.29a1 1 0 0 1 1.41 1.41l-6 6a1 1 0 0 1-.7.29z' />
								</svg>
							</button>

							{isServicesOpen && (
								<div className='absolute top-full left-0 z-50 mt-2 w-64 rounded-lg border border-amber-700 bg-amber-800 py-2 shadow-lg'>
									{' '}
									{servicesItems.map((item: string, index: number) => (
										<a
											key={index}
											href={`/services/${item
												.toLowerCase()
												.replace(/\s+/g, '-')}`}
											className='block px-4 py-3 font-medium text-[15px] text-amber-50 transition-colors hover:bg-amber-700 hover:text-amber-100'
										>
											{item}
										</a>
									))}
								</div>
							)}
						</div>

						<a
							href='/team'
							className='font-semibold text-[15px] text-amber-50 transition-colors hover:text-amber-200'
						>
							Our Team
						</a>
						<a
							href='/blog'
							className='font-semibold text-[15px] text-amber-50 transition-colors hover:text-amber-200'
						>
							Blogs
						</a>
						<a
							href='/contact'
							className='font-semibold text-[15px] text-amber-50 transition-colors hover:text-amber-200'
						>
							Contact Us
						</a>
					</nav>

					{/* Right Side Controls */}
					<div className='flex min-w-0 flex-wrap items-center gap-2 sm:flex-nowrap sm:space-x-4'>
						{/* Search */}
						<div className='flex min-w-0 items-center'>
							<form
								onSubmit={handleSearchSubmit}
								className='relative flex min-w-0 items-center rounded-md focus-within:ring-amber-300 focus:ring-2 focus:ring-amber-300'
							>
								<input
									ref={searchInputRef}
									type='text'
									value={searchQuery}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
										setSearchQuery(e.target.value)
									}
									onKeyDown={handleKeyDown}
									placeholder='Search...'
									className={`h-10 text-amber-50 text-sm outline-none transition-all duration-300 ease-in-out placeholder:text-amber-200${
										isSearchOpen
											? 'w-32 rounded-l-md border border-amber-700 border-r-0 bg-amber-800 px-3 sm:w-48' // Responsive width
											: 'w-0 border-none p-0'
									}`}
								/>
								<button
									type='button'
									onClick={() => {
										// Toggles the search input visibility.
										// If closing, it also clears the search query.
										if (isSearchOpen) {
											setSearchQuery('')
										}
										setIsSearchOpen(!isSearchOpen)
									}}
									className={`flex h-10 w-10 shrink-0 items-center justify-center text-amber-50 transition-colors hover:text-amber-200 ${
										isSearchOpen
											? 'rounded-r-md border border-amber-700 border-l-0 bg-amber-800'
											: 'rounded-md hover:bg-amber-800'
									}`}
								>
									{isSearchOpen ? (
										<svg // Close Icon
											className='h-5 w-5'
											fill='currentColor'
											viewBox='0 0 20 20'
											role='graphics-symbol img'
										>
											<path
												fillRule='evenodd'
												d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
												clipRule='evenodd'
											/>
										</svg>
									) : (
										<svg // Search Icon
											role='graphics-symbol img'
											xmlns='http://www.w3.org/2000/svg'
											viewBox='0 0 192.904 192.904'
											width='20px'
											className='fill-current'
										>
											<path d='m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z' />
										</svg>
									)}
								</button>
							</form>
							{/* End Search */}
						</div>

						{/* Book Appointment Button */}
						<button
							className='hidden rounded-md border-amber-600 border-2 px-4 py-2 font-semibold text-amber-50 text-sm transition-colors hover:bg-amber-700 md:block lg:px-6'
							// className='hidden rounded-md bg-amber-600 px-6 py-2 font-semibold text-sm text-amber-50 transition-colors hover:bg-amber-700 sm:block'

							type='button'
						>
							Book Appointment
						</button>

						{/* Language Dropdown */}
						<div className='relative shrink-0' ref={languageRef}>
							<button
								type='button'
								onClick={() => setIsLanguageOpen(!isLanguageOpen)}
								className='flex items-center space-x-1 px-3 py-2 font-medium text-amber-50 text-sm transition-colors hover:text-amber-200'
							>
								<span>{selectedLanguage}</span>
								<svg
									className={`h-4 w-4 transform transition-transform ${
										isLanguageOpen ? 'rotate-180' : ''
									}`}
									fill='currentColor'
									viewBox='0 0 20 20'
									role='graphics-symbol img'
								>
									<path
										fillRule='evenodd'
										d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
										clipRule='evenodd'
									/>
								</svg>
							</button>

							{isLanguageOpen && (
								<div className='absolute top-full right-0 z-50 mt-2 w-32 rounded-lg border border-amber-700 bg-amber-800 py-1 shadow-lg'>
									{' '}
									{languages.map((lang: Language) => (
										<button
											type='button'
											key={lang.code}
											onClick={() => {
												setSelectedLanguage(lang.code)
												setIsLanguageOpen(false)
											}}
											className={`block w-full px-4 py-2 text-left text-sm transition-colors hover:bg-amber-700 ${
												selectedLanguage === lang.code
													? 'font-medium text-amber-200'
													: 'text-amber-50'
											}`}
										>
											{lang.name}
										</button>
									))}
								</div>
							)}
						</div>

						{/* Mobile Menu Toggle */}
						<button
							type='button'
							onClick={toggleMenu}
							className='shrink-0 rounded-md p-2 text-amber-50 transition-colors hover:bg-amber-800 lg:hidden'
						>
							<svg
								className='h-6 w-6'
								fill='#fef3c7' // This is amber-50
								viewBox='0 0 20 20'
								xmlns='http://www.w3.org/2000/svg'
								role='graphics-symbol img'
							>
								<path
									fillRule='evenodd'
									d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
									clipRule='evenodd'
								/>
							</svg>
						</button>
					</div>
				</div>
			</div>
			{/* Mobile Menu Overlay */}
			{isMenuOpen && (
				<div
					className='fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden'
					onClick={toggleMenu}
				/>
			)}
			{/* Mobile Menu */}
			<div
				className={`fixed top-0 right-0 z-50 h-full w-80 transform bg-amber-900 shadow-lg transition-transform duration-300 ease-in-out lg:hidden ${
					isMenuOpen ? 'translate-x-0' : 'translate-x-full'
				}`}
			>
				{/* Close Button */}
				<button
					type='button'
					onClick={toggleMenu}
					className='absolute top-4 right-4 rounded-full p-2 text-amber-50 transition-colors hover:bg-amber-800'
				>
					<svg
						className='h-6 w-6'
						fill='currentColor'
						viewBox='0 0 20 20'
						role='graphics-symbol img'
					>
						<path
							fillRule='evenodd'
							d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
							clipRule='evenodd'
						/>
					</svg>
				</button>

				{/* Mobile Logo */}
				<div className='border-gray-200 border-b p-6'>
					<Image
						src='https://readymadeui.com/readymadeui.svg'
						alt='logo'
						className='w-32'
						width={128}
						height={128}
					/>
				</div>

				{/* Mobile Navigation */}
				<nav className='space-y-4 p-6'>
					<a
						href='/about'
						className='block border-amber-700 border-b py-3 font-medium text-amber-50 transition-colors hover:text-amber-200'
					>
						About Us
					</a>

					{/* Mobile Services */}
					<div className='border-amber-700 border-b'>
						{' '}
						<button
							type='button'
							onClick={() => setIsServicesOpen(!isServicesOpen)}
							className='flex w-full items-center justify-between py-3 font-medium text-amber-50 transition-colors hover:text-amber-200'
						>
							Services
							<svg
								className={`h-4 w-4 transform transition-transform ${
									isServicesOpen ? 'rotate-180' : ''
								}`}
								fill='currentColor'
								viewBox='0 0 20 20'
								role='graphics-symbol img'
							>
								<path
									fillRule='evenodd'
									d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
									clipRule='evenodd'
								/>
							</svg>
						</button>
						{isServicesOpen && (
							<div className='space-y-2 pb-3 pl-4'>
								{servicesItems.map((item: string, index: number) => (
									<a
										key={index}
										href={`/services/${item
											.toLowerCase()
											.replace(/\s+/g, '-')}`}
										className='block py-2 text-amber-200 text-sm transition-colors hover:text-amber-100'
									>
										{item}
									</a>
								))}
							</div>
						)}
					</div>

					<a
						href='/team'
						className='block border-amber-700 border-b py-3 font-medium text-amber-50 transition-colors hover:text-amber-200'
					>
						Our Team
					</a>
					<a
						href='/blog'
						className='block border-amber-700 border-b py-3 font-medium text-amber-50 transition-colors hover:text-amber-200'
					>
						Blogs
					</a>
					<a
						href='/contact'
						className='block border-amber-700 border-b py-3 font-medium text-amber-50 transition-colors hover:text-amber-200'
					>
						Contact Us
					</a>

					{/* Mobile Book Appointment */}
					<button
						type='button'
						className='mt-6 w-full rounded-md bg-amber-600 py-3 font-semibold text-amber-50 transition-colors hover:bg-amber-700'
					>
						Book Appointment
					</button>
				</nav>
			</div>
		</header>
	)
}

export default Header
