'use client'

import { Button, Popup, Title } from 'kuui-react'
import { FC, useEffect, useState } from 'react'
import { Browser } from '../Browser'
import { Description } from './Description/Description'
import classes from './FileLoader.module.scss'
import { Info } from './Info/Info'
import { Stage } from './Stage/Stage'

export interface IFileLoader {
	time?: string
	size?: string
	count?: number | string
	percent?: string
	onCancel?: () => void
}

export const FileLoader: FC<IFileLoader> = ({
	time,
	count,
	percent,
	size,
	onCancel,
}) => {
	const [stage, setStage] = useState<string>('Ожидание ответа сервера')

	function cancelHandler() {
		if (onCancel) {
			onCancel()
		}
	}

	const isLoading = !time || !count || !percent || !size

	useEffect(() => {
		setTimeout(() => {
			setStage('Загрузка архива')
		}, 2000)
	}, [])

	return (
		<Browser>
			<Popup className={classes.root}>
				{isLoading ? (
					<Stage>{stage}</Stage>
				) : (
					<>
						<div className={classes.wrapperTimer}>
							<Title className={classes.timer} dimension="large">
								{time}
							</Title>
							<Description>до окончания загрузки</Description>
						</div>
						<div className={classes.wrapperInfo}>
							<Info info={size + ' МБ'} description="общий размер" />
							<Info info={count} description="файлы" />
							<Info info={percent} description="прогресс" />
						</div>
						<Button variant="active" onClick={cancelHandler}>
							Отменить
						</Button>
					</>
				)}
			</Popup>
		</Browser>
	)
}
