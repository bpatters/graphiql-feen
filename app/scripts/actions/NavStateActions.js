import {createAction} from 'redux-actions';


export const NAVSTATE_TOGGLE_LEFT_PANEL = 'NAVSTATE_TOGGLE_LEFT_PANEL';

export const toggleLeftPanelAction = createAction(NAVSTATE_TOGGLE_LEFT_PANEL);

export function toggleLeftPanel() {
	return function (dispatch) {
		dispatch(toggleLeftPanelAction());
	}
}
