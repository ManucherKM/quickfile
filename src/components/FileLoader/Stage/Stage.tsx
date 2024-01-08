import { Paragraph } from 'kuui-react'
import { FC } from 'react'

export interface IStage {
	children: string
}

export const Stage: FC<IStage> = ({ children }) => {
	return <Paragraph align="center">{children}...</Paragraph>
}
