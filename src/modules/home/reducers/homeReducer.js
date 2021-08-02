import produce from 'immer'

import { STARTUP_SUCCESS } from 'modules/home/actions/homeActions'

export const initialState = {
	isReady: false,
}

export default (state, action) => {
	return produce(state || initialState, (draft) => {
		switch (action.type) {
			case STARTUP_SUCCESS: {
				draft.isReady = true
				break
			}

			default: {
				//do nothing
			}
		}
	})
}
