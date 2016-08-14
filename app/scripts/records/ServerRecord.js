import Immutable from 'immutable';

export default new Immutable.Record(
	{
		url    : '',
		headers: new Immutable.Map(),
		cookies: new Immutable.Map(),
		authorization: true
	},
	"Server"
);
