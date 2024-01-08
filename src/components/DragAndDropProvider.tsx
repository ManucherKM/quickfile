'use client'

import { useWindowFilesTransfer } from '@/hooks'
import { useDragAndDropStore } from '@/storage'
import { FileAdd } from 'kuui-react'
import { FC, ReactNode } from 'react'

export interface IDragAndDropProvider {
	children: ReactNode
}

export const DragAndDropProvider: FC<IDragAndDropProvider> = ({ children }) => {
	const [isDrag, setIsDrag] = useWindowFilesTransfer(false)
	const changeFilesHandler = useDragAndDropStore(
		store => store.changeFilesHandler,
	)

	return (
		<>
			{isDrag && (
				<FileAdd
					variant="dragAndDrop"
					onClose={() => setIsDrag(false)}
					onChangeFiles={changeFilesHandler}
				/>
			)}
			{children}
		</>
	)
}
