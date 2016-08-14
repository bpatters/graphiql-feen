import React from 'react';
import ReactDOM from 'react-dom';
import Root from 'scripts/bootstrap.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import createStore from 'scripts/configureStore';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

chrome.storage.local.get('state', obj => {
	const {state} = obj || {};
	const initialState = JSON.parse(state || '{}');

	ReactDOM.render(
		<MuiThemeProvider>
			<Root store={createStore(initialState)}/>
		</MuiThemeProvider>,
		document.querySelector('#root')
	);
});
