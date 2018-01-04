#!/bin/sh
if [ "${TERM:-none}" = "linux" ]; then
    printf "%b" "\\e]P01e0b0f"
    printf "%b" "\\e]P1344854"
    printf "%b" "\\e]P25E5656"
    printf "%b" "\\e]P3AB5842"
    printf "%b" "\\e]P49F6858"
    printf "%b" "\\e]P5AF8672"
    printf "%b" "\\e]P6E49571"
    printf "%b" "\\e]P798a3a1"
    printf "%b" "\\e]P86a7270"
    printf "%b" "\\e]P9344854"
    printf "%b" "\\e]PA5E5656"
    printf "%b" "\\e]PBAB5842"
    printf "%b" "\\e]PC9F6858"
    printf "%b" "\\e]PDAF8672"
    printf "%b" "\\e]PEE49571"
    printf "%b" "\\e]PF98a3a1"

    # Fix artifacting.
    clear
fi
