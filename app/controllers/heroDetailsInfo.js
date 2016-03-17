// Arguments passed into this controller can be accessed off of the `$.args` object directly or:
var args = $.args;
var selectedHero = args.selectedHero;

Ti.API.info('[HERO DETAILS INFO CONTROLLER] Args: ' + JSON.stringify(selectedHero));

init();

function init(){
  var stats = selectedHero.stats;
  
  $.loreData.text = selectedHero.lore[Ti.Locale.currentLanguage];
  Ti.API.info('[HERO DETAILS INFO CONTROLLER][STATS] ' + JSON.stringify(stats));
  
  if (typeof stats.hp.pool == "object"){
    $.initialHealth.text =  stats.hp.pool[0];
    $.initalHealthIncrement.text = String.format(L('increment_text'), String.formatDecimal(stats.hp.pool[1]));  
  } else {
    $.initialHealth.text =  stats.hp.pool;
    $.initalHealthIncrement.applyProperties({
      height: 0,
      top: 0,
      bottom: null,
      visible: false
    });
  }
  if (typeof stats.hp.regen == "object"){
    $.healthRegen.text =  String.format(L('regen_text'), String.formatDecimal(stats.hp.regen[0]));
    $.healthRegenIncrement.text = String.format(L('increment_text'), String.formatDecimal(stats.hp.regen[1]));  
  } else {
    $.healthRegen.text =  stats.hp.regen;
    $.healthRegenIncrement.applyProperties({
      height: 0,
      top: 0,
      bottom: null,
      visible: false
    });
  }
  
  Ti.API.info(typeof stats.mana.pool);
  if (typeof stats.mana.pool == "object"){
    $.initialMana.text =  stats.mana.pool[0];
    $.initalManaIncrement.text = String.format(L('increment_text'), String.formatDecimal(stats.mana.pool[1]));  
  } else {
    $.initialMana.text =  stats.mana.pool;
    $.initalManaIncrement.applyProperties({
      height: 0,
      top: 0,
      bottom: null,
      visible: false,
      text: ''
    });
  }
  
  Ti.API.info(typeof stats.mana.regen);
  if (typeof stats.mana.regen == "object"){
    $.manaRegen.text = String.format(L('regen_text'), String.formatDecimal(stats.mana.regen[0]));
    $.manaRegenIncrement.text = String.format(L('increment_text'), String.formatDecimal(stats.mana.regen[1]));  
  } else {
    $.manaRegen.text = String.format(L('regen_text'), String.formatDecimal(stats.mana.regen));
    $.manaRegenIncrement.applyProperties({
      height: 0,
      top: 0,
      bottom: null,
      visible: false,
      text: ''
    });
  }

  
  $.initialDamage.text = stats.attack.damage[0];
  $.damageIncrement.text = String.format(L('increment_text'), String.formatDecimal(stats.attack.damage[1]));
  $.damageSpeed.text = String.format(L('speed_text'), String.formatDecimal(stats.attack.speed));
  
}
