#!/bin/zsh

# Usage: git exdiff <exercise> [step]
# Example: git exdiff ex1 step1
# If step is omitted, defaults to step0

exercise=$1
step=$2

if [[ -z "$exercise" ]]; then
  echo "Usage: git exdiff <exercise> [step]"
  echo "Example: git exdiff ex1 step1"
  exit 1
fi

# Default to step0
if [[ -z "$step" ]]; then
  step="step0"
fi

# ==========================
# 🔧 Base filename mapping
# ==========================
typeset -A base_files
base_files=(
  ex1 "CardWrapper"
  ex2 "TreeList"
  ex3 "FilterMenu"
  ex4 "AddToCartModal"
  ex5 "EdgeCases"
  # Add more exercises here
)

base_file="${base_files[$exercise]}"

if [[ -z "$base_file" ]]; then
  echo "❌ No base filename defined for $exercise"
  echo "Available exercises: ${(@k)base_files}"
  exit 1
fi


# Extract numeric step
current_step_number=${step//step/}
prev_step_number=$((current_step_number - 1))

# Extract numeric ex
current_ex_number=${exercise//ex/}


# Folder path
base_dir="src/playground/Ex${current_ex_number}-${base_file}"



# File paths
file_prev="${base_dir}/Step-${prev_step_number}.jsx"
file_curr="${base_dir}/Step-${current_step_number}.jsx"

# Handle step0 case (no previous file)
if [[ "$current_step_number" -eq 0 ]]; then
  if [[ -f "$file_curr" ]]; then
    echo "You are at the first step: $file_curr"
    exit 0
  else
    echo "❌ Step 0 file not found: $file_curr"
    exit 1
  fi
fi

# Validate previous/current files
if [[ ! -f "$file_prev" || ! -f "$file_curr" ]]; then
  echo "❌ One of the files does not exist:"
  echo "$file_prev"
  echo "$file_curr"
  exit 1
fi

echo "📄 Comparing:"
echo "   $file_prev"
echo "   → $file_curr"
echo "--------------------------------------"

# -----------------------------
# Open GUI diff tool
# -----------------------------
if command -v code &> /dev/null; then
  # VSCode diff
  code --diff "$file_prev" "$file_curr" --wait &
elif command -v meld &> /dev/null; then
  # Meld diff fallback
  meld "$file_prev" "$file_curr" &
else
  echo "❌ No supported GUI diff tool found. Install VSCode or Meld."
  exit 1
fi
