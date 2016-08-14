/*eslint no-undef:0*/
/*eslint extra-rules/no-commented-out-code:0*/
import {stateToJSON} from "scripts/utils/serialization";

function saveState(state) {
	chrome.storage.local.set({state: stateToJSON(state)});
//	localStorage.setItem({state: stateToJSON(state)});
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
