import { selectIsAppReady } from 'modules/root/selectors/rootSelectors'

describe('rootSelectors', () => {
	describe('selectIsReady', () => {
		it('returns default value', () => {
			const result = selectIsAppReady()
			expect(result).toBeFalsy()
		})

		it('returns state value', () => {
			const state = {
				root: {
					isReady: true,
				},
			}
			const result = selectIsAppReady(state)
			expect(result).toBeTruthy()
		})
	})
})
