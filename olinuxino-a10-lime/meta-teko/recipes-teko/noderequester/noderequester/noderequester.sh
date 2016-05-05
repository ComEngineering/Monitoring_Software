#!/bin/sh

SCRIPT="node /opt/noderequester.js"
RUNAS=root
PIDFILE=/var/run/noderequester.pid
LOGFILE=/var/log/noderequester.log
DBUS_SESSION_FILE=/var/run/dbus_session

start() {
  export NODE_PATH=/usr/lib/node_modules:$NODE_PATH
  if [ -f $PIDFILE ] && kill -0 $(cat $PIDFILE); then
    echo 'Service already running' >&2
    return 1
  fi
  echo 'Starting service…' >&2

  dbus-launch --sh-syntax > $DBUS_SESSION_FILE
  source $DBUS_SESSION_FILE

  local CMD="$SCRIPT &> \"$LOGFILE\" & echo \$!"
  su -c "$CMD" $RUNAS > "$PIDFILE"
  echo 'Service started' >&2
}

stop() {
  if [ ! -f "$PIDFILE" ] || ! kill -0 $(cat "$PIDFILE"); then
    echo 'Service not running' >&2
    return 1
  fi
  echo 'Stopping service…' >&2
  kill -15 $(cat "$PIDFILE") && rm -f "$PIDFILE"
  echo 'Service stopped' >&2
}

case "$1" in
  start)
    start
    ;;
  stop)
    stop
    ;;
  restart)
    stop
    start
    ;;
  *)
    echo "Usage: $0 {start|stop|restart}"
esac
