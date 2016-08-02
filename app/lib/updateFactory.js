var Q = require('q');
var repository = require('repository');
var http = Ti.Network.createHTTPClient();
var lastUpdateCheckStr = Ti.App.Properties.getString('last_update_check');
if(lastUpdateCheckStr == null)
  lastUpdateCheckStr = '2000-01-01T00:00:00';

// CONSTANTS
var REMOTE_URL = 'https://sites.google.com/a/leoleal.com.br/hotscompanion/home/heroes-update';
var TODAY = new Date();
var LAST_UPDATE_CHECK = new Date(lastUpdateCheckStr);
var DAYS_CHECK_INTERVAL = 7;
var TIME_MULTIPLIER = ((1000*60)*60)*24;

// PUBLIC METHODS
exports.getLatestHeroesUpdate = getLatestHeroesUpdate;

function getLatestHeroesUpdate(){
	return Q.Promise(function(resolve, reject, notify){
		Ti.API.debug('[UPDATE FACTORY] LAST_UPDATE_CHECK: ' + LAST_UPDATE_CHECK.toISOString());
		Ti.API.debug('[UPDATE FACTORY] DAYS_CHECK_INTERVAL: ' + DAYS_CHECK_INTERVAL);
		Ti.API.debug('[UPDATE FACTORY] Property latest_heroes_update: ' + Ti.App.Properties.getString('latest_heroes_update'));
		Ti.API.debug('[UPDATE FACTORY] Property last_update_check: ' + Ti.App.Properties.getString('last_update_check'));
		if((TODAY.getTime()/TIME_MULTIPLIER) - (LAST_UPDATE_CHECK.getTime()/TIME_MULTIPLIER) >= DAYS_CHECK_INTERVAL || (TODAY.getDay() >= 2 && TODAY.getDay() <= 3)){
      http.setOnload(onLoadCallback);
      http.setOnerror(onErrorCallback);
      http.setTimeout(5000);
      http.open("GET", REMOTE_URL);
      http.send();
		} else {
      resolve({
        "latestUpdate": Ti.App.Properties.getString('latest_heroes_update') || "2000-01-01T00:00:00",
        "shouldUpdate": false
      });
		}

		function onLoadCallback(response){
			Ti.API.debug('[UPDATE FACTORY] Response: ' + this.responseText);
			Ti.App.Properties.setString('last_update_check', TODAY.toISOString());
			
			var responseDate = new Date(this.responseText);
			var latestHeroesUpdate = new Date(Ti.App.Properties.getString('latest_heroes_update') || '2000-01-01T00:00:00');
			var shouldUpdate = (latestHeroesUpdate.getTime() < responseDate.getTime());

			Ti.App.Properties.setString('latest_heroes_update', this.responseText);
			resolve({
				"latestUpdate": latestHeroesUpdate,
				"shouldUpdate": shouldUpdate
			});
		}
		function onErrorCallback(error){
			Ti.API.error('[UPDATE FACTORY] Error: ' + JSON.stringify(error));
			resolve(Ti.App.Properties.getString('latest_heroes_update'));
		}
	});
}