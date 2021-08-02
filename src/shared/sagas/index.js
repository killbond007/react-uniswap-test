import { fork } from 'redux-saga/effects'

import apiSaga from 'shared/sagas/apiSagas'
import i18nSaga from 'shared/sagas/i18nSagas'

export default function* () {
	yield fork(apiSaga)
	yield fork(i18nSaga)
}
