import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'IO Tech Assessment - Marwan Shehata',
	description: 'Frontend Task',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return children
}
