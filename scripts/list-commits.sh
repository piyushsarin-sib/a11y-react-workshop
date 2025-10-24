#!/bin/bash

# Branch to list commits from
branch=$(git branch --show-current)
if [ -z "$branch" ]; then
    echo "❌ Not on any branch. Please checkout your branch first."
    exit 1
fi

# Inform the user
echo "ℹ️  Please make sure you are on branch '$branch' to generate tags for it."

# Get commits unique to branch (from main), oldest first
commits=$(git log --oneline main.."$branch" --reverse)

# Initialize arrays
tags=()
shas=()

count=0
while IFS= read -r line; do
    sha=$(echo "$line" | awk '{print $1}')
    tags+=("${branch}-step-$count")
    shas+=("$sha")
    ((count++))
done <<< "$commits"

# Print arrays in proper format
echo "# List of tags"
printf 'tags=(%s)\n' "$(printf '"%s" ' "${tags[@]}")"
echo "# Corresponding commit SHAs"
printf 'shas=(%s)\n' "$(printf '"%s" ' "${shas[@]}")"
