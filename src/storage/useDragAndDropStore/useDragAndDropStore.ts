import type { IDragAndDropStore } from './types'

import { create } from 'zustand'

const defautStore = {} as IDragAndDropStore

export const useDragAndDropStore = create<IDragAndDropStore>(set => ({
	setChangeFilesHandler(func) {
		set({ changeFilesHandler: func })
	},
	reset() {
		set(defautStore)
	},
}))
