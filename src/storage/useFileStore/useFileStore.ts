import axios from '@/config/axios'
import { combineUploadProgress, downloadFileFromBuffer } from '@/utils'
import { create } from 'zustand'
import { useArchiveLoaderStore } from '..'
import type {
	IExistArchiveResponse,
	IFileData,
	IFileStore,
	ISendFilesRes,
} from './types'
import { EFileStoreApiRoutes } from './types'

/** With this hook you can access the file storage. */
export const useFileStore = create<IFileStore>(() => ({
	async sendFiles(selectedFiles, onUploadProgress, abortController) {
		try {
			const files = Array.from(selectedFiles)

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

			const combinedOnUploadProgress = combineUploadProgress(onUploadProgress)

			const promises = []

			for (let i = 0; i < files.length; i++) {
				const { url, fields } = urls[i]
				const file = files[i]

				const formData = new FormData()

				Object.entries(fields).forEach(([field, value]) => {
					formData.append(field, value)
				})

				formData.append('file', file)

				promises.push(
					axios.post<void>(url, formData, {
						onUploadProgress: onUploadProgress
							? event => combinedOnUploadProgress(event, i)
							: undefined,
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
		} finally {
			useArchiveLoaderStore.getState().reset()
		}
	},
	async downloadArchive(id, onDownloadProgress, abortController) {
		try {
			const url = EFileStoreApiRoutes.archiveManagement + '/' + id

			const { data } = await axios.get<Buffer>(url, {
				responseType: 'arraybuffer',
				onDownloadProgress,
				signal: abortController?.signal,
			})

			downloadFileFromBuffer(data)

			return true
		} catch (e) {
			console.log(e)

			return false
		} finally {
			useArchiveLoaderStore.getState().reset()
		}
	},
	async checkExistArchive(id) {
		try {
			const url = EFileStoreApiRoutes.checkExistArchive + '/' + id

			const { data } = await axios.get<IExistArchiveResponse>(url)

			return data
		} catch (e) {
			console.log(e)

			return {
				exist: false,
			}
		}
	},
}))
