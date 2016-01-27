export NODE_PATH=/usr/lib/node_modules:$NODE_PATH
export $(dbus-launch)
sleep 30 && node /opt/noderequester.js &
