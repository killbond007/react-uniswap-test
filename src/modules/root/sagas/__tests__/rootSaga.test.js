import { put } from 'redux-saga/effects'

import { fetchBundle } from 'shared/actions/i18nActions'
import { startupFailure, startupSuccess } from 'modules/root/actions/rootActions'

import { startupSaga } from 'modules/root/sagas/rootSaga'

import { sagaNextN } from 'setupTests'

describe('rootSaga', () => {
	describe('startupSaga', () => {
		const namespace = 'root'

		it('puts bundle fetching', () => {
			const saga = startupSaga()
			expect(saga.next().value).toEqual(put(fetchBundle(namespace)))
		})

		it('takes bundle fetching result', () => {
			const saga = startupSaga()
			saga.next()
			expect(saga.next().value).toMatchObject({ type: 'TAKE' })
		})

		it('puts success', () => {
			const saga = startupSaga()
			sagaNextN(saga, 1)
			expect(saga.next().value).toEqual(put(startupSuccess()))
		})

		it('returns error', () => {
			const saga = startupSaga()
			saga.next()
			const err = new Error('error')
			expect(saga.throw(err).value).toEqual(put(startupFailure(err)))
		})
	})
})
