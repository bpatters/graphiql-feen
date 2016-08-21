import Immutable from "seamless-immutable";
import QueryRecord from "./QueryRecord";

export default (
	(values = {
		currentQuery: new QueryRecord(),
		queries     : new Immutable([])
	}) => Immutable(values)
);
