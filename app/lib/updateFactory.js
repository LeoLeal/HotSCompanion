var Q = require('q');
var repository = require('repository');
var http = Ti.Network.createHTTPClient();

// CONSTANTS
var REMOTE_URL = 'https://sites.google.com/a/leoleal.com.br/hotscompanion/home/version'
var TODAY = new Date();
var LAST_UPDATE_CHECK = new Date(Ti.App.properties.getString('last_update_check'));
var DAYS_CHECK_INTERVAL = 10;
var TIME_MULTIPLIER = ((1000*60)*60)*24;

// PUBLIC METHODS
exports.getLatestVersion = getLatestVersion;

function getLatestVersion(){
	Ti.API.info('[UPDATE FACTORY] Today: ' + TODAY.toISOString());
	Ti.API.info('[UPDATE FACTORY] Last Check: ' + LAST_UPDATE_CHECK.toISOString());
	Ti.API.info('[UPDATE FACTORY] Time Diff: ' + (TODAY.getTime() - LAST_UPDATE_CHECK.getTime()));
	Ti.API.info('[UPDATE FACTORY] Days Diff: ' + ((TODAY.getTime()/TIME_MULTIPLIER) - (LAST_UPDATE_CHECK.getTime()/TIME_MULTIPLIER)));

	return Q.Promise(function(resolve, reject, notify){
		if((TODAY.getTime()/TIME_MULTIPLIER) - (LAST_UPDATE_CHECK.getTime()/TIME_MULTIPLIER) < DAYS_CHECK_INTERVAL){
			resolve(Ti.App.properties.getString('latest_version'));
		} else {
			Ti.API.info('[UPDATE FACTORY] Will request Version!');
			http.setOnload(onLoadCallback);
			http.setOnerror(onErrorCallback);
			http.setTimeout(5000);
			http.open("GET", REMOTE_URL);
			http.send();
		}

		function onLoadCallback(response){
			Ti.API.info('[UPDATE FACTORY] Response: ' + this.responseText);
			Ti.App.properties.setString('latest_version', this.responseText);
			Ti.App.properties.setString('last_update_check', TODAY.toISOString());
			resolve(this.responseText.split('.'));
		}
		function onErrorCallback(error){
			Ti.API.error('[UPDATE FACTORY] Error: ' + error);
			resolve(App.properties.getString('latest_version').split('.'));
		}
  });
}