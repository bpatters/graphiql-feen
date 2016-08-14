/*eslint no-undef:0*/
/*eslint extra-rules/no-commented-out-code:0*/

const bluebird = require("bluebird");
global.Promise = bluebird;

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

chrome.browserAction.onClicked.addListener(() => {
	chrome.tabs.create({
		url: "/index.html"
	});
});


chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse) {
		const url = `data:application/json;base64,${btoa(request.state)}`;
		chrome.downloads.download({
			url,
			filename: "graphiqlfeen.json"
		});
		sendResponse({farewell: "goodbye"});
	});
//
// chrome.webRequest.onBeforeSendHeaders.addListener(
// 	function (details) {
// 		const bkp = chrome.extension.getBackgroundPage();
// 		bkp.console.log(`${JSON.stringify(details.requestHeaders)}`);
// 		for (let i = 0; i < details.requestHeaders.length; ++i) {
//
// 			if (details.requestHeaders[i].name === "Origin") {
// 				details.requestHeaders.splice(i, 1);
// 				break;
// 			}
// 		}
// 		return {requestHeaders: details.requestHeaders};
// 	},
// 	{urls: ["*://*/*"]},
// 	["blocking", "requestHeaders"]
// );
