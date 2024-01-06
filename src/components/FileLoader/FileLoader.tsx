'use client'

import { Button, Popup, Title } from 'kuui-react'
import { FC } from 'react'
import { Description } from './Description/Description'
import classes from './FileLoader.module.scss'
import { Info } from './Info/Info'

export interface IFileLoader {}

export const FileLoader: FC<IFileLoader> = () => {
	return (
		<Popup className={classes.root}>
			<div className={classes.wrapperTimer}>
				<Title className={classes.timer} dimension="large">
					00:10:36
				</Title>
				<Description>до окончания загрузки</Description>
			</div>
			<div className={classes.wrapperInfo}>
				<Info info="1.5 ГБ" description="общий размер" />
				<Info info="5" description="файлы" />
				<Info info="0.2 мб/с" description="скорость загрузки" />
			</div>
			<Button variant="active">Отменить</Button>
		</Popup>
	)
}
