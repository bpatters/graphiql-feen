import {handleActions} from "redux-actions";
import SettingsRecord from "model/SettingsRecord";

import {
	SAVE_CURRENT_SERVER,
	DELETE_CURRENT_SERVER,
	SAVE_SERVER_URL,
	ADD_SERVER_HEADER,
	DELETE_SERVER_HEADER,
	ADD_SERVER_COOKIE,
	DELETE_SERVER_COOKIE,
	SET_SERVER_METHOD,
	SELECT_SERVER,
	updateBackgroundServer
} from "actions/SettingsActions";

const initialState = new SettingsRecord();

const reducer = handleActions({
	[SAVE_CURRENT_SERVER]  : (state) => {
		const newEntry                    = {};
		newEntry[state.currentServer.url] = state.currentServer;
		return state.merge({servers: state.servers.merge(newEntry)});
	},
	[DELETE_CURRENT_SERVER]: (state, action) => {
		return state.merge({servers: state.servers.without(action.payload.index)});
	},
	[SAVE_SERVER_URL]      : (state, action) => {
		const rv = state.merge({
			currentServer: state.currentServer.merge({
				url: action.payload.url
			})
		});
		updateBackgroundServer(rv.currentServer);
		return rv;
	},
	[ADD_SERVER_HEADER]    : (state, action) => {
		const rv = state.merge({
			currentServer: state.currentServer.merge({
				headers: state.currentServer.headers.merge(action.payload.header)
			})
		});
		updateBackgroundServer(rv.currentServer);
		return rv;
	},
	[DELETE_SERVER_HEADER] : (state, action) => {
		return state.merge({
			currentServer: state.currentServer.merge({
				headers: state.currentServer.headers.without(action.payload.key)
			})
		});
	},
	[ADD_SERVER_COOKIE]    : (state, action) => {
		const rv = state.merge({
			currentServer: state.currentServer.merge({
				cookies: state.currentServer.cookies.merge(action.payload.cookie)
			})
		});
		updateBackgroundServer(rv.currentServer);
		return rv;
	},
	[DELETE_SERVER_COOKIE] : (state, action) => {
		const rv = state.merge({
			currentServer: state.currentServer.merge({
				cookies: state.currentServer.cookies.without(action.payload.key)
			})
		});
		updateBackgroundServer(rv.currentServer);
		return rv;
	},
	[SET_SERVER_METHOD]    : (state, action) => {
		const rv = state.merge({
					currentServer: state.currentServer.merge({
						method: action.payload.method
					})
				});
		updateBackgroundServer(rv.currentServer);
		return rv;
	},
	[SELECT_SERVER]        : (state, action) => {
		const rv = state.merge({currentServer: action.payload.server});
		updateBackgroundServer(rv.currentServer);
		return rv;
	}
}, initialState);

export {reducer, updateBackgroundServer};
