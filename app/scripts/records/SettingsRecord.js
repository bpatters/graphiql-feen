import {Map as ImmutableMap, Record} from "immutable";
import {ServerRecord} from "./ServerRecord";

export default new Record(
	{
		currentServer: new ServerRecord(),
		servers : new ImmutableMap() // this is a url --> ServerRecord
	},
	"Settings"
);
