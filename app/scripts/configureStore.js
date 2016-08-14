import { batchedSubscribe } from "redux-batched-subscribe";
import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import createLogger from "redux-logger";
import rootReducer from "reducers";
import storage from "scripts/utils/storage";
import {IMPORT_STATE, makeImportable} from "scripts/utils/importableState";
/*eslint camelcase:0 */
import { unstable_batchedUpdates as batchedUpdates } from "react-dom";

const loggerMiddleware = createLogger();

export default function (initialState) {
	const finalCreateStore = compose(
		applyMiddleware(thunkMiddleware, loggerMiddleware),
		storage(),
		batchedSubscribe(batchedUpdates)
	)(createStore);

	const store = finalCreateStore(makeImportable(rootReducer, IMPORT_STATE), initialState);

	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept("./reducers", () => {
			const nextRootReducer = require("./reducers/index").default;
			store.replaceReducer(nextRootReducer);
		});
	}

	return store;
}
