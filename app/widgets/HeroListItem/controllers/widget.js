var args = arguments[0] || {};
var heroesFactory = require("heroesFactory");

init();

function init(){
  $.portraitView.image = Ti.Utils.base64decode(args.portraitImage);
}

var openHero = _.throttle(function(event){
  var heroId = event.source.heroId;
  var model = null;
  
  heroesFactory.getHero(heroId)
  .then(function(response){
    model = response;

    Alloy.createController('heroDetails',{"model" : model}).getView().open({
      modal: (OS_IOS) ? true : false,
      modalStyle: (OS_IOS) ? Ti.UI.iOS.MODAL_PRESENTATION_FULLSCREEN : null
    });
  });
}, 1000, {trailing: false});