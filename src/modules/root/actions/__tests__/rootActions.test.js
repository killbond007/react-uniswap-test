import fc from 'fast-check'

import {
	STARTUP,
	STARTUP_FAILURE,
	STARTUP_SUCCESS,
	startup,
	startupFailure,
	startupSuccess,
} from 'modules/root/actions/rootActions'

describe('authActions', () => {
	const requests = [
		['startup', { type: STARTUP, func: startup }],
		['startupSuccess', { type: STARTUP_SUCCESS, func: startupSuccess }],
	]

	const errorRequests = [
		[
			'startupFailure',
			{
				type: STARTUP_FAILURE,
				func: startupFailure,
				payload: { arbitraries: [fc.object()], values: ['error', 'errorString'] },
			},
		],
	]

	describe.each(requests)('%s', (name, request) => {
		it('returns type', () => {
			const { type } = request.func()
			expect(type).toBe(request.type)
		})

		if (request.payload) {
			it('returns payload', () => {
				fc.assert(
					fc.property(...request.payload.arbitraries, (...params) => {
						const { payload } = request.func(...params)
						const result = request.payload.values.reduce((result, item, i) => {
							result[item] = params[i]
							return result
						}, {})

						expect(payload).toEqual(result)
					})
				)
			})
		}
	})

	describe.each(errorRequests)('%s', (name, request) => {
		it('returns type', () => {
			const { type } = request.func()
			expect(type).toBe(request.type)
		})

		if (request.payload) {
			it('returns payload', () => {
				fc.assert(
					fc.property(...request.payload.arbitraries, (...params) => {
						const { payload } = request.func(...params)
						expect(payload).toEqual({ error: params[0], errorString: params[0]?.toString() })
					})
				)
			})
		}
	})
})
