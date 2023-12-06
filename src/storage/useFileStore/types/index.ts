export interface ISendFilesRes {
	id: string
}

export interface IFileStore {
	sendFiles: (files: FileList) => Promise<string | false>
	downloadArchive: (id: string) => Promise<boolean>
}

export enum EFileStoreApiRoutes {
	sendFiles = '/api/file/userId',
	downloadArchive = '/api/file/userId',
}
