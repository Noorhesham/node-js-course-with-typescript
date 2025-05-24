#!/bin/bash

# Find all query files
QUERY_FILES=$(find /Users/nshahidi/webstacks-marketing-sites/apps/web/src/components/sections -name "*.query.ts" | grep -v "layoutSettings.query.ts")

# Loop through each file
for file in $QUERY_FILES; do
  echo "Processing $file..."
  
  # Check if the file already imports the layoutSettingsFragment
  if ! grep -q "layoutSettingsFragment" "$file"; then
    # Add the import
    sed -i '' '1s/^/import { layoutSettingsFragment } from '"'"'@sections\/LayoutSection\/layoutSettings.query'"'"';\n/' "$file"
    echo "  Added import to $file"
  fi
  
  # Look for common layout fields patterns and replace with the fragment
  # This is a simplified approach and might need manual review
  sed -i '' -E 's/textColor,\s*backgroundColor(\s*\{[^}]*\})?,/\${layoutSettingsFragment},/g' "$file"
  sed -i '' -E 's/backgroundColor(\s*\{[^}]*\})?,\s*textColor,/\${layoutSettingsFragment},/g' "$file"
  sed -i '' -E 's/padding(\s*\{[^}]*\})?,\s*textColor,/\${layoutSettingsFragment},/g' "$file"
  sed -i '' -E 's/textColor,\s*padding(\s*\{[^}]*\})?,/\${layoutSettingsFragment},/g' "$file"
  
  echo "  Updated $file"
done

echo "Done updating query files!"
