#!/bin/bash

# Phase 2: Code Cleanup - File Deletion Script
# Date: 2025-10-12
# This script removes dead code files identified in the audit

echo "========================================="
echo "Phase 2: Code Cleanup - File Deletion"
echo "========================================="
echo ""

# Navigate to project root
cd "$(dirname "$0")"

echo "Current directory: $(pwd)"
echo ""

# Function to delete file and report
delete_file() {
    local file=$1
    if [ -f "$file" ]; then
        rm "$file"
        echo "✅ Deleted: $file"
    else
        echo "⚠️  Not found (may already be deleted): $file"
    fi
}

# Function to delete directory and report
delete_directory() {
    local dir=$1
    if [ -d "$dir" ]; then
        rmdir "$dir" 2>/dev/null
        if [ $? -eq 0 ]; then
            echo "✅ Deleted directory: $dir"
        else
            echo "⚠️  Directory not empty or doesn't exist: $dir"
        fi
    else
        echo "⚠️  Directory not found (may already be deleted): $dir"
    fi
}

echo "Deleting dead code files..."
echo ""

# Delete duplicate validation file
delete_file "src/lib/validations.ts"

# Delete empty hook files
delete_file "src/hooks/useRides.ts"
delete_file "src/hooks/useLocation.ts"

# Delete empty ride component files
delete_file "src/components/ride/RideCard.tsx"
delete_file "src/components/ride/RideHistoryView.tsx"
delete_file "src/components/ride/RideRequestForm.tsx"
delete_file "src/components/ride/RideTracker.tsx"

# Delete unused CSS file
delete_file "src/App.css"

# Delete empty ride directory
delete_directory "src/components/ride"

echo ""
echo "========================================="
echo "Phase 2 Cleanup Complete!"
echo "========================================="
echo ""
echo "Files deleted: 8"
echo "Directory removed: src/components/ride/"
echo ""
echo "Next steps:"
echo "1. Run 'npm run build' to verify build still works"
echo "2. Run 'npm run dev' to test the application"
echo "3. Review PHASE_2_CODE_CLEANUP.md for details"
echo ""
echo "To commit these changes:"
echo "  git add -A"
echo "  git commit -m 'Phase 2: Remove dead code (see PHASE_2_CODE_CLEANUP.md)'"
echo ""
