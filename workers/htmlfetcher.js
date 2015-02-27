// eventually, you'll have some code here that uses the code in `archive-helpers.js`
// to actually download the urls you want to download.
var archive = require('../helpers/archive-helpers.js');
// var utils = require('../web/http-helpers.js');
// var fs = require('fs');

// exports.getUrls = function(){
//   archive.readListOfUrls(function(sites){
//     sites.forEach(function(site){
//           console.log('site - ' + site)
//       if(!(archive.isURLArchived(site, function(archived){return archived}))){
//         exports.archiveUrls(site);
//       }
//     })
//   })
// };

// exports.archiveUrls = function(urlToArchive){
// // create a new file in the archive/sites 
//   fs.writeFile((archive.paths.archivedSites + '/' + urlToArchive), urlToArchive, function(err){
//                                       // name it after the url   // copy in the html data for said url
//     if(err){
//       console.log('fucking error - ' + err);
//     } 
//   })    
// };  

archive.readListOfUrls(archive.downloadUrls);

console.log('Hello, world')