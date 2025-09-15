'use client'
import Image from 'next/image'
import type React from 'react'
import { useState, useRef, useEffect } from 'react'
import { useRouter, usePathname } from "next/navigation";

import { Trans, useLingui } from "@lingui/react";

interface Language {
  code: string
  name: string
}

const Header: React.FC = () => {
  const { i18n } = useLingui();
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false)
  const [isServicesOpen, setIsServicesOpen] = useState<boolean>(false)
  const [isLanguageOpen, setIsLanguageOpen] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedLanguage, setSelectedLanguage] = useState<string>('EN')
  const [searchResults, setSearchResults] = useState<typeof servicesData>([])
  const [showSearchResults, setShowSearchResults] = useState<boolean>(false)

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
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const query = e.target.value
    setSearchQuery(query)

    if (query.trim()) {
      const filteredServices = servicesData.filter((service) =>
        service.title.toLowerCase().includes(query.toLowerCase())
      )
      setSearchResults(filteredServices)
      setShowSearchResults(true)
    } else {
      setSearchResults([])
      setShowSearchResults(false)
    }
  }

  const handleSearchSubmit = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ): void => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // If there are search results, navigate to the first one
      if (searchResults.length > 0) {
        router.push(`/services/${searchResults[0].slug}`)
      } else {
        // Navigate to search results page with query
        router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
      }
      setSearchQuery('')
      setIsSearchOpen(false)
      setShowSearchResults(false)
    }
  }

  const handleServiceSelect = (slug: string): void => {
    router.push(`/services/${slug}`)
    setSearchQuery('')
    setIsSearchOpen(false)
    setShowSearchResults(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleSearchSubmit(e as any)
    }
  }

  const languages: Language[] = [
    { code: 'en', name: 'English' },
    { code: 'ar', name: 'العربية' },
  ]

  const servicesData = [
    { title: 'General Legal Consultation', slug: 'general-legal-consultation' },
    {
      title: 'Legal Consultation Services',
      slug: 'legal-consultation-services',
    },
    {
      title: 'Establishing National and Foreign Companies',
      slug: 'establishing-companies',
    },
    { title: 'Arbitration Services', slug: 'arbitration' },
    { title: 'Corporate Governance Services', slug: 'corporate-governance' },
    { title: 'Notarization Services', slug: 'notarization' },
    { title: 'Estate Services', slug: 'estates' },
    {
      title: 'Corporate Legal Consultation',
      slug: 'corporate-legal-consultation',
    },
    { title: 'Defense in All Cases', slug: 'defense-in-all-cases' },
    { title: 'Foreign Investment Services', slug: 'foreign-investment' },
    { title: 'Commercial Agencies', slug: 'commercial-agencies' },
    { title: 'Intellectual Property', slug: 'intellectual-property' },
    { title: 'Companies Liquidation', slug: 'companies-liquidation' },
    { title: 'Insurance Legal Services', slug: 'insurance' },
    {
      title: 'Individual Legal Consultation',
      slug: 'individual-legal-consultation',
    },
    {
      title: 'Services for Companies and Institutions',
      slug: 'companies-institutions',
    },
    { title: 'Banks and Financial Institutions', slug: 'banks-financial' },
    { title: 'Contracts', slug: 'contracts' },
    { title: 'Supporting Vision 2030', slug: 'vision-2030' },
    {
      title: 'Corporate Restructuring and Reorganization',
      slug: 'corporate-restructuring',
    },
    {
      title: 'Internal Regulations for Companies',
      slug: 'internal-regulations',
    },
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
              <Trans id="About Us" />
            </a>

            {/* Services Dropdown */}
            <div className='relative' ref={servicesRef}>
              <button
                type='button'
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className='flex items-center font-semibold text-[15px] text-amber-50 transition-colors hover:text-amber-200'
              >
                <Trans id="Services" />
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
                <div className='absolute top-full left-0 z-50 mt-2 w-[900px] rounded-lg border border-amber-700 bg-amber-800 p-6 shadow-lg'>
                  <div className='grid grid-cols-3 gap-8'>
                    {/* Column 1 */}
                    <div>
                      <a
                        href='/services/general-legal-consultation'
                        className='block rounded px-2 py-2 font-medium text-[15px] text-amber-50 transition-colors hover:bg-amber-700 hover:text-amber-100'
                      >
                        General Legal Consultation
                      </a>
                      <a
                        href='/services/legal-consultation-services'
                        className='block rounded px-2 py-2 font-medium text-[15px] text-amber-50 transition-colors hover:bg-amber-700 hover:text-amber-100'
                      >
                        Legal Consultation Services
                      </a>
                      <a
                        href='/services/establishing-companies'
                        className='block rounded px-2 py-2 font-medium text-[15px] text-amber-50 transition-colors hover:bg-amber-700 hover:text-amber-100'
                      >
                        Establishing National and Foreign Companies
                      </a>
                      <a
                        href='/services/arbitration'
                        className='block rounded px-2 py-2 font-medium text-[15px] text-amber-50 transition-colors hover:bg-amber-700 hover:text-amber-100'
                      >
                        Arbitration
                      </a>
                      <a
                        href='/services/corporate-governance'
                        className='block rounded px-2 py-2 font-medium text-[15px] text-amber-50 transition-colors hover:bg-amber-700 hover:text-amber-100'
                      >
                        Corporate Governance Services
                      </a>
                      <a
                        href='/services/notarization'
                        className='block rounded px-2 py-2 font-medium text-[15px] text-amber-50 transition-colors hover:bg-amber-700 hover:text-amber-100'
                      >
                        Notarization
                      </a>
                      <a
                        href='/services/estates'
                        className='block rounded px-2 py-2 font-medium text-[15px] text-amber-50 transition-colors hover:bg-amber-700 hover:text-amber-100'
                      >
                        Estates
                      </a>
                    </div>

                    {/* Column 2 */}
                    <div>
                      <a
                        href='/services/corporate-legal-consultation'
                        className='block rounded px-2 py-2 font-medium text-[15px] text-amber-50 transition-colors hover:bg-amber-700 hover:text-amber-100'
                      >
                        Corporate Legal Consultation
                      </a>
                      <a
                        href='/services/defense-in-all-cases'
                        className='block rounded px-2 py-2 font-medium text-[15px] text-amber-50 transition-colors hover:bg-amber-700 hover:text-amber-100'
                      >
                        Defense in All Cases
                      </a>
                      <a
                        href='/services/foreign-investment'
                        className='block rounded px-2 py-2 font-medium text-[15px] text-amber-50 transition-colors hover:bg-amber-700 hover:text-amber-100'
                      >
                        Foreign Investment Services
                      </a>
                      <a
                        href='/services/commercial-agencies'
                        className='block rounded px-2 py-2 font-medium text-[15px] text-amber-50 transition-colors hover:bg-amber-700 hover:text-amber-100'
                      >
                        Commercial Agencies
                      </a>
                      <a
                        href='/services/intellectual-property'
                        className='block rounded px-2 py-2 font-medium text-[15px] text-amber-50 transition-colors hover:bg-amber-700 hover:text-amber-100'
                      >
                        Intellectual Property
                      </a>
                      <a
                        href='/services/companies-liquidation'
                        className='block rounded px-2 py-2 font-medium text-[15px] text-amber-50 transition-colors hover:bg-amber-700 hover:text-amber-100'
                      >
                        Companies Liquidation
                      </a>
                      <a
                        href='/services/insurance'
                        className='block rounded px-2 py-2 font-medium text-[15px] text-amber-50 transition-colors hover:bg-amber-700 hover:text-amber-100'
                      >
                        Insurance
                      </a>
                    </div>

                    {/* Column 3 */}
                    <div>
                      <a
                        href='/services/individual-legal-consultation'
                        className='block rounded px-2 py-2 font-medium text-[15px] text-amber-50 transition-colors hover:bg-amber-700 hover:text-amber-100'
                      >
                        Individual Legal Consultation
                      </a>
                      <a
                        href='/services/companies-institutions'
                        className='block rounded px-2 py-2 font-medium text-[15px] text-amber-50 transition-colors hover:bg-amber-700 hover:text-amber-100'
                      >
                        Services for Companies and Institutions
                      </a>
                      <a
                        href='/services/banks-financial'
                        className='block rounded px-2 py-2 font-medium text-[15px] text-amber-50 transition-colors hover:bg-amber-700 hover:text-amber-100'
                      >
                        Banks and Financial Institutions
                      </a>
                      <a
                        href='/services/contracts'
                        className='block rounded px-2 py-2 font-medium text-[15px] text-amber-50 transition-colors hover:bg-amber-700 hover:text-amber-100'
                      >
                        Contracts
                      </a>
                      <a
                        href='/services/vision-2030'
                        className='block rounded px-2 py-2 font-medium text-[15px] text-amber-50 transition-colors hover:bg-amber-700 hover:text-amber-100'
                      >
                        Supporting Vision 2030
                      </a>
                      <a
                        href='/services/corporate-restructuring'
                        className='block rounded px-2 py-2 font-medium text-[15px] text-amber-50 transition-colors hover:bg-amber-700 hover:text-amber-100'
                      >
                        Corporate Restructuring and Reorganization
                      </a>
                      <a
                        href='/services/internal-regulations'
                        className='block rounded px-2 py-2 font-medium text-[15px] text-amber-50 transition-colors hover:bg-amber-700 hover:text-amber-100'
                      >
                        Internal Regulations for Companies
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <a
              href='/team'
              className='font-semibold text-[15px] text-amber-50 transition-colors hover:text-amber-200'
            >
              <Trans id="Our Team" />
            </a>
            <a
              href='/blog'
              className='font-semibold text-[15px] text-amber-50 transition-colors hover:text-amber-200'
            >
              <Trans id="Blogs" />
            </a>
            <a
              href='/contact'
              className='font-semibold text-[15px] text-amber-50 transition-colors hover:text-amber-200'
            >
              <Trans id="Contact Us" />
            </a>
          </nav>

          {/* Right Side Controls */}
          <div className='flex min-w-0 flex-wrap items-center gap-2 sm:flex-nowrap sm:space-x-4'>
            {/* Search */}
            <div className='relative flex min-w-0 items-center'>
              <form
                onSubmit={handleSearchSubmit}
                className='relative flex min-w-0 items-center rounded-md focus-within:ring-amber-300 focus:ring-2 focus:ring-amber-300'
              >
                <input
                  ref={searchInputRef}
                  type='text'
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onKeyDown={handleKeyDown}
                  onFocus={() =>
                    searchQuery.trim() && setShowSearchResults(true)
                  }
                  onBlur={() =>
                    setTimeout(() => setShowSearchResults(false), 200)
                  }
                  placeholder={i18n._('Search services...')}
                  className={`h-10 text-amber-50 text-sm outline-none transition-all duration-300 ease-in-out placeholder:text-amber-200 ${
                    isSearchOpen
                      ? 'w-32 rounded-l-md border border-amber-700 border-r-0 bg-amber-800 px-3 sm:w-48'
                      : 'w-0 border-none p-0'
                  }`}
                />
                <button
                  type='button'
                  onClick={() => {
                    if (isSearchOpen) {
                      setSearchQuery('')
                      setShowSearchResults(false)
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
                {/* Search Results Dropdown */}
                {showSearchResults && searchResults.length > 0 && (
                  <div className='absolute top-full left-0 z-50 mt-1 max-h-64 w-full min-w-[300px] overflow-y-auto rounded-md border border-amber-700 bg-amber-800 py-1 shadow-lg'>
                    {searchResults.map((service, index) => (
                      <button
                        key={service.slug}
                        type='button'
                        onClick={() => handleServiceSelect(service.slug)}
                        className='block w-full px-4 py-2 text-left text-amber-50 text-sm transition-colors hover:bg-amber-700 hover:text-amber-100'
                      >
                        {service.title}
                      </button>
                    ))}
                  </div>
                )}
              </form>
              {/* End Search */}
            </div>

            {/* Book Appointment Button */}
            <button
              className='hidden rounded-md border-2 border-amber-600 px-4 py-2 font-semibold text-amber-50 text-sm transition-colors hover:bg-amber-700 md:block lg:px-6'
              // className='hidden rounded-md bg-amber-600 px-6 py-2 font-semibold text-sm text-amber-50 transition-colors hover:bg-amber-700 sm:block'

              type='button'
            >
              <Trans id="Book Appointment" />
            </button>

            {/* Language Dropdown */}
            <div className='relative shrink-0' ref={languageRef}>
              <button
                type='button'
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className='flex items-center space-x-1 px-3 py-2 font-medium text-amber-50 text-sm transition-colors hover:text-amber-200'
              >
                <span>{i18n.locale.toUpperCase()}</span>
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
                        const newPath = `/${lang.code}${pathname.substring(3)}`
                        router.push(newPath)
                        setIsLanguageOpen(false)
                      }}
                      className={`block w-full px-4 py-2 text-left text-sm transition-colors hover:bg-amber-700 ${
                        i18n.locale === lang.code
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
        className={`fixed top-0 right-0 z-50 h-full w-80 transform bg-amber-900 shadow-lg transition-transform duration-300 ease-in-out lg:hidden overflow-y-auto ${
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
            src='/navbar-logo.png'
            alt='logo'
            className='w-10'
            width={40}
            height={40}
          />
        </div>

        {/* Mobile Navigation */}
        <nav className='space-y-4 p-6'>
          <a
            href='/about'
            className='block border-amber-700 border-b py-3 font-medium text-amber-50 transition-colors hover:text-amber-200'
          >
            <Trans id="About Us" />
          </a>
          {/* Mobile Services */}
          {/* Mobile Services */}
          <div className='border-amber-700 border-b'>
            <button
              type='button'
              onClick={() => setIsServicesOpen(!isServicesOpen)}
              className='flex w-full items-center justify-between py-3 font-medium text-amber-50 transition-colors hover:text-amber-200'
            >
              <Trans id="Services" />
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
              <div className='max-h-64 overflow-y-auto space-y-1 pb-3 pl-4'>
                <a
                  href='/services/general-legal-consultation'
                  className='block py-2 text-amber-200 text-sm transition-colors hover:text-amber-100'
                >
                  General Legal Consultation
                </a>
                <a
                  href='/services/legal-consultation-services'
                  className='block py-2 text-amber-200 text-sm transition-colors hover:text-amber-100'
                >
                  Legal Consultation Services
                </a>
                <a
                  href='/services/establishing-companies'
                  className='block py-2 text-amber-200 text-sm transition-colors hover:text-amber-100'
                >
                  Establishing National and Foreign Companies
                </a>
                <a
                  href='/services/arbitration'
                  className='block py-2 text-amber-200 text-sm transition-colors hover:text-amber-100'
                >
                  Arbitration
                </a>
                <a
                  href='/services/corporate-governance'
                  className='block py-2 text-amber-200 text-sm transition-colors hover:text-amber-100'
                >
                  Corporate Governance Services
                </a>
                <a
                  href='/services/notarization'
                  className='block py-2 text-amber-200 text-sm transition-colors hover:text-amber-100'
                >
                  Notarization
                </a>
                <a
                  href='/services/estates'
                  className='block py-2 text-amber-200 text-sm transition-colors hover:text-amber-100'
                >
                  Estates
                </a>
                <a
                  href='/services/corporate-legal-consultation'
                  className='block py-2 text-amber-200 text-sm transition-colors hover:text-amber-100'
                >
                  Corporate Legal Consultation
                </a>
                <a
                  href='/services/defense-in-all-cases'
                  className='block py-2 text-amber-200 text-sm transition-colors hover:text-amber-100'
                >
                  Defense in All Cases
                </a>
                <a
                  href='/services/foreign-investment'
                  className='block py-2 text-amber-200 text-sm transition-colors hover:text-amber-100'
                >
                  Foreign Investment Services
                </a>
                <a
                  href='./services/commercial-agencies'
                  className='block py-2 text-amber-200 text-sm transition-colors hover:text-amber-100'
                >
                  Commercial Agencies
                </a>
                <a
                  href='/services/intellectual-property'
                  className='block py-2 text-amber-200 text-sm transition-colors hover:text-amber-100'
                >
                  Intellectual Property
                </a>
                <a
                  href='/services/companies-liquidation'
                  className='block py-2 text-amber-200 text-sm transition-colors hover:text-amber-100'
                >
                  Companies Liquidation
                </a>
                <a
                  href='/services/insurance'
                  className='block py-2 text-amber-200 text-sm transition-colors hover:text-amber-100'
                >
                  Insurance
                </a>
                <a
                  href='/services/individual-legal-consultation'
                  className='block py-2 text-amber-200 text-sm transition-colors hover:text-amber-100'
                >
                  Individual Legal Consultation
                </a>
                <a
                  href='/services/companies-institutions'
                  className='block py-2 text-amber-200 text-sm transition-colors hover:text-amber-100'
                >
                  Services for Companies and Institutions
                </a>
                <a
                  href='/services/banks-financial'
                  className='block py-2 text-amber-200 text-sm transition-colors hover:text-amber-100'
                >
                  Banks and Financial Institutions
                </a>
                <a
                  href='/services/contracts'
                  className='block py-2 text-amber-200 text-sm transition-colors hover:text-amber-100'
                >
                  Contracts
                </a>
                <a
                  href='/services/vision-2030'
                  className='block py-2 text-amber-200 text-sm transition-colors hover:text-amber-100'
                >
                  Supporting Vision 2030
                </a>
                <a
                  href='/services/corporate-restructuring'
                  className='block py-2 text-amber-200 text-sm transition-colors hover:text-amber-100'
                >
                  Corporate Restructuring and Reorganization
                </a>
                <a
                  href='/services/internal-regulations'
                  className='block py-2 text-amber-200 text-sm transition-colors hover:text-amber-100'
                >
                  Internal Regulations for Companies
                </a>
              </div>
            )}
          </div>

          <a
            href='/team'
            className='block border-amber-700 border-b py-3 font-medium text-amber-50 transition-colors hover:text-amber-200'
          >
            <Trans id="Our Team" />
          </a>
          <a
            href='/blog'
            className='block border-amber-700 border-b py-3 font-medium text-amber-50 transition-colors hover:text-amber-200'
          >
            <Trans id="Blogs" />
          </a>
          <a
            href='/contact'
            className='block border-amber-700 border-b py-3 font-medium text-amber-50 transition-colors hover:text-amber-200'
          >
            <Trans id="Contact Us" />
          </a>

          {/* Mobile Book Appointment */}
          <button
            type='button'
            className='mt-6 w-full rounded-md bg-amber-600 py-3 font-semibold text-amber-50 transition-colors hover:bg-amber-700'
          >
            <Trans id="Book Appointment" />
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Header
