import { put, takeLatest } from 'redux-saga/effects'

import { sagaNextN } from 'setupTests'

import { STARTUP, startupFailure, startupSuccess } from 'modules/home/actions/homeActions'
import { fetchBundle } from 'shared/actions/i18nActions'

import { startupSaga, watchStartup } from 'modules/home/sagas/homeSagas'

describe('homeSagas', () => {
	describe('startupSaga', () => {
		const namespace = 'home'

		it('puts bundle fetching', () => {
			const saga = startupSaga()
			expect(saga.next().value).toEqual(put(fetchBundle(namespace)))
		})

		it('takes bundle fetching result', () => {
			const saga = startupSaga()
			sagaNextN(saga, 1)
			expect(saga.next().value).toMatchObject({ type: 'TAKE' })
		})

		it('puts success', () => {
			const saga = startupSaga()
			sagaNextN(saga, 2)
			expect(saga.next().value).toEqual(put(startupSuccess()))
		})

		it('fails', () => {
			const saga = startupSaga()
			sagaNextN(saga, 1)
			const err = new Error('error')
			expect(saga.throw(err).value).toEqual(put(startupFailure(err)))
		})
	})

	describe('watchStartup', () => {
		it('links to startupSaga', () => {
			const saga = watchStartup()
			expect(saga.next().value).toEqual(takeLatest(STARTUP, startupSaga))
		})
	})
})
