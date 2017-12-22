#! /bin/bash
mkdir -p ./dots
mkdir -p ./dots/blocklets
mkdir -p ./dots/fishfunc

# Xresources
cp ~/.Xresources ./dots/Xres

# i3 Configuration
cp ~/.config/i3/config ./dots/i3config

# i3Bar Configuration

# i3status Configuration

# i3blocks Configuration
cp ~/.config/i3blocks/config ./dots/i3blocksconfig
cp -ar ~/blocklets/* ./dots/blocklets/

# .Xresources

# Terminator Configuration
cp ~/.config/terminator/config ./dots/terminatorconfig

# fish Configuration
cp ~/.config/fish/config.fish ./dots/fishconfig
cp -ar ~/.config/fish/functions/* ./dots/fishfunc/

# Fonts copying and Additional fish stuff will go here

#xfce4 Terminal config
cp ~/.config/xfce4/terminal/terminalrc ./dots/xfceconfig
