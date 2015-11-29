var args = arguments[0] || {};
var _tabs = args.tabs.split(",");
var _tabViewObjects = [];
var _selectedIndex = 0;
var tabAnimation = Ti.UI.createAnimation({
	duration: 100
});

// EXPOSED FUNCTIONS
$.addEventListener = _addEventListener;
$.removeEventListener = _removeEventListener;
$.setIndex = _setIndex;
$.getIndex = _getIndex;

init();

// PRIVATE FUNCTIONS
function init(){
	for(var i=0; i<_tabs.length; i++){
		_createTab(_tabs[i]);
	}
	_setIndex(0);
	
	var clickListener = function(event){
		for(var i=0; i<_tabViewObjects.length; i++){
			if(_tabViewObjects[i] == event.source){
				_setIndex(i);
				break;
			}
		}
	};
	
	$.cardTabs.addEventListener("click",clickListener);
}

function _createTab(paramLabel) {
	_tabViewObjects.push(Ti.UI.createLabel({
		text: paramLabel.toUpperCase() || "LABEL",
		width: Ti.UI.FILL,
		height: Ti.UI.FILL,
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		color: "#99000000",
		font: {
			fontSize: 14
		}
	}));
	_tabsAdjustLayout();
	$.cardTabs.add(_tabViewObjects[_tabViewObjects.length-1]);
	
}

function _tabsAdjustLayout(){
	var tabWidth = 100/_tabViewObjects.length;
	$.selectMarker.setWidth(tabWidth+"%");
	for (var i=0; i<_tabViewObjects.length; i++){
		_tabViewObjects[i].setWidth(tabWidth+"%");
	}
}

function _addEventListener(eventType,callbackFunction){
	$.cardTabs.addEventListener(eventType,callbackFunction);
}

function _removeEventListener(eventType,callbackFunction){
	$.cardTabs.removeEventListener(eventType,callbackFunction);
}

function _setIndex(intIndex){
	_selectedIndex = intIndex;
	tabAnimation.left = ((100/_tabViewObjects.length)*(_selectedIndex))+"%";
	$.selectMarker.animate(tabAnimation);
	for (var i=0; i<_tabViewObjects.length; i++){
		_tabViewObjects[i].setColor((i != intIndex)?Alloy.Globals.color.colorText:Alloy.Globals.color.colorAccent);
	}
}
function _getIndex(){
	return _selectedIndex;
}