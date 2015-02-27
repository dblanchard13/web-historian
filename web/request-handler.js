var path = require('path');
var archive = require('../helpers/archive-helpers');
var utils = require('./http-helpers');
var urlParser = require('url');
var fetcher = require('../workers/htmlfetcher.js');


var actions = {
  'GET': function(request, response){
    var parts = urlParser.parse(request.url);
    var urlPath = parts.pathname === '/' ? '/index.html' : parts.pathname;
    utils.serveAssets(response, urlPath);
  },

  'POST': function(request, response){
    utils.collectData(request, function(data){
      var url = data.slice(4);
      archive.isUrlInList(url, function(found){
        if(found){
          console.log('found')
          //check if page has been loaded
          archive.isURLArchived(url, function(archived){
            // if so
            if(archived){
              // redirect to the archived page
              console.log('archived!')
              utils.sendRedirect(response, ('/' + url))
            // if not
            } else {
              //redirect to loading.html
              utils.sendRedirect(response, '/loading.html');              
            }
          })
        } else {
          archive.addUrlToList(url, function(status){
            utils.sendRedirect(response, '/loading.html');
          })
        }
      })    
    })
  }
}

exports.handleRequest = function (request, response) {
  var action = actions[request.method];
    if(action){
      action(request, response);
    } else {
      utils.sendResponse(response, "Not Found", 404);
    }
};


