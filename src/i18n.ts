import { getRequestConfig } from 'next-intl/server'
import { availableLocales } from './locale'
import { defaultLocale } from './middleware'

export default getRequestConfig(async ({ locale }) => {
	if (availableLocales.includes(locale)) {
		return {
			messages: (await import(`./locale/${locale}/global.json`)).default,
		}
	}

	return {
		messages: (await import(`./locale/${defaultLocale}/global.json`)).default,
	}
})
