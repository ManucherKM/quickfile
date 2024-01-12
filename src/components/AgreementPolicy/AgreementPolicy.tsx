'use client'

import { useAgreementPolicyStore, useNotificationsStore } from '@/storage'
import { Button, CheckBox, Paragraph, Popup, Title } from 'kuui-react'
import Link from 'next/link'
import { ChangeEvent, FC, useState } from 'react'
import { Browser } from '../Browser'
import classes from './AgreementPolicy.module.scss'

export interface IAgreementPolicy {
	locale: string
}

export const AgreementPolicy: FC<IAgreementPolicy> = ({ locale }) => {
	const [isLoacalAgreed, setIsLocalAgreed] = useState(true)
	const setAgreed = useAgreementPolicyStore(store => store.setAgreed)
	const setShow = useAgreementPolicyStore(store => store.setShow)
	const newMessage = useNotificationsStore(store => store.newMessage)
	const newError = useNotificationsStore(store => store.newError)

	function checkboxHandler(e: ChangeEvent<HTMLInputElement>) {
		setIsLocalAgreed(e.target.checked)
	}

	function agreedHandler() {
		if (isLoacalAgreed) {
			setAgreed(true)
			setShow(false)
			newMessage('Функционал разблокирован')
		} else {
			newError('Без соглашения вы не можете пользоваться нашим сервисом')
		}
	}

	function closeHandler() {
		setShow(false)
		newError('Без соглашения вы не можете пользоваться нашим сервисом')
	}

	return (
		<Browser>
			AgreementPolicy
			<Popup
				className={classes.root}
				onClose={closeHandler}
				onClick={e => e.stopPropagation()}
			>
				<Title align="center">Важно!</Title>
				<Paragraph align="justify">
					Пользуясь нашим сервисом вы соглашаетесь с{' '}
					<Link
						target="_blank"
						className={classes.link}
						href={`${locale}/policy`}
					>
						условиями использования
					</Link>
				</Paragraph>
				<label className={classes.wrapperAgreement}>
					<div>
						<CheckBox
							variant="box"
							checked={isLoacalAgreed}
							onChange={checkboxHandler}
						/>
					</div>
					<Paragraph className={classes.agreementText} align="justify">
						Я согласен с условиями использования
					</Paragraph>
				</label>
				<Button variant="active" onClick={agreedHandler}>
					Подтвердить
				</Button>
			</Popup>
		</Browser>
	)
}
