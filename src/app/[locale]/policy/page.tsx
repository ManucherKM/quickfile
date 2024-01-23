import { NavBarBack, SlidingBottom, SlidingLeft } from '@/components'
import clsx from 'clsx'
import { Paragraph, Title, Ul } from 'kuui-react'
import { useTranslations } from 'next-intl'
import classes from './Policy.module.scss'

function Policy() {
	const t = useTranslations()

	const styles = clsx(['container', classes.root])
	return (
		<>
			<SlidingBottom>
				<NavBarBack />
			</SlidingBottom>
			<div className={styles}>
				<SlidingLeft>
					<Title>{t('general_provisions')}</Title>
				</SlidingLeft>
				<SlidingLeft>
					<Paragraph>
						{t(
							'this_section_of_the_usage_policy_hereinafter_referred_to_as_the_policy_defines_the_terms_and_conditions_of_use_of_the_quickfile_service',
						)}
					</Paragraph>
				</SlidingLeft>
				<SlidingLeft>
					<Title>{t('definitions')}</Title>
				</SlidingLeft>
				<SlidingLeft>
					<Paragraph>
						{t('the_following_terms_are_used_in_this_policy')}
					</Paragraph>
				</SlidingLeft>
				<SlidingLeft>
					<Ul
						items={[
							{
								children: (
									<SlidingLeft>
										<Paragraph>
											{t(
												'service__software_that_provides_file_sharing_and_storage_services',
											)}
										</Paragraph>
									</SlidingLeft>
								),
							},
							{
								children: (
									<SlidingLeft>
										<Paragraph>
											{t(
												'user__an_individual_or_legal_entity_using_the_service',
											)}
										</Paragraph>
									</SlidingLeft>
								),
							},
							{
								children: (
									<SlidingLeft>
										<Paragraph>
											{t('administration__persons_who_manage_the_service')}
										</Paragraph>
									</SlidingLeft>
								),
							},
						]}
					/>{' '}
				</SlidingLeft>
				<SlidingLeft>
					<Title>{t('responsibility_for_materials')}</Title>
				</SlidingLeft>
				<SlidingLeft>
					<Paragraph>
						{t(
							'administration_is_not_responsible_for_materials_uploaded_sent_received_by_users_through_the_service_the_user_is_fully_responsible_for_the_content_of_files_uploaded_and_transmitted_by_him',
						)}
					</Paragraph>
				</SlidingLeft>
				<SlidingLeft>
					<Paragraph>
						{t(
							'in_particular_the_user_is_responsible_for_compliance_with_the_following_requirements',
						)}
					</Paragraph>
				</SlidingLeft>
				<SlidingLeft>
					<Ul
						items={[
							{
								children: (
									<SlidingLeft>
										<Paragraph>
											{t(
												"the_content_of_the_files_must_not_contradict_the_legislation_of_the_user's_country",
											)}
										</Paragraph>
									</SlidingLeft>
								),
							},
							{
								children: (
									<SlidingLeft>
										<Paragraph>
											{t(
												'files_must_not_contain_intellectual_property_the_copying_of_which_is_prohibited_by_the_owners_of_the_original',
											)}
										</Paragraph>
									</SlidingLeft>
								),
							},
							{
								children: (
									<SlidingLeft>
										<Paragraph>
											{t('the_files_must_not_contain_malware')}
										</Paragraph>
									</SlidingLeft>
								),
							},
						]}
					/>{' '}
				</SlidingLeft>
				<SlidingLeft>
					<Paragraph>
						{t(
							'if_the_user_violates_these_requirements_the_administration_has_the_right_to_remove_the_corresponding_files_from_the_service_as_well_as_to_take_the_necessary_measures_to_prevent_repeated_violations_by_the_user',
						)}
					</Paragraph>
				</SlidingLeft>
				<SlidingLeft>
					<Title>{t('alterations')}</Title>
				</SlidingLeft>
				<SlidingLeft>
					<Paragraph>
						{t(
							'the_administration_reserves_the_right_to_make_changes_to_this_policy_without_notifying_users',
						)}
					</Paragraph>
				</SlidingLeft>
				<SlidingLeft>
					<Title>{t('expiration_date')}</Title>
				</SlidingLeft>
				<SlidingLeft>
					<Paragraph>
						{t('this_policy_shall_remain_in_effect_indefinitely')}
					</Paragraph>
				</SlidingLeft>
			</div>
		</>
	)
}

export default Policy
