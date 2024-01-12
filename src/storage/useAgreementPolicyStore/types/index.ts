export interface IAgreementPolicyStore {
	isAgreed: boolean

	isShow: boolean

	setAgreed: (target: boolean) => void

	setShow: (target: boolean) => void
}
