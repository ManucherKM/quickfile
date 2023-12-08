import { getBrowserLanguage } from '@/utils'
import i18next from 'i18next'
import { resources } from './resources'

const foundLang = getBrowserLanguage()

i18next.init({
	lng: foundLang,
	resources: resources,
})

export const i18n = i18next
