import { publicRoutes } from '@/config/routes'
import { NotFound } from 'kuui-react'
import { Route, Routes } from 'react-router'

export const AppRouter = () => {
	return (
		<Routes>
			{publicRoutes.map(route => (
				<Route key={route.path} path={route.path} element={<route.element />} />
			))}
			<Route path="/*" element={<NotFound />} />
		</Routes>
	)
}
