#!/usr/bin/env bash
NEU='\033[0;35m' # Purple
POS='\033[1;32m' # Green
NEG='\033[1;31m' # Red
NC='\033[0m' # No Color

./tools/build.sh $1

printf "\n${NEU}Initializing server${NC}\n\n"

nodemon build/server.js --delay 2s --watch src/server.jsx