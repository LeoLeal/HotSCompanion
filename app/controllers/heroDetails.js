/**
 * TODO
 * - Adicionar um Loading para as Skins
 * - Fazer cache das Skins e Ícones (Verificar necessidade)
 */

var args = arguments[0] || {};
var selectedHero;
var targetScroll;
var targetOpacity;
var actionTab = false;
var ANDROID_SCROLL = 160;
var IOS_SCROLL = 172;
var HEADER_HEIGHT = 240;
var SCROLL = (OS_IOS)?IOS_SCROLL:(ANDROID_SCROLL*Ti.Platform.displayCaps.logicalDensityFactor);

init();

// PRIVATE METHODS

function init(){
  selectedHero = $model.toJSON();
	populateViewObjects();
  fadeInElements();
}

function populateViewObjects(){
  $.actionBarHeroName.text = selectedHero.name[Ti.Locale.currentLanguage];

  var DetailsHeaderController = Alloy.createController('heroDetailsHeader', { 
    id: "heroHeader",
    selectedHero: selectedHero
  });  
  var DetailsHeaderView = DetailsHeaderController.getView();
  $.heroHeaderContainer.add(DetailsHeaderView);


  var DetailsInfoController = Alloy.createController('heroDetailsInfo', { 
    id: "page_0View",
    selectedHero: selectedHero
  });  
  var DetailsInfoView = DetailsInfoController.getView(); 
  $.page_0.add(DetailsInfoView);
  
}

function fadeInElements(){
  setTimeout(function(){
    $.scrollableCards.setCurrentPage(2);
    $.scrollableCards.scrollToView(0);
  },10);
}

function closeWindow(){
  $.heroDetails.close();
}

function scrollListener(event){
  targetScroll = $.contentScroll.contentOffset.y; 
  targetOpacity = (Math.round((targetScroll/SCROLL)*10)/10);
  
  if(targetOpacity > 1)
    targetOpacity = 1;
  else if (targetOpacity < 0)
    targetOpacity = 0;

  $.actionBar.opacity = (targetOpacity < 0)?0:targetOpacity;
  if(!OS_IOS)
    $.statusBar.opacity = (targetOpacity < 0)?0:targetOpacity;
  $.actionBar.visible = (targetOpacity <= 0)?false:true;
  
  if(targetScroll >= SCROLL && actionTab == false){
    $.actionTab.setVisible(true);
    $.contentTab.setVisible(false);
    actionTab = true;
  }
  else if(targetScroll < SCROLL && actionTab == true){
    $.contentTab.setVisible(true);
    $.actionTab.setVisible(false);
    actionTab = false;
  }
}
function tabListener(event){
  $.scrollableCards.scrollToView($.actionTabObj.getIndex());
}
function tab2Listener(event){
  $.scrollableCards.scrollToView($.contentTabObj.getIndex());
}
function cardsListener(event){
  $.contentTabObj.setIndex($.scrollableCards.currentPage);
  $.actionTabObj.setIndex($.scrollableCards.currentPage);
  
  $.contentWrapper.height = 5000;
  
  setTimeout(function cardListenerTimeout(){
    var cardHeight = $.scrollableCards.views[$.scrollableCards.currentPage].children[0].rect.height+60;
/*    
    if(cardHeight < $.contentScroll.rect.height - ((OS_IOS)?$.statusBar.rect.height:0) - $.actionBar.rect.height -1)
      cardHeight = $.contentScroll.rect.height - ((OS_IOS)?$.statusBar.rect.height:0) - $.actionBar.rect.height;
*/

    if(cardHeight < $.contentScroll.rect.height - HEADER_HEIGHT)
      cardHeight = $.contentScroll.rect.height - HEADER_HEIGHT;
  
    $.contentWrapper.height = cardHeight;
  },125);
}

// EVENT HANDLERS

$.contentScroll.addEventListener("scroll",scrollListener);
$.actionTabObj.addEventListener("click",tabListener);
$.contentTabObj.addEventListener("click",tab2Listener);
$.scrollableCards.addEventListener("scrollend", cardsListener);
