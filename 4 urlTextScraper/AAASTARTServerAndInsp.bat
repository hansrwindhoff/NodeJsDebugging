rem by starting the node process inside a cmd /k shell the shell will stay open
rem after the process finishes allowing to read any output


start cmd /k  "node --debug-brk app.js"
start "" /D"." node-inspector --web-port=4000
