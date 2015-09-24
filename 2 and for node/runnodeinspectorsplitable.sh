#!/bin/bash


#node --debug-brk code1.js &
#node-inspector &


node-debug code1.js &


/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome http://localhost:8088/debug?ws=127.0.0.1:8088&port=5858 &

#if address is in use > killall node
