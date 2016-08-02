var Q = require('q');
var utils = require('utils');
var fs = Ti.Filesystem;
var http = Ti.Network.createHTTPClient();

var TODAY = new Date();

// PUBLIC METHODS
exports.getFile = getFile;

function getFile(options){
  var remoteUrl = options.url;
  var fileName = utils.slugfy(remoteUrl.replace('http://','').replace('https://', ''));
  Ti.API.debug('[CACHE FACTORY][FILENAME]' + fileName);
  return Q.Promise(function(resolve, reject, notify){

  });
}

// PRIVATE METHODS

function createFile(){
  
}
