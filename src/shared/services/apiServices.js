import { startsWith } from 'lodash'
import axios from 'axios'

export const requestService = async (url, options = null) => {
	try {
		options = options || {
			method: 'GET',
			query: null,
			body: null,
			headers: {},
		}

		const response = await axios(url, {
			headers: options.headers,
			method: options.method,
			data: options.body,
			params: options.query,
			responseType: options.responseType,
			withCredentials: true,
		})

		if (startsWith(response.status, 2)) {
			return {
				body: response.data,
				status: response.status,
				headers: response.headers,
			}
		} else {
			throw new HttpError(response.statusText, response.status)
		}
	} catch (err) {
		throw new HttpError(err, err?.response?.status)
	}
}

class HttpError extends Error {
	constructor(body, status) {
		super(`HttpError: ${JSON.stringify(body)}`)
		this.body = body
		this.status = status
	}

	toString() {
		return this.message
	}
}
