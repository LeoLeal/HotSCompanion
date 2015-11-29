var repository = require('repository');
var eventsFactory = require('eventsFactory');
var Q = require('q');

// TODO: Falta tratar quando não vem nada da internet.

// Alloy Models
var Heroes = Alloy.Collections.instance('Heroes');
Heroes.fetch({
	success: function(model, response, options){
		Alloy.Globals.heroesListIndex = 0;
	}
});

// Date for Update Check
var dateNow = new Date();

///////////////// Public Methods
exports.getHeroesList = getHeroesList;
exports.getHero = getHeroById;

function getHeroesList() {
	
	return eventsFactory.getLatestHeroesUpdate()
	.then(function(updateResponse){
		return repository.queryObject({
			objClass: "Heroes",
			refDate: updateResponse
		})
		.then(function(response){
			var arrowDBArray = response.Heroes;
	
			for(var i=0; i<arrowDBArray.length; i++){
				Heroes.create(arrowDBArray[i]);	
			}
			if(arrowDBArray.length > 0){
				Heroes.fetch({
					success: function(model, response, options){
						Alloy.Globals.heroesListIndex = 0;
					}
				});
				eventsFactory.setLatestHeroesUpdate(dateNow.toISOString());
			}

			Ti.API.info("Got a list of Heroes: " + Heroes.length);
			return Heroes.toJSON();
		});
	})
	.fail(function(err){
		// Não pôde fazer a Query no ArrowDB. 
		// Resolve a base de dados Local
		Ti.API.info("Sem Internet");
		return Q.Promise(function(resolve,reject){
			if(Heroes.length > 0)
				resolve(Heroes.toJSON());
			else
				reject("error_loading_heroes_list");
		});
	});
	
}

function getHeroById(heroId) {
	return Q.Promise(function(resolve,reject){
		var heroObj = Heroes.get(heroId);
		if(heroObj.length > 0)
			resolve(heroObj[0].toJSON());
		else
			reject("error_loading_hero");
	});
}
