import { Title } from 'kuui-react'
import { FC } from 'react'
import { Description } from '../Description/Description'
import classes from './Info.module.scss'

export interface IInfo {
	info?: string | number
	description: string
}

export const Info: FC<IInfo> = ({ description, info }) => {
	return (
		<div className={classes.root}>
			<Title>{!!info ? info : 'Загрузка'}</Title>
			<Description>{description}</Description>
		</div>
	)
}
