/** File created for you by @ljn/cli. YOU CAN EDIT THIS FILE.
 * Your changes to this file will be preserved in the future. */

Object.defineProperty(window, 'matchMedia', {
	value: () => {
		return {
			matches: false,
			addListener: () => {},
			removeListener: () => {},
		}
	},
})
