#!/usr/bin/env bash
set -e
docker run --rm --volume="$PWD:$PWD" --workdir $PWD node:12-buster npm install
docker run --rm --volume="$PWD:$PWD" --workdir $PWD node:12-buster npm test --coverage --watchAll=false
docker run --rm --volume="$PWD:$PWD" --workdir $PWD node:12-buster npm run build

GIT_HASH=`git rev-parse HEAD`

echo "{\"version\":\"$GIT_HASH\"}" > version-info.json
