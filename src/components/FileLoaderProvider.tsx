'use client'

import { useArchiveLoaderStore } from '@/storage'
import { FC, ReactNode, useEffect, useState } from 'react'
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

	const [dateLastUpdate, setDateLastUpdate] = useState<number>(Date.now())
	const [count, setCount] = useState<string | undefined>(countStore)
	const [time, setTime] = useState<string | undefined>(timeStore)
	const [size, setSize] = useState<string | undefined>(sizeStore)
	const [percent, setPercent] = useState<string | undefined>(percentStore)

	function cancelHandler() {
		if (onCancel) {
			onCancel()
			resetArchiveLoaderStore()
		}
	}

	useEffect(() => {
		const currDate = Date.now()

		if (currDate - dateLastUpdate < 1000) return

		setDateLastUpdate(Date.now())
		setCount(count)
		setTime(time)
		setSize(size)
		setPercent(percent)
	}, [countStore, timeStore, sizeStore, percentStore])

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
