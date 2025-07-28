@echo off
dir
echo Starting local server...
python -m http.server 8000
@echo on