import { call, put, takeEvery } from 'redux-saga/effects'
import { sagaNextN } from 'setupTests'

import { REQUEST, requestFailure, requestSuccess } from 'shared/actions/apiActions'

import { requestSaga, watchRequest } from 'shared/sagas/apiSagas'

import { requestService } from 'shared/services/apiServices'

describe('apiSagas', () => {
	describe('watchRequest', () => {
		it('links to requestSaga', () => {
			const saga = watchRequest()
			expect(saga.next().value).toEqual(takeEvery(REQUEST, requestSaga))
		})
	})

	describe('requestSaga', () => {
		const payload = { requestUrl: 'foo', requestOptions: 'bar', transactionId: 'user' }

		it('calls requestService', () => {
			const saga = requestSaga({ payload })
			expect(saga.next().value).toEqual(call(requestService, payload.requestUrl, payload.requestOptions))
		})

		it('returns result', () => {
			const body = 'body'
			const status = 200
			const headers = 'headers'
			const saga = requestSaga({ payload })
			sagaNextN(saga, 1)
			expect(saga.next({ body, status, headers }).value).toEqual(
				put(requestSuccess(body, status, headers, payload.transactionId))
			)
		})

		it('returns error', () => {
			const saga = requestSaga({ payload })
			sagaNextN(saga, 1)
			const err = new Error('error')
			expect(saga.throw(err).value).toEqual(put(requestFailure(err, payload.transactionId)))
		})
	})
})
