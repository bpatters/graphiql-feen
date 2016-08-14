import React from 'react';
import ReactDOM from 'react-dom';
import Root from 'scripts/bootstrap.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import createStore from 'scripts/configureStore';
import transit from 'transit-immutable-js';
import QueriesRecord from 'scripts/records/QueriesRecord';
import QueryRecord from 'scripts/records/QueryRecord';
import ServerRecord from 'scripts/records/ServerRecord';
import SettingsRecord from 'scripts/records/SettingsRecord';
import NavStateRecord from 'scripts/records/NavStateRecord';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

chrome.storage.local.get('state', obj => {
	const {state} = obj || {};
//let state           = localStorage.getItem('state');
	const etransit     = transit.withRecords([QueriesRecord, QueryRecord, ServerRecord, SettingsRecord, NavStateRecord]);
	const initialState = !!state ? etransit.fromJSON(state) : {};
	let store;
	if (!!initialState) {
		store = createStore(initialState);
	} else {
		store = createStore();
	}
	console.log(document.querySelector('#root'));

	ReactDOM.render(
		<MuiThemeProvider>
			<Root store={store}/>
		</MuiThemeProvider>,
		document.querySelector('#root')
	);
});
