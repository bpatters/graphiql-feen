import transit from "transit-immutable-js";
import QueriesRecord from "scripts/records/QueriesRecord";
import QueryRecord from "scripts/records/QueryRecord";
import ServerRecord from "scripts/records/ServerRecord";
import SettingsRecord from "scripts/records/SettingsRecord";
import NavStateRecord from "scripts/records/NavStateRecord";
const etransit = transit.withRecords([QueriesRecord, QueryRecord, ServerRecord, SettingsRecord, NavStateRecord]);


export function stateToJSON(state) {
	return etransit.toJSON(state);
}

export function stateFromJSON(json) {
	return json ? etransit.fromJSON(json) : null;
}
