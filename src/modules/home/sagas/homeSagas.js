import { fork, put, take, takeLatest } from 'redux-saga/effects'

import { FETCH_BUNDLE_SUCCESS, fetchBundle } from 'shared/actions/i18nActions'
import { STARTUP, startupFailure, startupSuccess } from 'modules/home/actions/homeActions'

export function* watchStartup() {
	yield takeLatest(STARTUP, startupSaga)
}

export function* startupSaga() {
	try {
		yield put(fetchBundle('home'))
		yield take(({ type, payload }) => type === FETCH_BUNDLE_SUCCESS && payload.namespace === 'home')

		yield put(startupSuccess())
	} catch (err) {
		yield put(startupFailure(err))
	}
}

export default function* homeSagas() {
	yield fork(watchStartup)
}
