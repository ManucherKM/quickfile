import '@/assets/styles/index.scss'
import { LoaderProvider, NotificationsProvider } from '@/components'
import { availableLocales } from '@/locale'
import { NextIntlClientProvider, useMessages } from 'next-intl'
import { notFound } from 'next/navigation'
import { ReactNode } from 'react'

export interface ILocaleLayout {
	children: ReactNode
	params: { locale: string }
}

export default function LocaleLayout({
	children,
	params: { locale },
}: ILocaleLayout) {
	if (!availableLocales.includes(locale)) notFound()

	const messages = useMessages()

	return (
		<html lang={locale}>
			<body>
				<NextIntlClientProvider locale={locale} messages={messages}>
					<LoaderProvider>
						<NotificationsProvider>{children}</NotificationsProvider>
					</LoaderProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	)
}
