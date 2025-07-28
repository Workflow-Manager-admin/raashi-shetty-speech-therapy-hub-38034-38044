#!/bin/bash
cd /home/kavia/workspace/code-generation/raashi-shetty-speech-therapy-hub-38034-38044/frontend_web
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

