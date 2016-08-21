/*eslint no-undef:0*/
/*eslint extra-rules/no-commented-out-code:0*/
import {saveState} from "scripts/utils/serialization";

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
