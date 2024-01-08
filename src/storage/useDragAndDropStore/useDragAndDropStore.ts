import type { IDragAndDropStore } from './types'

import { create } from 'zustand'

export const useDragAndDropStore = create<IDragAndDropStore>(set => ({
	setChangeFilesHandler(func) {
		set({ changeFilesHandler: func })
	},
}))
