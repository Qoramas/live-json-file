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
      saveObj(dest, __o);
      return __o;
    },
    set: function(newObj){
      saveObj(dest, __o);
      __o = newObj;
    }
  });

  process.on('exit', function (){saveObj(dest, __o)});
};

module.exports.ObjectProxy = function(d){
  var dest= d, obj={};

  if(!fs.existsSync(dest)){
    fs.openSync(dest, 'w');
    saveObj(dest, obj);
  }

  obj = JSON.parse(fs.readFileSync(dest,'utf8'));

  var o = Proxy.create({
    get:function(p, name){
      saveObj(dest, obj);
      return obj[name];
    },
    set:function(p, name, val){
      obj[name] = val;
      saveObj(dest, obj);
    },
    keys:function(){return Object.keys(obj);},
    getOwnPropertyDescriptor:function(prop){ return Object.getOwnPropertyDescriptor(obj, prop);}
  });

  return o;
};

saveObj = function(dest, obj){
  fs.writeFileSync(dest, JSON.stringify(obj));
}