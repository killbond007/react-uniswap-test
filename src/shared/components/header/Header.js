import { Button, Dropdown, Menu } from 'antd'
import { DownOutlined, UserOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import React, { useCallback } from 'react'

import { changeAccount, connectWallet, disconnectWallet } from 'modules/root/actions/rootActions'

import * as Styled from './__styles__/Header.styles'

const Header = () => {
	const { web3 } = useSelector((state) => state?.root)
	const { t } = useTranslation('root')

	const dispatch = useDispatch()

	const _onConnectClick = useCallback(() => dispatch(connectWallet()), [dispatch])

	const _onChangeAccountClick = useCallback(() => dispatch(changeAccount()), [dispatch])

	const _onDisconnectClick = useCallback(() => dispatch(disconnectWallet()), [dispatch])

	const address = web3?.currentProvider?.accounts?.[0] || web3?.currentProvider?.selectedAddress

	return (
		<Styled.Root>
			<Menu mode="horizontal" defaultSelectedKeys={['2']}>
				<Menu.Item key="1">nav 1</Menu.Item>
				<Menu.Item key="2">nav 2</Menu.Item>
				<Menu.Item key="3">nav 3</Menu.Item>
			</Menu>
			{address ? (
				<Dropdown
					overlay={
						<Menu>
							<Menu.Item onClick={_onDisconnectClick}>Disconnect</Menu.Item>
							<Menu.Item onClick={_onChangeAccountClick}>Change Account</Menu.Item>
						</Menu>
					}
				>
					<a>
						<UserOutlined /> {address.slice(0, 5)}...${address.slice(-5)} <DownOutlined />
					</a>
				</Dropdown>
			) : (
				<Button onClick={_onConnectClick} type="primary">
					{t('root:connectButton')}
				</Button>
			)}
		</Styled.Root>
	)
}

export default Header
