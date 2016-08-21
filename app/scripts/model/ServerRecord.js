import Immutable from "seamless-immutable";

const GET       = "GET";
const POST      = "POST";
const MULTIPART = "MULTIPART";

const ServerRecord = (
	(values = {
		method       : MULTIPART,
		url          : "",
		headers      : Immutable({}),
		cookies      : Immutable({}),
		authorization: true
	}) => Immutable(values)
);

export {ServerRecord, GET, POST, MULTIPART};
