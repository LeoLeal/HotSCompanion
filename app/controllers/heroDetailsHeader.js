// Arguments passed into this controller can be accessed off of the `$.args` object directly or:
var args = $.args;
var selectedHero = args.selectedHero;
var skinSelectorArray = [];
var currentSelectedSkin = 0;

init();

function init(){
  
  Ti.API.info('[HERO DETAILS HEADER CONTROLLER] SelectedHero: ' + JSON.stringify(selectedHero));
  $.headerName.text = selectedHero.name[Ti.Locale.currentLanguage].toUpperCase();
  $.headerUniverseIcon.image = '/images/dark/touchable_universe-'+selectedHero.universe+'.png';
  $.headerUniverseLabel.text = selectedHero.universe.charAt(0).toUpperCase() + selectedHero.universe.slice(1);
  $.headerRoleIcon.image = '/images/dark/touchable_role-' + selectedHero.role + '.png';
  $.headerRoleLabel.text = L(selectedHero.fightDistance + '_' + selectedHero.role);

  videoInitPreloader();
  for(var i=0; i<selectedHero.skins.length; i++){
    skinSelectorArray.push(
      Ti.UI.createImageView({
        image: selectedHero.skins[i].icon,
        width: 32,
        height: 32,
        left: 0,
        right: 2,
        borderRadius: 16,
        borderColor: '#48acef',
        borderWidth: 1,
        skinIndex: i
      })
    );
    skinSelectorArray[i].addEventListener('click',selectSkinListener);
    $.skinSelectContainer.add(skinSelectorArray[i]);
  }
  selectSkin(0);
  
}

function videoInitPreloader() {
  if(OS_ANDROID){
    $.videoPlayer.addEventListener("playbackstate" , function (e) {
      if (e.playbackState === Titanium.Media.VIDEO_PLAYBACK_STATE_STOPPED) {
        $.videoPlayer.play();
      }
    });
    $.videoPlayer.addEventListener("preload" , function (e) {
      setTimeout(function(){
        $.videoPlayer.opacity = 1;
      },500);
    });
  }
}

function selectSkin(skinIndex){
  skinSelectorArray[currentSelectedSkin].borderColor = '#48acef';
  skinSelectorArray[skinIndex].borderColor = '#fff';
  currentSelectedSkin = skinIndex;
  $.headerSubtitle.text = selectedHero.skins[skinIndex].name[Ti.Locale.currentLanguage].toUpperCase();
  $.videoPlayer.url = selectedHero.skins[skinIndex].video;
  Ti.API.info('[HERO DETAILS HEADER CONTROLLER] Video Player: ' + JSON.stringify($.videoPlayer));
  Ti.API.info('[HERO DETAILS HEADER CONTROLLER] Video Player URL: ' + JSON.stringify($.videoPlayer.url));
}

function selectSkinListener(event){
  selectSkin(event.source.skinIndex);
}