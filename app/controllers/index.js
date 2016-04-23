function openTest() {
  Alloy.createController('testwindow').getView().open();
}

var heroesFactory = require("heroesFactory"); 
var fadeIn = Ti.UI.createAnimation({
  duration: 300,
  opacity: 1
});
var targetSize;
var targetOpacity;

init(); 

// PRIVATE METHODS
function init(){
  Ti.API.info('[INDEX CONTROLLER][INIT STARTED][CURRENT LOCALE LANGUAGE] ' + Ti.Locale.currentLanguage);
	$.nextFreeWeekLegend.setText(String.format(L('Next_Free_Week'), '10/10/2015'));
	setTimeout(function(){
		$.searchField.visible = true;
		$.searchField.animate(fadeIn);	
	},1000);

	Ti.API.info(heroesFactory.getHeroesList.toString()); 
	heroesFactory.getHeroesList(); //Doesn't need to manipulate de results the Factory fetches the Model if the Model is declared on the View.
	
	$.index.open();
}

function transformFunction(model) {
  var transform = model.toJSON();
  var topPosition = '-30';
  var leftPosition = '8';
  var rowIndex = Alloy.Globals.heroesListIndex;
  
  transform.name = transform.name[Ti.Locale.currentLanguage];
  transform.portraitUrl = transform.skins[0].icon;
  
  if(rowIndex < 3)
  	topPosition = '0';
  	
  if((rowIndex + 2)%5 == 0 )
  	leftPosition = '56';

  transform.topPosition = topPosition;
  transform.leftPosition = leftPosition;
  Alloy.Globals.heroesListIndex++;
  
  return transform;
}

function openHero(event){
  var heroId = event.source.heroId;
  var model = null;
  
  heroesFactory.getHero(heroId)
  .then(function(response){
    model = response;
    Ti.API.info('[INDEX CONTROLLER][MODEL]', JSON.stringify(response));

    Alloy.createController('heroDetails',{"model" : model}).getView().open({
      modal: (OS_IOS) ? true : false,
      modalStyle: (OS_IOS) ? Ti.UI.iPhone.MODAL_PRESENTATION_FULLSCREEN : null
    });
  });
}

function scrollListener(event){
  targetSize = 264-(Math.round(($.scrollList.contentOffset.y/40)*10));
  targetOpacity = (100-(Math.round(($.scrollList.contentOffset.y/15)*10)))/100;
  $.appLogo.applyProperties({
    opacity: (targetOpacity < 0)?0:targetOpacity,
    width: ((targetSize > 264)?264:targetSize),
  });
}

// EVENT HANDLERS
$.scrollList.addEventListener("scroll",scrollListener);
