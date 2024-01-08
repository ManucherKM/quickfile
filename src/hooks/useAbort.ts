import { MutableRefObject, useRef } from 'react'

export function useAbort() {
	const abortController = useRef<AbortController>(new AbortController())
	const abort = useRef<boolean>(false)

	function resetAbort() {
		abortController.current = new AbortController()
		abort.current = false
	}

	return [abort, abortController, resetAbort] as [
		MutableRefObject<boolean>,
		MutableRefObject<AbortController>,
		() => void,
	]
}
