#!/bin/bash

echo "Enter your commit message:"
read msg

if [ -z "$msg" ]; then
  echo "Commit message cannot be empty. Aborting."
  exit 1
fi

git add .
git commit -m "$msg"
git push