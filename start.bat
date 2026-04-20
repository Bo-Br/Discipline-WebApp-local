@echo off
cd /d %~dp0

start cmd /k "npm run dev"

:wait
timeout /t 2 >nul
curl http://localhost:3000 >nul 2>&1
if errorlevel 1 goto wait

start http://localhost:3000