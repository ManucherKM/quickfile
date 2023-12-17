import logo from '@/app/icon.png'
import Image from 'next/image'
import { FC } from 'react'
import { QR } from 'react-qr-rounded'
import classes from './QRCode.module.scss'

export interface IQRCode {
	link: string
}

export const QRCode: FC<IQRCode> = ({ link }) => {
	return (
		<div className={classes.root}>
			<QR
				color="#bc98ea"
				rounding={100}
				cutoutElement={
					<div className={classes.wrapper_logo}>
						<Image src={logo} className={classes.logo} alt="logo" />
					</div>
				}
				cutout
				errorCorrectionLevel="H"
			>
				{link}
			</QR>
		</div>
	)
}
