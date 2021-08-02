import { useSelector } from 'react-redux'
import React, { Suspense, lazy } from 'react'

import { selectIsAppReady } from 'modules/root/selectors/rootSelectors'

import ErrorBoundary from 'shared/components/error/ErrorBoundary'
import Loader from 'shared/components/loader/Loader'
import Main from 'shared/components/app/Main'

import * as Styled from './__styles__/App.styles'

const HomePage = lazy(() => import(/* webpackPrefetch: true */ 'modules/home'))

const App = () => {
	const { web3 } = useSelector((state) => state?.root)

	const isAppReady = useSelector(selectIsAppReady)

	const address = web3?.currentProvider?.accounts?.[0] || web3?.currentProvider?.selectedAddress

	let AuthPage = () => <Styled.Title>Please connect to a wallet</Styled.Title>

	return isAppReady ? (
		<Styled.Root>
			<ErrorBoundary>
				<Suspense fallback={<Loader />}>
					<Styled.Router primary={false}>
						<Main path="/">{address ? <HomePage path="/" /> : <AuthPage path="/" />}</Main>
					</Styled.Router>
				</Suspense>
			</ErrorBoundary>
		</Styled.Root>
	) : (
		<Loader />
	)
}

export default App
