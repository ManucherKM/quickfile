'use client'

import { useLoader } from '@/hooks'
import { useFileStore, useNotificationsStore } from '@/storage'
import { Button, Paragraph } from 'kuui-react'
import type { FC } from 'react'
import classes from './Download.module.scss'

export interface IDownload {
	params: { id: string }
}

const Download: FC<IDownload> = ({ params: { id } }) => {
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
					To download the archive with files, click on the button
				</Paragraph>

				<Button onClick={clickHandler}>Download</Button>
			</div>
		</div>
	)
}

export default Download
