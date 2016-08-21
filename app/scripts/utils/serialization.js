import transit from "transit-immutable-js";
import QueriesRecord from "scripts/records/QueriesRecord";
import QueryRecord from "scripts/records/QueryRecord";
import {ServerRecord} from "scripts/records/ServerRecord";
import SettingsRecord from "scripts/records/SettingsRecord";
import NavStateRecord from "scripts/records/NavStateRecord";
import Immutable from "seamless-immutable";
const etransit = transit.withRecords([QueriesRecord, QueryRecord, ServerRecord, SettingsRecord, NavStateRecord]);
import throttle from "lodash/throttle";

export function parseState(state) {
	return Immutable(JSON.parse(state));
}

export function convertFromVersion1(state) {
	const oldState = state ? etransit.fromJSON(state) : null;

	if (oldState && oldState.queries && oldState.settings && oldState.navstate) {
		const newState = {};
		newState.queries = oldState.queries.toJS();
		newState.settings = oldState.settings.toJS();
		newState.navstate = oldState.navstate.toJS();

		return Immutable(newState);
	}
	return null;
}

export const saveState = throttle((state) => {
	/*eslint no-undef:0*/
	chrome.storage.local.set(
		{
			state: {
				version: 2,
				data  : JSON.stringify(state)
			}
		}
	);
//	12 localStorage.setItem({state: stateToJSON(state)});
}, 500, { leading: true});

export function loadState(callback) {
	/*eslint no-undef:0*/
	return chrome.storage.local.get("state", (obj) => {
			const {state}  = obj || {};
			// successfully loaded current state
			if (state && state.version === 2) {
				return callback(parseState(state.data));
			}

			return callback(null);
		}
	);
}

export function loadStateVersion1(callback) {
	// new state not available, so try and load the new state
	/*eslint no-undef:0*/
	return chrome.storage.local.get("state", (obj) => {
		const {state} = obj || {};
		if (state) {
			const newState = convertFromVersion1(state);

			return callback(newState);
		}
		// no previous state
		return callback(null);
	});
}

