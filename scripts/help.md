# To kill the VSCode process
pkill -f "Visual Studio Code"

# remove sudo issues
sudo chown -R $(whoami) .


# Delete all local tags and branches
git branch --merged | grep -v "^\*" | xargs git branch -d
git tag | xargs git tag -d 

# Setup github alias
chmod +x scripts/setup-git-aliases.sh
scripts/setup-git-aliases.sh



# get list of all commits with the tags name from a branch
chmod +x scripts/list-commits.sh
scripts/list-commits.sh


# Create old tags and create new tags from the list of tags and SHA
chmod +x scripts/create-branch-tags.sh.sh
scripts/create-branch-tags.sh





# List of commits
tags=("ex1-card-step-0" "ex1-card-step-1" "ex1-card-step-2" "ex1-card-step-3" "ex1-card-step-4" "ex1-card-step-5" )
# Corresponding commit SHAs
shas=("4bbd870" "2398295" "f6213ae" "e33495a" "0e8e58f" "58df5d1" )

# List of tags
tags=("ex5-edgecase-step-0" "ex5-edgecase-step-1" "ex5-edgecase-step-2" "ex5-edgecase-step-3" )
# Corresponding commit SHAs
shas=("5457c50" "d1e53ca" "a6e9aea" "adeecb0" )