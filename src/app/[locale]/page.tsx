'use client'

import { env } from '@/config/env'
import { useLoader, useWindowFilesTransfer } from '@/hooks'
import { useFileStore, useNotificationsStore } from '@/storage'
import { FileAdd, Title } from 'kuui-react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import classes from './Home.module.scss'

const CLIENT_URL = env.get('CLIENT_URL').required().asString()

export interface IHome {
	params: { locale: string }
}

function Home({ params: { locale } }: IHome) {
	const [isDrag, setIsDrag] = useWindowFilesTransfer(false)
	const [selectFiles, setSelectFiles] = useState<FileList | null>(null)
	const sendFiles = useFileStore(store => store.sendFiles)
	const newError = useNotificationsStore(store => store.newError)
	const newMessage = useNotificationsStore(store => store.newMessage)
	const loader = useLoader()
	const router = useRouter()
	const t = useTranslations()

	async function sendHandler() {
		try {
			if (!selectFiles) return

			const id = await loader(sendFiles, selectFiles)

			setSelectFiles(null)

			if (!id) {
				newError(t('failed_to_save_file(s)'))
				return
			}

			newMessage('The files have been saved.')

			router.push(`/${locale}/share/${id}`)
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
		<>
			<main className={classes.root}>
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
			</main>
		</>
	)
}

export default Home
