import axios from '@/config/axios'
import {
	TWrapperOnUploadProgress,
	downloadFileFromBuffer,
	formatFilesForSend,
	getFormData,
} from '@/utils'
import { AxiosProgressEvent, AxiosRequestConfig } from 'axios'
import { create } from 'zustand'
import type {
	ICreateFileUploadUrlRes,
	IExistArchiveResponse,
	IFileData,
	IFileStore,
} from './types'
import { EFileStoreApiRoutes } from './types'

/** With this hook you can access the file storage. */
export const useFileStore = create<IFileStore>(() => ({
	async createFileUploadUrl(files) {
		try {
			const formatedFiles: IFileData[] = formatFilesForSend(files)

			const { data } = await axios.post<ICreateFileUploadUrlRes>(
				EFileStoreApiRoutes.archiveManagement,
				{ files: formatedFiles },
			)

			return data
		} catch (e) {
			console.error(e)
		}
	},
	async sendFiles(files, uploadInfo, config) {
		try {
			const uploadPromises = []

			for (let i = 0; i < files.length; i++) {
				const { url, fields } = uploadInfo[i]
				const file = files[i]

				const formData = getFormData(fields)

				formData.append('file', file)

				if (config && config.onUploadProgress) {
					const { onUploadProgress } = config

					const uploadProgressHandler: TWrapperOnUploadProgress =
						onUploadProgress

					config.onUploadProgress = function (event: AxiosProgressEvent) {
						uploadProgressHandler(event, i)
					}
				}

				const uploadPromise = axios.post<never>(
					url,
					formData,
					config as AxiosRequestConfig,
				)

				uploadPromises.push(uploadPromise)
			}

			await Promise.all(uploadPromises)
		} catch (e) {
			// We display the error in the console.
			console.error(e)
		}
	},
	async downloadArchive(id, config) {
		try {
			const url = EFileStoreApiRoutes.archiveManagement + '/' + id

			const { data } = await axios.get<Buffer>(url, {
				responseType: 'arraybuffer',
				...config,
			})

			downloadFileFromBuffer(data)
		} catch (e) {
			console.error(e)
		}
	},
	async checkExistArchive(id) {
		try {
			const url = EFileStoreApiRoutes.checkExistArchive + '/' + id

			const { data } = await axios.get<IExistArchiveResponse>(url)

			return data
		} catch (e) {
			console.error(e)
		}
	},
}))
