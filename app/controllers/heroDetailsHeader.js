// Arguments passed into this controller can be accessed off of the `$.args` object directly or:
var imageFactory = require('imageFactory');
var args = $.args;
var selectedHero = args.selectedHero;
var skinSelectorArray = [];
var currentSelectedSkin = 0;

init();

function init(){

  var universeLabel = selectedHero.universe.charAt(0).toUpperCase() + selectedHero.universe.slice(1);
  if(selectedHero.universe == 'legacy')
    universeLabel = L('legacy');

  $.headerName.text = selectedHero.name[Ti.Locale.currentLanguage].toUpperCase();
  $.headerUniverseIcon.image = '/images/dark/touchable_universe-'+selectedHero.universe+'.png';
  $.headerUniverseLabel.text = universeLabel;
  $.headerRoleIcon.image = '/images/dark/touchable_role-' + selectedHero.role + '.png';
  $.headerRoleLabel.text = L(selectedHero.fightDistance + '_' + selectedHero.role);

  videoInitPreloader();
  for(var i=0; i<selectedHero.skins.length; i++){
    var cacheImage = imageFactory.getImage(selectedHero.skins[i].icon);
    var skinImage = Ti.UI.createImageView({
      image: cacheImage.image,
      width: 32,
      height: 32,
      left: 0,
      right: 2,
      borderRadius: 16,
      borderColor: '#48acef',
      borderWidth: 1,
      skinIndex: i
    });
    skinImage.addEventListener('load', function(){
      cacheImage.fireEvent('load', {image: skinImage.toImage()});
    });
    skinSelectorArray.push(skinImage);
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
      $.videoPlayer.opacity = 1;
    });
  }
  $.videoPlayer.addEventListener("playbackstate" , function (e) {
    if (e.playbackState === Titanium.Media.VIDEO_PLAYBACK_STATE_PLAYING)
      $.skinActivity.hide();
  });
}

function selectSkin(skinIndex){
  $.skinActivity.show();
  skinSelectorArray[currentSelectedSkin].borderColor = '#48acef';
  skinSelectorArray[skinIndex].borderColor = '#fff';
  currentSelectedSkin = skinIndex;
  $.headerSubtitle.text = selectedHero.skins[skinIndex].name[Ti.Locale.currentLanguage].toUpperCase();
  $.videoPlayer.url = selectedHero.skins[skinIndex].video;
}

function selectSkinListener(event){
  selectSkin(event.source.skinIndex);
}