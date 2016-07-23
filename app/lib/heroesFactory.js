var repository = require('repository');
var eventsFactory = require('eventsFactory');
var Q = require('q');
var dateNow = new Date();
var Heroes = Alloy.Collections.instance('Heroes');

Heroes.fetch({
	success: function(model, response, options){
		Alloy.Globals.heroesListIndex = 0;
	}
});

// PUBLIC METHODS
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

      var jsonRes = _.defer(function(){
      	Heroes.toJSON().sort(function(a,b){
	        var aName = a['name'][Ti.Locale.currentLanguage].toLowerCase();
	        var bName = b['name'][Ti.Locale.currentLanguage].toLowerCase();
	        if (aName < bName) //sort string ascending
	          return -1;
	        if (aName > bName)
	          return 1;
	        return 0;
	      });
	    });

			return jsonRes;
		});
	})
	.fail(function(err){
		Ti.API.info("[HEROES FACTORY] Sem Internet");
		Ti.API.error('[HEROES FACTORY] ' + JSON.strngify(err));
		return Q.Promise(function(resolve,reject){
			if(Heroes.length > 0){
        var jsonRes = Heroes.toJSON().sort(function(a,b){
          var aName = a['name'][Ti.Locale.currentLanguage].toLowerCase();
          var bName = b['name'][Ti.Locale.currentLanguage].toLowerCase();
          if (aName < bName) //sort string ascending
            return -1;
          if (aName > bName)
            return 1;
          return 0;
        });
        resolve(jsonRes);
			}
			else
				reject("error_loading_heroes_list");
		});
	});
	
}

function getHeroById(heroId) {
  Ti.API.info("[HEROES FACTORY] getHeroById: " + heroId);
	return Q.Promise(function(resolve,reject,notify){
		var heroObj = Heroes.get(heroId);
		Ti.API.info("[HEROES FACTORY][PROMISE OBJECT] " + JSON.stringify(heroObj));

		if(!!heroObj == true){
			resolve(heroObj);
		} else {
		  reject("error_loading_hero");
		}
	});
}
