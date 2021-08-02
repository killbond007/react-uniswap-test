import { call, fork, put, takeEvery } from 'redux-saga/effects'

import { REQUEST, requestFailure, requestSuccess } from 'shared/actions/apiActions'

import { requestService } from 'shared/services/apiServices'

export function* watchRequest() {
	yield takeEvery(REQUEST, requestSaga)
}

export function* requestSaga({ payload }) {
	const { transactionId } = payload
	try {
		const { requestUrl, requestOptions, successMessage } = payload

		const { body, status, headers } = yield call(requestService, requestUrl, requestOptions)

		yield put(requestSuccess(body, status, headers, transactionId, successMessage))
	} catch (err) {
		if (!err.isCancel) yield put(requestFailure(err, transactionId))
	}
}

export default function* apiSaga() {
	yield fork(watchRequest)
}
