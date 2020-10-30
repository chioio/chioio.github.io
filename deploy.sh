#!/usr/bin/env sh

# abort on errors
set -e

# build
yarn docs:build

# navigate into the build output directory
cd docs/.vuepress/dist

git init
git add -A
git commit -m '☺︎ Deploy'

# deploying to https://<USERNAME>.github.io
git push -f git@github.com:chioio/chioio.github.io.git master

# deploying to https://<USERNAME>.github.io/<REPO>
#git push -f git@github.com:chioio/<REPO>.git master:gh-pages