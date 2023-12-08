import type { Resource } from 'i18next'
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

const locales = [de, en, es, fa, fr, it, ja, pl, pt, ru, zh, tr]

const resourcesInit: Resource = {}

for (const { code, ...other } of locales) {
	resourcesInit[code] = { global: other }
}

export const resources = resourcesInit
