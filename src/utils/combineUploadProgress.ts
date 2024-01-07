import { onUploadProgress } from '@/storage/useFileStore/types'
import { AxiosProgressEvent } from 'axios'

export function combineUploadProgress(onUploadProgress?: onUploadProgress) {
	const estimate: number[] = []
	const progress: number[] = []
	const size: number[] = []
	let dateLastUpdate = Date.now()

	return function WrapperOnUploadProgress(
		event: AxiosProgressEvent,
		num: number,
	) {
		if (event.estimated) estimate[num] = event.estimated
		if (event.progress) progress[num] = event.progress
		if (event.total) size[num] = event.total

		if (!onUploadProgress) return

		const currDate = Date.now()

		if (currDate - dateLastUpdate < 1000) return

		onUploadProgress({
			estimated: estimate.reduce((acc, est) => acc + est, 0),
			progress: Math.max(...progress) || 0,
			total: size.reduce((acc, s) => acc + s, 0),
		})
	}
}
