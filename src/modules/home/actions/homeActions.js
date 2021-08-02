export const STARTUP = 'home/startup'
export const STARTUP_SUCCESS = 'home/startupSuccess'
export const STARTUP_FAILURE = 'home/startupFailure'

export const startup = () => {
	return {
		type: STARTUP,
	}
}

export const startupSuccess = (activeStudies, closedStudies) => {
	return {
		type: STARTUP_SUCCESS,
		payload: { activeStudies, closedStudies },
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
