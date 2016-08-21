import transit from "transit-immutable-js";
import QueriesRecord from "scripts/records/QueriesRecord";
import QueryRecord from "scripts/records/QueryRecord";
import {ServerRecord} from "scripts/records/ServerRecord";
import SettingsRecord from "scripts/records/SettingsRecord";
import NavStateRecord from "scripts/records/NavStateRecord";
import Immutable from "seamless-immutable";
const etransit = transit.withRecords([QueriesRecord, QueryRecord, ServerRecord, SettingsRecord, NavStateRecord]);

export function imToJSON(state) {
	return etransit.toJSON(state);
}

export function imFromJSON(json) {
	return json ? etransit.fromJSON(json) : null;
}

export function saveState(state, callback) {
	chrome.storage.local.set(
		{
			v2: JSON.stringify(state)
		}
	);
//	localStorage.setItem({state: stateToJSON(state)});
}

export function loadState(callback) {
	return chrome.storage.local.get("v2", (state) => {
			console.log(`loaded state: ${JSON.stringify(state)}`);
			// successfully loaded current state
			if (state && state.v2) {
				return callback(Immutable(JSON.parse(state.v2)));
			}

			return callback(null)

		}
	);
}

export function convertFromPreviousState(state) {
	const oldState = imFromJSON(state);

	if (oldState.queries && oldState.settings && oldState.navstate) {
		let newState = {};
		newState.queries = oldState.queries.toJS();
		newState.settings = oldState.settings.toJS();
		newState.navstate = oldState.navstate.toJS();

		return Immutable(newState);
	}
	return null;
}

export function loadPreviousVersionState(callback) {
	// new state not available, so try and load the new state
	return chrome.storage.local.get("state", (obj) => {
		const {state} = obj || {};
		if (state) {
			console.log(`loaded previous state: ${state}`);
			let newState = convertFromPreviousState(state);

			return callback(newState);
		}
		// no previous state
		return callback(null);
	});
}


