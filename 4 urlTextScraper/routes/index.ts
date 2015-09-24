/// <reference path="../typings/express/express.d.ts" />
/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/stylus/stylus.d.ts" />
/// <reference path="../typings/htmlparser2/htmlparser2.d.ts" />



import http = require("http");
import https = require("https");
import express = require("express");
import hp2 = require("htmlparser2");


export module routes {

    export function index(req: express.Request, res: express.Response) {
        res.render("index", { title: " Node Debugging Express ", year: new Date().getFullYear() });
    }

    export function about(req: express.Request, res: express.Response) {
        res.render("about", { title: "About", year: new Date().getFullYear(), message: "Your node application description page." });
    }

    export function contact(req: express.Request, res: express.Response) {
        res.render("contact", { title: "Contact", year: new Date().getFullYear(), message: "Your contact page." });
    }


    export function getUrlText(req: express.Request, res: express.Response) {
        var
            targetPage = "https://en.wikipedia.org/wiki/Sahara";
        //    targetPage = "http://www.mediawiki.org/w/index.php?title=Project:General_disclaimer&action=info";
        //    targetPage = "http://localhost:3000/test.html";
        //    targetPage = "http://localhost:3000/fonts/glyphicons-halflings-regular.eot";


        var currentTag = "";
        var indenter = <string[]>[];
        //var alltext = ""
        var lengthTextTransfered = 0;
        var tagsToExclude = ["script", "link", "style", "pre"];


        var parser = new hp2.Parser(<hp2.Handler>{
            onerror: () =>
                console.log("parser error hit"),
            onopentag: tname => {
                currentTag = tname;
                //    indenter.push("=>");
                //   indenter.push(currentTag);
                //   console.log(indenter.join(" ") + " open  " + currentTag);
            },  // track which tag we are in
            onclosetag: (tname) => {
                //    console.log(indenter.join(" ") + " close " + tname);
                //    currentTag=  indenter.pop();
                currentTag = currentTag ? currentTag : "";// fuse
            },
            ontext: (textchunk: string) => {
                if (tagsToExclude.indexOf(currentTag) < 0) {
                    if (textchunk && textchunk.length > 0) {
                        lengthTextTransfered += textchunk.length;
                        //alltext += textchunk;
                        res.write(textchunk);
                    }
                }
            },
            onend: () => {
                //res.render("urlText", { title: "text content of " + targetPage, urltext: alltext });
                res.end();
                //   console.log("finished stack is at " + indenter.length);
                console.log("returned text was  " + lengthTextTransfered + " characters long");

            }
        });

        var thePipe =
            ((p: hp2.Parser) => (response) => {
                response.pipe(p);// stream to the html parser
            })(parser);

        if (targetPage.substring(0, 5) === 'https') {
            https.get(targetPage, thePipe)
                .on("error", (err) => {
                    console.log("This URL is invalid: ", targetPage);
                    console.log(err);
                });
        } else {
            http.get(targetPage, thePipe)
                .on("error", (err) => {
                    console.log("This URL is invalid: ", targetPage);
                    console.log(err);
                });
        }

    }
}
