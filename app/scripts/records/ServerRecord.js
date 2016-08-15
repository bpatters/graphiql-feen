import {Map, Record} from "immutable";

const GET = "GET";
const POST = "POST";
const MULTIPART = "MULTIPART";

const ServerRecord = new Record(
	{
		method : MULTIPART,
		url    : "",
		headers: new Map(),
		cookies: new Map(),
		authorization: true
	},
	"Server"
);

export {ServerRecord, GET, POST, MULTIPART };
