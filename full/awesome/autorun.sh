#!/usr/bin/env bash

function run {
  if ! pgrep $1 ;
  then
    $@&
  fi
}

# Startup Programms
run nitrogen --restore
run xcompmgr
