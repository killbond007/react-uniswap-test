import { call, fork, put, select, take, takeLatest } from 'redux-saga/effects'
import Torus from '@toruslabs/torus-embed'
import WalletConnectProvider from '@walletconnect/web3-provider'
import Web3Modal from 'web3modal'

import {
	CHANGE_ACCOUNT,
	CONNECT_WALLET,
	DISCONNECT_WALLET,
	STARTUP,
	changeAccountFailure,
	changeAccountSuccess,
	connectWalletFailure,
	connectWalletSuccess,
	disconnectWalletFailure,
	disconnectWalletSuccess,
	startupFailure,
	startupSuccess,
} from 'modules/root/actions/rootActions'
import { FETCH_BUNDLE_SUCCESS, fetchBundle } from 'shared/actions/i18nActions'

import { connectWalletService, disconnectWalletService } from 'modules/root/services/connectServices'

const providerOptions = {
	walletconnect: {
		package: WalletConnectProvider,
		options: { infuraId: '70a9114ade51406dae576911ec1d6c92' },
	},
	torus: { package: Torus },
}

function* watchStartup() {
	yield takeLatest(STARTUP, startupSaga)
}

export function* startupSaga() {
	try {
		yield put(fetchBundle('root'))
		yield take(({ type, payload }) => type === FETCH_BUNDLE_SUCCESS && payload.namespace === 'root')

		let web3Modal
		web3Modal = new Web3Modal({ network: 'mainnet', cacheProvider: true, providerOptions })

		if (web3Modal.cachedProvider) {
			const [web3, eth] = yield call(connectWalletService, web3Modal)

			yield put(connectWalletSuccess(web3, web3Modal, eth))
		}

		yield put(startupSuccess())
	} catch (err) {
		yield put(startupFailure(err))
	}
}

function* watchConnectWallet() {
	yield takeLatest(CONNECT_WALLET, connectWalletSaga)
}

export function* connectWalletSaga() {
	try {
		const web3Modal = new Web3Modal({ network: 'mainnet', cacheProvider: true, providerOptions })

		const [web3, eth] = yield call(connectWalletService, web3Modal)

		yield put(connectWalletSuccess(web3, web3Modal, eth))
	} catch (err) {
		yield put(connectWalletFailure(err))
	}
}

function* watchDisconnectWallet() {
	yield takeLatest(DISCONNECT_WALLET, disconnectWalletSaga)
}

export function* disconnectWalletSaga() {
	try {
		const { web3, web3Modal } = yield select((state) => state?.root)

		yield call(disconnectWalletService, web3, web3Modal)

		yield put(disconnectWalletSuccess())
	} catch (err) {
		yield put(disconnectWalletFailure(err))
	}
}

function* watchChangeAccount() {
	yield takeLatest(CHANGE_ACCOUNT, changeAccountSaga)
}

export function* changeAccountSaga() {
	try {
		const { web3, web3Modal } = yield select((state) => state?.root)

		yield call(disconnectWalletService, web3, web3Modal)
		web3Modal._toggleModal()

		yield put(changeAccountSuccess())
	} catch (err) {
		yield put(changeAccountFailure(err))
	}
}

export default function* rootSaga() {
	yield fork(watchStartup)
	yield fork(watchConnectWallet)
	yield fork(watchDisconnectWallet)
	yield fork(watchChangeAccount)
}
