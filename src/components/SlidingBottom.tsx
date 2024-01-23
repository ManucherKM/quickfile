'use client'

import { motion } from 'framer-motion'
import { FC, ReactNode } from 'react'
import { Browser } from '.'

export interface ISlidingBottom {
	children: ReactNode
	duration?: string
}

export const SlidingBottom: FC<ISlidingBottom> = ({
	children,
	duration = '0.3',
}) => {
	return (
		<Browser>
			<motion.div
				initial={{ opacity: 0, y: '-100px' }}
				animate={{ opacity: 1, y: '0' }}
				transition={{ duration }}
			>
				{children}
			</motion.div>
		</Browser>
	)
}
