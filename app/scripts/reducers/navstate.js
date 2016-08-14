import {handleActions} from "redux-actions";
import NavStateRecord from "records/NavStateRecord";

import {
	NAVSTATE_TOGGLE_LEFT_PANEL
} from "actions/NavStateActions";

const initialState = new NavStateRecord();

export default  handleActions({
	[NAVSTATE_TOGGLE_LEFT_PANEL]: (state) => {
		return state.set("leftPanelOpen", !state.leftPanelOpen);
	}
}, initialState);
