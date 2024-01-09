'use client'

import { useArchiveLoaderStore } from '@/storage'
import { FC, ReactNode } from 'react'
import { FileLoader } from './FileLoader/FileLoader'

export interface IFileLoaderProvider {
	children: ReactNode
}

export const FileLoaderProvider: FC<IFileLoaderProvider> = ({ children }) => {
	const isShowFileLoader = useArchiveLoaderStore(
		store => store.isShowArchiveLoader,
	)
	const onCancel = useArchiveLoaderStore(store => store.onCancel)
	const resetArchiveLoaderStore = useArchiveLoaderStore(store => store.reset)
	const countStore = useArchiveLoaderStore(store => store.count)
	const timeStore = useArchiveLoaderStore(store => store.time)
	const sizeStore = useArchiveLoaderStore(store => store.size)
	const percentStore = useArchiveLoaderStore(store => store.percent)

	function cancelHandler() {
		if (onCancel) {
			onCancel()
			resetArchiveLoaderStore()
		}
	}

	return (
		<>
			{isShowFileLoader && (
				<FileLoader
					onCancel={cancelHandler}
					time={timeStore}
					count={countStore}
					size={sizeStore}
					percent={percentStore}
				/>
			)}
			{children}
		</>
	)
}
