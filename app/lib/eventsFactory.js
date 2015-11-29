var Q = require('q');
var repository = require('repository');

var Events = Alloy.Collections.instance('Events');

// Public Methods
exports.getWeeklyRotation = getWeeklyRotation;
exports.getWeeklySale = getWeeklySale;
exports.getLatestHeroesUpdate = getLatestHeroesUpdate;
exports.setLatestHeroesUpdate = setLatestHeroesUpdate;

function getWeeklyRotation(){
	
}

function getWeeklySale(){
	
}

function getLatestHeroesUpdate(){
	Events.fetch();
	return Q.Promise(function(resolve,reject){
		var updateArray = Events.where({id: "latest_heroes_update"}); 
		var updateObj = updateArray[0].get("date");
		Ti.API.info("updateObj: "+updateObj);
		resolve(updateObj || "2000-01-01T00:00:00");
	});
}

function setLatestHeroesUpdate(dateISOString) {
	Events.create({
		id: "latest_heroes_update",
		date: dateISOString
	});
}
