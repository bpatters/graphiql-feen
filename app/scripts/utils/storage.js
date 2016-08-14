import {stateToJSON} from 'scripts/utils/serialization';

function saveState(state) {
	chrome.storage.local.set({state:stateToJSON(state)});
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
