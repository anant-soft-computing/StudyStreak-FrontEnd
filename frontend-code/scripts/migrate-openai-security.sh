#!/bin/bash

# OpenAI Security Migration Script
# This script helps identify all files that need to be updated for secure OpenAI integration

echo "🔍 Scanning for OpenAI API key usage..."

# Find all files containing REACT_APP_OPEN_AI_SECRET
echo "\n📂 Files with exposed OpenAI API key:"
grep -r "REACT_APP_OPEN_AI_SECRET" src/ --include="*.js" --include="*.jsx" | cut -d: -f1 | sort | uniq

echo "\n📂 Files making direct OpenAI API calls:"
grep -r "api.openai.com" src/ --include="*.js" --include="*.jsx" | cut -d: -f1 | sort | uniq

echo "\n📊 Total occurrences:"
echo "API Key references: $(grep -r "REACT_APP_OPEN_AI_SECRET" src/ --include="*.js" --include="*.jsx" | wc -l)"
echo "Direct API calls: $(grep -r "api.openai.com" src/ --include="*.js" --include="*.jsx" | wc -l)"

echo "\n⚠️  CRITICAL: All these files expose your API key and need immediate attention!"
echo "📋 Next steps:"
echo "1. Implement backend proxy endpoint"
echo "2. Update each file to use the secure helper"
echo "3. Remove REACT_APP_OPEN_AI_SECRET from .env"
echo "4. Rotate your OpenAI API key"

# Create a backup of current .env for reference
if [ -f ".env" ]; then
    echo "\n💾 Creating backup of current .env file..."
    cp .env .env.backup.$(date +%Y%m%d_%H%M%S)
    echo "✅ Backup created: .env.backup.$(date +%Y%m%d_%H%M%S)"
fi

echo "\n🔧 Migration checklist:"
echo "☐ 1. Add proxy endpoint to your backend"
echo "☐ 2. Test proxy endpoint with authentication"
echo "☐ 3. Update all recorder components to use secure helper"
echo "☐ 4. Update all exam components to use secure helper" 
echo "☐ 5. Remove REACT_APP_OPEN_AI_SECRET from .env"
echo "☐ 6. Update environment variables on deployment platform"
echo "☐ 7. Rotate OpenAI API key in OpenAI dashboard"
echo "☐ 8. Test all speaking and writing assessments"
echo "☐ 9. Monitor OpenAI usage for anomalies"
echo "☐ 10. Deploy and verify security"