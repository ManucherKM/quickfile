import { IFileData } from '@/storage/useFileStore/types'

export function formatFilesForSend(files: File[]) {
	const data: IFileData[] = []

	for (const file of files) {
		data[data.length] = {
			originalName: file.name,
			mimetype: file.type,
			size: file.size,
		}
	}

	return data
}
