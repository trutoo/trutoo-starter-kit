#!/bin/bash
CO='\033[0;35m' # Purple
NC='\033[0m' # No Color

npm run clean
npm run copy
npm run build

printf "${CO}Initializing Server${NC}\n"
node .dist/server.js