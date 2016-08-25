// PUBLIC METHODS
var Q = require('q');

exports.getImage = RemoteImage;

function _getExtension(fn) {
  var re = /(?:\.([^.]+))?$/;
  var tmpext = re.exec(fn)[1];
  return (tmpext) ? tmpext : '';
}

function RemoteImage(imgUrl){
  var a = {
  	width: Ti.UI.SIZE,
  	height: Ti.UI.SIZE,
  	image: imgUrl
  };
  var md5;
  var needsToSave = false;
  var savedFile;

  md5 = Ti.Utils.md5HexDigest(a.image) + _getExtension(a.image);
  savedFile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, md5);
  if(savedFile.exists()){
    a.image = savedFile;
  } else {
    needsToSave = true;
  }

  var image = Ti.UI.createImageView(a);
  if(needsToSave === true){
    function saveImage(e){
      image.removeEventListener('load',saveImage);
      savedFile.write(e.image);
    }
    image.addEventListener('load',saveImage);
    return image;
  } else {
  	return image;
  }
}