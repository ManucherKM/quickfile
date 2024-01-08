import { Button, Paragraph, Popup, Title } from 'kuui-react'
import { FC } from 'react'
import { Browser } from '../Browser'
import { Description } from './Description/Description'
import classes from './FileLoader.module.scss'
import { Info } from './Info/Info'

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
	function cancelHandler() {
		if (onCancel) {
			onCancel()
		}
	}

	const isLoading = !time || !count || !percent || !size

	return (
		<Browser>
			<Popup className={classes.root}>
				{isLoading ? (
					<Paragraph align="center">Ожидание ответа сервера...</Paragraph>
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
