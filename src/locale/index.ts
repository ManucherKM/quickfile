import { AbstractIntlMessages } from 'next-intl'
import de from './de/global.json'
import en from './en/global.json'
import fr from './fr/global.json'
import ru from './ru/global.json'

export const arrLocales = [en, de, fr, ru]

const localesInit: AbstractIntlMessages = {}

for (const { code, ...other } of arrLocales) {
	localesInit[code] = other
}

export const locales = localesInit

export const availableLocales = ['en', 'de', 'fr', 'ru']
