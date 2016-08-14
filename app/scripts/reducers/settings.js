import {handleActions} from 'redux-actions';
import SettingsRecord from 'records/SettingsRecord';
import ServerRecord from 'records/ServerRecord';
import Immutable from 'immutable';

import {
	SAVE_CURRENT_SERVER,
	DELETE_SERVER,
	UPDATE_CURRENT_SERVER,
	SAVE_SERVER_URL,
	ADD_SERVER_HEADER,
	DELETE_SERVER_HEADER,
	ADD_SERVER_COOKIE,
	DELETE_SERVER_COOKIE,
} from 'actions/SettingsActions';

const initialState = new SettingsRecord();

export default  handleActions({
	[SAVE_CURRENT_SERVER]: (state, action) => {
		return state.withMutations(newState => {
			return newState.setIn(['servers'], newState.servers.unshift(state.currentServer))
		});
	},
	[DELETE_SERVER]      : (state, action) => {
		return state.withMutations(newState => {
			return newState.setIn(['servers'], newState.servers.delete(action.payload.index))
		});
	},
	[SAVE_SERVER_URL]    : (state, action) => {
		return state.set('currentServer', state.currentServer.withMutations(newState => {
			return newState.set('url', action.payload.url)
		}));
	},
	[ADD_SERVER_HEADER]  : (state, action) => {
		return state.set('currentServer', state.currentServer.withMutations(newState => {
			return newState.mergeIn(['headers'], new Immutable.Map(action.payload.header))
		}));
	},
	[DELETE_SERVER_HEADER]  : (state, action) => {
		return state.set('currentServer', state.currentServer.withMutations(newState => {
			return newState.deleteIn(['headers'], action.payload.key)
		}));
	},
	[ADD_SERVER_COOKIE]  : (state, action) => {
		return state.set('currentServer', state.currentServer.withMutations(newState => {
			return newState.mergeIn(['cookies'], new Immutable.Map(action.payload.cookie))
		}));
	},
	[DELETE_SERVER_COOKIE]  : (state, action) => {
		return state.set('currentServer', state.currentServer.withMutations(newState => {
			return newState.deleteIn(['cookies'], action.payload.key)
		}));
	}
}, initialState)
