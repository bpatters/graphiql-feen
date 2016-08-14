import Immutable from 'immutable';
import QueryRecord from './QueryRecord';
export default new Immutable.Record(
	{
		currentQuery : new QueryRecord(),
		queries: new Immutable.List()
	}
);
