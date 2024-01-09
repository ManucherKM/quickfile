'use client'

import clsx from 'clsx'
import { Button, Popup, Title } from 'kuui-react'
import { useTranslations } from 'next-intl'
import { FC } from 'react'
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
	const t = useTranslations()

	function cancelHandler() {
		if (onCancel) {
			onCancel()
		}
	}

	const isLoading = !time || !count || !percent || !size

	const styles = clsx([classes.root, isLoading && classes.loader])

	return (
		<Browser>
			<Popup className={styles}>
				{isLoading ? (
					<div className={classes.wrapperStage}>
						<Stage>{t('waiting_for_server_response')}</Stage>
					</div>
				) : (
					<>
						<div className={classes.wrapperTimer}>
							<Title className={classes.timer} dimension="large">
								{time}
							</Title>
							<Description>{t('before_the_download_is_complete')}</Description>
						</div>
						<div className={classes.wrapperInfo}>
							<Info
								info={size + ' ' + t('mb')}
								description={t('overall_size')}
							/>
							<Info info={count} description={t('files')} />
							<Info info={percent} description={t('progress')} />
						</div>
						<Button variant="active" onClick={cancelHandler}>
							{t('cancel')}
						</Button>
					</>
				)}
			</Popup>
		</Browser>
	)
}
