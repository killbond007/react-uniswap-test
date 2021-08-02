import * as React from 'react'
import { DynamicModuleLoader } from 'redux-dynamic-modules'

import { startup } from 'modules/home/actions/homeActions'

import homeReducer from 'modules/home/reducers/homeReducer'

import HomePage from 'modules/home/components/HomePage'

import homeSagas from 'modules/home/sagas/homeSagas'

const moduleToLoad = {
	id: 'home',
	reducerMap: {
		home: homeReducer,
	},
	sagas: [homeSagas],
	initialActions: [startup()],
}

export default function DynamicHomePage(props) {
	return (
		<DynamicModuleLoader modules={[moduleToLoad]}>
			<HomePage {...props} />
		</DynamicModuleLoader>
	)
}
