var fs = require('fs')

//Define the object and the clone
var obj = {o:{},__o:{}};
//The location of the file
var dest;

module.exports = function(d){
  dest = d;

  //If the file doesn't exist then create it
  if(!fs.existsSync(dest)){
    fs.openSync(dest, 'w');
    saveObj();
  }

  //Load the file
  obj.__o = obj.o = JSON.parse(fs.readFileSync(dest,'utf8'));

  //Update the files getter so it will update the file
  Object.defineProperty(obj, "o", {
    get: function(){return obj.__o}
  });

  return obj;
};

//Saves the file
var saveObj = function(){
  fs.writeFileSync(dest, JSON.stringify(obj.__o))
}

//Ensures the file is saved as the process exits
process.on('exit', function () {saveObj();});