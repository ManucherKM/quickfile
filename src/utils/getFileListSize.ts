export function getFileListSize(fileList: FileList | null) {
	if (!fileList) return

	let size: undefined | number

	for (const file of fileList) {
		size = (size || 0) + file.size
	}

	return size
}
