'use client'

import { BasicInfo, FAQ } from '@/components'
import { useFileLoadInfo } from '@/hooks'
import {
	useDragAndDropStore,
	useFileLoaderStore,
	useFileStore,
	useNotificationsStore,
} from '@/storage'
import clsx from 'clsx'
import { FileAdd, Title, Tooltip } from 'kuui-react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import classes from './Home.module.scss'

export interface IHome {
	params: { locale: string }
}

function Home({ params: { locale } }: IHome) {
	const router = useRouter()
	const t = useTranslations()

	const isAbort = useRef<boolean>(false)
	const controller = useRef<AbortController>(new AbortController())
	const [selectFiles, setSelectFiles] = useState<FileList | null>(null)

	const changeFiles = useDragAndDropStore(store => store.setChangeFilesHandler)
	const sendFiles = useFileStore(store => store.sendFiles)
	const newError = useNotificationsStore(store => store.newError)
	const newMessage = useNotificationsStore(store => store.newMessage)
	const setFileLoader = useFileLoaderStore(store => store.setIsShowFileLoader)
	const setOnCancel = useFileLoaderStore(store => store.setOnCancel)
	const setInfo = useFileLoaderStore(store => store.setInfo)

	const { time, count, size, percent, onUploadProgress } =
		useFileLoadInfo(selectFiles)

	async function sendHandler() {
		try {
			if (!selectFiles) return

			// if (!fileSizeValidator(selectFiles)) {
			// 	newError('Максимальный размер файлов - 500 МБ')
			// 	return
			// }

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

	useEffect(() => {
		if (!selectFiles) return

		sendHandler()

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectFiles])

	useEffect(() => {
		if (!isAbort.current) return

		controller.current.abort()
	}, [isAbort.current])

	useEffect(() => {
		setOnCancel(() => {
			isAbort.current = true
		})
		changeFiles(setSelectFiles)
	}, [])

	useEffect(() => {
		setInfo({
			count: count?.toString(),
			percent,
			size,
			time,
		})
	}, [time, count, size, percent])

	const styles = clsx(['container', classes.root])
	return (
		<main className={styles}>
			<div className={classes.app}>
				<div className={classes.wrapper__content}>
					<div className={classes.info}>
						<Title className={classes.title}>{t('select_files')}</Title>
						<Tooltip
							position="left"
							text={t(
								'files_are_stored_on_the_server_for_one_week_after_which_they_are_permanently_deleted',
							)}
							align="justify"
						>
							<svg
								width="25px"
								height="25px"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M9 10C9 9.40666 9.17595 8.82664 9.50559 8.33329C9.83524 7.83994 10.3038 7.45543 10.852 7.22836C11.4001 7.0013 12.0033 6.94189 12.5853 7.05765C13.1672 7.1734 13.7018 7.45912 14.1213 7.87868C14.5409 8.29824 14.8266 8.83279 14.9424 9.41473C15.0581 9.99667 14.9987 10.5999 14.7716 11.1481C14.5446 11.6962 14.1601 12.1648 13.6667 12.4944C13.1734 12.8241 12.5933 13 12 13V14M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<circle cx="12" cy="17" r="1" />
							</svg>
						</Tooltip>
					</div>
					<FileAdd
						className={classes.fileAdd}
						variant="area"
						// Fix it
						wrapperAreaLabel="asd"
						onChange={e => {
							setSelectFiles(e.target.files)

							setTimeout(() => {
								e.target.value = ''
							}, 100)
						}}
						multiple
					/>
				</div>
			</div>
			<div className={classes.other}>
				<BasicInfo />
				<FAQ />
			</div>
		</main>
	)
}

export default Home
