#!/bin/bash
#
# commit.sh
#
# Syntax:
#   -r: create a release
#

if [ $# -gt 1 ]
then
  echo -e "SYNTAX ERROR: parameter expected!\n  commit.sh [-r]"
  exit -1
fi

build=$(grep "BUILD=" .env | cut -d= -f2)
((build += 1))
sed -i "s/BUILD=[0-9]\+/BUILD=$build/g" .env

git add .
git commit -m "$1"

if [ $? == '0' ]
then
   if [ $# -eq 1 ] && [ $1 == '-r' ]
   then    
     npm run release
   fi
   git push --follow-tags origin-git master
else
  ((build -= 1))
  sed -i "s/BUILD=[0-9]\+/BUILD=$build/g" .env
fi