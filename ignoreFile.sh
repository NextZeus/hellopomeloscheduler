#!/usr/bin/env bash

filename=$1

echo "add ${filename} to .gitignore "

# append filename to .gitignore
bash -c "echo ${filename} >> .gitignore" 

# remove from repo cache without deleting file from disk
git ls-files -ci --exclude-standard -z | xargs -0 git rm --cached