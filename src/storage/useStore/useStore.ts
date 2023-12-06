import type { IStore } from './types'

import { create } from 'zustand'

const defaultStore = {
	isLoading: false,
} as IStore

export const useStore = create<IStore>(set => ({
	...defaultStore,
	setLoading(target) {
		set({ isLoading: target })
	},
	reset() {
		set(defaultStore)
	},
}))
