#!/bin/bash
CO='\033[0;35m' # Purple
NC='\033[0m' # No Color

printf "${CO}Clean Old Build and Temp files${NC}\n"
rm -rf build/* .tmp/