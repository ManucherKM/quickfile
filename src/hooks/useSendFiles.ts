import {
	useArchiveLoaderStore,
	useFileStore,
	useNotificationsStore,
} from '@/storage'
import { IProgressEvent } from '@/storage/useFileStore/types'
import { fileSizeValidator } from '@/utils'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAbort, useArchiveLoader } from '.'

export function useSendFiles(
	selectFiles: FileList | null,
	locale: string,
	onUploadProgress?: (event: IProgressEvent) => void,
) {
	const router = useRouter()
	const t = useTranslations()
	const newError = useNotificationsStore(store => store.newError)
	const newMessage = useNotificationsStore(store => store.newMessage)
	const sendFiles = useFileStore(store => store.sendFiles)
	const setOnCancel = useArchiveLoaderStore(store => store.setOnCancel)
	const [isAbort, abortController] = useAbort()

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
		if (!selectFiles) return

		if (!fileSizeValidator(selectFiles)) {
			newError('Максимальный размер файлов - 500 МБ')
			return
		}

		const id = await loader(
			sendFiles,
			selectFiles,
			onUploadProgress,
			abortController.current,
		)

		if (!id) {
			if (isAbort.current) return

			newError(t('failed_to_save_file(s)'))
			return
		}

		newMessage(t('the_files_have_been_saved'))

		router.push(`/${locale}/share/${id}`)
	}
}
