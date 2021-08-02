import Web3 from 'web3'

import { CONNECT_WALLET_SUCCESS } from 'modules/root/actions/rootActions'

import { store } from 'shared/components/Root'

export const connectWalletService = async (web3Modal) => {
	const provider = await web3Modal.connect()
	provider.on('accountsChanged', async (accounts) => {
		console.log('accountsChanged:', accounts)
		const web3 = new Web3(provider)
		const balance = await web3.eth.getBalance(accounts[0])
		store.dispatch({
			type: CONNECT_WALLET_SUCCESS,
			payload: { web3, web3Modal, eth: { eth: web3.utils.fromWei(balance, 'ether') } },
		})
	})

	provider.on('chainChanged', (chainId) => {
		console.log('chainChanged:', chainId)
	})

	provider.on('connect', (info) => {
		console.log('connect:', info)
	})

	provider.on('disconnect', (error) => {
		console.log('disconnect:', error)
	})

	const allCounts = await new Web3(provider).eth.getAccounts()

	const address = allCounts[0] // DAI
	const web3 = new Web3(provider)
	const balance = await web3.eth.getBalance(address)

	return [new Web3(provider), { eth: web3.utils.fromWei(balance, 'ether') }]
}

export const disconnectWalletService = async (web3, web3Modal) => {
	if (web3 && web3.currentProvider && web3.currentProvider.close) {
		await web3.currentProvider.close()
	}
	await web3Modal.clearCachedProvider()
}
