# Defined in - @ line 0
function update --description 'alias update=sudo pacman -Syu'
	sudo pacman -Syu $argv;
end
