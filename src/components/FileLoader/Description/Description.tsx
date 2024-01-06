import { ISubtitle, Subtitle } from 'kuui-react'
import { FC } from 'react'
import classes from './Description.module.scss'

export interface IDescription extends Omit<ISubtitle, 'className'> {}

export const Description: FC<IDescription> = props => {
	return <Subtitle className={classes.root} {...props} />
}
