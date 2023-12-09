import createMiddleware from 'next-intl/middleware'
import { locales } from './locale'

export default createMiddleware({
	locales,
	defaultLocale: 'en',
	localePrefix: 'always',
})

export const config = {
	// Match only internationalized pathnames
	matcher: ['/', '/(en|de|es|fr|fa|it|ja|pl|pt|ru|tr|zh)/:path*'],
}
