# Start webpack prod server.
(yarn prod-server &)

# Wait for server to be running.
# FIX: hardcoded sleep 8 for the app to bootstrap.
while ! nc -z 0.0.0.0 8888; do sleep 8; done

# Run tests
node_modules/.bin/jest test/e2e/**/**.spec.js

# Kill webpack prod server.
fuser -k -n tcp 8888
