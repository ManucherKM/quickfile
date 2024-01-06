export function getFormatedFileSize(size: number) {
	const kb = size / 1000
	const mb = kb / 1000

	if (mb < 100) {
		return mb.toFixed(2)
	}

	return Math.round(mb).toString()
}
