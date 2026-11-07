#!/usr/bin/env bash
set -eu

mkdir -p dist/assets
cp -R website/. dist/
cp -R assets/. dist/assets/
find dist -type f -name '*.html' -exec sed -i 's#\.\./assets/#assets/#g' {} +
touch dist/.nojekyll
