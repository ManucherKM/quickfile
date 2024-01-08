export interface IInfo {
	time?: string
	count?: string
	size?: string
	percent?: string
}

export interface IArchiveLoaderStore {
	time?: string
	count?: string
	size?: string
	percent?: string
	isShowArchiveLoader: boolean

	onCancel?: () => void
	setOnCancel: (func: IArchiveLoaderStore['onCancel']) => void
	setInfo: (info: IInfo) => void
	setIsShowArchiveLoader: (target: boolean) => void
	reset: () => void
}
