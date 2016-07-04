#!/bin/bash
CO='\033[0;35m' # Purple
NC='\033[0m' # No Color

printf "${CO}Creating Client & Server Bundle${NC}\n"
printf "${CO}Adding Watchers After Compile${NC}\n"
webpack --progress --colors --watch --config build.config
exit;