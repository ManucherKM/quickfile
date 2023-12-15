'use client'

import { defaultLocale } from '@/middleware'
import { redirect } from 'next/navigation'

// Can be imported from a shared config

export default function NotFound() {
	// Add a locale prefix to show a localized not found page
	redirect(`/${defaultLocale}`)
}
