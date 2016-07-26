#!/usr/bin/env bash
NEU='\033[0;35m' # Purple
POS='\033[0;32m' # Green
NEG='\033[0;31m' # Red
NC='\033[0m' # No Color

./tools/build.sh $1

if [ $? -eq 0 ]; then
	printf "\n${NEU}Initializing server${NC}\n\n"
	nodemon build/server.js --delay 2s --watch src/server.jsx
fi

