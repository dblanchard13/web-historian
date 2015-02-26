

var Database = function(){
  var db = {};

  var storage = {};

  db.get = function(key, done){
    var result = [];
    if(storage[key]){
      result = strage[key];
    }
    done(result);
  };

  db.set = function(key, value, done){
    if(!storage[key]){
      storage[key] = value;
    } else {
      storage[key].push(value);
    }
    done([]);
  };
  return db;
};


exports.database = Database();