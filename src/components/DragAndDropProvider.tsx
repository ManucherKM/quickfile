import { FC, ReactNode } from 'react'

export interface IDragAndDropProvider {
	children: ReactNode
}

export const DragAndDropProvider: FC<IDragAndDropProvider> = ({ children }) => {
	return <div>DragAndDropProvider</div>
}
