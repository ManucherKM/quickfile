'use client'

import { useFileLoaderStore } from '@/storage'
import { FC, ReactNode } from 'react'
import { FileLoader } from './FileLoader/FileLoader'

export interface IFileLoaderProvider {
	children: ReactNode
}

export const FileLoaderProvider: FC<IFileLoaderProvider> = ({ children }) => {
	const isShowFileLoader = useFileLoaderStore(store => store.isShowFileLoader)
	const cancelHandler = useFileLoaderStore(store => store.onCancel)
	const count = useFileLoaderStore(store => store.count)
	const time = useFileLoaderStore(store => store.time)
	const size = useFileLoaderStore(store => store.size)
	const percent = useFileLoaderStore(store => store.percent)

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
