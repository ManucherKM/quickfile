export function getFormData(fields: object) {
	const formData = new FormData()

	Object.entries(fields).forEach(([field, value]) => {
		formData.append(field, value)
	})

	return formData
}
