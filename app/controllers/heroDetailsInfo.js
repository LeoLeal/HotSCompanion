// Arguments passed into this controller can be accessed off of the `$.args` object directly or:
var args = $.args;
var selectedHero = args.selectedHero;

Ti.API.info('[HERO DETAILS INFO CONTROLLER] Args: ' + JSON.stringify(selectedHero));

init();

function init(){
  $.loreData.text = selectedHero.lore[Ti.Locale.currentLanguage];
  $.initialHealth = selectedHero.lore[Ti.Locale.currentLanguage];
  $.healthIncrement = selectedHero.lore[Ti.Locale.currentLanguage];
  $.initialMana = selectedHero.lore[Ti.Locale.currentLanguage];
  $.manaIncrement = selectedHero.lore[Ti.Locale.currentLanguage];
}
