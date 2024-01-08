import {
	getFormatedFileSize,
	getFormatedProgress,
	getFormatedTimer,
} from '@/utils'
import { AxiosProgressEvent } from 'axios'
import { useState } from 'react'

export interface IDownloadInfo {
	time?: string
	size?: string
	percent?: string
	onDownloadProgress: (event: AxiosProgressEvent) => void
}

export function useArchiveDownloadInfo(): IDownloadInfo {
	const [percent, setProgress] = useState<number | undefined>()
	const [time, setTime] = useState<number | undefined>()
	const [size, setSize] = useState<number | undefined>()

	function onDownloadProgress(event: AxiosProgressEvent) {
		setSize(event.total)
		setProgress(event.progress)
		setTime(event.estimated)
	}

	return {
		percent: percent ? getFormatedProgress(percent) : undefined,
		size: size ? getFormatedFileSize(size) : undefined,
		time: time ? getFormatedTimer(time) : undefined,
		onDownloadProgress,
	}
}
