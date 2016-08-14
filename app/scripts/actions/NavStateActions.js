import {createAction} from 'redux-actions';


export const NAVSTATE_OPEN_LEFT_PANEL = 'NAVSTATE_OPEN_LEFT_PANEL';
export const NAVSTATE_CLOSE_LEFT_PANEL = 'NAVSTATE_CLOSE_LEFT_PANEL';
export const NAVSTATE_TOGGLE_LEFT_PANEL = 'NAVSTATE_TOGGLE_LEFT_PANEL';

export const openLeftPanelAction = createAction(NAVSTATE_OPEN_LEFT_PANEL);
export const closeLeftPanelAction = createAction(NAVSTATE_CLOSE_LEFT_PANEL);
export const toggleLeftPanelAction = createAction(NAVSTATE_TOGGLE_LEFT_PANEL);


export function openLeftPanel() {
	return function (dispatch) {
		dispatch(openLeftPanelAction(true));
	}
}
export function closeLeftPanel() {
	return function (dispatch) {
		dispatch(openLeftPanelAction(false));
	}
}
export function toggleLeftPanel() {
	return function (dispatch) {
		dispatch(toggleLeftPanelAction(true));
	}
}
