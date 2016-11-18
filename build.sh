#! /bin/bash
rm -r dist
mkdir dist
mkdir dist/js
webpack -p
cp -r css dist/css
cp -r data dist/data
cp -r src dist/src
cp index.html dist/index.html