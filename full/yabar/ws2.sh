#!/bin/sh
# i3-msg -t get_workspaces | jq -j '.[] | select(.rect.x | contains(0)) | if .visible == true then "<span underline=\"double\">"+" "+.name+" "+"</span>" else " "+.name+" " end'

    cur=`xprop -root _NET_CURRENT_DESKTOP | awk '{print $3}'`
    tot=`xprop -root _NET_NUMBER_OF_DESKTOPS | awk '{print $3}'`
 
    for w in `seq 0 $((cur - 1))`; do line="${line} "; done
    line="${line} "
    for w in `seq $((cur + 2)) $tot`; do line="${line} "; done
    echo $line
