'use client'

import { FC, ReactNode, useEffect, useState } from 'react'

export interface IBrowser {
	children: ReactNode
}

export const Browser: FC<IBrowser> = ({ children }) => {
	const [isBrowser, setIsBrowser] = useState<boolean>(false)

	useEffect(() => {
		setIsBrowser(true)
	}, [])

	return <>{isBrowser && children}</>
}
