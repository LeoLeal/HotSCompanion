var args = $.args;
var skills = args.selectedHero.skills;
var heroics = args.selectedHero.heroics;
var trait = args.selectedHero.trait;

init();

function init(){
  Ti.API.info('[HERO DETAILS ABILITIES] INIT STARTED');
  for(var i=0; i<skills.length; i++){
    var separator = Ti.UI.createView({
      left: 16,
      right: ((OS_IOS) ? 0 : 16),
      width: Ti.UI.FILL,
      height: 1,
      backgroundColor: '#eee',
      top: 8,
      bottom: 8
    });

    var skillController = Alloy.createController('heroDetailsAbility', { skill: skills[i] });
    var skill = skillController.getView();
    
    $.pageContainer.add(skill);

    
    if(i < skills.length -1)
      $.pageContainer.add(separator);
    else
      $.pageContainer.add(Ti.UI.createView({
        height: 48
      }));
  }
}
