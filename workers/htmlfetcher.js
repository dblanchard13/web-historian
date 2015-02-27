var archive = require('../helpers/archive-helpers.js');  

archive.readListOfUrls(archive.downloadUrls);
console.log('Hello, world')

// Having cron issues, so tried using a set interval to archive urls every minute the server is running.
// Unfortunately this threw an 'Unhandled stream error in pipe', so archiving everytime the server boots will have to suffice for now.
  // setInterval(function(){
  //   archive.readListOfUrls(archive.downloadUrls);
  //   console.log('Archives Updated');
  // }, 60000 )
