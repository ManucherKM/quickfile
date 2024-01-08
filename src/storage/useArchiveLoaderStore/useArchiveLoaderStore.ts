import type { IArchiveLoaderStore } from './types'

import { create } from 'zustand'

const defaultStore = {
	isShowArchiveLoader: false,
} as IArchiveLoaderStore

export const useArchiveLoaderStore = create<IArchiveLoaderStore>(set => ({
	...defaultStore,
	setInfo(info) {
		let key: keyof typeof info

		for (key in info) {
			if (Object.prototype.hasOwnProperty.call(info, key)) {
				const val = info[key]

				if (val === undefined) return

				set(prev => ({ ...prev, [key]: val }))
			}
		}
	},
	setOnCancel(func) {
		set(prev => ({ ...prev, onCancel: func }))
	},
	setIsShowArchiveLoader(target) {
		set(prev => ({ ...prev, isShowArchiveLoader: target }))
	},
	reset() {
		set(defaultStore)
	},
}))
