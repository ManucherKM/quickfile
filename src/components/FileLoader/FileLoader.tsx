import { Button, Popup, Title } from 'kuui-react'
import { FC } from 'react'
import { Browser } from '../Browser'
import { Description } from './Description/Description'
import classes from './FileLoader.module.scss'
import { Info } from './Info/Info'

export interface IFileLoader {
	time?: string
	size?: string
	count?: number
	percent?: string
	onCancel: () => void
}

export const FileLoader: FC<IFileLoader> = ({
	time,
	count,
	percent,
	size,
	onCancel,
}) => {
	function cancelHandler() {
		onCancel()
	}

	return (
		<Browser>
			<Popup className={classes.root}>
				<div className={classes.wrapperTimer}>
					<Title className={classes.timer} dimension="large">
						{!!time ? time : 'Загрузка'}
					</Title>
					<Description>до окончания загрузки</Description>
				</div>
				<div className={classes.wrapperInfo}>
					<Info
						info={!!size ? size + ' МБ' : undefined}
						description="общий размер"
					/>
					<Info info={count} description="файлы" />
					<Info info={percent} description="прогресс" />
				</div>
				<Button variant="active" onClick={cancelHandler}>
					Отменить
				</Button>
			</Popup>
		</Browser>
	)
}
