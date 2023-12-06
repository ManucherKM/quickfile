import { Download, Home } from '@/pages'
import type { FC } from 'react'

export interface IRoute {
	path: string
	element: FC
}

export enum ERoutes {
	home = '/',
	download = '/download',
}

export const publicRoutes: IRoute[] = [
	{
		path: ERoutes.home,
		element: Home,
	},
	{
		path: ERoutes.download + '/:id',
		element: Download,
	},
]
