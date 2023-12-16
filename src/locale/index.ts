import { AbstractIntlMessages } from 'next-intl'
import de from './de/global.json'
import en from './en/global.json'
import es from './es/global.json'
import fa from './fa/global.json'
import fr from './fr/global.json'
import it from './it/global.json'
import ja from './ja/global.json'
import pl from './pl/global.json'
import pt from './pt/global.json'
import ru from './ru/global.json'
import tr from './tr/global.json'
import zh from './zh/global.json'

export const arrLocales = [en, de, es, fa, fr, it, ja, pl, pt, ru, zh, tr]

const localesInit: AbstractIntlMessages = {}

for (const { code, ...other } of arrLocales) {
	localesInit[code] = other
}

export const locales = localesInit

export const availableLocales = [
	'en',
	'de',
	'es',
	'fr',
	'fa',
	'it',
	'ja',
	'pl',
	'pt',
	'ru',
	'tr',
	'zh',
]
