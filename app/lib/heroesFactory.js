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

			return Heroes.toJSON();
		});
	})
	.fail(function(err){
		// Não pôde fazer a Query no ArrowDB. 
		// Resolve a base de dados Local
		Ti.API.info("[HEROES FACTORY] Sem Internet");
		Ti.API.error('[HEROES FACTORY] ' + err);
		return Q.Promise(function(resolve,reject){
			if(Heroes.length > 0)
				resolve(Heroes.toJSON());
			else
				reject("error_loading_heroes_list");
		});
	});
	
}

function getHeroById(heroId) {
  Ti.API.info("[HEROES FACTORY] getHeroById: " + heroId);
	return Q.Promise(function(resolve,reject,notify){
		var heroArray = Heroes.get(heroId);
		Ti.API.info("[HEROES FACTORY][PROMISE] " + heroArray);
		var heroObj = heroArray.toJSON();
		Ti.API.info("[HEROES FACTORY][PROMISE] " + JSON.stringify(heroObj));
		if(!!heroObj == true){
			resolve(heroObj);
		} else {
		  reject("error_loading_hero");
		}
	});
}
