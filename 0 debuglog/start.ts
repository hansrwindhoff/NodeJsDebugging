/// <reference path="./typings/node/node.d.ts"/>

import util= require('util') ;
var bar = 123;
var debuglog = util.debuglog('foo');
debuglog('hello from foo [%d]', bar);
 
