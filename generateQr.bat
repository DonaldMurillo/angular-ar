@echo off
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| find "IPv4 Address"') do set ip=%%a
set ip=%ip:~1%
qrcode-terminal http://%ip%:4200