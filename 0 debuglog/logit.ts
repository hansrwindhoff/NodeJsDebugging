/// <reference path="./typings/node/node.d.ts"/>

import util= require('util') ;


var fs = require('fs');
var profiler = require('v8-profiler');

var bar = 123;


profiler.startProfiling('1', true);
var debuglog = util.debuglog('foo');
debuglog('hello from foo [%d]', bar);
console.log('done');


var profile2 = profiler.stopProfiling();
profile2.export(function (error, result) {
    fs.writeFileSync('profile.cpuprofile', result);
    profile2.delete();
});
