import { env } from '@/config/env'
import { availableLocales } from '@/locale'
import { MetadataRoute } from 'next'

const CLIENT_URL = env.get('CLIENT_URL').required().asString()

export default function sitemap(): MetadataRoute.Sitemap {
	const locales: MetadataRoute.Sitemap = availableLocales.map(locale => ({
		url: CLIENT_URL + '/' + locale,
		lastModified: new Date(),
	}))

	return [...locales]
}
