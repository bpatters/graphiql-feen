/*eslint no-undef:0*/
import React from "react";
import ReactDOM from "react-dom";
import Root from "scripts/bootstrap.js";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import injectTapEventPlugin from "react-tap-event-plugin";
import createStore from "scripts/configureStore";
import * as StateSerialization from "scripts/utils/serialization";

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

chrome.storage.local.get("state", obj => {
	const {state} = obj || {};
//let state           = localStorage.getItem("state");
	const initialState = StateSerialization.stateFromJSON(state);
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
});
