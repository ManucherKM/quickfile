import { persist } from 'zustand/middleware'
import type { IAgreementPolicyStore } from './types'

import { create } from 'zustand'

const defaultStore = {
	isAgreed: false,
	isShow: true,
} as IAgreementPolicyStore

export const useAgreementPolicyStore = create(
	persist<IAgreementPolicyStore>(
		set => ({
			...defaultStore,
			setAgreed(target) {
				set({ isAgreed: target })
			},
			setShow(target) {
				set({ isShow: target })
			},
		}),
		{
			name: 'agreement-policy-store',
		},
	),
)
