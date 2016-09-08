var args = $.args;
var talents = args.selectedHero.talents;

init();

function init(){
  Ti.API.debug('[HERO DETAILS TALENTS] INIT STARTED');
  for(var level in talents){
  	Ti.API.info('[HERO DETAILS TALENTS] Level: ' + level);
  	var separator = Ti.UI.createView({
  		layout: 'absolute',
  		width: Ti.UI.FILL,
  		left: 16,
  		right: ((OS_IOS) ? 0 : 16),
  		height: Ti.UI.SIZE,
  		top: 4,
      bottom: 4
  	});
  	
  	var separatorLine = Ti.UI.createView({
  		height: 1,
  		width: Ti.UI.FILL,
  		backgroundColor: '#eee'
  	});
		separator.add(separatorLine);

  	var separatorLabel = Ti.UI.createLabel({
  		text: '  ' + String.format(L('level_text'), level).toUpperCase() + '  ',
  		width: Ti.UI.SIZE,
  		backgroundColor: '#fff',
  		color: '#ccc',
  		font: {
  			fontSize: 12
  		},
  		left: (OS_IOS)?-4:null
  	});
  	separator.add(separatorLabel);

		$.pageContainer.add(separator);

		for (var talent in talents[level]){
			var separator = Ti.UI.createView({
	      left: 16,
	      right: ((OS_IOS) ? 0 : 16),
	      width: Ti.UI.FILL,
	      height: 1,
	      backgroundColor: '#eee',
	      top: 8,
	      bottom: 8
	    });
			
	    var talentController = Alloy.createController('heroDetailsTalent', { talent: talents[level][talent] });
	    var talentView = talentController.getView();
	    
	    $.pageContainer.add(talentView);
			
			if(talent < talents[level].length -1)
	      $.pageContainer.add(separator);
	    else
	    	$.pageContainer.add(Ti.UI.createView({
	    		height: 8
	    	}));
		}
  }
}
