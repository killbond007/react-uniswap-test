import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { createStore } from 'redux-dynamic-modules'
import { render } from '@testing-library/react'
import React from 'react'

import theme from '__theme__'

import HomePage from 'modules/home/components/HomePage'

const defaultProps = {}
const renderWithRedux = (initialState = {}, props = {}) => {
	const store = createStore({ initialState }, [], [])
	store.dispatch = jest.fn()
	return {
		...render(
			<Provider store={store}>
				<ThemeProvider theme={theme}>
					<HomePage {...defaultProps} {...props} />
				</ThemeProvider>
			</Provider>
		),
		store,
	}
}

describe('HomePage', () => {
	describe('matches snapshot', () => {
		const data = [
			{
				title: 'page is not ready',
				initialState: { home: { isReady: false } },
			},
			{
				title: 'page is ready',
				initialState: { home: { isReady: true } },
			},
		]

		data.forEach(({ title, props, initialState }) => {
			it(title, () => {
				const { asFragment } = renderWithRedux(initialState, props)
				expect(asFragment()).toMatchSnapshot()
			})
		})
	})
})
