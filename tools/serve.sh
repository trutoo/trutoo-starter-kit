#!/usr/bin/env bash
CO='\033[0;35m' # Purple
NC='\033[0m' # No Color

./tools/build.sh $1

printf "\n${CO}Initializing Server${NC}\n\n"

nodemon build/server.js --delay 2s --watch src/server.jsx