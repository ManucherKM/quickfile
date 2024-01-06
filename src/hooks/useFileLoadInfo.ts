import {
	getFormatedFileSize,
	getFormatedProgress,
	getFormatedTimer,
} from '@/utils'
import { useEffect, useState } from 'react'

export interface IInfo {
	time?: string
	size?: string
	count?: number
	percent?: string
}

export function useFileLoadInfo(
	files: FileList | null,
	progress: number | null,
	size: number | null,
	time: number | null,
): IInfo {
	const [info, setInfo] = useState<IInfo>({})

	useEffect(() => {
		if (!files) return

		setInfo(prev => ({ ...prev, count: files.length }))
	}, [files])

	useEffect(() => {
		if (!progress) return

		setInfo(prev => ({ ...prev, percent: getFormatedProgress(progress) }))
	}, [progress])

	useEffect(() => {
		if (!size) return

		setInfo(prev => ({ ...prev, size: getFormatedFileSize(size) }))
	}, [size])

	useEffect(() => {
		if (!time) return

		setInfo(prev => ({ ...prev, time: getFormatedTimer(time) }))
	}, [time])

	return info
}
