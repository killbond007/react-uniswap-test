import { Card } from 'antd'
import { useSelector } from 'react-redux'
import React from 'react'

import { selectIsReady } from 'modules/home/selectors/homeSelectors'

import Loader from 'shared/components/loader/Loader'
import Page from 'shared/components/page/Page'

const HomePage = () => {
	const isReady = useSelector(selectIsReady)
	const { tokens } = useSelector((state) => state?.root)

	return isReady ? (
		<Page id="home">
			<Card title="Eth" style={{ width: 300, margin: '100px auto' }}>
				<p>{tokens?.eth}</p>
			</Card>
		</Page>
	) : (
		<Loader />
	)
}

export default HomePage
