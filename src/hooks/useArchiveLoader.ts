'use client'

// Utils
import { useArchiveLoaderStore } from '@/storage'
import { MutableRefObject, useCallback } from 'react'

export function useArchiveLoader(
	abort?: MutableRefObject<boolean>,
	abortController?: MutableRefObject<AbortController>,
) {
	// Function for changing Loader's state.
	const setArchiveLoader = useArchiveLoaderStore(
		store => store.setIsShowArchiveLoader,
	)

	// Return the cached function.
	return useCallback(
		async function <T, A extends unknown[]>(
			fetch: (...args: A) => Promise<T>,
			...args: A
		) {
			try {
				// Show the user Loader.
				setArchiveLoader(true)

				// Execute the passed function and return its value.
				return await fetch(...args)
			} catch (e) {
				// If an error occurs, display it in the console.
				console.log(e)
			} finally {
				// Remove Loader.
				setArchiveLoader(false)

				if (abort) {
					abort.current = false
				}

				if (abortController) {
					abortController.current = new AbortController()
				}
			}
		},
		[setArchiveLoader],
	)
}
