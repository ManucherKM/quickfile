import { List } from '@/components/List'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { FC, useEffect, useRef, useState } from 'react'
import { ILink } from '../types'
import classes from './Mobile.module.scss'

export interface IMobile {
	links: ILink[]
}

export const Mobile: FC<IMobile> = ({ links }) => {
	const t = useTranslations()
	const [isShow, setIsShow] = useState<boolean>(false)
	const linksBlockRef = useRef<HTMLDivElement | null>(null)
	const burgerRef = useRef<HTMLButtonElement | null>(null)

	function checkOutsideClick(event: MouseEvent) {
		const isContain = linksBlockRef.current?.contains(event.target as Node)

		if (isContain) return

		setIsShow(false)

		if (burgerRef.current) {
			burgerRef.current.blur()
		}
	}

	function burgerFocusHandler() {
		setIsShow(true)
	}

	useEffect(() => {
		if (isShow) {
			document.addEventListener('mousedown', checkOutsideClick)
		}

		return () => {
			if (isShow) {
				document.removeEventListener('mousedown', checkOutsideClick)
			}
		}
	}, [isShow])

	const listStyles = clsx([classes.list, isShow && classes.show])
	return (
		<nav className={classes.root}>
			<div className="container">
				<div className={classes.controlls}>
					<div>
						<Link href={'/'} aria-label={t('home')}>
							<svg
								width="40"
								height="40"
								viewBox="0 0 40 40"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<rect width="40" height="40" rx="20" fill="#242526" />
								<path
									d="M25.621 24.509C25.677 24.607 25.712 24.712 25.726 24.824C25.74 24.922 25.74 25.02 25.726 25.118C25.712 25.314 25.635 25.489 25.495 25.643C25.397 25.755 25.278 25.86 25.138 25.958C25.026 26.028 24.872 26.063 24.676 26.063C24.522 26.063 24.382 26.035 24.256 25.979C24.088 25.909 23.941 25.818 23.815 25.706C23.661 25.622 23.514 25.517 23.374 25.391L22.786 24.887C22.548 25.111 22.282 25.3 21.988 25.454C21.708 25.608 21.414 25.734 21.106 25.832C20.658 25.972 20.196 26.049 19.72 26.063C19.258 26.091 18.796 26.049 18.334 25.937C17.872 25.825 17.424 25.65 16.99 25.412C16.57 25.174 16.185 24.866 15.835 24.488C15.415 24.054 15.072 23.557 14.806 22.997C14.54 22.423 14.33 21.828 14.176 21.212C14.022 20.596 13.924 19.973 13.882 19.343C13.84 18.713 13.84 18.118 13.882 17.558C13.924 17.026 14.008 16.452 14.134 15.836C14.26 15.206 14.449 14.604 14.701 14.03C14.967 13.456 15.296 12.945 15.688 12.497C16.094 12.049 16.584 11.741 17.158 11.573C18.544 11.139 19.72 11.062 20.686 11.342C21.652 11.608 22.443 12.091 23.059 12.791C23.549 13.351 23.934 14.009 24.214 14.765C24.508 15.521 24.704 16.312 24.802 17.138C24.914 17.964 24.942 18.797 24.886 19.637C24.83 20.463 24.704 21.233 24.508 21.947L24.13 22.955C24.34 23.151 24.536 23.333 24.718 23.501C24.914 23.655 25.04 23.767 25.096 23.837C25.194 23.935 25.285 24.04 25.369 24.152C25.467 24.25 25.551 24.369 25.621 24.509ZM17.473 22.325C17.893 22.871 18.397 23.2 18.985 23.312C19.587 23.41 20.147 23.305 20.665 22.997C20.469 22.801 20.287 22.626 20.119 22.472C19.951 22.318 19.846 22.213 19.804 22.157C19.594 21.947 19.433 21.695 19.321 21.401C19.209 21.177 19.174 20.967 19.216 20.771C19.258 20.547 19.349 20.358 19.489 20.204C19.559 20.148 19.622 20.099 19.678 20.057C19.734 20.001 19.797 19.952 19.867 19.91C19.937 19.868 20.014 19.84 20.098 19.826C20.196 19.812 20.294 19.805 20.392 19.805C20.532 19.805 20.672 19.854 20.812 19.952C20.938 20.022 21.085 20.113 21.253 20.225C21.323 20.295 21.393 20.365 21.463 20.435C21.547 20.491 21.624 20.554 21.694 20.624C21.75 20.68 21.806 20.736 21.862 20.792C21.918 20.834 21.981 20.883 22.051 20.939C22.149 20.477 22.219 19.987 22.261 19.469C22.317 18.951 22.324 18.433 22.282 17.915C22.24 17.383 22.142 16.865 21.988 16.361C21.834 15.843 21.617 15.36 21.337 14.912C21.001 14.38 20.574 14.023 20.056 13.841C19.538 13.645 18.908 13.729 18.166 14.093C17.872 14.247 17.62 14.471 17.41 14.765C17.214 15.045 17.046 15.367 16.906 15.731C16.766 16.081 16.654 16.445 16.57 16.823C16.5 17.201 16.458 17.558 16.444 17.894C16.43 18.258 16.43 18.643 16.444 19.049C16.472 19.441 16.521 19.84 16.591 20.246C16.675 20.638 16.787 21.016 16.927 21.38C17.067 21.73 17.249 22.045 17.473 22.325Z"
									fill="#BC98EA"
								/>
							</svg>
						</Link>
					</div>

					<button
						ref={burgerRef}
						onFocus={burgerFocusHandler}
						className={classes.burger}
						aria-label={t('burger')}
					>
						<svg
							width="22"
							height="16"
							viewBox="0 0 22 16"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M1 1H21M1 7.66667H21M1 14.3333H21"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</button>
				</div>
				<div ref={linksBlockRef} className={classes.lighthouse}>
					<ul className={listStyles}>
						<List
							arr={links}
							callback={({ content, ...props }) => (
								<li key={props.href} className={classes.wrapperLink}>
									<Link {...props}>{content}</Link>
								</li>
							)}
						/>
					</ul>
				</div>
			</div>
		</nav>
	)
}
