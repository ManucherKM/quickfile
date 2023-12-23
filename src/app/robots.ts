import { env } from '@/config/env'
import { availableLocales } from '@/locale'
import { MetadataRoute } from 'next'

const CLIENT_URL = env.get('CLIENT_URL').required().asString()

export default function robots(): MetadataRoute.Robots {
	const disallowLocale = availableLocales.map(locale => `${locale}/*`)
	const allowLocale = availableLocales.map(locale => `/${locale}`)

	return {
		rules: {
			userAgent: '*',
			allow: allowLocale,
			disallow: disallowLocale,
		},
		sitemap: CLIENT_URL + '/sitemap.xml',
	}
}
