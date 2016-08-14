import {Record, List} from "immutable";
import QueryRecord from "./QueryRecord";
export default new Record(
	{
		currentQuery: new QueryRecord(),
		queries     : new List()
	},
	"Queries"
);
