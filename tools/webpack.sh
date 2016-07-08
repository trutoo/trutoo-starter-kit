#!/usr/bin/env bash
CO='\033[0;35m' # Purple
NC='\033[0m' # No Color

printf "${CO}1. Creating Client & Server Bundle${NC}\n"
printf "${CO}2. Adding Watchers After Compile${NC}\n"
printf "${CO}3. Starting Live Reload After Compile${NC}\n"
webpack --progress --colors --watch --config tools/build.config
exit;