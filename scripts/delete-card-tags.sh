#!/bin/bash

# Remote name
REMOTE=${1:-origin}

# Get all card* tags
tags=$(git tag -l "card*")

if [ -z "$tags" ]; then
    echo "No card* tags found."
    exit 0
fi

# Delete locally
for t in $tags; do
    git tag -d "$t"
    echo "Deleted local tag: $t"
done

# Delete remotely
for t in $tags; do
    git push "$REMOTE" --delete "$t"
    echo "Deleted remote tag: $t"
done

echo "✅ All card* tags deleted locally and on remote '$REMOTE'."
