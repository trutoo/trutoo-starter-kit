#!/usr/bin/env bash
CO='\033[0;35m' # Purple
NC='\033[0m' # No Color

npm run build -- $1

printf "${CO}Initializing Server${NC}\n"
nodemon build/server.js --delay 2s --watch src/server.jsx