# GPS Tracker 📍
GPS Tracker is a simple and light tool for information gathering and capturing exact GPS coordinates

Created by **Manjunath Yalam**  
Modified from original Hound by TechChip

![GPS Tracker](<img width="1385" height="805" alt="Image" src="https://github.com/user-attachments/assets/1f44ba4b-bec8-420a-807e-c6a242aeabfe" />)

# What is GPS Tracker?
GPS Tracker is a tool that can remotely capture the exact GPS coordinates of a target device using a PHP server, and can also grab basic information about the system and ISP. This tool can be very helpful in information gathering. You can get the following information of the target device:

- 📍 Longitude
- 📍 Latitude
- 📱 Device Model
- 💻 Operating System
- ⚙️ Number of CPU Cores
- 🖥️ Screen Resolution
- 🌐 User agent
- 🔍 Public IP Address
- 🌐 Browser Name
- 📡 ISP Information

## Features
The tool offers a wide range of features and functionality, including:
- ✅ Capture Exact GPS Location
- ✅ Automated Data Collection
- ✅ User-friendly Interface
- ✅ Custom FreeMoney Theme to encourage location sharing

## This Tool Tested On:
- Kali Linux
- Windows (WSL)
- Termux
- MacOS
- Ubuntu
- Parrot Sec OS

## Installing and Requirements
This tool requires PHP for webserver, wget & unzip for download and extract cloudflare. First run the following command on your terminal:

```bash
apt-get -y install php unzip git wget
```

## Installing (Kali Linux/Termux):

```bash
git clone https://github.com/manjunathyalam/gps-tracker
cd gps-tracker
bash gps-tracker.sh
```

## Change Log:
- **Version 0.3**: Updated branding to GPS Tracker by Manjunath Yalam
- **Version 0.3**: Implemented FreeMoney theme for better social engineering effectiveness
- **Version 0.2**: Removed Ngrok and updated cloudflared tunnel


## Usage
1. Run the script: `bash hound.sh`
2. Choose cloudflared tunnel (Y) or localhost (N)
3. Share the generated link with your target
4. Wait for target to open the link and allow location
5. GPS coordinates and system info will be captured automatically

## Ethical Use Notice
⚠️ **IMPORTANT**: GPS Tracker is created to help in penetration testing and security research. It's not responsible for any misuse or illegal purposes. Always obtain proper authorization before testing.

## Credits
- Created by: **Manjunath Yalam**
- Original Hound by: TechChip (Anil Parashar)
- Chatbot template: Masud Rana

## License
This tool is for educational and authorized penetration testing purposes only.
