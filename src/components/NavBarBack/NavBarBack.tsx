import clsx from 'clsx'
import { Subtitle } from 'kuui-react'
import { useRouter } from 'next/navigation'
import { FC } from 'react'
import classes from './NavBarBack.module.scss'

export const NavBarBack: FC = () => {
	const router = useRouter()

	const styles = clsx(['container', classes.root])
	return (
		<nav className={styles}>
			<Subtitle
				className={classes.button}
				onClick={() => router.back()}
				dimension="small"
			>
				&#x2190; Back
			</Subtitle>
		</nav>
	)
}
