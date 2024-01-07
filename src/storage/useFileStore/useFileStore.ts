import axios from '@/config/axios'
import { downloadFileFromBuffer } from '@/utils'
import { AxiosProgressEvent } from 'axios'
import { create } from 'zustand'
import type { IFileData, IFileStore, ISendFilesRes } from './types'
import { EFileStoreApiRoutes } from './types'

/** With this hook you can access the file storage. */
export const useFileStore = create<IFileStore>(() => ({
	async sendFiles(files, onUploadProgress, abortController) {
		try {
			const dataFiles: IFileData[] = []

			for (const file of files) {
				const data: IFileData = {
					originalName: file.name,
					mimetype: file.type,
					size: file.size,
				}

				dataFiles.push(data)
			}

			const resApi = await axios.post<ISendFilesRes>(
				EFileStoreApiRoutes.archiveManagement,
				{ files: dataFiles },
			)

			const { id, urls } = resApi.data

			const totalEstimate: number[] = []
			const totalProgress: number[] = []
			const totalSize: number[] = []

			function WrapperOnUploadProgress(
				event: AxiosProgressEvent,
				count: number,
			) {
				console.log(count)

				if (event.estimated) {
					totalEstimate[count] = event.estimated
				}

				if (event.progress) {
					totalProgress[count] = event.progress
				}

				if (event.total) {
					totalSize[count] = event.total
				}

				if (!onUploadProgress) return

				onUploadProgress({
					estimated: totalEstimate.reduce((acc, est) => acc + est, 0),
					progress: Math.max(...totalProgress),
					total: totalSize.reduce((acc, s) => acc + s, 0),
				})
			}

			const promises = []

			for (let i = 0; i < urls.length; i++) {
				const url = urls[i]

				promises.push(
					axios.put(url, files[i], {
						onUploadProgress: event => WrapperOnUploadProgress(event, i),
						signal: abortController?.signal,
					}),
				)
			}

			await Promise.all(promises)

			return id
		} catch (e) {
			// We display the error in the console.
			console.log(e)

			// Return false.
			return false
		}
	},
	async downloadArchive(id) {
		try {
			const url = EFileStoreApiRoutes.archiveManagement + '/' + id

			const { data } = await axios.get<Buffer>(url, {
				responseType: 'arraybuffer',
			})

			downloadFileFromBuffer(data)

			return true
		} catch (e) {
			console.log(e)

			return false
		}
	},
	async checkExistArchive(id) {
		try {
			const url = EFileStoreApiRoutes.checkExistArchive + '/' + id

			const { data } = await axios.get<{ exist: boolean }>(url)

			return data.exist
		} catch (e) {
			console.log(e)

			return false
		}
	},
}))
