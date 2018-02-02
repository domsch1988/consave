#! /bin/bash
scrot /tmp/screen.png
#convert /tmp/screen.png -blur 0x5 /tmp/screen.png
# convert /tmp/screen.png -scale 10% -scale 1000% /tmp/screen.png
convert /tmp/screen.png -blur "0x8" /tmp/screen.png
monitors="`xrandr | grep -sw 'connected' | wc -l`"
if [ "$monitors" -eq "2" ]
then
composite -geometry '150x150+885+465' ~/blocklets/lock.png /tmp/screen.png /tmp/screen.png
composite -geometry '150x150+2805+465' ~/blocklets/lock.png /tmp/screen.png /tmp/screen.png
else
composite -gravity center ~/blocklets/lock.png /tmp/screen.png /tmp/screen.png
fi
[[ -f $1 ]] && convert /tmp/screen.png $1 -gravity center -composite -matte /tmp/screen.png
i3lock -i /tmp/screen.png
rm /tmp/screen.png
