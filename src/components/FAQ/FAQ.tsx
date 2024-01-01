import { Accordion, IAccordionItem, Paragraph, Title } from 'kuui-react'
import { useTranslations } from 'next-intl'
import { FC } from 'react'
import classes from './FAQ.module.scss'

export const FAQ: FC = () => {
	const t = useTranslations()

	const accordionItems: IAccordionItem[] = [
		{
			name: t('what_file_formats_are_supported_by_file_sharing'),
			body: (
				<Paragraph>
					{t(
						'you_can_store_files_in_any_format_quickFile_saves_your_data_in_its_original_form_without_any_conversion',
					)}
				</Paragraph>
			),
		},
		{
			name: t('is_there_a_limit_on_the_size_of_files_that_can_be_uploaded'),
			body: (
				<Paragraph>
					{t(
						'the_file_sharing_service_has_a_limit_on_the_size_of_uploaded_files_which_is_up_to_500_MB_this_value_may_increase_with_how_often_and_how_many_people_use_quickfile',
					)}
				</Paragraph>
			),
		},
		{
			name: t('how_long_will_my_files_be_stored_on_the_file_sharing_server'),
			body: (
				<Paragraph>
					{t(
						'the_files_are_stored_on_quickfile_for_7_days_after_which_they_are_irretrievably_deleted_after_which_they_are_permanently_deleted',
					)}
				</Paragraph>
			),
		},
		{
			name: t('can_i_upload_and_download_multiple_files_at_the_same_time'),
			body: (
				<Paragraph>
					{t(
						'yes_you_can_to_save_multiple_files_at_once_in_the_file_sharing_service_quickfile_you_can_select_multiple_files_at_once_by_clicking_the_plus_sign_or_by_or_move_the_selected_files_with_the_mouse_to_the_appropriate_area',
					)}
				</Paragraph>
			),
		},
		{
			name: t('how_can_i_access_downloaded_files_from_any_device'),
			body: (
				<Paragraph>
					{t(
						'to_access_the_files_from_any_device_you_need_to_click_on_the_link_to_the_archive_with_the_files_you_uploaded_to_quickfile_earlier_quickfile_previously',
					)}
				</Paragraph>
			),
		},
		{
			name: t(
				'what_kind_of_support_is_provided_in_case_of_problems_or_questions_when_using_file_sharing',
			),
			body: (
				<Paragraph>
					{t(
						'if_you_have_any_questions_recommendations_problems_using_quickfile_you_can_contact_us_at_quickfilesite@gmailcom',
					)}
				</Paragraph>
			),
		},
	]

	return (
		<div id="FAQ" className={classes.root}>
			<Title
				style={{
					fontSize: '2rem',
				}}
				align="center"
			>
				{t('faq')}
			</Title>
			<Accordion items={accordionItems} />
		</div>
	)
}
