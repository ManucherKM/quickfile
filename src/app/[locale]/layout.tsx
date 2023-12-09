import '@/assets/styles/index.scss'
import { LoaderProvider, NotificationsProvider } from '@/components'
import { NextIntlClientProvider, useMessages } from 'next-intl'
import { ReactNode } from 'react'

export interface ILocaleLayout {
	children: ReactNode
	params: { locale: string }
}

export default function LocaleLayout({
	children,
	params: { locale },
}: ILocaleLayout) {
	const messages = useMessages()

	return (
		<html lang={locale}>
			<body>
				<NextIntlClientProvider messages={messages} locale={locale}>
					<LoaderProvider>
						<NotificationsProvider>{children}</NotificationsProvider>
					</LoaderProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	)
}
