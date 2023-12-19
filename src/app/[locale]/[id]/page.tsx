'use client'

import { useLoader } from '@/hooks'
import { useFileStore, useNotificationsStore } from '@/storage'
import { Button, Paragraph } from 'kuui-react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useEffect, type FC } from 'react'
import classes from './Download.module.scss'

export interface IDownload {
	params: { id: string; locale: string }
}

const Download: FC<IDownload> = ({ params: { id, locale } }) => {
	// Function to create a new error to show it to the user.
	const newError = useNotificationsStore(store => store.newError)

	// Function for downloading an archive from the API.
	const downloadArchive = useFileStore(store => store.downloadArchive)

	const checkExistArchive = useFileStore(store => store.checkExistArchive)

	const t = useTranslations()

	const router = useRouter()

	// A function for showing Loader to the user when requesting an API.
	const loader = useLoader()

	// Handler function that will be processed when clicking on the "download" button.
	async function clickHandler() {
		// If the identifier is not found, stop executing the function.
		if (!id) return false

		// We get the result of the request.
		const isSuccess = await loader(downloadArchive, id)

		// If the archive could not be downloaded.
		if (!isSuccess) {
			// Show the user an error message.
			newError(t('failed_to_download_archive'))
		}
	}

	useEffect(() => {
		const fetchFile = async () => {
			try {
				const isSuccess = await checkExistArchive(id)

				if (!isSuccess) {
					newError(t('the_file_could_not_be_found'))
					router.push('/' + locale)
				}
			} catch (e) {
				newError(t('unexpected_server_error'))
				console.log(e)
			}
		}

		fetchFile()

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	return (
		<main className={classes.root}>
			<div className={classes.wrapper__content}>
				<Paragraph align="center">
					{t('to_download_the_archive_with_files')}
				</Paragraph>

				<Button onClick={clickHandler}>{t('download')}</Button>
			</div>
		</main>
	)
}

export default Download
