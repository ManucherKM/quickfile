import { Accordion, IAccordionItem, Paragraph, Title } from 'kuui-react'
import { FC } from 'react'
import classes from './FAQ.module.scss'

const accordionItems: IAccordionItem[] = [
	{
		name: 'Name 1',
		body: (
			<Paragraph>
				Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sapiente quae
				ut ducimus saepe eligendi similique perspiciatis voluptate eaque non
				iusto.
			</Paragraph>
		),
	},
]

export const FAQ: FC = () => {
	return (
		<div id="FAQ" className={classes.root}>
			<Title
				style={{
					fontSize: '2rem',
				}}
				align="center"
			>
				FAQ
			</Title>
			<Accordion items={accordionItems} />
		</div>
	)
}
