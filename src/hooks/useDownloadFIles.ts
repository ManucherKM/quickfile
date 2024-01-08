import {
	useArchiveLoaderStore,
	useFileStore,
	useNotificationsStore,
} from '@/storage'
import { AxiosProgressEvent } from 'axios'
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'
import { useAbort, useArchiveLoader } from '.'

export function useDownloadFiles(
	id: string,
	onDownloadProgress?: (event: AxiosProgressEvent) => void,
) {
	const setOnCancel = useArchiveLoaderStore(store => store.setOnCancel)
	const newError = useNotificationsStore(store => store.newError)
	const downloadArchive = useFileStore(store => store.downloadArchive)
	const [isAbort, abortController] = useAbort()
	const t = useTranslations()
	const loader = useArchiveLoader(isAbort, abortController)

	useEffect(() => {
		setOnCancel(() => {
			isAbort.current = true
		})

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		if (!isAbort.current) return

		abortController.current.abort()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAbort.current])

	return async function () {
		// If the identifier is not found, stop executing the function.
		if (!id) return false

		// We get the result of the request.
		const isSuccess = await loader(
			downloadArchive,
			id,
			onDownloadProgress,
			abortController.current,
		)

		if (!isSuccess && !isAbort.current) {
			// Show the user an error message.
			newError(t('failed_to_download_archive'))
		}
	}
}
