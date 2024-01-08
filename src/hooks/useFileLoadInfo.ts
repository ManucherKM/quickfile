import { IProgressEvent } from '@/storage/useFileStore/types'
import {
	getFormatedFileSize,
	getFormatedProgress,
	getFormatedTimer,
} from '@/utils'
import { useState } from 'react'

export interface IInfo {
	time?: string
	size?: string
	count?: number
	percent?: string
	onUploadProgress: (event: IProgressEvent) => void
}

export function useFileLoadInfo(files: FileList | null): IInfo {
	const [percent, setProgress] = useState<number | null>(null)
	const [time, setTime] = useState<number | null>(null)
	const [size, setSize] = useState<number | null>(null)

	function onUploadProgress(event: IProgressEvent) {
		setSize(event.total)
		setProgress(event.progress)
		setTime(event.estimated)
	}

	return {
		count: files?.length,
		percent: percent ? getFormatedProgress(percent) : undefined,
		size: size ? getFormatedFileSize(size) : undefined,
		time: time ? getFormatedTimer(time) : undefined,
		onUploadProgress,
	}
}
