'use client'

import { useAgreementPolicyStore, useNotificationsStore } from '@/storage'
import { Button, CheckBox, Paragraph, Popup, Title } from 'kuui-react'
import { useTranslations } from 'next-intl'
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
	const t = useTranslations()

	function checkboxHandler(e: ChangeEvent<HTMLInputElement>) {
		setIsLocalAgreed(e.target.checked)
	}

	function agreedHandler() {
		if (isLoacalAgreed) {
			setAgreed(true)
			setShow(false)
			newMessage(t('functionality_unlocked'))
		} else {
			newError(t('without_an_agreement_you_cannot_use_our_service'))
		}
	}

	function closeHandler() {
		setShow(false)
		newError(t('without_an_agreement_you_cannot_use_our_service'))
	}

	return (
		<Browser>
			<Popup
				className={classes.root}
				onClose={closeHandler}
				onClick={e => e.stopPropagation()}
			>
				<Title align="center">{t('important')}</Title>
				<Paragraph align="justify">
					{t('by_using_our_service_you_agree_with')}{' '}
					<Link
						target="_blank"
						className={classes.link}
						href={`${locale}/policy`}
					>
						{t('conditions_of_use')}
					</Link>
				</Paragraph>
				<label className={classes.wrapperAgreement}>
					<div>
						<CheckBox
							variant="box"
							checked={isLoacalAgreed}
							onChange={checkboxHandler}
							className={classes.checkbox}
						/>
					</div>
					<Paragraph className={classes.agreementText} align="justify">
						{t('i_agree_to_the_terms_of_use')}
					</Paragraph>
				</label>
				<Button variant="active" onClick={agreedHandler}>
					{t('confirm')}
				</Button>
			</Popup>
		</Browser>
	)
}
