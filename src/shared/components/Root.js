import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { createStore } from 'redux-dynamic-modules'
import { getSagaExtension } from 'redux-dynamic-modules-saga'
import React from 'react'

import rootModule from 'modules/root'

import sagas from 'shared/sagas'

import theme from '__theme__'

import App from 'shared/components/app/App'

import 'antd/dist/antd.less'
import 'assets/locales'

const sagaExtension = getSagaExtension()

export const store = createStore({
	extensions: [sagaExtension],
})

sagaExtension.middleware[0].run(sagas)

store.addModule(rootModule)

const Root = () => (
	<Provider store={store}>
		<ThemeProvider theme={theme}>
			<App />
		</ThemeProvider>
	</Provider>
)

export default Root
