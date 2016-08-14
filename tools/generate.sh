#!/usr/bin/env bash
NEU='\033[0;35m' # Purple
POS='\033[0;32m' # Green
NEG='\033[0;31m' # Red
NC='\033[0m' # No Color

# Set variable

TYPE=$1
NAME=$2

if [ -z "$TYPE" ]; then
	printf "${NEU}Specify type [component|container|view]: ${NC}"
	read TYPE
fi

TYPE=$( tr '[:upper:]' '[:lower:]' <<<"$TYPE" )

if [ -z "$NAME" ]; then
	printf "${NEU}Simple name for your ${TYPE} (eg. Home, Header, Product): ${NC}"
	read NAME
fi

# Generate files and folders

function component {
	printf "${NEU}Creating ${NAME} presentational component${NC}\n"
	DIR="./src/components/${NAME}"
	mkdir -p $DIR
	sed -e "s;NAME;${NAME};g" ./tools/templates/component.jsx > "${DIR}/${NAME}.jsx"
	sed -e "s;NAME;${NAME};g" ./tools/templates/style.css > "${DIR}/style.css"
}

function container {
	printf "${NEU}Creating ${NAME} container component${NC}\n"
	DIR="./src/components/${NAME}"
	mkdir -p $DIR
	sed -e "s;NAME;${NAME};g" ./tools/templates/container.jsx > "${DIR}/${NAME}Container.jsx"
	sed -e "s;NAME;${NAME};g" ./tools/templates/component.jsx > "${DIR}/${NAME}.jsx"
	sed -e "s;NAME;${NAME};g" ./tools/templates/style.css > "${DIR}/style.css"
}

function view {
	printf "${NEU}Creating ${NAME} view component${NC}\n"
	DIR="./src/views/${NAME}View"
	mkdir -p $DIR
	sed -e "s;NAME;${NAME};g" ./tools/templates/view.jsx > "${DIR}View/${NAME}View.jsx"
	sed -e "s;NAME;${NAME};g" ./tools/templates/style.css > "${DIR}View/style.css"
}

# Switch for specific build processes

case $TYPE in
'component') 
	component ;;

'container')
	container ;;

'view')
	view ;;

*)
	printf "${NEG}Cannot generate component of type ${TYPE}${NC}\n\n"
	exit 1 ;;
esac