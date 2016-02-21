var heroesFactory = require("heroesFactory");
var fadeIn = Ti.UI.createAnimation({
  duration: 300,
  opacity: 1
});

var targetSize;
var targetOpacity;
var heroInteractionStarted;

init();
$.index.open();

// FUNCTIONS
function init(){
	$.nextFreeWeekLegend.setText(String.format(L('Next_Free_Week'), '10/10/2015'));
	setTimeout(function(){
		$.searchField.visible = true;
		$.searchField.animate(fadeIn);	
	},1000);
	
	Ti.API.info("[INDEX CONTROLLER] Executando Query...");
	heroesFactory.getHeroesList()
	.then(function(response){
	  Ti.API.info("[INDEX CONTROLLER][INIT: heroesFactory.getHeroesList()] " + response);
	});
}

function transformFunction(model) {
  var transform = model.toJSON();
  var topPosition = '-30';
  var leftPosition = '8';
  var rowIndex = Alloy.Globals.heroesListIndex;
  
  transform.name = transform.name[Ti.Locale.currentLanguage];
  transform.heroId = transform.id;
  
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
  if(!!heroInteractionStarted == true)
    return;

  var activityIndicator = event.source.children[0];
  activityIndicator.visible = true;
  heroInteractionStarted = true;
  
  var heroId = event.source.heroId; 
  
  Ti.API.info('[INDEX CONTROLLER][EVENT SOURCE] '+ heroId);
  
  heroesFactory.getHero(heroId)
  .then(function(response){
    Ti.API.info("[INDEX CONTROLLER][CLICK HERO] " + response);
  })
  .fail(function(err){
    Ti.API.info("[INDEX CONTROLLER][CLICK HERO] " + err);
  });
  
/*
  var heroDetails = Alloy.createController('heroDetails',{"id" : heroId}).getView();
  
  heroDetails.open({
    modal: (OS_IOS)?true:false,
    modalStyle: (OS_IOS)?Ti.UI.iPhone.MODAL_PRESENTATION_FULLSCREEN: null
  });*/
};

function scrollListener(event){
  targetSize = 264-(Math.round(($.scrollList.contentOffset.y/40)*10));
  targetOpacity = (100-(Math.round(($.scrollList.contentOffset.y/15)*10)))/100;
  $.appLogo.applyProperties({
    opacity: (targetOpacity < 0)?0:targetOpacity,
    width: ((targetSize > 264)?264:targetSize),
  });
};

// EVENT HANDLERS
$.scrollList.addEventListener("scroll",scrollListener);