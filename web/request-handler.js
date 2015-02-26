var path = require('path');
var archive = require('../helpers/archive-helpers');
var utils = require('./http-helpers');
var urlParser = require('url');
// require more modules/folders here!
var objectId = 1;
var messages = [];


var actions = {
  'GET': function(request, response){

    var parts = urlParser.parse(request.url);
    var urlPath = parts.pathname === '/' ? '/index.html' : parts.pathname;
    utils.serveAssets(response, urlPath);
    // look inside public and archive/sites
    // if exists, serve it
    // prioritize public
    // if not, look in archive


    response.end(archive.paths.list);
  },
  'POST': function(request, response){
   
  }
};

exports.handleRequest = function (request, response) {
  var action = actions[request.method];
    if( action ){
      action(request, response);
    } else {
      utils.sendResponse(response, "Not Found", 404);
    }
};
