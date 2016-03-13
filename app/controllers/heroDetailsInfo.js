// Arguments passed into this controller can be accessed off of the `$.args` object directly or:
var args = $.args;
var selectedHero = args.selectedHero;

Ti.API.info('[HERO DETAILS INFO CONTROLLER] Args: ' + JSON.stringify(selectedHero));

init();

function init(){
  
}
