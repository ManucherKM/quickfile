'use client'

import clsx from 'clsx'
import { Subtitle } from 'kuui-react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { FC } from 'react'
import classes from './NavBarBack.module.scss'

export const NavBarBack: FC = () => {
	const router = useRouter()
	const t = useTranslations()

	const styles = clsx(['container', classes.root])
	return (
		<nav className={styles}>
			<Subtitle
				className={classes.button}
				onClick={() => router.back()}
				dimension="small"
			>
				{/* &#x2190; */}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="6"
					height="10"
					viewBox="0 0 7 12"
					fill="none"
				>
					<path
						d="M6 1L1 6L6 11"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
				{t('back')}
			</Subtitle>
		</nav>
	)
}
