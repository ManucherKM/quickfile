import { Paragraph } from 'kuui-react'
import { FC } from 'react'
import classes from './Stage.module.scss'

export interface IStage {
	children: string
}

export const Stage: FC<IStage> = ({ children }) => {
	return (
		<Paragraph className={classes.root} align="center">
			{children}...
		</Paragraph>
	)
}
