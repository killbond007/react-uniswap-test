export const STARTUP = 'root/startup'
export const STARTUP_SUCCESS = 'root/startupSuccess'
export const STARTUP_FAILURE = 'root/startupFailure'

export const CONNECT_WALLET = 'CONNECT_WALLET'
export const CONNECT_WALLET_SUCCESS = 'CONNECT_WALLET_SUCCESS'
export const CONNECT_WALLET_FAILURE = 'CONNECT_WALLET_FAILURE'

export const DISCONNECT_WALLET = 'DISCONNECT_WALLET'
export const DISCONNECT_WALLET_SUCCESS = 'DISCONNECT_WALLET_SUCCESS'
export const DISCONNECT_WALLET_FAILURE = 'DISCONNECT_WALLET_FAILURE'

export const CHANGE_ACCOUNT = 'CHANGE_ACCOUNT'
export const CHANGE_ACCOUNT_SUCCESS = 'CHANGE_ACCOUNT_SUCCESS'
export const CHANGE_ACCOUNT_FAILURE = 'CHANGE_ACCOUNT_FAILURE'

export const startup = () => {
	return {
		type: STARTUP,
	}
}

export const startupSuccess = () => {
	return {
		type: STARTUP_SUCCESS,
	}
}

export const startupFailure = (err) => {
	return {
		type: STARTUP_FAILURE,
		payload: {
			error: err,
			errorString: err && err.toString(),
		},
	}
}

export const connectWallet = () => {
	return {
		type: CONNECT_WALLET,
	}
}

export const connectWalletSuccess = (web3, web3Modal, eth) => {
	return {
		type: CONNECT_WALLET_SUCCESS,
		payload: { web3, web3Modal, eth },
	}
}

export const connectWalletFailure = (err) => {
	return {
		type: CONNECT_WALLET_FAILURE,
		payload: {
			error: err,
			errorString: err && err.toString(),
		},
	}
}

export const disconnectWallet = () => {
	return {
		type: DISCONNECT_WALLET,
	}
}

export const disconnectWalletSuccess = () => {
	return {
		type: DISCONNECT_WALLET_SUCCESS,
	}
}

export const disconnectWalletFailure = (err) => {
	return {
		type: DISCONNECT_WALLET_FAILURE,
		payload: {
			error: err,
			errorString: err && err.toString(),
		},
	}
}

export const changeAccount = () => {
	return {
		type: CHANGE_ACCOUNT,
	}
}

export const changeAccountSuccess = () => {
	return {
		type: CHANGE_ACCOUNT_SUCCESS,
	}
}

export const changeAccountFailure = (err) => {
	return {
		type: CHANGE_ACCOUNT_FAILURE,
		payload: {
			error: err,
			errorString: err && err.toString(),
		},
	}
}
