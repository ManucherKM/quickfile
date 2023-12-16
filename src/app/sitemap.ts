import { env } from '@/config/env'
import { availableLocales } from '@/locale'
import { MetadataRoute } from 'next'

const CLIENT_URL = env.get('CLIENT_URL').required().asString()

export default function sitemap(): MetadataRoute.Sitemap {
	const locales: MetadataRoute.Sitemap = availableLocales.map(locale => ({
		url: CLIENT_URL + '/' + locale,
		lastModified: new Date(),
		priority: 0.9,
	}))

	return [
		{
			url: CLIENT_URL,
			lastModified: new Date(),
			priority: 1,
		},
		...locales,
	]
}
