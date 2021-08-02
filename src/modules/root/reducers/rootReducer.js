import produce from 'immer'

import { CONNECT_WALLET_SUCCESS, DISCONNECT_WALLET_SUCCESS, STARTUP_SUCCESS } from 'modules/root/actions/rootActions'

const initialState = {
	isReady: false,
	web3: {},
	web3Modal: {},
}

export default (state, action) => {
	return produce(state || initialState, (draft) => {
		switch (action.type) {
			case STARTUP_SUCCESS: {
				draft.isReady = true
				break
			}

			case CONNECT_WALLET_SUCCESS: {
				draft.web3 = action.payload.web3
				draft.web3Modal = action.payload.web3Modal
				draft.tokens = action.payload.eth
				break
			}

			case DISCONNECT_WALLET_SUCCESS: {
				draft.web3 = null
				draft.web3Modal = null
				draft.tokens = null
				break
			}

			default: {
				//do nothing
			}
		}
	})
}
