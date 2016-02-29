var Q = require('q');
var repository = require('repository');
var Events = Alloy.Collections.instance('Events');

// PUBLIC METHODS
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
		var updateObj = "2000-01-01T00:00:00";
		Ti.API.info('[EVENTS FACTORY][UPDATE ARRAY]' + updateArray);
		if(updateArray.length > 0)
		  updateObj = updateArray[0].get("date");

		Ti.API.info("[EVENTS FACTORY][UPDATE OBJECT]: "+updateObj);
		resolve(updateObj);
	});
}

function setLatestHeroesUpdate(dateISOString) {
	Events.create({
		id: "latest_heroes_update",
		date: dateISOString
	});
}
