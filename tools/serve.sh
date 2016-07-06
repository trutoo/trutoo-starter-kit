#!/usr/bin/env bash
CO='\033[0;35m' # Purple
NC='\033[0m' # No Color

printf "${CO}Initializing Server${NC}\n"
node build/server.js