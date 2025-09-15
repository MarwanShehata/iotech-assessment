import Link from 'next/link'

export default function NotFound() {
	return (
		<div className='flex min-h-screen flex-col items-center justify-center bg-[#f9f5f3] px-4 text-center'>
			<h1 className='select-none font-extrabold text-[#4A2E2B] text-[10rem]'>
				404
			</h1>
			<p className='mt-4 max-w-lg text-2xl text-[#4A2E2B]'>
				Sorry, the page you are looking for could not be found.
			</p>
			<Link
				href='/'
				className='mt-8 rounded-lg bg-[#4A2E2B] px-6 py-3 font-medium text-white shadow-lg transition-colors duration-300 hover:bg-[#3a1f1c]'
			>
				Go Home
			</Link>
		</div>
	)
}
