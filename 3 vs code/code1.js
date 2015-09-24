var ns1;
(function (ns1) {
    this.cl = console.log;
    cl("hello world");
    cl("hello world");
    debugger;
})(ns1 || (ns1 = {}));
var ns2;
(function (ns2) {
    'use strict';
    this.cl = console.log;
    cl("hello world");
})(ns2 || (ns2 = {}));
