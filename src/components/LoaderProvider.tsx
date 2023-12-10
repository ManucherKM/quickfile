'use client'

import { useStore } from '@/storage'
import { Loader } from 'kuui-react'
import type { FC, ReactNode } from 'react'

export interface ILoaderProvider {
	children: ReactNode
}

export const LoaderProvider: FC<ILoaderProvider> = ({ children }) => {
	const isLoading = useStore(store => store.isLoading)

	return (
		<>
			{isLoading && <Loader />}
			{children}
		</>
	)
}
