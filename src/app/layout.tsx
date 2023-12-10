import '@/assets/styles/index.scss'
import { LoaderProvider, NotificationsProvider } from '@/components'
import { ReactNode } from 'react'

export interface ILocaleLayout {
	children: ReactNode
	params: { locale: string }
}

export default function LocaleLayout({
	children,
	params: { locale },
}: ILocaleLayout) {
	return (
		<html lang={locale}>
			<body>
				<LoaderProvider>
					<NotificationsProvider>{children}</NotificationsProvider>
				</LoaderProvider>
			</body>
		</html>
	)
}
