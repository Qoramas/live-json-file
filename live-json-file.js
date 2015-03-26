var fs = require('fs')

module.exports.Object = function(d){
  var o={}, __o={}, dest=d;

  if(!fs.existsSync(dest)){
    fs.openSync(dest, 'w');
    saveObj(dest, __o);
  }

  __o = o = JSON.parse(fs.readFileSync(dest,'utf8'));

  Object.defineProperty(this, 'o', {
    get: function(){
      console.log(__o);
      saveObj(dest, __o);
      return __o;
    },
    set: function(newObj){
      console.log(__o);
      saveObj(dest, __o);
      __o = newObj;
    }
  });

  process.on('exit', function (){saveObj(dest, __o)});
};

saveObj = function(dest, obj){
  fs.writeFileSync(dest, JSON.stringify(obj));
}