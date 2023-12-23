import '@/assets/styles/index.scss'
import { ReactNode } from 'react'

export interface IRootLayout {
	children: ReactNode
}

export default function RootLayout({ children }: IRootLayout) {
	return children
}
