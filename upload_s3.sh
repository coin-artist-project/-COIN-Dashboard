#!/bin/bash
aws s3 sync ./build/ s3://coinartist.io --acl public-read --exclude ".git/*" --exclude ".gitignore" --exclude "*.DS_Store*" --profile losCustomMainnet
