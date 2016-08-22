import assert from "assert";
import * as StateSerialization from "utils/serialization";
import NavStateRecord from "records/NavStateRecord";
import QueriesRecord from "records/QueriesRecord";
import {ServerRecord} from "records/ServerRecord";
import SettingsRecord from "records/SettingsRecord";
import Immutable from "seamless-immutable";


describe("convertFromVersion1", function () {
	const stateV1      = {
		queries : new QueriesRecord(),
		settings: new SettingsRecord(),
		navstate: new NavStateRecord()
	};
	stateV1.queries  = stateV1.queries.setIn(["currentQuery"], stateV1.queries.currentQuery.merge({
		name     : "testName",
		query    : "testQuery",
		variables: "testVariables"
	}));
	stateV1.queries  = stateV1.queries.setIn(["queries"], stateV1.queries.queries.unshift(stateV1.queries.currentQuery));
	stateV1.settings = stateV1.settings.setIn(["servers"], stateV1.settings.servers.merge({testUrl: new ServerRecord().merge({url: "testUrl"})}));
	const state       = StateSerialization.convertFromVersion1(StateSerialization.imToJSON(stateV1));

	it("should parse a version 1 state and have 1 saved query", function () {
		assert.equal(1, state.queries.queries.length);
	});

	it("current query should have properties name:testName, query:testQuery, variables:testVariables", function () {
		assert.equal("testName", state.queries.currentQuery.name);
		assert.equal("testQuery", state.queries.currentQuery.query);
		assert.equal("testVariables", state.queries.currentQuery.variables);
	});

	it("queries should have 1 query in it with properties name:testName, query:testQuery, variables:testVariables", function () {

		assert.equal("testName", state.queries.queries[0].name);
		assert.equal("testQuery", state.queries.queries[0].query);
		assert.equal("testVariables", state.queries.queries[0].variables);
	});

	it("settings should contain one server with url:testUrl", function () {
		assert.equal("testUrl", state.settings.servers.testUrl.url);
	});
});

describe("version 2 state", function () {
	it("should be able to parse the state", () => {
		const state       = Immutable({
			queries : [
				{name: "testName", query: "testName", variables: "testVariables"}
			],
			settings: {
				servers: {testUrl: {url: "testUrl", headers: [{name: "value"}]}}
			}
		});
		const savedState  = JSON.stringify(state);
		const loadedState = StateSerialization.parseState(savedState);
		assert.deepEqual(loadedState, state);
	});
});


