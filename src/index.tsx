import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './assets/styles/index.scss'
import { App } from './components'

import i18next from 'i18next'
import { I18nextProvider } from 'react-i18next'
import locale_en from './locale/en/global.json'
import locale_ru from './locale/ru/global.json'

i18next.init({
	lng: 'ru',
	resources: {
		en: {
			global: locale_en,
		},
		ru: {
			global: locale_ru,
		},
	},
})

const root = ReactDOM.createRoot(document.getElementById('root')!)

root.render(
	<React.StrictMode>
		<BrowserRouter>
			<I18nextProvider i18n={i18next}>
				<App />
			</I18nextProvider>
		</BrowserRouter>
	</React.StrictMode>,
)
