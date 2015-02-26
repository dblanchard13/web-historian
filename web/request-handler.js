var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelp = require('./http-helpers');
var database = require('./database.js').database;
// require more modules/folders here!

var defaultCors = httpHelp.headers;

var endResponse = function(response, object, statusCode){
  statusCode = statusCode || 200;
  var headers = defaultCors;
  headers['Content-Type'] = 'text/plain';
  var result = JSON.stringify(object);
  response.writeHead(statusCode, headers);
  response.end(result);
  // need to make result = archive.paths.list
}


var object = {results: []};

exports.handleRequest = function (request, response) {

  if(request.method === 'POST'){
    var data = '';
    request.on('data', function(chunk){
      data += chunk;
    });
    request.on('end', function(){
      var message = JSON.parse(data);

      database.set(request.url, message, function(){
        endResponse(respone, object, 201)
      })
    });
  }

  if(request.method === 'GET'){
    database.get(request.url, function(result){
      object.results = result;
      endResponse(response, object, 200);
    });
  }

  if(request.method === 'OPTIONS'){
    endResponse(response, {}, 200);
  }


  console.log("Serving request type " + request.method + " for url " + request.url);
  // res.end(archive.paths.list);

};

// exports.handleRequest = handleRequest;
