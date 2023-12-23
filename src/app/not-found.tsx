import { defaultLocale } from '@/middleware'
import { NotFound } from 'kuui-react'

export default function WrapperNotFound() {
	return (
		<html lang={defaultLocale}>
			<body>
				<NotFound />
			</body>
		</html>
	)
}
