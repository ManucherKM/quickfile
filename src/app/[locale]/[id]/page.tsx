'use client'

import { FileLoaderProvider } from '@/components'
import {
	useArchiveDownloadInfo,
	useCheckExistArchive,
	useDownloadFiles,
} from '@/hooks'
import { useArchiveLoaderStore } from '@/storage'
import { Button, Paragraph } from 'kuui-react'
import { useTranslations } from 'next-intl'
import { useEffect, type FC } from 'react'
import classes from './Download.module.scss'

export interface IDownload {
	params: { id: string; locale: string }
}

const Download: FC<IDownload> = ({ params: { id, locale } }) => {
	const t = useTranslations()

	const { time, percent, size, onDownloadProgress } = useArchiveDownloadInfo()

	const downloadHandler = useDownloadFiles(id, onDownloadProgress)
	const checkArchive = useCheckExistArchive(id, locale)

	const setInfo = useArchiveLoaderStore(store => store.setInfo)

	useEffect(() => {
		checkArchive()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		setInfo({
			time,
			percent,
			size,
		})

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [time, percent, size])
	return (
		<FileLoaderProvider>
			<main className={classes.root}>
				<div className={classes.wrapper__content}>
					<Paragraph align="center">
						{t('to_download_the_archive_with_files')}
					</Paragraph>

					<Button onClick={downloadHandler}>{t('download')}</Button>
				</div>
			</main>
		</FileLoaderProvider>
	)
}

export default Download
