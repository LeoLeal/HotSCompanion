var args = $.args;
var talents = args.selectedHero.talents;

init();

function init(){
  Ti.API.debug('[HERO DETAILS TALENTS] INIT STARTED');
  for(var level in talents){
  	Ti.API.info('[HERO DETAILS TALENTS] Level: ' + level);
  }
  for(var i=0; i<talents.length; i++){
/*    var separator = Ti.UI.createView({
      left: 16,
      right: ((OS_IOS) ? 0 : 16),
      width: Ti.UI.FILL,
      height: 1,
      backgroundColor: '#eee',
      top: 8,
      bottom: 8
    });

    var skillController = Alloy.createController('heroDetailsTalent', { skill: skills[i] });
    var skill = skillController.getView();
    
    $.pageContainer.add(skill);

    
    if(i < skills.length -1)
      $.pageContainer.add(separator);
    else
      $.pageContainer.add(Ti.UI.createView({
        height: 48
      }));*/
  }
}
