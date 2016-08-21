import Immutable from "seamless-immutable";
import {ServerRecord} from "./ServerRecord";

export default (
	(values = {
		currentServer: new ServerRecord(),
		servers      : new Immutable({})
	}) => Immutable(values)
);
