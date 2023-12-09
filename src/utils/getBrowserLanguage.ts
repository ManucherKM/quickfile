'use client'

export function getBrowserLanguage() {
	const foundLang = navigator.language
	return foundLang.split('-')[0]
}
