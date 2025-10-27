#!/bin/bash

# -------------------------------
# CONFIGURATION
# -------------------------------

# List of tags
tags=("ex5-edgecase-step-0" "ex5-edgecase-step-1" "ex5-edgecase-step-2" "ex5-edgecase-step-3" )
# Corresponding commit SHAs
shas=("5457c50" "d1e53ca" "a6e9aea" "adeecb0" )


# -------------------------------
# Create or update tags
# -------------------------------
echo "Processing tags..."

for i in "${!tags[@]}"; do
    tag="${tags[$i]}"
    commit="${shas[$i]}"

    # Delete existing local tag if it exists
    if git show-ref --tags | grep -q "refs/tags/$tag"; then
        git tag -d "$tag"
        echo "Deleted existing local tag: $tag"
    fi

    # Delete tag from remote if it exists
    if git ls-remote --tags origin | grep -q "refs/tags/$tag"; then
        git push --delete origin "$tag"
        echo "Deleted existing remote tag: $tag"
    fi

    # Create new tag on specified commit
    git tag "$tag" "$commit"
    echo "Created tag: $tag -> $commit"

    # Push tag to remote
    git push origin "$tag"
    echo "Pushed tag to remote: $tag"
done

echo "✅ All tags processed and pushed successfully!"
