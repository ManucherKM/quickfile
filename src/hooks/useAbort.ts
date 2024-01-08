import { MutableRefObject, useRef } from 'react'

export function useAbort() {
	const abortController = useRef<AbortController>(new AbortController())
	const abort = useRef<boolean>(false)

	return [abort, abortController] as [
		MutableRefObject<boolean>,
		MutableRefObject<AbortController>,
	]
}
