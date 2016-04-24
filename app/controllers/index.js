var heroesFactory = require("heroesFactory"); 
var targetSize;
var targetOpacity;

var fadeIn = Ti.UI.createAnimation({
  duration: 300,
  opacity: 1
});
var listLoadedAnimation = Ti.UI.createAnimation({
  duration: 500,
  curve: Titanium.UI.ANIMATION_CURVE_EASE_OUT,
  top: 192,
  opacity: 1
});


init(); 

// PRIVATE METHODS
function init(){
  $.listActivity.show();
/*
	setTimeout(function(){
		$.searchField.visible = true;
		$.searchField.animate(fadeIn);	
	},1000);*/

	heroesFactory.getHeroesList()
	.then(function(){
		$.listActivity.hide();
		$.heroesContainer.animate(listLoadedAnimation);
	});

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
