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

bkp.console.log("creating tab!");
chrome.browserAction.onClicked.addListener( () => {
	bkp.console.log("creating tab!");
	chrome.tabs.create({
		url: "/index.html"
	} )
});