'use client'

import type { Dispatch, SetStateAction } from 'react'
import { useEffect, useState } from 'react'

export const useWindowFilesTransfer = (target: boolean) => {
	const [isTransfer, setIsTransfer] = useState<boolean>(target)

	function dragOverHandler(e: DragEvent) {
		e.preventDefault()

		setIsTransfer(true)
	}

	function dropHandler(e: DragEvent) {
		e.preventDefault()

		setIsTransfer(false)
	}

	useEffect(() => {
		window.addEventListener('drop', dropHandler)
		window.addEventListener('dragover', dragOverHandler)

		return () => {
			window.removeEventListener('drop', dropHandler)
			window.removeEventListener('dragover', dragOverHandler)
		}
	}, [])

	return [isTransfer, setIsTransfer] as [
		boolean,
		Dispatch<SetStateAction<boolean>>,
	]
}
