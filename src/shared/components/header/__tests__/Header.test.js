import { LocationProvider, createHistory, createMemorySource } from '@reach/router'
import { Provider } from 'react-redux'
import { createStore } from 'redux-dynamic-modules'
import { render } from '@testing-library/react'
import React from 'react'

import Header from 'shared/components/header/Header'

const initialState = {}
const getStore = (state) => createStore({ initialState: state })
const getInstance = (state = initialState) => (
	<LocationProvider history={createHistory(createMemorySource('/'))}>
		<Provider store={getStore(state)}>
			<Header />
		</Provider>
	</LocationProvider>
)

describe('Header', () => {
	it('matches snapshot', () => {
		const { asFragment } = render(getInstance())
		expect(asFragment()).toMatchSnapshot()
	})
})
