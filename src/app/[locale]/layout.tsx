import '@/assets/styles/index.scss'
import { LoaderProvider, NotificationsProvider } from '@/components'
import { availableLocales } from '@/locale'
import { Metadata } from 'next'
import { NextIntlClientProvider, useMessages } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { ReactNode } from 'react'

export interface IGenerateMetadata {
	params: { locale: string }
}

export async function generateMetadata({
	params: { locale },
}: IGenerateMetadata) {
	const t = await getTranslations({ locale })

	return {
		title: t('quickfile_fast_and_convenient_file_transfer'),
		description: t(
			'quickfile_is_an_online_service_for_fast_and_easy_file_transfer_forget_about_complicated_registration_procedures_and_file_size_restrictions_with_quickfile_you_can_easily_and_instantly_send_files_to_any_recipient_directly_from_your_browser_share_documents_images_audio_and_video_files_seamlessly_quick_file_is_your_reliable_tool_for_fast_file_sharing',
		),
	} as Metadata
}

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
