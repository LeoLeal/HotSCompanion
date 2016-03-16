// Arguments passed into this controller can be accessed off of the `$.args` object directly or:
var args = $.args;
var selectedHero = args.selectedHero;

Ti.API.info('[HERO DETAILS INFO CONTROLLER] Args: ' + JSON.stringify(selectedHero));

init();

function init(){
  var stats = selectedHero.stats;
  
  $.loreData.text = selectedHero.lore[Ti.Locale.currentLanguage];
  Ti.API.info('[HERO DETAILS INFO CONTROLLER][STATS] ' + JSON.stringify(stats));
  
    $.initialHealth.text = stats.hp.pool[0];
    $.initalHealthIncrement.text = stats.hp.pool[1];
    $.healthRegen.text = stats.hp.regen[0];
    $.healthRegenIncrement.text = stats.hp.regen[1];
    $.initialMana.text = stats.mana.pool;
    $.manaRegen.text = stats.mana.regen;
    $.initialDamage.text = stats.attack.damage[0];
    $.damageIncrement.text = stats.attack.damage[1];
    $.damageSpeed.text = stats.attack.speed;
  
}
