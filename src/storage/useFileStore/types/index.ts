import { AxiosRequestConfig } from 'axios'

export interface ISendFilesRes {
	id: string
}

export interface IFileStore {
	sendFiles: (
		files: FileList,
		onUploadProgress?: AxiosRequestConfig<unknown>['onUploadProgress'],
		abortController?: AbortController,
	) => Promise<string | false>
	downloadArchive: (id: string) => Promise<boolean>
	checkExistArchive: (id: string) => Promise<boolean>
}

export enum EFileStoreApiRoutes {
	archiveManagement = '/api/archive',
	checkExistArchive = '/api/archive/exist',
}
