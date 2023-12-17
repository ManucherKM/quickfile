'use client'

import { QRCode } from '@/components'
import { env } from '@/config/env'
import { useNotificationsStore } from '@/storage'
import { writeTextIntoClipboard } from '@/utils'
import { Button } from 'kuui-react'
import classes from './Share.module.scss'

export interface IShare {
	params: { id: string; locale: string }
}

const CLIENT_URL = env.get('CLIENT_URL').required().asString()

export default function Share({ params: { id, locale } }: IShare) {
	const newError = useNotificationsStore(store => store.newError)
	const newMessage = useNotificationsStore(store => store.newMessage)

	const url = `${CLIENT_URL}/${locale}/${id}`

	async function copyHandler() {
		try {
			await writeTextIntoClipboard(url)

			newMessage('Link copied to clipboard')
		} catch (e) {
			newError('Failed to copy text to clipboard.')
		}
	}

	return (
		<div className={classes.root}>
			<QRCode link={url} />
			<span>or</span>
			<Button onClick={copyHandler}>Copy link</Button>
		</div>
	)
}
