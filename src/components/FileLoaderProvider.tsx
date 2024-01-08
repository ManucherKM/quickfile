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
	const count = useArchiveLoaderStore(store => store.count)
	const time = useArchiveLoaderStore(store => store.time)
	const size = useArchiveLoaderStore(store => store.size)
	const percent = useArchiveLoaderStore(store => store.percent)

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
					time={time}
					count={count}
					size={size}
					percent={percent}
				/>
			)}
			{children}
		</>
	)
}
