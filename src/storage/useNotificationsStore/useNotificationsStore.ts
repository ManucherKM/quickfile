import type { INotification, INotificationsStore } from './types'

import { create } from 'zustand'
import { ENotificationVariant } from './types'

const defaultStore = {
	notifications: [] as INotification[],
} as INotificationsStore

export const useNotificationsStore = create<INotificationsStore>(
	(set, get) => ({
		...defaultStore,
		newMessage(text) {
			const idx = get().notifications.findIndex(n => {
				const isMessage = n.variant === ENotificationVariant.message
				const isSameText = n.text === text

				return isMessage && isSameText
			})

			if (idx !== -1) return

			const message: INotification = {
				text,
				variant: ENotificationVariant.message,
			}

			set(prev => ({ notifications: [...prev.notifications, message] }))
		},
		newError(text) {
			const idx = get().notifications.findIndex(n => {
				const isError = n.variant === ENotificationVariant.error
				const isSameText = n.text === text

				return isError && isSameText
			})

			if (idx !== -1) return

			const error: INotification = {
				text,
				variant: ENotificationVariant.error,
			}

			set(prev => ({ notifications: [...prev.notifications, error] }))
		},
		removeNotification(notification) {
			const { notifications } = get()

			const newNotifications = notifications.filter(
				n => n.text !== notification.text && n.variant === notification.variant,
			)

			set({ notifications: newNotifications })
		},
		reset() {
			set(defaultStore)
		},
	}),
)
