#! /bin/bash
rm -r dist
mkdir dist
webpack -p
cp -r css dist/css
cp -r data dist/data
cp -r img dist/img
cp -r js dist/js
cp -r src dist/src
cp index.html dist/index.html