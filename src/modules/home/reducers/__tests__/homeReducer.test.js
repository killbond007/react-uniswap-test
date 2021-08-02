import reduce, { initialState } from 'modules/home/reducers/homeReducer'

import { STARTUP_SUCCESS } from 'modules/home/actions/homeActions'

describe('homeReducer', () => {
	describe('Uncaught action', () => {
		it('returns state', () => {
			const state = reduce(initialState, { type: 'STUDIES' })
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
				payload: { activeStudies: 'foo', closedStudies: 'bar' },
			})
			expect(state).toEqual(newState)
		})
	})
})
