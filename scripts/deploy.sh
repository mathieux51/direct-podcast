#!/usr/bin/env bash

set -o errexit
set -o nounset

npx now \
  --no-clipboard \
  -t ${NOW_TOKEN} \
  -m commit=${GITHUB_SHA} -m branch=${GITHUB_REF} \
  -b REACT_APP_RECAPTCHA_CLIENT_SIDE=${REACT_APP_RECAPTCHA_CLIENT_SIDE} \
  -b SENTRY_AUTH_TOKEN=${SENTRY_AUTH_TOKEN}
  --prod

npx now \
  -t ${NOW_TOKEN} \
  alias direct-podcast.now.sh directpodcast.fr

