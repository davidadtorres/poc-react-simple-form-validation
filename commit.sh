#!/bin/bash
#
# commit.sh
#
# Syntax:
#   commit.sh 'commit_message' [-r]
#   -r: create a tag release
#

if [ $# -gt 2 ] || [ $# -lt 1 ]
then
  echo -e "SYNTAX ERROR: parameter expected!\n\ncommit.sh 'commit_message' [-r]\n  -r: create a tag release"
  exit -1
fi

build=$(grep "BUILD=" .env | cut -d= -f2)
((build += 1))
sed -i "s/BUILD=[0-9]\+/BUILD=$build/g" .env

git add .
git commit -m "$1"

if [ $? == '0' ]
then
   if [ $# -eq 2 ] && [ $2 == '-r' ]
   then    
     npm run release
   fi
   git push --follow-tags origin-git master
else
  ((build -= 1))
  sed -i "s/BUILD=[0-9]\+/BUILD=$build/g" .env
fi
git log -n 4 --oneline
