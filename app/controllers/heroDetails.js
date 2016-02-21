var args = arguments[0] || {};
var heroObj = arguments[0].heroObj;

var actionTab = false;
var targetScroll;
var targetOpacity;
var ANDROID_SCROLL = 160;
var IOS_SCROLL = 172;
var SCROLL = (OS_IOS)?IOS_SCROLL:(ANDROID_SCROLL*Ti.Platform.displayCaps.logicalDensityFactor);


// EVENT HANDLERS

var scrollListener = function scrollListener(event){
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
};
$.contentScroll.addEventListener("scroll",scrollListener);

var tabListener = function tabListener(event){
	$.scrollableCards.scrollToView($.actionTabObj.getIndex());
};
var tab2Listener = function tabListener(event){
	$.scrollableCards.scrollToView($.contentTabObj.getIndex());
};
$.actionTabObj.addEventListener("click",tabListener);
$.contentTabObj.addEventListener("click",tab2Listener);

var cardsListener = function cardsListener(event){
	$.contentTabObj.setIndex($.scrollableCards.currentPage);
	$.actionTabObj.setIndex($.scrollableCards.currentPage);
	
	$.contentWrapper.height = 5000;
	
	setTimeout(function(){
		var cardHeight = $.scrollableCards.views[$.scrollableCards.currentPage].children[0].rect.height+60;
		
		if(cardHeight < $.contentScroll.rect.height - ((OS_IOS)?$.statusBar.rect.height:0) - $.actionBar.rect.height -1)
			cardHeight = $.contentScroll.rect.height - ((OS_IOS)?$.statusBar.rect.height:0) - $.actionBar.rect.height;
	
		$.contentWrapper.height = cardHeight;

	},125);
};
$.scrollableCards.addEventListener("scrollend", cardsListener);


// CONTROLLER FUNCTIONS

function closeWindow(){
	$.heroDetails.close();
}

function init(selectedHero){
  Ti.API.info('[HERO DETAILS CONTROLLER] '+JSON.stringify(selectedHero));
	var fadeIn = Ti.UI.createAnimation({
		duration: 300,
		opacity: 1
	});
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

init(heroObj);
