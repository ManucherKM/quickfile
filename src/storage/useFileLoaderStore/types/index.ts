export interface IInfo {
	time?: string
	count?: string
	size?: string
	percent?: string
}

export interface IFileLoaderStore {
	time?: string
	count?: string
	size?: string
	percent?: string
	isShowFileLoader: boolean

	onCancel?: () => void
	setOnCancel: (func: IFileLoaderStore['onCancel']) => void
	setInfo: (info: IInfo) => void
	setIsShowFileLoader: (target: boolean) => void
}
