'use client'

import { QRCode } from '@/components'
import { env } from '@/config/env'
import { useNotificationsStore } from '@/storage'
import { writeTextIntoClipboard } from '@/utils'
import { Button } from 'kuui-react'
import { useTranslations } from 'next-intl'
import classes from './Share.module.scss'

export interface IShare {
	params: { id: string; locale: string }
}

const CLIENT_URL = env.get('CLIENT_URL').required().asString()

export default function Share({ params: { id, locale } }: IShare) {
	const newError = useNotificationsStore(store => store.newError)
	const newMessage = useNotificationsStore(store => store.newMessage)
	const t = useTranslations()

	const url = `${CLIENT_URL}/${locale}/${id}`

	async function copyHandler() {
		try {
			await writeTextIntoClipboard(url)

			newMessage(t('link_copied_to_clipboard'))
		} catch (e) {
			newError(t('failed_to_copy_text_to_clipboard'))
		}
	}

	return (
		<div className={classes.root}>
			<QRCode link={url} />
			<span>{t('or')}</span>
			<Button onClick={copyHandler}>{t('copy_link')}</Button>
		</div>
	)
}
