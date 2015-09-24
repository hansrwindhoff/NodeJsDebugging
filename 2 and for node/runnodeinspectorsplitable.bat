start "" /D"." node --debug-brk code1.js
start "" /D"." node-inspector
start chrome http://localhost:8080/debug?ws=127.0.0.1:8080&port=5858
