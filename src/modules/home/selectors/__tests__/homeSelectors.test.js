import { selectIsReady } from 'modules/home/selectors/homeSelectors'

describe('homeSelectors', () => {
	describe('selectIsReady', () => {
		it('returns default value', () => {
			const result = selectIsReady()
			expect(result).toBeFalsy()
		})

		it('returns state value', () => {
			const state = {
				home: {
					isReady: true,
				},
			}
			const result = selectIsReady(state)
			expect(result).toBeTruthy()
		})
	})
})
