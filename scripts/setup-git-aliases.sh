#!/bin/bash


SCRIPT_DIR=".github"
SCRIPTS=("git-next.sh" "git-prev.sh" "git-nextdiff.sh" "git-exdiff.sh")

for filename in "${SCRIPTS[@]}"; do
  file="$SCRIPT_DIR/$filename"
  
  # Skip if file doesn't exist
  if [ ! -f "$file" ]; then
    echo "⚠️ Skipping: $file not found."
    continue
  fi

  # Copy file to home directory (keep original filename)
  cp "$file" ~/"$filename"
  
  # Make it executable
  chmod +x ~/"$filename"
  
  # Create alias name by removing 'git-' prefix and '.sh' suffix
  alias_name="${filename#git-}"
  alias_name="${alias_name%.sh}"
  
  # Set global git alias
  git config --global alias.$alias_name "!~/$(basename "$file")"
  
  echo "✅ Setup alias 'git $alias_name' for ~/$(basename "$file")"
done

echo "🎉 Setup completed successfully!"
