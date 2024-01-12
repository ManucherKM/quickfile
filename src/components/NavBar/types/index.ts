import { LinkProps } from 'next/link'
import { ReactNode } from 'react'

export interface ILink extends Omit<LinkProps, 'href'> {
	content: ReactNode
	href: string
}
