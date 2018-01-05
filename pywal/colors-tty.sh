#!/bin/sh
if [ "${TERM:-none}" = "linux" ]; then
    printf "%b" "\\e]P0031013"
    printf "%b" "\\e]P11C5952"
    printf "%b" "\\e]P25E6553"
    printf "%b" "\\e]P36C6D55"
    printf "%b" "\\e]P4807B65"
    printf "%b" "\\e]P56F846F"
    printf "%b" "\\e]P68C8B72"
    printf "%b" "\\e]P789b4b1"
    printf "%b" "\\e]P85f7d7b"
    printf "%b" "\\e]P91C5952"
    printf "%b" "\\e]PA5E6553"
    printf "%b" "\\e]PB6C6D55"
    printf "%b" "\\e]PC807B65"
    printf "%b" "\\e]PD6F846F"
    printf "%b" "\\e]PE8C8B72"
    printf "%b" "\\e]PF89b4b1"

    # Fix artifacting.
    clear
fi
