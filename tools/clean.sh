#!/usr/bin/env bash
NEU='\033[0;35m' # Purple
POS='\033[1;32m' # Green
NEG='\033[1;31m' # Red
NC='\033[0m' # No Color

printf "${NEU}Cleaning old build files...${NC}\n"
rm -rf build/ && mkdir build/

if [ $? -eq 0 ]; then
	printf "\n${POS}Successful, nothing left!${NC}\n"
else
	printf "\n${NEG}Failed, something got stuck!${NC}\n"
fi