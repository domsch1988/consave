#! /bin/bash

# Folder Creation
mkdir -p ~/blocklets
mkdir -p ~/.config/fish/
mkdir -p ~/.congig/yabar/

# Xresources
cp ./dots/Xres ~/.Xresources

# Yabar Stuff
cp -ar ./dots/yabar/* ~/.config/yabar/

# i3 Configuration
cp ./dots/i3config ~/.config/i3/config
cp ./dots/lock ~/.config/i3/lock.sh
cp ./res/lock ~/blocklets/lock.png
# i3Bar Configuration

# i3status Configuration

# i3blocks Configuration
cp ./dots/i3blocksconfig ~/.config/i3blocks/config
cp -ar ./dots/blocklets/* ~/blocklets/
# .Xresources

# Compton Congi
cp ./dots/comptonconf ~/.config/compton.conf

# Terminator Configuration
cp ./dots/terminatorconfig ~/.config/terminator/config

# fish COnfiguration
cp ./dots/fishconfig ~/.config/fish/config.fish
cp -ar ./dots/fishfunc/* ~/.config/fish/functions/

# XFCE4 Terminal
cp ./dots/xfceconfig ~/.config/xfce4/terminal/terminalrc
