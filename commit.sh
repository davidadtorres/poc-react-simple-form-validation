#!/bin/bash

build=$(grep "BUILD=" .env | cut -d= -f2)
((build += 1))
sed -i "s/BUILD=[0-9]\+/BUILD=$build/g" .env

git add .
git commit -m "$1"

if [ $? == '0' ]
then
   npm run release
   git push --follow-tags origin-git master
else
   ((build -= 1))
   sed -i "s/BUILD=[0-9]\+/BUILD=$build/g" .env
fi