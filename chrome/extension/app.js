/*eslint no-undef:0*/
import React from "react";
import ReactDOM from "react-dom";
import Root from "scripts/bootstrap.js";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import injectTapEventPlugin from "react-tap-event-plugin";
import createStore from "scripts/configureStore";
import {loadState, loadPreviousVersionState} from "scripts/utils/serialization";

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

loadState(state => {
	const go = (initialState) => {
		let store;
		if (initialState) {
			console.log(`initial state: ${JSON.stringify(initialState)}`);
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
		console.log("Success loading current version state");
		return go(state);
	} else {
		console.log("Loading previous version state");
		return loadPreviousVersionState((state) => {
			return go(state);
		})
	}
});
