// Arguments passed into this controller can be accessed off of the `$.args` object directly or:
var args = $.args;
var selectedHero = args.selectedHero;
var HIDDEN_PROPERTIES = {
  height: 0,
  width: 0,
  top: 0,
  left: 0,
  visible: false
};

init();

function init(){
  var stats = selectedHero.stats;
  var attributes = selectedHero.attributes;
  
  $.loreData.text = selectedHero.lore[Ti.Locale.currentLanguage];

  $.survivabilityContainer.add(generateAttribute('survival'));
  $.damageContainer.add(generateAttribute('damage'));
  $.utilityContainer.add(generateAttribute('utility'));
  $.complexityContainer.add(generateAttribute('complexity'));
  

  if(stats.hp.pool == 0){
    $.hpContainer.applyProperties(HIDDEN_PROPERTIES);
  }
  if(stats.mana.pool == 0){
    $.manaContainer.applyProperties(HIDDEN_PROPERTIES);
  }
  if(stats.attack.damage[0] == 0){
    $.attackContainer.applyProperties(HIDDEN_PROPERTIES);
  }

  if (typeof stats.hp.pool == "object"){
    $.initialHealth.text =  stats.hp.pool[0];
    $.initalHealthIncrement.text = String.format(L('increment_text'), String.formatDecimal(stats.hp.pool[1])).replace('%%', '%');  
  } else {
    $.initialHealth.text =  stats.hp.pool;
    $.initalHealthIncrement.applyProperties(HIDDEN_PROPERTIES);
    $.initialHealth.top = 4;
    $.initialHealth.bottom = 4;
  }

  if (typeof stats.hp.regen == "object"){
    $.healthRegen.text = String.format(L('regen_text'), String.formatDecimal(stats.hp.regen[0]));
    $.healthRegenIncrement.text = String.format(L('increment_text'), String.formatDecimal(stats.hp.regen[1])).replace('%%', '%');  
  } else {
    $.healthRegen.text = String.format(L('regen_text'), String.formatDecimal(stats.hp.regen));
    $.healthRegenIncrement.text = L('increment_na');
  }
  
  if (typeof stats.mana.pool == "object"){
    $.initialMana.text = stats.mana.pool[0];
    $.initalManaIncrement.text = String.format(L('increment_text'), String.formatDecimal(stats.mana.pool[1])).replace('%%', '%');  
  } else {
    $.initialMana.text = stats.mana.pool;
    $.initalManaIncrement.text = L('increment_na');
  }
  
  if (typeof stats.mana.regen == "object"){
    $.manaRegen.text = String.format(L('regen_text'), String.formatDecimal(stats.mana.regen[0]));
    $.manaRegenIncrement.text = String.format(L('increment_text'), String.formatDecimal(stats.mana.regen[1])).replace('%%', '%');  
  } else {
    $.manaRegen.text = String.format(L('regen_text'), String.formatDecimal(stats.mana.regen));
    $.manaRegenIncrement.text = L('increment_na');
  }

  $.initialDamage.text = stats.attack.damage[0];
  $.damageIncrement.text = String.format(L('increment_text'), String.formatDecimal(stats.attack.damage[1])).replace('%%', '%');
  $.damageSpeed.text = String.format(L('speed_text'), String.formatDecimal(stats.attack.speed));
  
}

function generateAttribute(attrParam){
  var multiplier = selectedHero.attributes[attrParam];
  
  var filledStars = Math.floor(multiplier*10/2);
  var halfStars = (multiplier*10)%2;
  var emptyStars = 5 - filledStars - halfStars;
  var score = multiplier*10;
  
  var contentView = Ti.UI.createView({
    layout: "horizontal",
    width: Ti.UI.SIZE,
    height: 28,
    left: 16,
    right: 16,
    top: 0,
    bottom: 16
  });
  
  for(var i=0; i<filledStars; i++){
    contentView.add(Ti.UI.createImageView({
      image: "/images/contextual_info_score_2.png",
      height: 24
    }));
  }
  for(var i=0; i<halfStars; i++){
    contentView.add(Ti.UI.createImageView({
      image: "/images/contextual_info_score_1.png",
      height: 24
    }));
  }
  for(var i=0; i<emptyStars; i++){
    contentView.add(Ti.UI.createImageView({
      image: "/images/contextual_info_score_0.png",
      height: 24
    }));
  }
  
  contentView.add(Ti.UI.createLabel({
    width: Ti.UI.SIZE,
    left: 2,
    right: 0,
    center: {y: "45%"},
    textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
    font: {
      fontFamily: "MetronicProBold",
      fontSize: 12
    },
    text: score,
    color: Alloy.Globals.color.colorText
  }));
  
  return contentView;

}
