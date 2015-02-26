var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var Q = require('q');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.sendResponse = function(response, obj, status){
  status = status || 200;
  response.writeHead(status, headers);
  response.end(obj);
};

exports.collectData = function(request, callback){
  var data = '';
  request.on('data', function(chunk){
    data += chunk;
  });
  request.on('end', function(){
    callback(data);
  });
};

exports.send404 = function(response){
  exports.sendResponse(response, '404: Page not found', 404);
};

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...), css, or anything that doesn't change often.)
  var encoding = {encoding: 'utf8'}
  // Check public folder
  fs.readFile(archive.paths.siteAssets + asset, encoding, function(err, data){
    if(err){
      console.log('public error')
      // doesn't exist? check archive folder
      fs.readFile(archive.paths.archivedSites + asset, encoding, function(err, data){
        console.log('checking archive')
        if(err){
          console.log('you fucking kidding me')
        // file doesn't exist for us
          callback ? callback() : exports.send404(res);          
        } else {
          console.log('in the archives')
          exports.sendResponse(res, data);
        } 
      });
    } else {
      // it exists! serve that shit
      console.log('Serve Assets, shits around')
      exports.sendResponse(res, data);
    }
  })
};

exports.writeAssets = function(res, asset, callback){
  var encoding = {encoding: 'utf8'}

  fs.writeFile('../archives/sites.txt', asset, function(err, written, string){
    if(err){ throw Error }
    console.log('writing');
  })
  res.end();
}













// As you progress, keep thinking about what helper functions you can put here!






