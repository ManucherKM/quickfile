'use client'

import { addSmoothScrollToLinks, removeSmoothScrollToLinks } from '@/utils'
import { useTranslations } from 'next-intl'
import { useEffect, type FC } from 'react'
import { Computer } from './Computer/Computer'
import { Mobile } from './Mobile/Mobile'
import { ILink } from './types'

export interface INavBar {
	locale: string
}

export const NavBar: FC<INavBar> = ({ locale }) => {
	const t = useTranslations()

	const links: ILink[] = [
		{
			href: '#FAQ',
			content: t('faq'),
		},
		{
			href: `${locale}/policy`,
			content: t('usage_policy'),
		},
	]

	useEffect(() => {
		addSmoothScrollToLinks()

		return () => removeSmoothScrollToLinks()
	}, [])

	return (
		<>
			<Computer links={links} />
			<Mobile links={links} />
		</>
	)
}
