import {handleActions} from "redux-actions";
import SettingsRecord from "records/SettingsRecord";
import {Map} from "immutable";

import {
	SAVE_CURRENT_SERVER,
	DELETE_CURRENT_SERVER,
	SAVE_SERVER_URL,
	ADD_SERVER_HEADER,
	DELETE_SERVER_HEADER,
	ADD_SERVER_COOKIE,
	DELETE_SERVER_COOKIE,
	SELECT_SERVER
} from "actions/SettingsActions";

const initialState = new SettingsRecord();

export default  handleActions({
	[SAVE_CURRENT_SERVER]  : (state) => {
		return state.withMutations(newState => {
			return newState.setIn(["servers"], newState.servers.unshift(state.currentServer));
		});
	},
	[DELETE_CURRENT_SERVER]: (state, action) => {
		return state.withMutations(newState => {
			return newState.setIn(["servers"], newState.servers.delete(action.payload.index));
		});
	},
	[SAVE_SERVER_URL]      : (state, action) => {
		return state.set("currentServer", state.currentServer.withMutations(newState => {
			return newState.set("url", action.payload.url);
		}));
	},
	[ADD_SERVER_HEADER]    : (state, action) => {
		return state.set("currentServer", state.currentServer.withMutations(newState => {
			return newState.mergeIn(["headers"], new Map(action.payload.header));
		}));
	},
	[DELETE_SERVER_HEADER] : (state, action) => {
		return state.set("currentServer", state.currentServer.withMutations(newState => {
			return newState.deleteIn(["headers"], action.payload.key);
		}));
	},
	[ADD_SERVER_COOKIE]    : (state, action) => {
		return state.set("currentServer", state.currentServer.withMutations(newState => {
			return newState.mergeIn(["cookies"], new Map(action.payload.cookie));
		}));
	},
	[DELETE_SERVER_COOKIE] : (state, action) => {
		return state.set("currentServer", state.currentServer.withMutations(newState => {
			return newState.deleteIn(["cookies"], action.payload.key);
		}));
	},
	[SELECT_SERVER]        : (state, action) => {
		return state.set("currentServer", action.payload.server);
	}
}, initialState);
