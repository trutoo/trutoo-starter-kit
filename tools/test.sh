#!/usr/bin/env bash
CO='\033[0;35m' # Purple
NC='\033[0m' # No Color

printf "${CO}Running ESLint on files${NC}\n"
eslint --ext .js --ext .jsx src/