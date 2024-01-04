'use client'

import { Paragraph, Title, Ul } from 'kuui-react'
import { useTranslations } from 'next-intl'
import { FC } from 'react'
import classes from './BasicInfo.module.scss'

export const BasicInfo: FC = () => {
	const t = useTranslations()

	return (
		<div id="basicInfo" className={classes.root}>
			<Title
				style={{
					fontSize: '2rem',
				}}
				align="center"
			>
				{t('basics')}
			</Title>

			<div className={classes.wrapperContent}>
				<Title>{t('what_is_fast_file_sharing_technology')}</Title>
				<Paragraph align="justify">
					{t(
						'fast_file_sharing_technology_is_an_innovative_solution_that_allows_users_to_transfer_files_between_each_other_in_a_secure_fast_and_convenient_format_it_is_a_system_that_enables_efficient_and_secure_communication_between_the_sender_and_receiver_when_transferring_files',
					)}
				</Paragraph>
				<Paragraph align="justify">
					{t(
						'the_basic_idea_behind_fast_file_sharing_technology_is_to_simplify_the_file_transfer_process_by_eliminating_the_need_for_users_to_use_mail_or_physical_media_instead_files_can_be_uploaded_to_a_platform_or_server_where_they_are_stored_until_downloaded_by_the_recipient',
					)}
				</Paragraph>
				<Title>{t('what_is_a_filesharer')}</Title>
				<Paragraph align="justify">
					{t(
						'from_a_technical_point_of_view_a_filesharing_service_is_a_web_application_or_service_that_provides_a_mechanism_for_uploading_storing_and_downloading_files_it_usually_runs_on_a_server_and_uses_appropriate_protocols_and_software_to_handle_all_file_sharing_operations',
					)}
				</Paragraph>
				<Paragraph align="justify">
					{t(
						'the_basic_functionality_of_the_filesharing_service_includes_the_following_aspects',
					)}
				</Paragraph>
				<Ul
					items={[
						{
							children: (
								<Paragraph align="justify">
									{t(
										'file_upload_users_can_select_files_to_upload_to_the_server_this_can_be_done_using_standard_web_interfaces_drag_and_drop_or_via_api',
									)}
								</Paragraph>
							),
						},
						{
							children: (
								<Paragraph align="justify">
									{t(
										'file_storage_files_uploaded_by_users_are_usually_stored_on_a_server_or_cloud_storage_for_later_access_depending_on_the_size_and_type_of_files_as_well_as_user_requirements_different_storage_either_local_or_distributed_can_be_used',
									)}
								</Paragraph>
							),
						},
						{
							children: (
								<Paragraph align="justify">
									{t(
										'access_control_file_exchanges_allow_you_to_control_access_to_uploaded_files_this_can_be_implemented_by_using_links_with_a_limited_lifetime_passwords_or_authorization_by_user',
									)}
								</Paragraph>
							),
						},
						{
							children: (
								<Paragraph align="justify">
									{t(
										'downloading_files_users_are_able_to_download_files_uploaded_by_other_users_or_their_own_files_through_links_provided_or_through_special_interfaces',
									)}
								</Paragraph>
							),
						},
						{
							children: (
								<Paragraph align="justify">
									{t(
										'additional_features_some_file_sharing_services_also_offer_additional_features_such_as_file_browsing_document_collaboration_file_commenting_data_backup_etc',
									)}
								</Paragraph>
							),
						},
					]}
				/>

				<Title>
					{t('what_criteria_should_the_best_file_sharing_service_have')}
				</Title>
				<Paragraph align="justify">
					{t(
						'the_best_file_sharing_service_should_fulfill_several_important_criteria_here_are_some_of_them',
					)}
				</Paragraph>

				<Ul
					items={[
						{
							children: (
								<Paragraph align="justify">
									{t(
										'ease_of_use_a_filesharing_service_should_have_an_intuitive_and_easytouse_interface_users_should_be_able_to_easily_upload_download_and_transfer_files_without_the_need_for_specialized_technical_skills',
									)}
								</Paragraph>
							),
						},
						{
							children: (
								<Paragraph align="justify">
									{t(
										'security_it_is_important_that_a_filesharing_service_provides_strong_security_mechanisms_such_as_data_encryption_and_user_authentication_this_helps_protect_files_from_unauthorized_access',
									)}
								</Paragraph>
							),
						},
						{
							children: (
								<Paragraph align="justify">
									{t(
										'storage_capacity_a_good_file_sharing_site_should_offer_enough_space_for_storing_files_the_more_space_available_the_more_files_can_be_uploaded_and_stored',
									)}
								</Paragraph>
							),
						},
						{
							children: (
								<Paragraph align="justify">
									{t(
										'fast_transfer_file_transfer_should_be_fast_and_efficient_the_file_sharing_service_should_have_fast_file_upload_and_download_speeds_as_well_as_efficient_data_compression_to_save_network_bandwidth',
									)}
								</Paragraph>
							),
						},
						{
							children: (
								<Paragraph align="justify">
									{t(
										'mobile_accessibility_it_is_important_that_a_filesharing_service_has_a_mobile_app_or_is_optimized_for_mobile_devices_this_allows_users_to_access_and_share_files_using_a_smartphone_or_tablet',
									)}
								</Paragraph>
							),
						},
					]}
				/>

				<Title>{t('conclusion')}</Title>
				<Paragraph align="justify">
					{t(
						'file_sharing_services_have_become_an_integral_part_of_modern_digital_life_providing_convenient_ways_to_share_and_distribute_files_between_different_devices_and_users_these_services_offer_a_number_of_benefits_including_easy_access_to_files_from_anywhere_and_efficient_sharing_of_large_files_however_it_is_crucial_to_ensure_the_security_and_privacy_of_users_files_and_to_comply_with_relevant_laws_overall_file_sharing_services_have_revolutionized_the_way_we_share_information_but_users_should_be_mindful_of_the_potential_risks_and_consequences',
					)}
				</Paragraph>
			</div>
		</div>
	)
}
