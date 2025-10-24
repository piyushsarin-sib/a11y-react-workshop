#!/bin/zsh

tags=($(git tag | sort -V))
current=$(git describe --tags --abbrev=0 2>/dev/null || "")

# Function to extract prefix and step number
extract_prefix_and_step() {
  local tag="$1"
  # Split by last '-' to separate step number
  prefix="${tag%-*}"
  step="${tag##*-}"
}

for (( i=0; i<${#tags[@]}; i++ )); do
  if [[ "${tags[$i]}" == "$current" ]]; then
    next="${tags[$i+1]}"
    if [[ -n "$next" ]]; then
      # Extract prefix and step for current and next
      extract_prefix_and_step "$current"
      current_prefix="$prefix"
      current_step="$step"
      
      extract_prefix_and_step "$next"
      next_prefix="$prefix"
      next_step="$step"

      if [[ "$current_prefix" == "$next_prefix" ]]; then
        echo "Showing diff: $current → $next"
        git difftool --no-prompt "$current" "$next" &
        git checkout -f "$next"
        echo "Moved to next tag: $next"
      else
        echo "❌ Cannot move: Tag prefixes differ ('$current_prefix' → '$next_prefix')"
      fi
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
