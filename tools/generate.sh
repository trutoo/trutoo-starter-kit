#!/bin/bash
CO='\033[0;35m' # Purple
NC='\033[0m' # No Color

# Set variable

TYPE=$1
NAME=$2

if [ -z "$TYPE" ]; then
	printf "${CO}Please specify type of component [presentational|container|view]: ${NC}"
	read TYPE
fi

TYPE=$( tr '[:upper:]' '[:lower:]' <<<"$TYPE" )

if [ -z "$NAME" ]; then
	printf "${CO}Please enter a name for your ${TYPE} component: ${NC}";
	read NAME;
fi

# Generate files and folders

function presentational {
	printf "${CO}Creating ${NAME} presentational component${NC}\n"
	DIR="../src/components/${NAME}"
	mkdir -p $DIR
	sed -e "s;%NAME%;${NAME};g" ./templates/component.jsx > "${DIR}/index.jsx"
	sed -e "s;%NAME%;${NAME};g" ./templates/component-style.css > "${DIR}/style.css"
}

function container {
	printf "${CO}Creating ${NAME} container component${NC}\n"
	DIR="../src/components/${NAME}"
	mkdir -p $DIR
	sed -e "s;%NAME%;${NAME};g" ./templates/component-redux.jsx > "${DIR}/index.jsx"
	sed -e "s;%NAME%;${NAME};g" ./templates/component-style.css > "${DIR}/style.css"
}

function view {
	printf "${CO}Creating ${NAME} view component${NC}\n"
	DIR="../src/views/${NAME}"
	mkdir -p $DIR
	sed -e "s;%NAME%;${NAME};g" ./templates/component-redux.jsx > "${DIR}/index.jsx"
	sed -e "s;%NAME%;${NAME};g" ./templates/component-style.css > "${DIR}/style.css"
}

# Switch for specific build processes

case $TYPE in
'presentational') 
	presentational ;;

'container')
	container ;;

'view')
	view ;;

*)
	printf "${CO}Cannot generate component of type ${TYPE}${NC}\n" ;;
esac