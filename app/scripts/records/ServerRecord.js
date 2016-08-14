import {Map, Record} from "immutable";

export default new Record(
	{
		url    : "",
		headers: new Map(),
		cookies: new Map(),
		authorization: true
	},
	"Server"
);
