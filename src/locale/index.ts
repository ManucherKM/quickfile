import { getBrowserLanguage } from '@/utils'
import i18next from 'i18next'
import { resources } from './resources'

const foundLang = getBrowserLanguage()

const isLangNotExist: boolean = !resources[foundLang]

const lng = isLangNotExist ? 'en' : foundLang

i18next.init({
	lng,
	resources: resources,
})

export const i18n = i18next
