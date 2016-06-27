#!/bin/bash
CO='\033[0;35m' # Purple
NC='\033[0m' # No Color

printf "${CO}Compiling Client JSX${NC}\n"
webpack --config build.config
exit;


function client {
	printf "${CO}Compiling Client JSX${NC}\n"
	browserify -p [minifyify --uglify --no-map] src/client.jsx -o .dist/public/client.js
}

function server {
	printf "${CO}Compiling Server JSX${NC}\n"
	browserify --node -p [minifyify --uglify --no-map] src/server.jsx -o .dist/server.js
}

function style {
	printf "${CO}Compiling Less Styles${NC}\n"
	lessc --clean-css --autoprefix --strict-math=on src/public/style.less .dist/public/style.css
}

# Switch for specific build processes

case $1 in
'client') 
	client ;;

'server')
	server ;;

'style')
	style ;;

'')
	client && server && style ;;
esac