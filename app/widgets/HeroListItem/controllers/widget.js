var args = arguments[0] || {};
var heroesFactory = require("heroesFactory");
var imageFactory = require('imageFactory');

var BASE_URL = "https://sites.google.com/a/leoleal.com.br/hotscompanion/home/";
init();

function init(){
  var cacheImage = imageFactory.getImage(BASE_URL + args.portraitImage);
  $.portraitView.image = cacheImage.image;
  $.portraitView.addEventListener('load', function(){
    cacheImage.fireEvent('load', {image:$.portraitView.toImage()});
  });
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