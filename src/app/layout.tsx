import '@/assets/styles/index.scss'
import { defaultLocale } from '@/middleware'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { ReactNode } from 'react'
import AppleIcon from './apple-touch-icon.png'
import Favicon from './favicon.ico'

export async function generateMetadata() {
	const t = await getTranslations({ locale: defaultLocale })

	return {
		title: t('quickfile_fast_and_convenient_file_transfer'),
		description: t(
			'quickfile_is_an_online_service_for_fast_and_easy_file_transfer_forget_about_complicated_registration_procedures_and_file_size_restrictions_with_quickfile_you_can_easily_and_instantly_send_files_to_any_recipient_directly_from_your_browser_share_documents_images_audio_and_video_files_seamlessly_quick_file_is_your_reliable_tool_for_fast_file_sharing',
		),
		icons: [
			{ rel: 'icon', url: Favicon.src },
			{ rel: 'apple-touch-icon', url: AppleIcon.src },
		],
	} as Metadata
}

export interface IRootLayout {
	children: ReactNode
}

export default function RootLayout({ children }: IRootLayout) {
	return (
		<html lang={defaultLocale}>
			<body>{children}</body>
		</html>
	)
}
