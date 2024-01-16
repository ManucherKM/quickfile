import { TWrapperOnUploadProgress } from '@/utils'
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

export interface IUploadInfo {
	url: string
	fields: IUploadUrlFileds
}

export interface ICreateFileUploadUrlRes {
	id: string
	urls: IUploadInfo[]
}

export interface ISendFilesRes {
	id: string
	urls: IUploadInfo[]
}

export interface IProgressEvent {
	estimated: number
	progress: number
	total: number
}

export interface IExistArchiveResponse {
	exist: boolean
	length?: string
}

export type SendFileAxiosRequestConfig = {
	onUploadProgress?: TWrapperOnUploadProgress
} & Omit<AxiosRequestConfig, 'onUploadProgress'>

export interface IFileStore {
	createFileUploadUrl: (
		files: File[],
	) => Promise<ICreateFileUploadUrlRes | undefined>
	sendFiles: (
		files: File[],
		uploadInfo: IUploadInfo[],
		config?: SendFileAxiosRequestConfig,
	) => Promise<void>
	downloadArchive: (
		id: string,
		config?: Omit<AxiosRequestConfig, 'responseType'>,
	) => Promise<void>
	checkExistArchive: (id: string) => Promise<IExistArchiveResponse | undefined>
}

export enum EFileStoreApiRoutes {
	archiveManagement = '/api/archive',
	checkExistArchive = '/api/archive/exist',
}
