export enum ENotificationVariant {
	message = 'message',

	error = 'error',
}

export interface INotification {
	variant: `${ENotificationVariant}`
	text: string
}

export type Notification = INotification | never

export interface INotificationsStore {
	notifications: Notification[]

	newError: (text: string) => void

	newMessage: (text: string) => void

	removeNotification: (notification: INotification) => void

	reset: () => void
}
