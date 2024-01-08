import { IFileAddDragAndDrop } from 'kuui-react'

export interface IDragAndDropStore {
	changeFilesHandler?: IFileAddDragAndDrop['onChangeFiles']
	setChangeFilesHandler: (func: IDragAndDropStore['changeFilesHandler']) => void
}
