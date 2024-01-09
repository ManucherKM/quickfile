import { onUploadProgress } from '@/storage/useFileStore/types'
import { AxiosProgressEvent } from 'axios'

export function combineUploadProgress(onUploadProgress?: onUploadProgress) {
	const estimate: number[] = []
	const progress: number[] = []
	const size: number[] = []

	return function WrapperOnUploadProgress(
		event: AxiosProgressEvent,
		num: number,
	) {
		if (event.estimated) estimate[num] = event.estimated
		if (event.progress) progress[num] = event.loaded
		if (event.total) size[num] = event.total

		if (!onUploadProgress) return

		const totalSize = size.reduce((acc, s) => acc + s, 0)

		const totalEstimated = estimate.reduce((acc, est) => acc + est, 0)

		const countedProgress = progress.reduce((acc, pr) => acc + pr, 0)

		const totalProgress = countedProgress / totalSize

		onUploadProgress({
			estimated: totalEstimated,
			progress: totalProgress,
			total: totalSize,
		})
	}
}
