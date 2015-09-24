/// <reference path="../typings/express/express.d.ts" />
/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/stylus/stylus.d.ts" />
/// <reference path="../typings/htmlparser2/htmlparser2.d.ts" />
var http = require("http");
var https = require("https");
var hp2 = require("htmlparser2");
var routes;
(function (routes) {
    function index(req, res) {
        res.render("index", { title: " Node Debugging Express ", year: new Date().getFullYear() });
    }
    routes.index = index;
    function about(req, res) {
        res.render("about", { title: "About", year: new Date().getFullYear(), message: "Your node application description page." });
    }
    routes.about = about;
    function contact(req, res) {
        res.render("contact", { title: "Contact", year: new Date().getFullYear(), message: "Your contact page." });
    }
    routes.contact = contact;
    function getUrlText(req, res) {
        var targetPage = "https://en.wikipedia.org/wiki/Sahara";
        //    targetPage = "http://www.mediawiki.org/w/index.php?title=Project:General_disclaimer&action=info";
        //    targetPage = "http://localhost:3000/test.html";
        //    targetPage = "http://localhost:3000/fonts/glyphicons-halflings-regular.eot";
        var currentTag = "";
        var indenter = [];
        //var alltext = ""
        var lengthTextTransfered = 0;
        var tagsToExclude = ["script", "link", "style", "pre"];
        var parser = new hp2.Parser({
            onerror: function () {
                return console.log("parser error hit");
            },
            onopentag: function (tname) {
                currentTag = tname;
                //    indenter.push("=>");
                //   indenter.push(currentTag);
                //   console.log(indenter.join(" ") + " open  " + currentTag);
            },
            onclosetag: function (tname) {
                //    console.log(indenter.join(" ") + " close " + tname);
                //    currentTag=  indenter.pop();
                currentTag = currentTag ? currentTag : ""; // fuse
            },
            ontext: function (textchunk) {
                if (tagsToExclude.indexOf(currentTag) < 0) {
                    if (textchunk && textchunk.length > 0) {
                        lengthTextTransfered += textchunk.length;
                        //alltext += textchunk;
                        res.write(textchunk);
                    }
                }
            },
            onend: function () {
                //res.render("urlText", { title: "text content of " + targetPage, urltext: alltext });
                res.end();
                //   console.log("finished stack is at " + indenter.length);
                console.log("returned text was  " + lengthTextTransfered + " characters long");
            }
        });
        var thePipe = (function (p) { return function (response) {
            response.pipe(p); // stream to the html parser
        }; })(parser);
        if (targetPage.substring(0, 5) === 'https') {
            https.get(targetPage, thePipe)
                .on("error", function (err) {
                console.log("This URL is invalid: ", targetPage);
                console.log(err);
            });
        }
        else {
            http.get(targetPage, thePipe)
                .on("error", function (err) {
                console.log("This URL is invalid: ", targetPage);
                console.log(err);
            });
        }
    }
    routes.getUrlText = getUrlText;
})(routes = exports.routes || (exports.routes = {}));
