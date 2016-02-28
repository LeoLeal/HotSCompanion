var heroesFactory = require("heroesFactory");
var fadeIn = Ti.UI.createAnimation({
  duration: 300,
  opacity: 1
});
var targetSize;
var targetOpacity;

init();
$.index.open();

// PRIVATE METHODS
function init(){
	$.nextFreeWeekLegend.setText(String.format(L('Next_Free_Week'), '10/10/2015'));
	setTimeout(function(){
		$.searchField.visible = true;
		$.searchField.animate(fadeIn);	
	},1000);

	heroesFactory.getHeroesList(); //Doesn't need to manipulate de results the Factory fetches the Model if the Model is declared on the View.
}

function transformFunction(model) {
  var transform = model.toJSON();
  var topPosition = '-30';
  var leftPosition = '8';
  var rowIndex = Alloy.Globals.heroesListIndex;
  
  transform.name = transform.name[Ti.Locale.currentLanguage];
  
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
    
    var heroDetails = Alloy.createController('heroDetails',{"$model" : model}).getView();
    heroDetails.open({
      modal: (OS_IOS)?true:false,
      modalStyle: (OS_IOS)?Ti.UI.iPhone.MODAL_PRESENTATION_FULLSCREEN: null
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