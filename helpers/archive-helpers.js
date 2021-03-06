var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var request = require('request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback){
  fs.readFile(exports.paths.list, 'utf8', function(err, sites){
    sites = sites.toString().split('\n');
    if(callback){
      callback(sites)
    }
  })
};

exports.isUrlInList = function(url, callback){
  exports.readListOfUrls(function(sites){
    var found = _.any(sites, function(site, i){
      return site.match(url)
    });
    callback(found)
  });
};

exports.addUrlToList = function(url, callback){
  // append each new url to sites.txt with a new line call after it
  // make note of 'appendFile' use as opposed to 'writeFile'
  fs.appendFile(exports.paths.list, (url + '\n'), function(err, site){
    if(err){
    } else {
      callback(302)      
    }
  })
};

exports.isURLArchived = function(url, callback){
  fs.readdir(exports.paths.archivedSites, function(err, files){
    var archived = false;
    files.forEach(function(file){
      if(url === file){
        archived = true
      }
    })
    callback(archived);
  })
};


exports.downloadUrls = function(urls){
  urls.forEach(function(url){
    if(!url){ return }
    request('http://' + url).pipe(fs.createWriteStream(exports.paths.archivedSites + '/' + url))
  });
  return true;
};






