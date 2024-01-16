import {
	useAgreementPolicyStore,
	useArchiveLoaderStore,
	useFileStore,
	useNotificationsStore,
} from '@/storage'
import { IProgressEvent } from '@/storage/useFileStore/types'
import {
	combineUploadProgress,
	fileSizeValidator,
	formatFileListToArray,
} from '@/utils'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAbort } from './useAbort'
import { useArchiveLoader } from './useArchiveLoader'
import { useLoader } from './useLoader'

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
	const createFileUploadUrl = useFileStore(store => store.createFileUploadUrl)
	const setOnCancel = useArchiveLoaderStore(store => store.setOnCancel)
	const [isAbort, abortController, resetAbort] = useAbort()
	const isAgreedPolicy = useAgreementPolicyStore(store => store.isAgreed)
	const setShowAgreement = useAgreementPolicyStore(store => store.setShow)

	const archiveLoader = useArchiveLoader()
	const loader = useLoader()

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
		if (!isAgreedPolicy) {
			setShowAgreement(true)
			return
		}

		try {
			if (!selectFiles) return

			if (!fileSizeValidator(selectFiles)) {
				newError(t('the_maximum_file_size_is_500_mb'))
				return
			}

			const files = formatFileListToArray(selectFiles)

			const archiveData = await loader(createFileUploadUrl, files)

			if (!archiveData) {
				newError(t('failed_to_save_file(s)'))
				return
			}

			const { id: archiveId, urls: uploadInfo } = archiveData

			let uploadProgressHandler

			if (onUploadProgress) {
				uploadProgressHandler = combineUploadProgress(onUploadProgress)
			}

			await archiveLoader(sendFiles, files, uploadInfo, {
				onUploadProgress: uploadProgressHandler,
				signal: abortController.current.signal,
			})

			if (isAbort.current) return

			newMessage(t('the_files_have_been_saved'))

			router.push(`/${locale}/share/${archiveId}`)
		} catch (e) {
			console.log(e)

			if (!isAbort.current) return
			newError(t('failed_to_save_file(s)'))
		} finally {
			resetAbort()
		}
	}
}
