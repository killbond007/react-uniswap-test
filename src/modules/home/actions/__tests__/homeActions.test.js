import {
	STARTUP,
	STARTUP_FAILURE,
	STARTUP_SUCCESS,
	startup,
	startupFailure,
	startupSuccess,
} from 'modules/home/actions/homeActions'

describe('homeActions', () => {
	describe('startup', () => {
		it('returns type', () => {
			const { type } = startup()
			expect(type).toBe(STARTUP)
		})
	})

	describe('startupSuccess', () => {
		it('returns type', () => {
			const { type } = startupSuccess()
			expect(type).toBe(STARTUP_SUCCESS)
		})

		it('returns payload', () => {
			const activeStudies = 'bar'
			const closedStudies = 'foo'
			const { payload } = startupSuccess(activeStudies, closedStudies)
			expect(payload).toEqual({ activeStudies, closedStudies })
		})
	})

	describe('startupFailure', () => {
		it('returns type', () => {
			const { type } = startupFailure()
			expect(type).toBe(STARTUP_FAILURE)
		})

		it('returns payload', () => {
			const err = new Error('studies')
			const { payload } = startupFailure(err)
			expect(payload).toEqual({ error: err, errorString: err && err.toString() })
		})
	})
})
