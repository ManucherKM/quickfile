'use client'

import { motion } from 'framer-motion'
import { FC, ReactNode } from 'react'
import { Browser } from '.'

export interface ISlidingLeft {
	children: ReactNode
	duration?: string
}

export const SlidingLeft: FC<ISlidingLeft> = ({
	children,
	duration = '0.3',
}) => {
	return (
		<Browser>
			<motion.div
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true }}
				transition={{ duration }}
				variants={{
					visible: { opacity: 1, x: '0' },
					hidden: { opacity: 0, x: '100px' },
				}}
			>
				{children}
			</motion.div>
		</Browser>
	)
}
