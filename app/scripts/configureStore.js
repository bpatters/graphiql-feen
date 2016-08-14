import { unstable_batchedUpdates as batchedUpdates } from 'react-dom';
import { batchedSubscribe } from 'redux-batched-subscribe';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from 'reducers';

const loggerMiddleware = createLogger();

export default function (initialState) {
	const finalCreateStore = compose(
		applyMiddleware(thunkMiddleware, loggerMiddleware),
		batchedSubscribe(batchedUpdates)
	)(createStore);

	const store = finalCreateStore(rootReducer, initialState);

	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('./reducers', () => {
			const nextRootReducer = require('./reducers/index').default;
			store.replaceReducer(nextRootReducer);
		});
	}

	return store;
}
