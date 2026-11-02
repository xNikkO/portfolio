# Project image prompts

How the project thumbnails were made. The AD Home Lab prompt is for the built-in image_gen tool; the logo thumbnails are composited with ImageMagick.

## hackademy-logo-dark.png

`hackademy-logo-white.png` from the Hackademy repository (`client/public/brand-pixel`), resized to 1240 px wide and centered on a 1632 x 960 canvas filled with #0a0a0a.

## siem-mobile-dark.png

`LogoSIEM.png` from the siem-mobile repository, trimmed, resized to 1100 px wide and centered on a 1632 x 960 canvas filled with #0a0a0a.

## ad-home-lab-dark.png

Use case: style-transfer / infographic-diagram. Edit target: the supplied Active Directory network diagram. Redesign it as a beautiful, restrained Apple-inspired technical diagram for a dark portfolio project thumbnail. Landscape aspect ratio 1.70:1, ideally 1700 by 1000 pixels. Uniform near-black #0a0a0a canvas matching the website. Crisp off-white and silver-gray typography, clean thin vector-like connection lines, subtle softly rounded charcoal panels and small elegant monochrome desktop/router/switch/server/cloud icons. Very restrained pale blue accent for Windows and muted warm gray for Kali; predominantly neutral monochrome. No saturated fills, gradients, glows, decoration, browser chrome, or large title.
Preserve the source topology: cloud Internet at top center, router directly below, central switch below router; Windows desktop left and Kali desktop right linked into the central switch; two server nodes below switch, Splunk left and Active Directory right connected to switch. Preserve a subtle dotted telemetry connection from Windows to the two servers. Layout should be spacious and orderly, with clearly readable, carefully aligned labels. Group network inventory in a small top-left legend. Keep all content within 7 percent safe margins so nothing crops in the card. All text below must appear EXACTLY and legibly, with no added text:
Top-left legend, five lines:
"Domain: NikkoDC"
"Network: 192.168.10.0/24"
"Splunk Server: 192.168.10.10"
"Active Directory: 192.168.10.7"
"Attacker Machine: 192.168.10.250"
Cloud: "Internet"
Left desktop labels:
"Windows 10"
"IP: DHCP"
"Splunk Universal Forwarder"
"Sysmon"
"Atomic Red Team"
Right desktop labels:
"Kali Linux"
"IP: 192.168.10.250"
Lower-left server:
"Splunk Server"
"IP: 192.168.10.10"
Lower-right server:
"Active Directory"
"IP: 192.168.10.7"
"Splunk Universal Forwarder"
"Sysmon"
Use polished modern sans-serif type, hierarchy by weight, high legibility at small thumbnail size. Keep original network meaning and every IP address exact. Output only the complete finished thumbnail artwork.
