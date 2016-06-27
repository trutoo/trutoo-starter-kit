#!/bin/bash
CO='\033[0;35m' # Purple
NC='\033[0m' # No Color

function client {
	printf "${CO}Watching For Client Changes${NC}\n"
	watchify src/client.jsx -o .dist/public/client.js -v
}

function server {
	printf "${CO}Watching For Server Changes${NC}\n"
	watchify src/server.jsx -o .dist/server.js -v --node
}

function style {
	printf "${CO}Watching For Style Changes${NC}\n"
	gaze --silent "npm run build:style" "src/**/*.less"
}

# Switch for specific watch processes

case $1 in
'client') 
	client ;;

'server')
	server ;;

'style')
	style ;;

'')
	client & server & style & livereload .dist/ -p 9201;;
esac