import { useLoader } from '@/hooks'
import { useFileStore, useNotificationsStore } from '@/storage'
import { Button, Paragraph } from 'kuui-react'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router'
import classes from './Download.module.scss'

export const Download: FC = () => {
	// The identifier of the archive to download.
	const { id } = useParams()

	const [t] = useTranslation('global')

	// Function to create a new error to show it to the user.
	const newError = useNotificationsStore(store => store.newError)

	// Function for downloading an archive from the API.
	const downloadArchive = useFileStore(store => store.downloadArchive)

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
			newError('Failed to download archive.')
		}
	}
	return (
		<div className={classes.root}>
			<div className={classes.wrapper__content}>
				<Paragraph align="center">
					{t('to_download_the_archive_with_files')}
				</Paragraph>

				<Button onClick={clickHandler}>{t('download')}</Button>
			</div>
		</div>
	)
}
