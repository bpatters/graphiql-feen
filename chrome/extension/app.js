/*eslint no-undef:0*/
import React from "react";
import ReactDOM from "react-dom";
import Root from "scripts/bootstrap.js";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import injectTapEventPlugin from "react-tap-event-plugin";
import createStore from "scripts/configureStore";
import {loadState, loadStateVersion1} from "scripts/utils/serialization";

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

loadState(state => {
	const go = (initialState) => {
		let store;
		if (initialState) {
			store = createStore(initialState);
		} else {
			store = createStore();
		}

		ReactDOM.render(
			<MuiThemeProvider>
				<Root store={store}/>
			</MuiThemeProvider>,
			document.querySelector("#root")
		);
	};

	// if new state format is null attempt to load old format
	if (state) {
		return go(state);
	}

	return loadStateVersion1((stateV1) => {
		return go(stateV1);
	});
});
