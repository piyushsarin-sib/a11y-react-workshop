#!/bin/zsh

tags=($(git tag | sort -V))
current=$(git describe --tags --abbrev=0 2>/dev/null || "")

for (( i=0; i<${#tags[@]}; i++ )); do
  if [[ "${tags[$i]}" == "$current" ]]; then
    next="${tags[$i+1]}"
    if [[ -n "$next" ]]; then
      git checkout -f "$next"
      echo "Checked out next tag: $next"
    else
      echo "Last step reached 🚀 — you are at the final tag: $current"
    fi
    exit
  fi
done

# If no current tag found, checkout first tag
if [[ ${#tags[@]} -gt 0 ]]; then
  git checkout -f "${tags[0]}"
  echo "No current tag found, checked out first tag: ${tags[0]}"
else
  echo "No tags found in this repository."
fi
