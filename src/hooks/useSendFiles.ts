import {
	useFileLoaderStore,
	useFileStore,
	useNotificationsStore,
} from '@/storage'
import { IProgressEvent } from '@/storage/useFileStore/types'
import { fileSizeValidator } from '@/utils'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction, useEffect, useRef } from 'react'

export function useSendFiles(
	selectFiles: FileList | null,
	setSelectFiles: Dispatch<SetStateAction<FileList | null>>,
	onUploadProgress: (event: IProgressEvent) => void,
	locale: string,
) {
	const router = useRouter()
	const t = useTranslations()
	const newError = useNotificationsStore(store => store.newError)
	const newMessage = useNotificationsStore(store => store.newMessage)
	const setFileLoader = useFileLoaderStore(store => store.setIsShowFileLoader)
	const sendFiles = useFileStore(store => store.sendFiles)
	const setOnCancel = useFileLoaderStore(store => store.setOnCancel)
	const controller = useRef<AbortController>(new AbortController())
	const isAbort = useRef<boolean>(false)

	useEffect(() => {
		setOnCancel(() => {
			isAbort.current = true
		})

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		if (!isAbort.current) return

		controller.current.abort()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAbort.current])

	return async function sendHandler() {
		try {
			if (!selectFiles) return

			if (!fileSizeValidator(selectFiles)) {
				newError('Максимальный размер файлов - 500 МБ')
				return
			}

			setFileLoader(true)

			const id = await sendFiles(
				selectFiles,
				onUploadProgress,
				controller.current,
			)

			setSelectFiles(null)

			if (!id) {
				if (isAbort.current) return

				newError(t('failed_to_save_file(s)'))
				return
			}

			newMessage(t('the_files_have_been_saved'))

			router.push(`/${locale}/share/${id}`)
		} catch (e) {
			console.log(e)
		} finally {
			setFileLoader(false)
			isAbort.current = false
			controller.current = new AbortController()
		}
	}
}
