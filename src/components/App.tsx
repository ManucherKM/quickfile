import { Loader } from 'kuui-react'
import { useStore } from '../storage'
import { AppNotifications } from './AppNotifications'
import { AppRouter } from './AppRouter'

export const App = () => {
	const isLoading = useStore(store => store.isLoading)

	return (
		<>
			{isLoading && <Loader />}
			<AppNotifications />
			<AppRouter />
		</>
	)
}
