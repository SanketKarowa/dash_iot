#!/bin/sh

# Generate env-config.js using actual runtime environment variables
echo "window.__ENV__ = {" > /usr/share/nginx/html/env-config.js

if [ -n "$VITE_MQTT_BROKER_URL" ]; then
    echo "  VITE_MQTT_BROKER_URL: \"$VITE_MQTT_BROKER_URL\"," >> /usr/share/nginx/html/env-config.js
fi

if [ -n "$VITE_WEATHER_CITY" ]; then
    echo "  VITE_WEATHER_CITY: \"$VITE_WEATHER_CITY\"," >> /usr/share/nginx/html/env-config.js
fi

echo "};" >> /usr/share/nginx/html/env-config.js

# Execute the main process (e.g., nginx -g "daemon off;")
exec "$@"
