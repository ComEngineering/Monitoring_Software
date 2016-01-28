export NODE_PATH=/usr/lib/node_modules:$NODE_PATH
export $(dbus-launch)
node /opt/noderequester.js &
