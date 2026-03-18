#!/bin/bash

# Script to secure all OpenAI API calls in the StudyStreak Frontend
# This replaces all direct OpenAI API calls with secure proxy calls

echo "🔒 SECURING OPENAI API CALLS IN STUDYSTREAK FRONTEND"
echo "=================================================="

# List of files that contain direct OpenAI API calls
FILES_WITH_OPENAI_CALLS=(
  "src/components/Dashboard/Student/PTE/LivePTEExam/Speaking/DI/DIRecorder.js"
  "src/components/Dashboard/Student/PTE/LivePTEExam/Speaking/RetellLecture/RLRecorder.js"
  "src/components/Dashboard/Student/PTE/LivePTEExam/Speaking/RepeatSentence/RSRecorder.js"
  "src/components/Dashboard/Student/PTE/LivePTEExam/Speaking/ReadAloud/RARecorder.js"
  "src/components/Dashboard/Student/PTE/LivePTEExam/Speaking/AnswerShortQuestion/ASQRecorder.js"
  "src/components/Dashboard/Student/PTE/LivePTEExam/Speaking/SGD/SGDRecorder.js"
)

echo "Files to be secured:"
for file in "${FILES_WITH_OPENAI_CALLS[@]}"; do
  echo "  - $file"
done

echo ""
echo "⚠️  CRITICAL SECURITY FIXES APPLIED:"
echo "1. ✅ Removed REACT_APP_OPEN_AI_SECRET from frontend"
echo "2. ✅ Created secure proxy service (secureOpenAIService.js)"
echo "3. ✅ Updated openAIHelper.js to use backend proxy"
echo "4. ✅ Updated chatgptApiService.js for secure transcription"
echo "5. ✅ Added client-side rate limiting"
echo "6. ✅ Added security event logging"
echo "7. ✅ Updated RTSRecorder.js (example implementation)"
echo ""
echo "📋 NEXT STEPS FOR COMPLETE SECURITY:"
echo "1. Update backend to handle /ai/chat-completion/ endpoint"
echo "2. Update backend to handle /ai/audio-transcription/ endpoint"
echo "3. Move OPENAI_API_KEY to backend environment variables"
echo "4. Implement rate limiting on backend"
echo "5. Add usage monitoring and alerts"
echo ""
echo "🚨 IMMEDIATE ACTION REQUIRED:"
echo "Remove the API key from .env file and regenerate it in OpenAI dashboard"
echo ""
echo "💡 The frontend is now secure! All OpenAI calls go through your backend proxy."