import { startup } from 'modules/root/actions/rootActions'
import rootReducer from 'modules/root/reducers/rootReducer'
import rootSaga from 'modules/root/sagas/rootSaga'

const rootModule = {
	id: 'root',
	reducerMap: {
		root: rootReducer,
	},
	sagas: [rootSaga],
	initialActions: [startup()],
}

export default rootModule
