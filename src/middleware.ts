import createMiddleware from 'next-intl/middleware'
import { availableLocales } from './locale'

export default createMiddleware({
	// A list of all locales that are supported
	locales: availableLocales,
	// Used when no locale matches
	defaultLocale: 'en',
	localePrefix: 'always',
})

export const config = {
	// Match only internationalized pathnames
	matcher: ['/', '/(de|en|es|fa|fr|it|ja|pl|pt|ru|zh|tr)/:path*'],
}
