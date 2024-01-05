const limit = 500 * 1000 * 1000 // 500 MB in byte

export function fileSizeValidator(files: FileList) {
	let totalSize = 0

	for (const file of files) {
		if (file.size + totalSize > limit) {
			return false
		}

		totalSize += file.size
	}

	return true
}
