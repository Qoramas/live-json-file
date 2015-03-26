# live-json-file

Have you ever had to constantly write and read to a JSON file. Well this is the module for you.

This module takes the hassle out of reading and writing json files. You simply treat the file as any standard object with this simple module.

## Sample Code

With the following code, the files "file.json" and "file2.json" is bound to the variables "obj" and "obj2" respectively. Everytime you update the object as follows the file updates.

	var livefile = require('live-json-file');

  var obj = new livefile.Object("file.json");

  var obj2 = new livefile.Object("file2.json");

  obj.o.a = "obj 1";

  obj2.o.a = "obj 2";

  obj.o.b = "obj 1";

  obj2.o.b = "obj 2";
  
## Current Major Issues

As any BETA software it is not without its flaws. The reason for these errors is due to the fact that JS is not intended to work this way and a lot of workarounds are in place to make it work.

The file does not update immediately. Once a change has been made to a field of the object then 1 more change or closing the program is require after that to save it to the file. i.e, in the above example obj.a is not saved on the file till obj.b is changed. and obj.c is not updated till the program terminates. This is a flaw due to the workaround used on the JS getter.

## Updates

v0.1
Multiple files can now be created