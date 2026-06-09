#!/usr/bin/env bash
#
# run locally for dev
#

set -o errexit
set -o pipefail
set -o nounset

#
# load an .env file if it exists
#
ENV_FILE="${1:-./.env}"
if [ -f "${ENV_FILE}" ]; then
    echo "INFO: loading '${ENV_FILE}'!"
    export $(cat "${ENV_FILE}")
fi

if [ ! -d "node_modules" ]; then
    echo "INFO: installing node modules!"
    npm install
fi

#
# build
#
npm run build

cd ./build/client

python3 -m http.server 4000
