import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import '../globals.css'
import I18nProvider from '@/providers/I18nProvider'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'IO Tech Assessment - Marwan Shehata',
	description: 'Frontend Task',
}

export default function LocaleLayout({
	children,
	params,
}: {
	children: React.ReactNode
	params: { locale: string }
}) {
	const { locale } = params

	return (
		<html
			lang={locale}
			dir={locale === 'ar' ? 'rtl' : 'ltr'}
			className={`${geistSans.variable} ${geistMono.variable} antialiased`}
		>
			<body>
				<I18nProvider locale={locale}>{children}</I18nProvider>
			</body>
		</html>
	)
}
