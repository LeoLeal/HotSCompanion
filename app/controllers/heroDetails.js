var args = arguments[0] || {};
var selectedHero;
var targetScroll;
var targetOpacity;
var actionTab = false;
var ANDROID_SCROLL = 160;
var IOS_SCROLL = 172;
var skinSelectorArray = [];
var SCROLL = (OS_IOS)?IOS_SCROLL:(ANDROID_SCROLL*Ti.Platform.displayCaps.logicalDensityFactor);
var fadeIn = Ti.UI.createAnimation({
  duration: 300,
  opacity: 1
});

init();

// PRIVATE METHODS

function init(){
  selectedHero = $model.toJSON();
	populateViewObjects();
  fadeInElements();
}

function populateViewObjects(){
  $.headerName.text = selectedHero.name[Ti.Locale.currentLanguage].toUpperCase();
  $.actionBarHeroName.text = selectedHero.name[Ti.Locale.currentLanguage];
  selectSkin(0);
  $.headerUniverseIcon.image = '/images/dark/touchable_universe-'+selectedHero.universe+'.png';
  $.headerUniverseLabel.text = selectedHero.universe.charAt(0).toUpperCase() + selectedHero.universe.slice(1);
  $.headerRoleIcon.image = '/images/dark/touchable_role-' + selectedHero.role + '.png';
  $.headerRoleLabel.text = L(selectedHero.fightDistance + '_' + selectedHero.role);

  for(var i=0; i<selectedHero.skins.length; i++){
    skinSelectorArray.push(
      Ti.UI.createImageView({
        image: selectedHero.skins[i].icon,
        width: 32,
        height: 32,
        left: 0,
        right: 2,
        borderRadius: 16,
        borderColor: '#48acef',
        borderWidth: 1
      })
    );
    $.skinSelectContainer.add(skinSelectorArray[i]);
  }

}

function selectSkin(skinIndex){
  $.headerSubtitle.text = selectedHero.skins[skinIndex].name[Ti.Locale.currentLanguage].toUpperCase();
  $.videoPlayer.url = selectedHero.skins[skinIndex].video;
  
  //selectedHero.skins[skinIndex].icon
}

function fadeInElements(){
  setTimeout(function(){
    $.scrollableCards.setCurrentPage(2);
    $.scrollableCards.scrollToView(0);
    
    setTimeout(function(){$.scrollableCards.animate(fadeIn);},200);
  },10);
  
  if(OS_ANDROID){
    $.videoPlayer.addEventListener("playbackstate" , function (e) {
      if (e.playbackState === Titanium.Media.VIDEO_PLAYBACK_STATE_STOPPED) {
        $.videoPlayer.play();
      }
    });
    $.videoPlayer.addEventListener("preload" , function (e) {
      setTimeout(function(){
        $.videoPlayer.opacity = 1;
      },500);
    });
  }
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
    
    if(cardHeight < $.contentScroll.rect.height - ((OS_IOS)?$.statusBar.rect.height:0) - $.actionBar.rect.height -1)
      cardHeight = $.contentScroll.rect.height - ((OS_IOS)?$.statusBar.rect.height:0) - $.actionBar.rect.height;
  
    $.contentWrapper.height = cardHeight;
  },125);
}

// EVENT HANDLERS

$.contentScroll.addEventListener("scroll",scrollListener);
$.actionTabObj.addEventListener("click",tabListener);
$.contentTabObj.addEventListener("click",tab2Listener);
$.scrollableCards.addEventListener("scrollend", cardsListener);
