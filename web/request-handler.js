var path = require('path');
var archive = require('../helpers/archive-helpers');
var utils = require('./http-helpers');
var urlParser = require('url');


var actions = {
  'GET': function(request, response){
    var parts = urlParser.parse(request.url);
    var urlPath = parts.pathname === '/' ? '/index.html' : parts.pathname;
    utils.serveAssets(response, urlPath);
  },

  'POST': function(request, response){
    // console.log(request)
    // var parts = urlParser.parse(request.url);
    // console.log(parts)
    // var urlPath = parts.pathname === '/' ? '/index.html' : parts.pathname;
    utils.collectData(request, function(data){
      var url = data.slice(4);
      archive.isUrlInList(url, function(found){
        if(found){
          console.log('found')
          //check if page has been loaded
            // if so
              // redirect to the archived page
            // if not
              //redirect to loading.html
        } else {
          archive.addUrlToList(url, function(data){
            console.log(data)
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







 // utils.collectData(request, function(data){
 //      var url;
 //      archive.isUrlInList(url, function(found){
 //        if(found){
 //          archive.isURLArchived(url, function(exists){
 //            if(exists){

 //            } else {

 //            }
 //          })
 //        } else {
 //          archive.addUrlToList(url, function(){

 //          });
 //        }
 //      })
 //    });