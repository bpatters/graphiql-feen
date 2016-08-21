import {handleActions} from "redux-actions";
import {
	ADD_QUERY,
	UPDATE_CURRENT_QUERY,
	DELETE_QUERY,
	SAVE_CURRENT_QUERY
} from "actions/QueryActions";
import QueriesRecord from "model/QueriesRecord";
import QueryRecord from "model/QueryRecord";
import filter from "lodash/filter";


const initialState = new QueriesRecord();

export default  handleActions({
	[ADD_QUERY]           : (state, action) => {
		return state.merge({
			queries: state.queries.concat(new QueryRecord({
				name     : action.payload.query.name,
				query    : action.payload.query.query,
				variables: action.payload.query.variables
			}))
		});
	},
	[SAVE_CURRENT_QUERY]  : (state) => {
		return state.merge({queries: state.queries.concat(state.currentQuery)});
	},
	[UPDATE_CURRENT_QUERY]: (state, action) => {
		const name      = !action.payload.hasOwnProperty("name") ? state.currentQuery.name : action.payload.name;
		const query     = !action.payload.hasOwnProperty("query") ? state.currentQuery.query : action.payload.query;
		const variables = !action.payload.hasOwnProperty("variables") ? state.currentQuery.variables : action.payload.variables;
		return state.merge({
			currentQuery: new QueryRecord({
					name,
					query,
					variables
				}
			)
		});
	},
	[DELETE_QUERY]        : (state, action) => {
		return state.merge({queries: filter(state.queries, (value, index) => index != action.payload.index)});
	}
}, initialState);
