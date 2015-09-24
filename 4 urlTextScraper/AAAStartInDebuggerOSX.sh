#!/bin/bash



#node inspector
node --debug-brk app.js &
node-inspector --web-port=8090 &

/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome http://localhost:8090 &
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome http://localhost:3000 &
