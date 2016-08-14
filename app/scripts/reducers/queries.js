import {handleActions} from 'redux-actions';
import {
	UPDATE_CURRENT_QUERY,
	DELETE_QUERY,
	SAVE_CURRENT_QUERY
} from 'actions/QueryActions';
import QueriesRecord from 'records/QueriesRecord';
import QueryRecord from 'records/QueryRecord';


const initialState = new QueriesRecord();

export default  handleActions({
	[SAVE_CURRENT_QUERY]: (state, action) => {
		return state.withMutations(newState => {
			return newState.setIn(['queries'], newState.queries.unshift(state.currentQuery))
		});
	},
	[UPDATE_CURRENT_QUERY]        : (state, action) => {
		const name      = action.payload.name != null ? action.payload.name : state.currentQuery.name;
		const query     = action.payload.query != null ? action.payload.query : state.currentQuery.query;
		const variables = action.payload.variables != null ? action.payload.variables : state.currentQuery.variables;
		return state.set('currentQuery', new QueryRecord({
				name,
				query,
				variables
			}
		));
	},
	[DELETE_QUERY]                : (state, action) => {
		return state.withMutations(newState => {
			return newState.setIn(['queries'], newState.queries.delete(action.payload.index))
		});
	},
}, initialState)
