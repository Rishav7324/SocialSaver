#!/bin/sh
# SocialSaver - Run script
# Usage: ./run.sh [start|stop|restart|status]

set -e

APP_DIR="$(cd "$(dirname "$0")" && pwd)"
BACKEND_DIR="$APP_DIR/backend"
VENV_DIR="$APP_DIR/.venv"
PORT="${PORT:-8000}"
PIDFILE="/tmp/socialsaver.pid"

command_exists() {
    command -v "$1" >/dev/null 2>&1
}

dependencies_ok() {
    command_exists python3 || return 1
    command_exists ffmpeg   || return 1
    return 0
}

setup_venv() {
    if [ ! -d "$VENV_DIR" ]; then
        echo "Creating virtual environment..."
        python3 -m venv "$VENV_DIR"
    fi
    echo "Installing dependencies..."
    "$VENV_DIR/bin/pip" install -q -r "$BACKEND_DIR/requirements.txt" --no-cache-dir
}

start() {
    if [ -f "$PIDFILE" ] && kill -0 "$(cat "$PIDFILE")" 2>/dev/null; then
        echo "SocialSaver is already running (PID $(cat "$PIDFILE"))"
        return 0
    fi

    if ! dependencies_ok; then
        echo "Missing required dependencies. Install python3 and ffmpeg."
        exit 1
    fi

    setup_venv

    if [ ! -d "$APP_DIR/downloads" ]; then
        mkdir -p "$APP_DIR/downloads"
    fi

    echo "Starting SocialSaver on port $PORT..."
    cd "$BACKEND_DIR"
    "$VENV_DIR/bin/python3" -m uvicorn main:app \
        --host 0.0.0.0 \
        --port "$PORT" \
        --log-level info &
    echo $! > "$PIDFILE"
    sleep 2

    if kill -0 "$(cat "$PIDFILE")" 2>/dev/null; then
        echo "SocialSaver running at http://0.0.0.0:$PORT"
    else
        echo "Failed to start SocialSaver"
        rm -f "$PIDFILE"
        exit 1
    fi
}

stop() {
    if [ ! -f "$PIDFILE" ]; then
        echo "SocialSaver is not running"
        return 0
    fi
    PID="$(cat "$PIDFILE")"
    echo "Stopping SocialSaver (PID $PID)..."
    kill "$PID" 2>/dev/null || true
    rm -f "$PIDFILE"
    echo "Stopped"
}

restart() {
    stop
    sleep 1
    start
}

status() {
    if [ -f "$PIDFILE" ] && kill -0 "$(cat "$PIDFILE")" 2>/dev/null; then
        echo "SocialSaver is running (PID $(cat "$PIDFILE"))"
        echo "URL: http://0.0.0.0:$PORT"
    else
        echo "SocialSaver is not running"
    fi
}

case "${1:-start}" in
    start)   start   ;;
    stop)    stop    ;;
    restart) restart ;;
    status)  status  ;;
    *)
        echo "Usage: $0 [start|stop|restart|status]"
        exit 1
        ;;
esac
