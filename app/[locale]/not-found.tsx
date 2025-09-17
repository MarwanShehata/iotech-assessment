'use client';
import { Trans } from '@lingui/react'
import Link from 'next/link'

export default function NotFound() {
	return (
		<div className='flex min-h-screen flex-col items-center justify-center bg-[#f9f5f3] px-4 text-center'>
			<h1 className='select-none font-extrabold text-amber-900 text-[10rem]'>
				404
			</h1>
			<p className='mt-4 max-w-lg text-2xl text-amber-900'>
				<Trans>Well, this is awkward. The page you're looking for has vanished.</Trans>
			</p>
			<Link
				href='/'
				className='mt-8 rounded-lg bg-amber-900 px-6 py-3 font-medium text-white shadow-lg transition-colors duration-300 hover:bg-amber-800'
			>
				<Trans>Go Home</Trans>
			</Link>
		</div>
	)
}
