#!/bin/zsh

tags=($(git tag | sort -V))
current=$(git describe --tags --abbrev=0 2>/dev/null || "")

for (( i=0; i<${#tags[@]}; i++ )); do
  if [[ "${tags[$i]}" == "$current" ]]; then
    if (( i > 0 )); then
      prev="${tags[$i-1]}"
      echo "Showing diff: $prev → $current"
      git difftool --no-prompt "$prev" "$current" &
      git checkout -f "$prev"
      echo "Moved to previous tag: $prev"
    else
      echo "First step reached 🚀 — you are at the initial tag: $current"
    fi
    exit
  fi
done

# If no current tag found, checkout last tag
if [[ ${#tags[@]} -gt 0 ]]; then
  last_idx=$(( ${#tags[@]} - 1 ))
  git checkout -f "${tags[$last_idx]}"
  echo "No current tag found, checked out last tag: ${tags[$last_idx]}"
else
  echo "No tags found in this repository."
fi
