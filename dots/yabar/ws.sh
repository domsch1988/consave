#!/bin/sh
i3-msg -t get_workspaces | jq -j '.[] | select(.rect.x | contains(1920)) | if .visible == true then "<span underline=\"double\">"+" "+.name+" "+"</span>" else " "+.name+" " end'

