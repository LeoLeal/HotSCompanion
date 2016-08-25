var imageFactory = require('imageFactory');
var args = $.args;
var skill = $.args.skill;

var BASE_URL = "https://sites.google.com/a/leoleal.com.br/hotscompanion/home/";
var HIDDEN_PROPERTIES = {
  height: 0,
  width: 0,
  top: 0,
  left: -4,
  visible: false
};

init();

function init(){
  var cacheImage = imageFactory.getImage(BASE_URL + skill.icon);
  $.icon.image = cacheImage.image;
  $.icon.addEventListener('load', function(){
    cacheImage.fireEvent('load', {image:$.icon.toImage()});
  });

  $.shortcut.text = skill.shortcut || '';
  $.shortcut1.text = skill.shortcut || '';
  $.shortcut2.text = skill.shortcut || '';
  $.shortcut3.text = skill.shortcut || '';
  $.shortcut4.text = skill.shortcut || '';
  $.shortcut5.text = skill.shortcut || '';
  $.shortcut6.text = skill.shortcut || '';
  $.shortcut7.text = skill.shortcut || '';
  $.shortcut8.text = skill.shortcut || '';
  
  $.name.text = skill.name[Ti.Locale.currentLanguage] + ((skill.type == 'heroic' || skill.type == 'trait') ? ' ('+L(skill.type)+')' : '');
  
  if(typeof skill.cost == 'number'){
    //Ti.API.info(skill.cost);
    if(skill.cost > 0)
      $.manacost.text = String.format(L('manacost'), skill.cost.toString());
    else 
      $.skillInfo.remove($.manacost);//.applyProperties(HIDDEN_PROPERTIES);
  } 
  else {
    //Ti.API.info(skill.cost);
    if(skill.cost[0] > 0)
      $.manacost.text = String.format(L('manacostpersecond'), skill.cost[0].toString(), (skill.cost[1]/1000).toString());
    else 
      $.skillInfo.remove($.manacost);//.applyProperties(HIDDEN_PROPERTIES);
  }
    
  if(skill.cooldown > 0)
    $.cooldown.text = String.format(L('cooldown'), (skill.cooldown/1000).toString());
  else 
    $.skillInfo.remove($.cooldown);//.applyProperties(HIDDEN_PROPERTIES);
    
  if(skill.charges > 1)
    $.charges.text = String.format(L('charges'), skill.charges.toString());
  else 
    $.skillInfo.remove($.charges);//.applyProperties(HIDDEN_PROPERTIES);
    
  $.description.text = skill.description[Ti.Locale.currentLanguage];
}
