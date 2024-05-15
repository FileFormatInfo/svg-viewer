#!/usr/bin/env bash
#
# run similar to production
#

set -o errexit
set -o pipefail
set -o nounset

if [ -f ".env" ]; then
	echo "INFO: loading environment variables"
	export $(cat .env)
fi

if [ ! -d "dist" ]; then
	echo "INFO: building frontend"
	npm run build
fi

echo "INFO: building backend"
go build -o tmp/svgpreview cmd/svgpreview/*.go

echo "INFO: running backend"
./tmp/svgpreview
