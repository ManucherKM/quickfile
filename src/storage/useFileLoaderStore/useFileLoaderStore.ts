import type { IFileLoaderStore } from './types'

import { create } from 'zustand'

const defaultStore = {
	isShowFileLoader: false,
} as IFileLoaderStore

export const useFileLoaderStore = create<IFileLoaderStore>(set => ({
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
	setIsShowFileLoader(target) {
		set(prev => ({ ...prev, isShowFileLoader: target }))
	},
}))
