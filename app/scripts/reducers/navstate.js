import {handleActions} from 'redux-actions';
import Immutable from 'immutable';
import {
	NAVSTATE_OPEN_LEFT_PANEL,
	NAVSTATE_CLOSE_LEFT_PANEL,
	NAVSTATE_TOGGLE_LEFT_PANEL
} from 'actions/NavStateActions';

const NavStateRecord = new Immutable.Record(
	{
		leftPanelOpen: false
	}
);
const QueryRecord    = new Immutable.Record(
	{
		navState: new NavStateRecord
	}
);

const initialState = new QueryRecord;

export default  handleActions({
	[NAVSTATE_OPEN_LEFT_PANEL]: (state, action) => {
		let newState = state.navState.withMutations(newState => {
			newState.set('leftPanelOpen',action.payload);
		});
		return state.set('navState', newState);
	},
	[NAVSTATE_CLOSE_LEFT_PANEL]: (state, action) => {
		let newState = state.navState.withMutations(newState => {
			newState.set('leftPanelOpen',action.payload);
		});
		return state.set('navState', newState);
	},
	[NAVSTATE_TOGGLE_LEFT_PANEL]: (state, action) => {
		let newState = state.navState.withMutations(newState => {
			newState.set('leftPanelOpen',!newState.leftPanelOpen);
		});
		return state.set('navState', newState);
	}
}, initialState)
