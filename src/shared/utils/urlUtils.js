/**
 * Combines an endpoint name and base URL name to construct the correct URL to query an API, based on environment variables.
 * @param {string} key        Name of the environment variable containing the API endpoint path.
 * @param {object} options    Optional object that contains key/value pairs to replace endpoint dynamic properties.
 * @param {string} apiUrl     Optional base url string.
 * @returns {string} The formatted url.
 */
export const resolveApiUrl = (key, options = null, apiUrl) => {
	let endpoint = process.env[key]
	const baseUrl = apiUrl || process.env.REACT_APP_BASE_URL

	if (endpoint) {
		if (options) {
			Object.keys(options).forEach((key) => {
				const value = options[key]
				endpoint = endpoint.replace(new RegExp(`{{${key}}}`, 'g'), value)
			})
		}
		return `${baseUrl}${process.env.REACT_APP_API_ROUTE}${endpoint}`
	}
	throw new Error(`${key} not found in env variables`)
}
