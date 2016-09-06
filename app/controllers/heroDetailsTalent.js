var imageFactory = require('imageFactory');
var args = $.args;
var talent = $.args.talent;

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
  var cacheImage = imageFactory.getImage(BASE_URL + talent.icon);
  $.icon.image = cacheImage.image;
  $.icon.addEventListener('load', function(){
    cacheImage.fireEvent('load', {image:$.icon.toImage()});
  });

  $.shortcut.text = talent.shortcut || '';
  $.shortcut1.text = talent.shortcut || '';
  $.shortcut2.text = talent.shortcut || '';
  $.shortcut3.text = talent.shortcut || '';
  $.shortcut4.text = talent.shortcut || '';
  $.shortcut5.text = talent.shortcut || '';
  $.shortcut6.text = talent.shortcut || '';
  $.shortcut7.text = talent.shortcut || '';
  $.shortcut8.text = talent.shortcut || '';
  
  if(typeof talent.cost == 'number'){
    //Ti.API.info(talent.cost);
    if(talent.cost && talent.cost > 0)
      $.manacost.text = String.format(L('manacost'), talent.cost.toString());
    else 
      $.talentInfo.remove($.manacost);//.applyProperties(HIDDEN_PROPERTIES);
  } 
  else {
    //Ti.API.info(talent.cost);
    if(talent.cost && talent.cost[0] > 0)
      $.manacost.text = String.format(L('manacostpersecond'), talent.cost[0].toString(), (talent.cost[1]/1000).toString());
    else 
      $.talentInfo.remove($.manacost);//.applyProperties(HIDDEN_PROPERTIES);
  }
    
  if(talent.cooldown && talent.cooldown > 0)
    $.cooldown.text = String.format(L('cooldown'), (talent.cooldown).toString());
  else 
    $.talentInfo.remove($.cooldown);//.applyProperties(HIDDEN_PROPERTIES);
    
  if(talent.charges && talent.charges > 1)
    $.charges.text = String.format(L('charges'), talent.charges.toString());
  else 
    $.talentInfo.remove($.charges);//.applyProperties(HIDDEN_PROPERTIES);
    
  $.description.text = talent.description[Ti.Locale.currentLanguage];
}
