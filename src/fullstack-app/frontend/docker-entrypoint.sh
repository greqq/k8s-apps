#!/bin/sh
# docker-entrypoint.sh
# This script runs BEFORE nginx starts
# It substitutes environment variables in nginx config

set -e

echo "Starting frontend with backend: ${BACKEND_SERVICE}"

# Use envsubst to replace ${BACKEND_SERVICE} in nginx.conf
# $BACKEND_SERVICE is passed from Kubernetes as environment variable
envsubst '${BACKEND_SERVICE}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf

# Verify the config was created correctly
echo "Generated nginx config:"
cat /etc/nginx/conf.d/default.conf

# Start nginx
exec nginx -g 'daemon off;'
