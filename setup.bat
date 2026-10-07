@echo off
setlocal
cd /d "%~dp0"
title RoFit Inspector setup

echo.
echo  RoFit Inspector - setup
echo  -----------------------

where node >nul 2>nul
if errorlevel 1 (
  echo  Node.js is required ^(v20 or newer^). Install it from https://nodejs.org and run this again.
  pause
  exit /b 1
)

if not exist node_modules (
  echo  Installing dependencies...
  call npm ci
  if errorlevel 1 ( echo  npm install failed. & pause & exit /b 1 )
)

echo  Building...
call npm run build
if errorlevel 1 ( echo  Build failed. & pause & exit /b 1 )

echo.
echo  Built: %cd%\dist
echo.
echo  To install in Chrome / Edge / Brave:
echo    1. Open the extensions page ^(chrome://extensions or edge://extensions^)
echo    2. Turn on "Developer mode"
echo    3. Click "Load unpacked" and choose the dist folder shown above
echo.

choice /c YN /m "Open the extensions page now"
if errorlevel 2 goto done

set "CHROME=%ProgramFiles%\Google\Chrome\Application\chrome.exe"
if not exist "%CHROME%" set "CHROME=%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe"
if not exist "%CHROME%" set "CHROME=%LocalAppData%\Google\Chrome\Application\chrome.exe"
if exist "%CHROME%" ( start "" "%CHROME%" "chrome://extensions" & goto openfolder )
set "EDGE=%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe"
if exist "%EDGE%" ( start "" "%EDGE%" "edge://extensions" & goto openfolder )
echo  Couldn't find Chrome or Edge. Open the extensions page manually.

:openfolder
start "" explorer "%cd%\dist"

:done
echo.
echo  Done.
endlocal
