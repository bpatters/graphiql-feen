import Immutable from "seamless-immutable";

export default (
	(values = {
		name     : "",
		query    : "",
		variables: ""
	}) => Immutable(values)
);
