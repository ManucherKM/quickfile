import { IProgressEvent } from '@/storage/useFileStore/types'
import {
	getFileListSize,
	getFormatedFileSize,
	getFormatedProgress,
	getFormatedTimer,
} from '@/utils'
import { useEffect, useState } from 'react'

export interface IUploadInfo {
	time?: string
	size?: string
	count?: number
	percent?: string
	onUploadProgress: (event: IProgressEvent) => void
}

export function useFileLoadInfo(files: FileList | null): IUploadInfo {
	const [percent, setProgress] = useState<number | null>(null)
	const [time, setTime] = useState<number | null>(null)
	const [size, setSize] = useState<number | null>(null)
	const [count, setCount] = useState<number | undefined>()

	let lastDate = Date.now()

	function onUploadProgress(event: IProgressEvent) {
		if (Date.now() - lastDate < 1000) return

		lastDate = Date.now()

		setProgress(event.progress)
		setTime(event.estimated)
	}

	useEffect(() => {
		if (!files) return

		setCount(files.length)

		const totalSize = getFileListSize(files)

		if (totalSize) {
			setSize(totalSize)
		}
	}, [files])

	// console.log(count, percent, size, time)

	return {
		count,
		percent: percent ? getFormatedProgress(percent) : undefined,
		size: size ? getFormatedFileSize(size) : undefined,
		time: time ? getFormatedTimer(time) : undefined,
		onUploadProgress,
	}
}
