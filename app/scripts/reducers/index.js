import { combineReducers } from 'redux';
import queries from './queries';
import navstate from './navstate';
import settings from './settings';

const reducers = {
	queries,
	settings,
	navstate
};

const rootReducer = combineReducers({
	...reducers
});

export default rootReducer;
