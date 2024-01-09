import { AxiosRequestConfig } from 'axios'

export interface IFileData {
	originalName: string
	mimetype: string
	size: number
}

export interface IUploadUrlFileds {
	bucket: string
	'X-Amz-Algorithm': string
	'X-Amz-Credential': string
	'X-Amz-Date': string
	key: string
	Policy: string
	'X-Amz-Signature': string
}

export interface IUploadUrl {
	url: string
	fields: IUploadUrlFileds
}

export interface ISendFilesRes {
	id: string
	urls: IUploadUrl[]
}

export interface IProgressEvent {
	estimated: number
	progress: number
	total: number
}

export type onUploadProgress = (event: IProgressEvent) => void

export interface IExistArchiveResponse {
	exist: boolean
	length?: string
}

export interface IFileStore {
	sendFiles: (
		files: FileList,
		onUploadProgress?: onUploadProgress,
		abortController?: AbortController,
	) => Promise<string | false>
	downloadArchive: (
		id: string,
		onDownloadProgress?: AxiosRequestConfig<any>['onDownloadProgress'],
		abortController?: AbortController,
	) => Promise<boolean>
	checkExistArchive: (id: string) => Promise<IExistArchiveResponse>
}

export enum EFileStoreApiRoutes {
	archiveManagement = '/api/archive',
	checkExistArchive = '/api/archive/exist',
}
