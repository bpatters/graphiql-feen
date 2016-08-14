import transit from 'transit-immutable-js';
import QueriesRecord from 'scripts/records/QueriesRecord'
import QueryRecord from 'scripts/records/QueryRecord'
import ServerRecord from 'scripts/records/ServerRecord'
import SettingsRecord from 'scripts/records/SettingsRecord'
import NavStateRecord from 'scripts/records/NavStateRecord'
let etransit = transit.withRecords([QueriesRecord, QueryRecord, ServerRecord, SettingsRecord, NavStateRecord]);

function saveState(state) {
	chrome.storage.local.set({state: etransit.toJSON(state)});
//	localStorage.setItem({state: etransit.toJSON(state)});
}
export default function () {
	return next => (reducer, initialState) => {
		const store = next(reducer, initialState);
		store.subscribe(() => {
			const state = store.getState();
			saveState(state);
		});
		return store;
	};
}
