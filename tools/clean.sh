#!/usr/bin/env bash
CO='\033[0;35m' # Purple
NC='\033[0m' # No Color

printf "${CO}Clean Old Build & Temp Files${NC}\n"
rm -rf build/
mkdir build/