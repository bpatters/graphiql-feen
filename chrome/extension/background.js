/*eslint no-undef:0*/
/*eslint extra-rules/no-commented-out-code:0*/

const bluebird = require("bluebird");
global.Promise = bluebird;
import {ServerRecord} from "scripts/model/ServerRecord";

let currentServer = new ServerRecord();
function promisifier(method) {
	// return a function
	return function promisified(...args) {
		// which returns a promise
		return new Promise(resolve => {
			args.push(resolve);
			method.apply(this, args);
		});
	};
}

function promisifyAll(obj, list) {
	list.forEach(api => bluebird.promisifyAll(obj[api], {promisifier}));
}

// let chrome extension api support Promise
promisifyAll(chrome, [
	"tabs",
	"windows",
	"browserAction"
]);

promisifyAll(chrome.storage, [
	"local"
]);
const appendHeadersFunction = function(details) {
	for (const name in currentServer.headers) {
		if (currentServer.headers.hasOwnProperty(name)) {
			if (!details.requestHeaders.includes(name)) {
				details.requestHeaders.push({name, value: currentServer.headers[name]});
			}
		}
	}
};
const replaceHeadersFunction = function (details) {
	//const bkp = chrome.extension.getBackgroundPage();
//	bkp.console.log(`${JSON.stringify(details.requestHeaders)}`);
//	bkp.console.log(`${JSON.stringify(currentServer.headers)}`);

	for (let i = 0; i < details.requestHeaders.length; ++i) {
		const name = details.requestHeaders[i].name;
		if (currentServer.headers.hasOwnProperty(name)) {
			details.requestHeaders[i].value = currentServer.headers[name];
//			bkp.console.log(`Setting header ${name} = ${currentServer.headers[name]}`);
		}
	}
	appendHeadersFunction(details);
	return {requestHeaders: details.requestHeaders};
};

chrome.browserAction.onClicked.addListener(() => {
	chrome.webRequest.onBeforeSendHeaders.removeListener(replaceHeadersFunction);
	chrome.tabs.create({
		url: "/index.html"
	}, (tab) => {
		chrome.webRequest.onBeforeSendHeaders.addListener(replaceHeadersFunction,
			{
				urls : ["*://*/*"],
				tabId: tab.id
			},
			["blocking", "requestHeaders"]
		);
	});
});

chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse) {
		//const bkp = chrome.extension.getBackgroundPage();
		if (request.type === "DOWNLOAD") {
			//bkp.console.log("Received request to download state");
			const url = `data:application/json;base64,${btoa(request.state)}`;
			chrome.downloads.download({
				url,
				filename: "graphiqlfeen.json"
			});
			sendResponse({response: "ok"});
		} else if (request.type === "SERVER") {
			//bkp.console.log(`Received request to update currentServer=${request.currentServer} currentServerJSON = ${JSON.stringify(request.currentServer)} `);
			currentServer = request.currentServer;
		}
	});
