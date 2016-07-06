#!/usr/bin/env bash
CO='\033[0;35m' # Purple
NC='\033[0m' # No Color

printf "${CO}Copying Fonts, Images, and Videos${NC}\n"
rsync -a src/public/{fav,font,img,vid} build/public/
find src/ -name font -exec rsync -a {} build/public/ \;