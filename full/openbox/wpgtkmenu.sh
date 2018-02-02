#! /bin/bash

entrys="$(wpg -l)"
echo "<openbox_pipe_menu>"
for entry in $entrys
do
	name=${entry%.*}
	echo "<item icon=\"/home/dschlack/.wallpapers/sample/$entry.sample.png\" label=\"$name\">"
	echo "<action name=\"Execute\">"
	echo "<execute>wpg -s $entry</execute>"
	echo "</action>"
	echo "</item>"
done
echo "</openbox_pipe_menu>"
