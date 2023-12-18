import { AbstractIntlMessages } from 'next-intl'
import be from './be/global.json'
import de from './de/global.json'
import en from './en/global.json'
import fr from './fr/global.json'
import kk from './kk/global.json'
import ru from './ru/global.json'
import uk from './uk/global.json'

export const arrLocales = [en, de, fr, ru, kk, be, uk]

const localesInit: AbstractIntlMessages = {}

for (const { code, ...other } of arrLocales) {
	localesInit[code] = other
}

export const locales = localesInit

export const availableLocales = ['en', 'de', 'fr', 'ru', 'kk', 'uk', 'be']
