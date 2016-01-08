// SCROLL HANDLER FOR THE LOGO
var heroesFactory = require("heroesFactory");
var targetSize;
var targetOpacity;
var scrollListener = function scrollListener(event){
	targetSize = 264-(Math.round(($.scrollList.contentOffset.y/40)*10));
	targetOpacity = (100-(Math.round(($.scrollList.contentOffset.y/15)*10)))/100;
	$.appLogo.applyProperties({
		opacity: (targetOpacity < 0)?0:targetOpacity,
		width: ((targetSize > 264)?264:targetSize),
	});
};
$.scrollList.addEventListener("scroll",scrollListener);

init();

var fadeIn = Ti.UI.createAnimation({
	duration: 300,
	opacity: 1
});

function init(){
	// LOAD THE NEXT FREE WEEK'S ROTATION AND SET THE LEGEND LABEL
	$.nextFreeWeekLegend.setText(String.format(L('Next_Free_Week'), '10/10/2015'));
	setTimeout(function(){
		$.searchField.visible = true;
		$.searchField.animate(fadeIn);	
	},1000);
	
	Ti.API.info("Executando Query...");
	heroesFactory.getHeroesList();
	
}



function transformFunction(model) {

  var transform = model.toJSON();
  var topPosition = '-30';
  var leftPosition = '8';
  var rowIndex = Alloy.Globals.heroesListIndex;
  
  Ti.API.info('[INDEX CONTROLLER] CurrentLanguage: ' + Ti.Locale.currentLanguage);
  transform.name = transform.name[Ti.Locale.currentLanguage];
  
  if(rowIndex < 3){
  	topPosition = '0';
  }
  	
  if((rowIndex + 2)%5 == 0 ){
  	leftPosition = '56';
  }

  transform.topPosition = topPosition;
  transform.leftPosition = leftPosition;

  Alloy.Globals.heroesListIndex++;
  
  return transform;
}

// HANDLE HEROES LIST CLICKS
function openHero(event){
	var heroId = event.source.id;
	var heroDetails = Alloy.createController('heroDetails',{"id" : heroId}).getView();
	heroDetails.open({
		modal: (OS_IOS)?true:false,
		modalStyle: (OS_IOS)?Ti.UI.iPhone.MODAL_PRESENTATION_FULLSCREEN: null
	});
};
$.index.open();