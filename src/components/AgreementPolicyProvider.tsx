import { useAgreementPolicyStore } from '@/storage'
import { FC, ReactNode } from 'react'
import { AgreementPolicy } from './AgreementPolicy/AgreementPolicy'

export interface IAgreementPolicyProvider {
	children: ReactNode
	locale: string
}

export const AgreementPolicyProvider: FC<IAgreementPolicyProvider> = ({
	locale,
	children,
}) => {
	const isShow = useAgreementPolicyStore(store => store.isShow)

	return (
		<>
			{isShow && <AgreementPolicy locale={locale} />}
			{children}
		</>
	)
}
