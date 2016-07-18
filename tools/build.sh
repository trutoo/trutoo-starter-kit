#!/usr/bin/env bash
CO='\033[0;35m' # Purple
NC='\033[0m' # No Color

./tools/clean.sh

printf "\n${CO}Creating Initial Client & Server Bundle${NC}\n\n"

ENV=$( tr '[:upper:]' '[:lower:]' <<< "$1" )
if [ "$ENV" = "prod" -o "$ENV" = "production" -o "$ENV" = "release" ]; then
	webpack --production --progress --colors --config tools/build.config
else
	webpack --development --progress --colors --config tools/build.config
fi