#!/usr/bin/env bash
NEU='\033[0;35m' # Purple
POS='\033[1;32m' # Green
NEG='\033[1;31m' # Red
NC='\033[0m' # No Color

printf "${NEU}Running ESLint on files...${NC}\n"
eslint --ext .js --ext .jsx src/

if [ $? -eq 0 ]; then
	printf "\n${POS}Successful, all files are lint free!${NC}\n"
else
	printf "${NEG}Failed, go back and clean up!${NC}\n"
fi