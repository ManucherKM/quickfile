const linkClickHandler = function (this: Element, e: Event) {
	e.preventDefault()

	const id = this.getAttribute('href')

	if (!id) return

	document.querySelector(id)?.scrollIntoView({
		behavior: 'smooth',
	})
}

export function addSmoothScrollToLinks() {
	document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
		anchor.addEventListener('click', linkClickHandler)
	})
}

export function removeSmoothScrollToLinks() {
	document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
		anchor.removeEventListener('click', linkClickHandler)
	})
}
