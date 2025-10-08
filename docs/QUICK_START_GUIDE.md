# Quick Start: Next.js + React Hybrid Setup

## 🚀 **Immediate Setup Commands**

```bash
# 1. Create Next.js project (in parent directory)
cd /Users/jigardesai/Desktop/studystreak
npx create-next-app@latest nextjs-frontend --typescript --tailwind --app-router
cd nextjs-frontend

# 2. Install additional dependencies
npm install @headlessui/react @heroicons/react lucide-react
npm install next-sitemap

# 3. Configure for your existing API
# Add to next.config.js:
```

## 📁 **Minimal File Structure**

```
studystreak/
├── StudyStreak-FrontEnd/     # Existing React app
└── nextjs-frontend/          # New Next.js marketing site
    ├── app/
    │   ├── layout.tsx
    │   ├── page.tsx           # Homepage
    │   ├── courses/
    │   │   ├── page.tsx       # Courses listing
    │   │   └── [id]/page.tsx  # Course details
    │   ├── blogs/
    │   │   ├── page.tsx       # Blog listing
    │   │   └── [slug]/page.tsx # Blog post
    │   ├── about-us/page.tsx
    │   ├── login/page.tsx
    │   └── api/
    │       └── courses/route.ts
    ├── components/
    │   ├── Header.tsx
    │   ├── Footer.tsx
    │   └── CourseCard.tsx
    └── lib/
        └── api.ts
```

## 🔧 **Key Configuration Files**

### 1. **next.config.js**
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['studystreak.in'],
  },
  
  async rewrites() {
    return [
      // Proxy API calls to your existing backend
      {
        source: '/api/:path*',
        destination: 'https://studystreak.in/api/:path*',
      },
    ];
  },
  
  async redirects() {
    return [
      // Redirect authenticated routes to React app
      {
        source: '/dashboard/:path*',
        destination: 'https://app.studystreak.com/:path*',
        permanent: false,
      },
      {
        source: '/admin-dashboard/:path*', 
        destination: 'https://app.studystreak.com/admin-dashboard/:path*',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
```

### 2. **tailwind.config.js** (Reuse your existing config)
```javascript
// Copy from your existing StudyStreak-FrontEnd/tailwind.config.js
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          // Copy your existing primary colors
          50: '#F7F6FB',
          500: '#8E84C6',
          600: '#7267B8',
          700: '#5B4FA6',
        },
      },
    },
  },
  plugins: [],
};
```

### 3. **Homepage Example** (app/page.tsx)
```typescript
import { Metadata } from 'next';
import Hero from '@/components/Hero';
import CourseList from '@/components/CourseList';

export const metadata: Metadata = {
  title: 'StudyStreak - Best IELTS, PTE, GRE, GMAT Online Coaching',
  description: 'Master IELTS, PTE, GRE, and GMAT with StudyStreak\'s expert online coaching. Get personalized study plans and achieve your target score.',
  keywords: 'IELTS coaching, PTE preparation, GRE classes, GMAT training, online test prep',
  openGraph: {
    title: 'StudyStreak - Best IELTS, PTE, GRE, GMAT Online Coaching',
    description: 'Master IELTS, PTE, GRE, and GMAT with expert online coaching.',
    url: 'https://studystreak.com',
    siteName: 'StudyStreak',
    images: [
      {
        url: 'https://studystreak.com/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
};

// This data is fetched at build time (SSG)
async function getCourses() {
  const res = await fetch('https://studystreak.in/api/courselistview/', {
    next: { revalidate: 3600 }, // Revalidate every hour
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch courses');
  }
  
  return res.json();
}

export default async function Homepage() {
  const courses = await getCourses();
  
  return (
    <main>
      <Hero />
      <CourseList courses={courses} />
      {/* Your existing homepage content */}
    </main>
  );
}
```

### 4. **Dynamic Course Page** (app/courses/[id]/page.tsx)
```typescript
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface Course {
  id: string;
  Course_Title: string;
  Course_Description: string;
  Course_Thumbnail: string;
}

async function getCourse(id: string): Promise<Course | null> {
  try {
    const res = await fetch(`https://studystreak.in/api/course-detail/${id}/`, {
      next: { revalidate: 3600 },
    });
    
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    return null;
  }
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const course = await getCourse(params.id);
  
  if (!course) {
    return {
      title: 'Course Not Found | StudyStreak',
    };
  }
  
  return {
    title: `${course.Course_Title} | StudyStreak`,
    description: course.Course_Description,
    openGraph: {
      title: course.Course_Title,
      description: course.Course_Description,
      images: [course.Course_Thumbnail],
    },
  };
}

export default async function CoursePage({ params }: { params: { id: string } }) {
  const course = await getCourse(params.id);
  
  if (!course) {
    notFound();
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{course.Course_Title}</h1>
      <p className="text-gray-600 mb-6">{course.Course_Description}</p>
      
      {/* Your existing course detail components */}
      <div className="mt-8">
        <a 
          href="https://app.studystreak.com/login"
          className="bg-primary-600 text-white px-6 py-3 rounded-xl hover:bg-primary-700 transition-colors"
        >
          Enroll Now
        </a>
      </div>
    </div>
  );
}
```

### 5. **Login Redirect** (app/login/page.tsx)
```typescript
'use client';
import { useEffect } from 'react';

export default function LoginPage() {
  useEffect(() => {
    // Check if already authenticated
    const token = localStorage.getItem('loginInfo');
    if (token) {
      window.location.href = 'https://app.studystreak.com/dashboard';
      return;
    }
    
    // Redirect to React app login
    window.location.href = 'https://app.studystreak.com/login';
  }, []);
  
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Redirecting to Login...</h1>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
      </div>
    </div>
  );
}
```

## 🛠 **Implementation Steps**

### **Step 1: Quick Setup (30 minutes)**
```bash
# In your studystreak directory
cd /Users/jigardesai/Desktop/studystreak
npx create-next-app@latest nextjs-frontend --typescript --tailwind --app-router

# Copy Tailwind config
cp StudyStreak-FrontEnd/tailwind.config.js nextjs-frontend/
cp -r StudyStreak-FrontEnd/src/img nextjs-frontend/public/images
```

### **Step 2: Component Migration (2-3 hours per page)**
- Start with your simplest page (About Us)
- Copy HTML structure and Tailwind classes
- Convert to TypeScript/TSX
- Add proper SEO metadata

### **Step 3: API Integration (1 hour)**
- Set up API proxy in next.config.js
- Create lib/api.ts for shared API functions
- Test with existing backend

### **Step 4: Testing (1 hour)**
- Test SEO with Lighthouse
- Test page speed with PageSpeed Insights
- Verify meta tags with social media debuggers

## 📊 **Immediate Benefits You'll See**

### **SEO Improvements**
- **Before**: Blank page source (React SPA)
- **After**: Full HTML content visible to search engines

### **Performance**
- **Before**: 2-3s loading time
- **After**: <1s loading time for static content

### **User Experience**  
- **Before**: Loading spinner on every page
- **After**: Instant navigation between marketing pages

## 🎯 **Migration Priority**

### **Phase 1 (Week 1): Critical SEO Pages**
1. Homepage (`/`)
2. Courses listing (`/courses`) 
3. Course details (`/courses/[id]`)

### **Phase 2 (Week 2): Content Pages**
4. Blog listing (`/blogs`)
5. Blog posts (`/blogs/[slug]`)
6. About Us (`/about-us`)

### **Phase 3 (Week 3): Remaining Pages**
7. Contact Us (`/contact-us`)
8. IELTS page (`/ielts`)
9. Static pages (Privacy, Terms, etc.)

This approach allows you to see immediate SEO benefits while keeping your existing React dashboard fully functional!