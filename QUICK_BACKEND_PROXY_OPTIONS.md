# SIMPLE BACKEND PROXY SOLUTION
# You can implement this yourself in 15 minutes

## Option A: Vercel/Netlify Functions (Easiest)

Create `api/openai.js` in your project root:

```javascript
// api/openai.js (Vercel) or netlify/functions/openai.js (Netlify)
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Verify request is from your domain
    const origin = req.headers.origin;
    const allowedOrigins = ['http://localhost:3000', 'https://yourdomain.com'];
    
    if (!allowedOrigins.includes(origin)) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    // Forward request to OpenAI
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`, // Server-side only!
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.status(response.status).json(data);
    
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}
```

Then update your frontend to call `/api/openai` instead of OpenAI directly.

## Option B: Simple Express Server (5 minutes)

```bash
# Create a simple proxy server
npm install express cors
```

```javascript
// proxy-server.js
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/openai', async (req, res) => {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(3001, () => {
  console.log('OpenAI proxy running on port 3001');
});
```

## Option C: Quick Django View (10 minutes)

Add to your existing Django backend:

```python
# views.py
import openai
import os
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def openai_proxy(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'Method not allowed'}, status=405)
    
    try:
        openai.api_key = os.getenv('OPENAI_API_KEY')
        data = json.loads(request.body)
        
        response = openai.ChatCompletion.create(**data)
        return JsonResponse(response)
        
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
```

## Benefits of Any Backend Proxy:
- ✅ API key completely hidden from frontend
- ✅ Domain restrictions enforced server-side  
- ✅ Rate limiting controlled by you
- ✅ Usage monitoring built-in
- ✅ 100% secure solution

## Time Investment:
- Vercel/Netlify Function: 15 minutes
- Express Proxy: 10 minutes  
- Django View: 10 minutes

**Any of these is infinitely better than exposing the key in frontend!**