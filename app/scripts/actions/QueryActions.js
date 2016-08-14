import {createAction} from 'redux-actions';


export const UPDATE_CURRENT_QUERY = 'UPDATE_QUERY';
export const SAVE_CURRENT_QUERY   = 'SAVE_CURRENT_QUERY';
export const DELETE_QUERY         = 'DELETE_QUERY';

export const updateCurrentQueryAction = createAction(UPDATE_CURRENT_QUERY);
export const saveCurrentQueryAction   = createAction(SAVE_CURRENT_QUERY);
export const deleteQueryAction        = createAction(DELETE_QUERY);

export function updateCurrentQuery(query) {
	return updateCurrentQueryAction(query);
}

export function saveCurrentQuery() {
	return saveCurrentQueryAction();
}

export function deleteQuery(index) {
	return deleteQueryAction({index});
}
