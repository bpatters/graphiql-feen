const bluebird = require('bluebird');
global.Promise = bluebird;

const bkp = chrome.extension.getBackgroundPage();
bkp.console.log("loaded background.js");

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
	list.forEach(api => bluebird.promisifyAll(obj[api], { promisifier }));
}

// let chrome extension api support Promise
promisifyAll(chrome, [
	'tabs',
	'windows',
	'browserAction'
]);

promisifyAll(chrome.storage, [
	'local',
]);

chrome.browserAction.onClicked.addListener( () => {
	chrome.tabs.create({
		url: "/index.html"
	} )
});



chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		bkp.console.log(`received request:${request} sender:${sender} sendResponse:${sendResponse}`);
		var url = 'data:application/json;base64,' + btoa(request.state);
		chrome.downloads.download({
			url: url,
			filename: 'graphiqlfeen.json'
		});
		sendResponse({farewell: "goodbye"});
	});
