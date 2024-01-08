import {
	useArchiveLoaderStore,
	useFileStore,
	useNotificationsStore,
} from '@/storage'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useLoader } from './useLoader'

export function useCheckExistArchive(id: string, locale: string) {
	const newError = useNotificationsStore(store => store.newError)
	const checkExistArchive = useFileStore(store => store.checkExistArchive)
	const router = useRouter()
	const setInfo = useArchiveLoaderStore(store => store.setInfo)
	const t = useTranslations()
	const loader = useLoader()

	return async function () {
		const data = await loader(checkExistArchive, id)

		if (!data?.exist) {
			newError(t('the_file_could_not_be_found'))
			router.push('/' + locale)
		}

		setInfo({
			count: data?.length,
		})
	}
}
