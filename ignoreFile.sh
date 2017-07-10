#!/usr/bin/env bash

if [ $# -lt 1 ];then
echo "sh ignoreFile.sh filename"
exit 1
fi

filename=$1

echo "add ${filename} to .gitignore "

# append filename to .gitignore
bash -c "echo ${filename} >> .gitignore" 

# remove from repo cache without deleting file from disk
git ls-files -ci --exclude-standard -z | xargs -0 git rm --cached