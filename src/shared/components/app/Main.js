import { PropTypes } from 'prop-types'
import React, { Suspense } from 'react'

import Header from 'shared/components/header/Header'
import Loader from 'shared/components/loader/Loader'

import * as Styled from './__styles__/Main.styles'

const Main = ({ children }) => {
	return (
		<Styled.Root>
			<Suspense path="/" fallback={<Loader />}>
				<Header />
				{children}
			</Suspense>
		</Styled.Root>
	)
}

Main.propTypes = {
	/** Defines the content of main. */
	children: PropTypes.node,
}

Main.defaultProps = {
	children: null,
}

export default Main
