#!/usr/bin/env bash
NEU='\033[0;35m' # Purple
POS='\033[0;32m' # Green
NEG='\033[0;31m' # Red
NC='\033[0m' # No Color

./tools/clean.sh

printf "\n${NEU}Creating initial client & server bundle...${NC}\n\n"

ENV=$( tr '[:upper:]' '[:lower:]' <<< "$1" )
if [ "$ENV" = "prod" -o "$ENV" = "production" -o "$ENV" = "release" ]; then
	webpack --production --progress --colors --config tools/build.config
else
	webpack --development --progress --colors --config tools/build.config
fi

if [ $? -eq 0 ]; then
	printf "\n${POS}Successful, ready to go!${NC}\n\n"
	exit 0
else
	printf "\n${NEG}Failed, something needs tweaking!${NC}\n\n"
	exit 1
fi