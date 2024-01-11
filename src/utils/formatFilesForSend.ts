import { IFileData } from '@/storage/useFileStore/types'

export function formatFilesForSend(fileList: FileList) {
	const data: IFileData[] = []

	for (const file of fileList) {
		data[data.length] = {
			originalName: file.name,
			mimetype: file.type,
			size: file.size,
		}
	}

	return data
}
