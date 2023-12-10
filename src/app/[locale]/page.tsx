'use client'

import { env } from '@/config/env'
import { useLoader, useWindowFilesTransfer } from '@/hooks'
import { useFileStore, useNotificationsStore } from '@/storage'
import { writeTextIntoClipboard } from '@/utils'
import { FileAdd, Title } from 'kuui-react'
import { useTranslations } from 'next-intl'
import type { FC } from 'react'
import { useEffect, useState } from 'react'
import classes from './Home.module.scss'

const CLIENT_URL = env.get('CLIENT_URL').required().asString()

const Home: FC = () => {
	const [isDrag, setIsDrag] = useWindowFilesTransfer(false)
	const [selectFiles, setSelectFiles] = useState<FileList | null>(null)
	const sendFiles = useFileStore(store => store.sendFiles)
	const newError = useNotificationsStore(store => store.newError)
	const newMessage = useNotificationsStore(store => store.newMessage)
	const loader = useLoader()
	const t = useTranslations()

	async function sendHandler() {
		try {
			if (!selectFiles) {
				return
			}

			const id = await loader(sendFiles, selectFiles)

			setSelectFiles(null)

			if (!id) {
				newError(t('failed_to_save_file(s)'))
				return
			}

			const link = CLIENT_URL + '/' + id

			await writeTextIntoClipboard(link)

			newMessage(t('link_copied_to_clipboard'))
		} catch (e) {
			console.log(e)
		}
	}

	useEffect(() => {
		if (!selectFiles) return

		sendHandler()

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectFiles])
	return (
		<div className={classes.root}>
			{isDrag && (
				<FileAdd
					variant="dragAndDrop"
					onClose={() => setIsDrag(false)}
					onChangeFiles={setSelectFiles}
				/>
			)}
			<div className={classes.wrapper__content}>
				<Title>{t('select_files')}</Title>
				<FileAdd
					className={classes.fileAdd}
					variant="area"
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
	)
}

export default Home
