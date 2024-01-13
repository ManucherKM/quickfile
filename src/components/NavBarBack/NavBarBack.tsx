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
				&#x2190; {t('back')}
			</Subtitle>
		</nav>
	)
}
