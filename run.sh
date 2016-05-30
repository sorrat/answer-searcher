#!/bin/bash

ROOT="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"


function run_server() {
  echo "Running server in $MODE mode..."
  echo "---"

  if [ $MODE == "production" ]; then
    cd $ROOT/server
    uwsgi config.ini
  else
    cd $ROOT/server/src
    python app.py
  fi
}


function run_stub_server() {
  cd client
  npm run start
}


function build_assets() {
  echo "Building $MODE assets..."
  cd $ROOT/client

  if [ $MODE == "production" ]; then
    npm run build-production
  else
    npm run build
  fi
}


MODE="development"

while getopts ":pbws" opt; do
  case $opt in
    p)
      MODE="production"
      ;;
    b)
      build_assets
      ;;
    w)
      run_stub_server
      ;;
    s)
      run_server
      ;;
    \?)
      echo "Invalid option: -$OPTARG" >&2
      ;;
  esac
done
