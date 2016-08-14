import Immutable from 'immutable';
import ServerRecord from './ServerRecord';

export default new Immutable.Record(
	{
		currentServer: new ServerRecord(),
		servers : new Immutable.List()
	},
	"Settings"
);
