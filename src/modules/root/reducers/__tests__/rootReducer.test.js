import { STARTUP_SUCCESS } from 'modules/root/actions/rootActions'

import reduce from 'modules/root/reducers/rootReducer'

describe('rootReducer', () => {
	const initialState = {
		isReady: false,
	}

	describe('Uncaught action', () => {
		it('returns state', () => {
			const state = reduce(initialState, { type: 'ROOT' })
			expect(state).toEqual(initialState)
		})
	})

	describe('STARTUP_SUCCESS', () => {
		it('updates state', () => {
			const newState = {
				...initialState,
				isReady: true,
			}
			const state = reduce(initialState, {
				type: STARTUP_SUCCESS,
			})
			expect(state).toEqual(newState)
		})
	})
})
