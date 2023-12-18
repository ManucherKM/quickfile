import createMiddleware from 'next-intl/middleware'
import { availableLocales } from './locale'

export const defaultLocale = 'en'

export default createMiddleware({
	// A list of all locales that are supported
	locales: availableLocales,
	// Used when no locale matches
	defaultLocale,
	localePrefix: 'always',
})

export const config = {
	// Match only internationalized pathnames
	matcher: ['/', '/(de|en|fr|ru|be|uk|kk)/:path*'],
}
