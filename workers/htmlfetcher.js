// eventually, you'll have some code here that uses the code in `archive-helpers.js`
// to actually download the urls you want to download.
var archive = require('../helpers/archive-helpers.js');
var utils = require('../web/http-helpers.js');
var fs = require('fs');

var urls = [];

exports.getUrls = function(){
  archive.readListOfUrls(function(sites){
    sites.forEach(function(site){
          console.log('site - ' + site)
      urls.push(site);
      console.log('urls - ' + urls)    
    })
  })
};

exports.archiveUrls = function(urlToArchive){
// create a new file in the archive/sites 
  fs.writeFile((archive.paths.archivedSites + '/' + urlToArchive), urlToArchive, function(err){
                                      // name it after the url   // copy in the html data for said url
    if(err){
      console.log('fucking error - ' + err);
    } 
  })    
};  

exports.diffUrlsArchive = function(){
  urls.forEach(function(url){
// check sites in url list against sites that have already been archived
    archive.isURLArchived(url, function(archived){
      // for those that haven't been
      if(!archived){
        // archive url data
        exports.archiveUrls(url)
      }
    })
  })
};
