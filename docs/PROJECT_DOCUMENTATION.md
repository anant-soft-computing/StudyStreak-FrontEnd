# StudyStreak Frontend — Complete Project Documentation

> **Project:** StudyStreak LMS (Learning Management System)
> **Stack:** React 18, Redux Toolkit, TailwindCSS, Bootstrap 5
> **Backend API:** `https://studystreak.in/api`
> **Date:** March 2026

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [System Architecture & Flow](#2-system-architecture--flow)
3. [Step-by-Step Deployment Guide](#3-step-by-step-deployment-guide)
4. [All Features](#4-all-features)
5. [Third-Party APIs & Services](#5-third-party-apis--services)
6. [All Dependencies & Descriptions](#6-all-dependencies--descriptions)
7. [Environment Variables](#7-environment-variables)
8. [Folder Structure](#8-folder-structure)
9. [User Roles & Access Control](#9-user-roles--access-control)
10. [Route Map](#10-route-map)
11. [AI Assessment System](#11-ai-assessment-system)
12. [API Endpoints Reference](#12-api-endpoints-reference)

---

## 1. Project Overview

StudyStreak is a full-featured LMS platform focused on **IELTS** and **PTE Academic** exam preparation. It offers:

- Structured courses with live and recorded classes
- AI-powered speaking and writing assessment
- Full-length, practice, mock, and mini tests for IELTS and PTE
- Admin and tutor dashboards for content and student management
- Payment integration via Razorpay
- Google OAuth login
- A public-facing marketing website

---

## 2. System Architecture & Flow

```
┌─────────────────────────────────────────────────────────────┐
│                      BROWSER (React SPA)                    │
│                                                             │
│   Public Website ──► Auth (Login/Register)                  │
│                            │                                │
│              ┌─────────────┼──────────────┐                 │
│              ▼             ▼              ▼                 │
│         Student         Admin          Tutor                │
│         Dashboard       Dashboard      Dashboard            │
└──────────────┬──────────────────────────────────────────────┘
               │
               │  JWT (Bearer Token)
               │  Token auto-refresh via ajaxCall helper
               ▼
┌──────────────────────────────┐
│  Backend REST API            │
│  https://studystreak.in/api  │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐    ┌──────────────────────────┐
│  Django / DRF Backend        │◄──►│  OpenAI GPT (via secure  │
│  (Auth, Exams, Courses,      │    │  Firebase Functions proxy │
│   Reports, Live Classes)     │    │  or backend proxy)        │
└──────────────────────────────┘    └──────────────────────────┘
               │
     ┌─────────┴──────────┐
     ▼                    ▼
 Razorpay             Google OAuth
 (Payments)           (Login)
```

### Request Flow

1. User opens the app → React Router resolves route.
2. Protected routes check JWT in `localStorage` via `ProtectedRoute.js`.
3. API calls go through `src/helpers/ajaxCall.js` — which:
   - Decodes the JWT expiry using `jwt-decode`
   - Auto-refreshes the token 30 seconds before expiry
   - Prepends the base URL `https://studystreak.in/api`
4. All AI writing/speaking assessments are sent to the backend proxy (or Firebase Functions), which calls OpenAI GPT.
5. Redux (`authStore`) stores login state globally.

---

## 3. Step-by-Step Deployment Guide

### Prerequisites

| Tool     | Version  |
|----------|----------|
| Node.js  | ≥ 18.x   |
| npm      | ≥ 9.x    |
| Git      | Any      |

---

### Step 1 — Clone the Repository

```bash
git clone <your-repo-url>
cd StudyStreak-FrontEnd
```

---

### Step 2 — Install Dependencies

```bash
npm install
```

---

### Step 3 — Configure Environment Variables

Create a `.env` file in the project root (it already exists; verify these values):

```env
# Build settings
GENERATE_SOURCEMAP=false
ESLINT_NO_DEV_ERRORS=true
TSC_COMPILE_ON_ERROR=true
DISABLE_ESLINT_PLUGIN=true
SKIP_PREFLIGHT_CHECK=true

# API
REACT_APP_API_BASE_URL=https://studystreak.in/api
REACT_APP_ENV=production

# Google OAuth
REACT_APP_GOOGLE_CLIENT_ID=<your-google-client-id>

# Razorpay
REACT_APP_RAZORPAY_KEY_ID=<your-razorpay-key-id>

# App secret (used for local encryption)
REACT_APP_SECRET_KEY=<your-secret-key>

# Google Calendar
REACT_APP_GOOGLE_CALENDER_CLIENT_ID=<your-calendar-client-id>
REACT_APP_GOOGLE_CALENDER_API_KEY=<your-calendar-api-key>
```

> ⚠️ **Never commit `.env` to version control.** All OpenAI keys must be stored server-side only.

---

### Step 4 — Run Locally (Development)

```bash
npm start
```

App runs at `http://localhost:3000`.

---

### Step 5 — Production Build

```bash
npm run build
```

This runs:
1. `react-app-rewired build` — creates an optimized bundle in `/build`
2. `node generate-sitemap.js` — regenerates `sitemap.xml`

Output: `/build` folder (static files ready to serve).

---

### Step 6 — Deploy to Hosting

#### Option A — Firebase Hosting (recommended)

```bash
# Install Firebase CLI if not already installed
npm install -g firebase-tools

# Login
firebase login

# Initialize (first time only)
firebase init hosting
# Public directory: build
# Single-page app: YES
# Overwrite index.html: NO

# Deploy
firebase deploy --only hosting
```

#### Option B — Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
netlify deploy --prod --dir=build
```

Add a `_redirects` file in the `/public` folder for SPA routing:
```
/* /index.html 200
```

#### Option C — Nginx (Self-hosted / VPS)

1. Upload the `/build` folder to the server.
2. Configure Nginx:

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/studystreak/build;
    index index.html;

    location / {
        try_files $uri /index.html;
    }

    # Cache static assets
    location /static/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

3. Reload Nginx: `sudo nginx -s reload`

---

### Step 7 — Deploy Firebase Backend Functions (AI Proxy)

```bash
cd firebase-functions
npm install
firebase deploy --only functions
```

Set environment secrets for Firebase Functions:
```bash
firebase functions:secrets:set OPENAI_API_KEY
```

---

### Step 8 — Verify Deployment Checklist

- [ ] App loads at the production URL
- [ ] Login via Google OAuth works
- [ ] API calls reach `https://studystreak.in/api` (check Network tab)
- [ ] Razorpay checkout modal opens
- [ ] Speaking/Writing AI assessment returns results
- [ ] All IELTS and PTE exam routes load correctly
- [ ] Admin dashboard accessible at `/admin-dashboard`

---

## 4. All Features

### Public Website (Marketing)
| Feature | Description |
|---|---|
| Home Page | Hero banner, stats, course highlights, testimonials |
| Courses Page | List of all available courses |
| Course Detail | Individual course info, syllabus, enroll CTA |
| IELTS Course Page | Dedicated IELTS preparation landing page |
| About Us | Company information |
| Why Choose Us | USP highlights |
| Blogs | Article listing with slug-based detail pages |
| Podcast | Audio/video podcast episodes |
| Talk To Us | Contact form |
| Become a Partner | Partner inquiry page |
| English Level Test | Free public English proficiency test |
| Forgot Password | Password reset flow |
| Privacy Policy / Terms / Refund Policy | Legal pages |
| Package Pages | Three study mode landing pages (Self-Study, Guided, Mentorship) |

### Authentication
| Feature | Description |
|---|---|
| Email/Password Login | Standard login with JWT |
| Google OAuth Login | One-click login via `@react-oauth/google` |
| Auto Token Refresh | Refreshes JWT 30 seconds before expiry |
| Role-Based Access | Student / Admin / Tutor protected routes |

### Student Dashboard
| Feature | Description |
|---|---|
| Dashboard Overview | Stats, quick-links, upcoming classes |
| My Courses | Enrolled courses with progress |
| Course Lessons | Video lessons per course |
| Course Materials | Downloadable course content |
| Flash Cards | Interactive study flashcards |
| Resources | Study material downloads |
| Reports | Performance analytics |
| Progress Tracker | Level of student, band score progress |
| Settings | Profile and notification preferences |
| Notifications | Notice board |

### IELTS Exam System
| Feature | Description |
|---|---|
| Diagnostic Test | Initial free English level assessment |
| Free Mini Test | Short skill-specific test (Reading/Writing/Speaking/Listening) |
| Mock Test | Timed IELTS-style mock exam |
| Practice Test | Section-wise practice (Reading, Writing, Speaking, Listening) |
| Full Length Test | Complete IELTS simulation with all 4 sections |
| Paper Test | Printable/manual exam format |
| Live Assignment | Teacher-assigned tasks with online submission |
| Exam Answer Review | Full answer breakdowns with AI feedback |
| AI Assessment (Writing) | GPT-powered band score & feedback for Task 1 & 2 |
| AI Assessment (Speaking) | GPT-powered fluency, pronunciation & coherence scoring |
| General Training Mode | IELTS General Training variant tests |

### PTE Academic Exam System
| Feature | Description |
|---|---|
| PTE Dashboard | PTE-specific overview |
| PTE Speaking — Read Aloud (RA) | Record & AI-assess read aloud responses |
| PTE Speaking — Repeat Sentence (RS) | Record & assess sentence repetition |
| PTE Speaking — Describe Image (DI) | Describe chart/image assessment |
| PTE Speaking — Retell Lecture (RL) | Retell lecture with AI evaluation |
| PTE Speaking — Answer Short Q (ASQ) | Short answer speaking tasks |
| PTE Speaking — RTS | Respond to a situation |
| PTE Speaking — SGD | Summarize Group Discussion |
| PTE Writing — Summarize Written Text (SWT) | Single-sentence summary with AI scoring |
| PTE Writing — Essay (WE) | Full essay with GPT band scoring |
| PTE Reading — MCQ Single/Multi | Standard reading MCQ |
| PTE Reading — RFIB | Reading fill in the blanks (drag-drop) |
| PTE Reading — ROP | Re-order paragraphs |
| PTE Listening — SST | Summarize Spoken Text |
| PTE Listening — WFD | Write From Dictation |
| PTE Listening — HIW | Highlight Incorrect Words |
| PTE Listening — MCQ | Listening multiple choice |
| PTE Free Mock Test | Full PTE Academic simulated exam |
| All Answer Review Pages | Per-task detailed answer breakdowns |

### Live & Recorded Classes
| Feature | Description |
|---|---|
| Live Classes | Schedule and join live sessions |
| Recorded Classes | Access recorded class video library |
| Counselling Sessions | Booking counselling via live class system |
| Google Calendar Integration | Sync class schedules to Google Calendar |

### Payment & Enrolment
| Feature | Description |
|---|---|
| Razorpay Checkout | Secure payment gateway for course enrolment |
| Package Plans | Self-Study / Guided / Mentorship tiers |
| Coupon Codes | Discount coupon support |
| Thank You Page | Post-payment confirmation |

### Admin Dashboard
| Feature | Description |
|---|---|
| User Management | View and manage all users |
| Student Management | Student enrolment and progress overview |
| Course Management | Create/edit courses, lessons, materials |
| Exam Management | Create and manage all exam types |
| Exam Builder | DragDrop-based exam question creator |
| Live Class Management | Schedule and manage live sessions |
| Batch Management | Group students into batches |
| Flash Card Management | Create and manage study flashcards |
| Package Management | Manage subscription packages |
| Badge & Gamification | Award badges, manage points |
| Notice Board | Publish notices to students |
| Resources Management | Upload/manage study resources |
| Testimonial Management | Manage website testimonials |
| Coupon Management | Create discount coupons |
| Podcast Management | Upload and manage podcast episodes |
| Live Class Reports | Reports on class attendance and engagement |
| Profile | Admin profile settings |

### Tutor Dashboard
| Feature | Description |
|---|---|
| Live Class Management | Tutors can manage their assigned live classes |

### Gamification
| Feature | Description |
|---|---|
| Badges | Awarded for milestones (tests completed, scores achieved) |
| Points System | Earn points for activity |
| Student Level Tracking | Tracks band score progression over time |

---

## 5. Third-Party APIs & Services

| Service | Purpose | Key / Config |
|---|---|---|
| **OpenAI GPT** | AI-powered writing & speaking assessment (band scoring, feedback) | Stored in Firebase Functions env: `OPENAI_API_KEY` — **never in frontend** |
| **Razorpay** | Payment gateway for course/package checkout | `REACT_APP_RAZORPAY_KEY_ID` |
| **Google OAuth 2.0** | Social login (Sign in with Google) | `REACT_APP_GOOGLE_CLIENT_ID` via `@react-oauth/google` |
| **Google Calendar API** | Sync live class schedules to student's Google Calendar | `REACT_APP_GOOGLE_CALENDER_CLIENT_ID`, `REACT_APP_GOOGLE_CALENDER_API_KEY` |
| **Firebase Hosting** | Static file hosting for the React SPA | `firebase.json`, `.firebaserc` |
| **Firebase Functions** | Secure serverless proxy for OpenAI API calls (rate-limited) | Deployed via `firebase-functions/` directory |
| **EmailJS** | Send emails directly from the frontend (contact forms) | `emailjs-com` package |
| **Web Speech API** | Browser-native speech synthesis for PTE audio playback (TTS) | Native browser API |
| **React Speech Recognition** | Browser-native microphone transcription for speaking exams | `react-speech-recognition` |
| **StudyStreak Backend REST API** | All data operations (auth, exams, courses, reports, users) | `https://studystreak.in/api` — JWT authenticated |

---

## 6. All Dependencies & Descriptions

### Production Dependencies

| Package | Version | Description |
|---|---|---|
| `react` | ^18.2.0 | Core React library |
| `react-dom` | ^18.2.0 | React DOM rendering |
| `react-router-dom` | ^6.17.0 | Client-side routing (v6) |
| `react-scripts` | 5.0.1 | CRA build tooling (wrapped by react-app-rewired) |
| `react-redux` | ^9.0.4 | React bindings for Redux state management |
| `@reduxjs/toolkit` | ^2.0.1 | Simplified Redux store, slices, and reducers |
| `react-toastify` | ^9.1.3 | Toast notification system |
| `react-helmet` | ^6.1.0 | Manage `<head>` tags (SEO meta) |
| `react-helmet-async` | ^2.0.5 | Async version of react-helmet for SSR safety |
| `@react-oauth/google` | ^0.12.1 | Google OAuth 2.0 login for React |
| `jwt-decode` | ^4.0.0 | Decode JWT tokens client-side (for expiry checking) |
| `bootstrap` | ^5.3.2 | CSS framework for admin/dashboard UI components |
| `react-bootstrap` | ^2.9.1 | React component wrappers for Bootstrap |
| `@mui/material` | ^5.15.20 | Material UI component library |
| `@emotion/react` | ^11.11.4 | CSS-in-JS runtime for MUI |
| `@emotion/styled` | ^11.11.5 | Styled components for MUI |
| `tailwindcss` | ^3.4.13 | Utility-first CSS framework (used for public website) |
| `@tailwindcss/typography` | ^0.5.15 | Tailwind typography plugin (prose styles) |
| `@tailwindcss/aspect-ratio` | ^0.4.2 | Aspect ratio utilities for Tailwind |
| `lucide-react` | ^0.447.0 | Icon library (Lucide icon set) |
| `react-icofont` | ^1.0.19 | IcoFont icon set for React |
| `chart.js` | ^4.4.0 | Chart rendering library (used for reports/analytics) |
| `ag-grid-react` | ^31.0.2 | High-performance data grid for admin tables |
| `@ckeditor/ckeditor5-build-classic` | ^40.2.0 | Rich text editor (for exam content creation) |
| `@ckeditor/ckeditor5-react` | ^6.2.0 | React wrapper for CKEditor 5 |
| `react-player` | ^2.14.1 | Video/audio player (recorded classes, podcasts) |
| `react-speech-recognition` | ^3.10.0 | Browser-based speech recognition (speaking exams) |
| `react-responsive-carousel` | ^3.2.23 | Carousel/slider for marketing pages |
| `react-slick` | ^0.29.0 | Alternative carousel/slider component |
| `slick-carousel` | ^1.8.1 | Peer dependency for react-slick |
| `react-card-flip` | ^1.2.2 | Card flip animation for flashcards |
| `react-select-search` | ^4.1.7 | Searchable select dropdown |
| `multiselect-react-dropdown` | ^2.0.25 | Multi-select dropdown component |
| `react-datepicker` | ^6.9.0 | Date picker component |
| `react-date-range` | ^2.0.0-alpha.4 | Date range selection (scheduling) |
| `react-selection-highlighter` | ^2.0.1 | Text selection highlighting (reading exams) |
| `moment` | ^2.30.1 | Date/time formatting and manipulation |
| `date-fns` | ^3.6.0 | Modern date utility library |
| `country-state-city` | ^3.2.1 | Country, state, city dropdown data |
| `emailjs-com` | ^3.2.0 | Send emails from frontend (contact forms) |
| `html-to-text` | ^9.0.5 | Convert HTML to plain text (PTE text processing) |
| `cheerio` | ^1.0.0-rc.12 | Server-side HTML parsing |
| `html2canvas` | ^1.4.1 | Screenshot/canvas export of DOM elements |
| `jspdf` | ^3.0.3 | Generate PDF reports from the browser |
| `file-saver` | ^2.0.5 | Client-side file download helper |
| `xlsx` | ^0.18.5 | Read and write Excel files (data export) |
| `sitemap` | ^8.0.0 | Programmatic sitemap.xml generation |
| `web-vitals` | ^2.1.4 | Core Web Vitals measurement |
| `@testing-library/react` | ^13.4.0 | React component testing utilities |
| `@testing-library/jest-dom` | ^5.17.0 | Custom Jest DOM matchers |
| `@testing-library/user-event` | ^13.5.0 | Simulate user events in tests |

### Dev Dependencies

| Package | Version | Description |
|---|---|---|
| `react-app-rewired` | (in scripts) | Override CRA webpack config without ejecting |
| `autoprefixer` | ^10.4.20 | PostCSS plugin to add vendor prefixes automatically |
| `postcss` | ^8.4.47 | CSS transformation toolchain |
| `@tailwindcss/forms` | ^0.5.9 | Tailwind form element base styles |
| `@babel/plugin-proposal-private-property-in-object` | ^7.21.11 | Babel plugin to fix build warning |

### Firebase Functions Dependencies (`firebase-functions/package.json`)

| Package | Description |
|---|---|
| `firebase-functions` (v2) | Cloud Functions for Firebase HTTP triggers |
| `firebase-admin` | Firebase Admin SDK for server-side auth verification |
| `openai` | Official OpenAI Node.js SDK |
| `cors` | CORS middleware for Firebase Function HTTP endpoints |
| `dotenv` | Load environment variables from `.env` |

---

## 7. Environment Variables

| Variable | Used In | Description |
|---|---|---|
| `REACT_APP_API_BASE_URL` | `ajaxCall.js` | Base URL for all backend API requests |
| `REACT_APP_ENV` | General | Environment flag (`development` / `production`) |
| `REACT_APP_GOOGLE_CLIENT_ID` | Auth pages | Google OAuth client ID for login |
| `REACT_APP_RAZORPAY_KEY_ID` | Checkout | Razorpay publishable key for payments |
| `REACT_APP_SECRET_KEY` | Helpers | App-level secret, used for encryption helpers |
| `REACT_APP_GOOGLE_CALENDER_CLIENT_ID` | Live classes | Google Calendar OAuth client ID |
| `REACT_APP_GOOGLE_CALENDER_API_KEY` | Live classes | Google Calendar API key |
| `GENERATE_SOURCEMAP` | Build | Disables source maps in production (set to `false`) |
| `ESLINT_NO_DEV_ERRORS` | Build | Prevents ESLint from failing the build |
| `DISABLE_ESLINT_PLUGIN` | Build | Disables CRA ESLint plugin entirely |
| `SKIP_PREFLIGHT_CHECK` | Build | Skips CRA dependency version checks |

> All Firebase Function secrets (e.g. `OPENAI_API_KEY`) are stored using Firebase Secrets Manager and **never** in the frontend `.env`.

---

## 8. Folder Structure

```
StudyStreak-FrontEnd/
├── public/                     # Static public assets (index.html, manifest, robots.txt)
├── src/
│   ├── App.js                  # Root component — all React Router routes
│   ├── index.js                # Entry point, Redux Provider, BrowserRouter
│   ├── index.css               # Global styles
│   ├── components/             # Feature-organized React components
│   │   ├── Checkout/           # Razorpay payment flow
│   │   ├── Dashboard/
│   │   │   ├── Admin/          # All admin panel pages
│   │   │   ├── Student/        # All student dashboard pages
│   │   │   │   ├── PTE/        # PTE-specific exams, dashboard
│   │   │   │   ├── Progress/   # Progress tracking
│   │   │   │   └── ...
│   │   │   └── Tutor/          # Tutor live class management
│   │   ├── Exam-Answer/        # Answer review pages (IELTS)
│   │   ├── Exam-Create/        # Exam builder components
│   │   ├── General/            # General training exam variants
│   │   ├── Instruction/        # Pre-exam instruction screens
│   │   ├── Landing/            # Landing page sections
│   │   ├── LiveAssignment/     # Live assignment exam & answer
│   │   ├── LiveExam/           # Live exam runners (IELTS)
│   │   ├── NavBar/             # Navigation components
│   │   ├── Report/             # Reporting components
│   │   ├── TopBar/             # Top bar UI
│   │   ├── UI/                 # Shared UI primitives (Loading, Modal, etc.)
│   │   └── ProtectedRoute.js   # Route guard for authenticated routes
│   ├── css/                    # Global CSS files (Bootstrap, animate, etc.)
│   ├── examples/               # Code usage examples
│   ├── helpers/                # Utility functions
│   │   ├── ajaxCall.js         # Central API call helper with JWT refresh
│   │   ├── helperFunction.js   # Token refresh, misc utils
│   │   ├── openAIHelper.js     # Centralized AI assessment prompt helpers
│   │   └── secureOpenAIService.js  # Secure proxy call to backend/Firebase
│   ├── hooks/                  # Custom React hooks
│   │   ├── useCheckAuth.js     # Auth check hook
│   │   └── useFetch.js         # Generic data fetching hook
│   ├── layout/                 # Route layout wrappers
│   │   ├── StudentNavBarRoute.js
│   │   ├── AdminNavBarRoute.js
│   │   ├── TutorNavBarRoute.js
│   │   └── BootstrapStyles.js  # HOC to inject Bootstrap CSS per route
│   ├── pages/                  # Standalone page components (ErrorPage, etc.)
│   ├── store/                  # Redux store
│   │   ├── authStore.js        # Auth slice (login state)
│   │   └── index.js            # Store configuration
│   ├── tailwind_components/    # Public website (Tailwind styled)
│   │   ├── HomePage/
│   │   ├── Course/
│   │   ├── Blog/
│   │   ├── Login/
│   │   ├── Ielts/
│   │   └── ...
│   ├── utils/
│   │   └── assessment/
│   │       ├── writingAssessment.js    # Parse GPT writing response
│   │       └── speakingAssessment.js   # Parse GPT speaking response
│   └── video/                  # Embedded video assets
├── firebase-functions/         # Firebase Cloud Functions (OpenAI proxy)
│   ├── index.js                # Function definitions (rate-limited OpenAI calls)
│   └── package.json
├── build/                      # Production build output (generated)
├── docs/                       # Project documentation
├── scripts/                    # Security migration scripts
├── .env                        # Environment variables (do not commit)
├── config-overrides.js         # Webpack overrides via react-app-rewired
├── tailwind.config.js          # Tailwind CSS configuration
├── postcss.config.js           # PostCSS configuration
├── generate-sitemap.js         # Sitemap generation script
└── package.json                # Project metadata and dependencies
```

---

## 9. User Roles & Access Control

| Role | Access | Protected By |
|---|---|---|
| **Guest** | Public website, English test, login, course pages, package pages | None |
| **Student** | Student dashboard, exams, live classes, reports, PTE/IELTS practice | `StudentNavBarRoute (isProtected=true)` |
| **Admin** | Full admin dashboard, all management pages, exam builder | `AdminNavBarRoute (isProtected=true)` |
| **Tutor** | Tutor live class management | `TutorNavBarRoute (isProtected=true)` |

Route guards check the JWT from `localStorage` and role field in the decoded token. Unauthenticated access redirects to `/login`.

---

## 10. Route Map

### Public Routes
| Path | Component | Description |
|---|---|---|
| `/` | `HomePage` | Main landing page |
| `/courses` | `CoursesPage` | All courses listing |
| `/course/:courseId` | `CourseDetailPage` | Individual course detail |
| `/ielts` | `IELTSCoursePage` | IELTS programme page |
| `/about-us` | `AboutUsPage` | About the company |
| `/why-choose-us` | `WhyChooseUsPage` | USP page |
| `/blogs` | `BlogsPage` | Blog listing |
| `/blogs/:slug` | `BlogDetails` | Single blog post |
| `/talk-to-us` | `TalkToUsPage` | Contact form |
| `/become-a-partner` | `BecomeAPartnerPage` | Partner page |
| `/login` | `AuthPage` | Login & register |
| `/english-test` | `EnglishTest` | Free English level test |
| `/forgot-password` | `ForgotPasswordPage` | Password reset |
| `/podcast` | `Podcast` | Podcast episodes |
| `/privacy-policy` | `PrivacyPolicy` | Privacy policy |
| `/terms-and-conditions` | `TermsAndConditions` | Terms of service |
| `/refund-policy` | `RefundPolicy` | Refund policy |
| `/self-study-mode-ielts-academic` | `PackagePageOne` | Self-study package |
| `/guided-study-mode-ielts-academic` | `PackagePageTwo` | Guided package |
| `/mentorship-mode-ielts-academic` | `PackagePageThree` | Mentorship package |
| `/thank-you` | `ThankYouPage` | Post-payment page |

### Student Routes (Protected)
| Path | Component |
|---|---|
| `/studentDashboard` | Main Dashboard |
| `/progress` | Progress Tracker |
| `/studentProfile` | Profile |
| `/studentMyCourse` | My Courses |
| `/courseLessons/:courseId` | Course Lessons |
| `/courseMaterials/:courseId` | Course Materials |
| `/paperTest` | Paper Test |
| `/mockTest` | Mock Test |
| `/practiceTest` | Practice Test |
| `/fullLengthTest` | Full Length Test |
| `/diagnosticTest` | English Level Test |
| `/freeDiagnosticTest` | Free Diagnostic Test |
| `/freeMiniTest` | Free Mini Test |
| `/studentLiveClasses` | Live Classes |
| `/recordedClasses` | Recorded Classes |
| `/flashcard` | Flash Cards |
| `/resources` | Resources |
| `/studentSettings` | Settings |
| `/reports` | Reports |
| `/PTE/Dashboard` | PTE Dashboard |
| `/PTE/FreeMockTest` | PTE Free Mock Test |
| `/PTE/Reading` | PTE Reading |
| `/PTE/Writing` | PTE Writing |
| `/PTE/Listening` | PTE Listening |
| `/PTE/Speaking` | PTE Speaking |
| `/checkout` | Checkout (Razorpay) |

### Live Exam Routes (No auth guard — token inside)
| Path | Description |
|---|---|
| `/DiagnosticTest/:examId` | Diagnostic test runner |
| `/MiniLiveExam/:examType/:examId` | Mini test runner |
| `/PracticeLiveExam/:examType/:examForm/:examId` | Practice test runner |
| `/FullLengthLiveExam/:examId` | Full length test runner |
| `/PTE-Academic/MockTest/:examId` | PTE mock test runner |
| `/PTE/IELTS/Speaking/RA/:examId` | PTE Read Aloud |
| `/PTE/IELTS/Speaking/RS/:examId` | PTE Repeat Sentence |
| `/PTE/IELTS/Speaking/DI/:examId` | PTE Describe Image |
| `/PTE/IELTS/Speaking/RL/:examId` | PTE Retell Lecture |
| `/PTE/IELTS/Speaking/ASQ/:examId` | PTE Answer Short Question |
| `/PTE/IELTS/Speaking/RTS/:examId` | PTE Respond to Situation |
| `/PTE/IELTS/Speaking/SGD/:examId` | PTE Summarize Group Discussion |
| `/PTE/IELTS/Writing/:examSubcategory/:examId` | PTE Writing Exam |
| `/PTE/IELTS/Reading/:examSubcategory/:examId` | PTE Reading Exam |
| `/PTE/IELTS/Listening/:examSubcategory/:examId` | PTE Listening Exam |

### Admin Routes (Protected)
| Path | Page |
|---|---|
| `/admin-dashboard` | Admin Overview |
| `/admin-users` | User Management |
| `/admin-student` | Student Management |
| `/admin-course` | Course Management |
| `/admin-exam` | Exam Management |
| `/admin-liveClass` | Live Class Management |
| `/admin-batch` | Batch Management |
| `/admin-badges` | Badge Management |
| `/admin-flashCard` | Flashcard Management |
| `/admin-package` | Package Management |
| `/admin-gamification` | Gamification Settings |
| `/admin-notice` | Notice Board |
| `/admin-resources` | Resources |
| `/admin-lesson` | Lesson Management |
| `/admin-coupon` | Coupon Management |
| `/admin-testimonial` | Testimonials |
| `/admin-podcast` | Podcast Management |
| `/admin-profile` | Admin Profile |
| `/admin-live-class-report` | Live Class Reports |
| `/exam-create` | Drag-Drop Exam Builder |

---

## 11. AI Assessment System

### How It Works

1. **Student completes** a speaking or writing task.
2. For **speaking**: The browser records audio and transcribes it using the Web Speech API (`react-speech-recognition`).
3. The transcript (or written text) is sent to the backend **via the secure proxy** (`secureOpenAIService.js` → Firebase Functions).
4. Firebase Function validates the JWT, checks rate limits, and calls `OpenAI GPT`.
5. GPT returns a structured assessment with band scores and feedback.
6. The response is parsed by `writingAssessment.js` or `speakingAssessment.js` and displayed.

### Rate Limits (Firebase Functions)
- **20 requests per hour** per user
- **100 requests per day** per user

### Where Prompts Are Defined

| Task | File |
|---|---|
| General Speaking prompt (centralized) | `src/helpers/openAIHelper.js` — `assessSpeakingResponse()` |
| General Writing prompt (centralized) | `src/helpers/openAIHelper.js` — `assessWritingResponse()` |
| PTE Writing (SWT / WE) | `LivePTEWritingExam.js` — inline messages array |
| PTE Listening SST | `LivePTESSTWFDExam.js` — inline messages array |
| PTE Speaking ASQ | `ASQRecorder.js` — inline messages array |

### Assessment Criteria

**Writing (IELTS)**
- Task Achievement
- Coherence and Cohesion
- Lexical Resource
- Grammatical Range and Accuracy
- → Overall Band Score (0–9)

**Speaking (IELTS)**
- Fluency and Coherence
- Lexical Resource
- Grammatical Range and Accuracy
- Pronunciation
- → Overall Band Score (0–9)

**PTE Speaking**
- Content
- Pronunciation (0–5)
- Oral Fluency (0–5)
- → Subscore → Converted to PTE score (0–90)

**PTE Writing (SWT)**
- Content (0–2)
- Form (0–1)
- Grammar (0–2)
- Vocabulary (0–2)

---

## 12. API Endpoints Reference

All endpoints are relative to `https://studystreak.in/api`.
All protected endpoints require the header: `Authorization: Bearer <JWT>`.

> Dynamic segments: `:id`, `:examId`, `:courseId`, etc. are substituted at runtime.

---

### Authentication & User

| Method | Endpoint | Description | File |
|---|---|---|---|
| POST | `/registration/` | Register a new student account | `SignUp.js`, `Register.js` |
| POST | `/token/refresh/` | Refresh expired JWT access token | `helperFunction.js` |
| POST | `/resetpassword/` | Request password reset | `ForgotPassword.js` |
| GET | `/studentview/` | Get current student profile | `Profile.js`, `Checkout.js` |
| GET/PUT | `/studentretupddelview/:userId/` | Get or update student by ID | `UpdateProfile.js` |
| GET | `/user-list/` | List all users (admin) | `Users.js` |
| GET | `/country-list/` | Fetch country list for profile form | `UpdateProfile.js` |
| PUT | `/update-expected-course/:courseId/` | Update student's target course | `Profile.js` |

---

### Courses & Categories

| Method | Endpoint | Description | File |
|---|---|---|---|
| GET | `/courselistview/` | List all courses | `ViewCourse.js`, `MyCourse.js` |
| GET | `/courselistview/?search=&Category__name=&Level__name=` | Filtered course search | `CourseListItem.js`, `CourseList.js` |
| GET | `/courselistview/?Category__name=IELTS` | IELTS-only courses | `IeltsList.js` |
| GET/PUT/DELETE | `/courseretupddel/:courseId/` | Get, update, or delete a course | `CourseDetail.js`, `Lesson.js` |
| GET | `/course/:courseId/packages/` | Get packages for a course | `CourseDetail.js` |
| GET | `/categoryview/` | List course categories | `Banner.js`, `BlogsPage.js` |
| GET | `/get-student-course/` | Get enrolled courses for student | `Dashboard.js`, `MockTest.js` |
| GET | `/student/course-enrollment/` | Check course enrollment | `MyCourse.js` |
| GET | `/student/course-enrollment/details/` | Enrollment detail with permissions | `DSSideBar.js`, `LiveClass.js` |
| GET | `/courselistview/?Category__name=:name` | Filter courses by category | `CoursesPage.js` |

---

### Batches & Packages

| Method | Endpoint | Description | File |
|---|---|---|---|
| GET | `/batchview/` | List all batches | `ViewBatches.js`, `CourseDetail.js` |
| POST | `/create-batch/` | Create a new batch | `CreateBatch.js` |
| GET | `/batch/:batchId/` | Get batch by ID | `Student.js` |
| GET | `/filterbatches/:packageId/` | Get batches for a package | `BatchSelectionModal.js` |
| GET | `/packagelistview/` | List all packages | `ViewPackages.js` |
| POST | `/packagecreateview/` | Create a new package | `CreatePackage.js` |
| GET | `/package/:packageId/` | Get package by ID (admin) | `Student.js` |
| GET | `/package/noauth/:packageId/` | Get package info (no auth, public) | `PopularPackages.js` |
| GET | `/package/noauth/30/` | Self-Study package details | `PackagePageTwo.js` |
| GET | `/package/noauth/31/` | Guided Study package details | `PackagePageOne.js` |
| GET | `/package/noauth/34/` | Mentorship package details | `PackagePageThree.js` |

---

### Payments & Coupons

| Method | Endpoint | Description | File |
|---|---|---|---|
| POST | `/create/order/` | Create Razorpay order | `Checkout.js` |
| POST | `/confirm/order/` | Confirm payment after Razorpay success | `Checkout.js` |
| GET | `/cuponview/?cupon_code=:code` | Validate a coupon code | `Checkout.js` |
| GET/POST | `/cuponlistview/` | List or create coupons (admin) | `CreateCoupon.js`, `ViewCoupon.js` |

---

### Exam Structure & Content

| Method | Endpoint | Description | File |
|---|---|---|---|
| GET | `/exam/blocks/` | List all exam blocks (admin) | `DragDrop.js`, `ExamWriting.js` |
| GET | `/exam/blocks/?exam_type=&exam_category=&sub_category=` | Filtered exam blocks | `FreeMiniTest.js`, `MockTest.js` |
| GET | `/exam/block/:examId/` | Get a single exam block with questions | `LiveExam.js`, `Answer.js` |
| GET | `/speaking-block/` | List all speaking blocks | `ExamCreate/ExamSpeaking.js` |
| GET | `/speaking-block/:examId/` | Get speaking block for live exam | `LiveSpeakingTest.js` |
| GET | `/speaking-block/:blockId/` | Get speaking block for answer review | `ASQSpeakingAnswer.js` |
| GET | `/speaking/practice-test/:examId/` | Get PTE speaking practice test | `LivePTESpeakingRAExam.js` |
| GET | `/ct/ielts/practice-test/:examId/` | Get full PTE/IELTS practice test | `PracticeLiveTest.js` |
| GET | `/ct/ielts/practice-tests/?exam_type=&category=&sub_category=` | List practice tests filtered | `PracticeTest.js`, `PTE/Speaking.js` |
| GET | `/ct/ielts/practice-tests/?exam_type=Reading&category=PTE` | PTE Reading tests | `PTE/Reading.js` |
| GET | `/ct/ielts/practice-tests/?exam_type=Writing&category=PTE` | PTE Writing tests | `PTE/Writing.js` |
| GET | `/ct/ielts/practice-tests/?exam_type=Listening&category=PTE` | PTE Listening tests | `PTE/Listening.js` |
| GET | `/ct/ielts/practice-tests/?exam_type=Speaking&category=PTE` | PTE Speaking tests | `PTE/Speaking.js` |
| GET | `/ct/flts/` | List All full-length tests | `FLTReport.js` |
| GET | `/ct/flts/?is_diagnostic=true&is_quick=true` | Free (short) diagnostic tests | `FreeDiagnosticTest.js` |
| GET | `/ct/flts/?is_diagnostic=true&is_quick=false` | Full diagnostic tests | `EnglishLevelTest.js` |
| GET | `/ct/flts/?is_diagnostic=false&is_quick=false&category=&sub_category=` | Full-length IELTS tests | `FullLengthTest.js` |
| GET | `/ct/flts/?is_diagnostic=false&is_quick=false&category=PTE` | PTE mock full tests | `FreeMockTest.js` |
| GET | `/ct/flt/:examId/` | Get single FLT by ID | `FullLengthLiveTest.js` |
| POST | `/create-flt/` | Create a new full-length test (admin) | `FLT.js`, `CreateMock.js` |
| GET | `/moduleListView/` | List modules for test building | `PT.js`, `CreatePTEPT.js` |
| GET | `/moduleListView/?category=&sub_category=` | Filtered module list | `FLT.js` |

---

### Exam Submission

| Method | Endpoint | Description | File |
|---|---|---|---|
| POST | `/studentanswerlistview/` | Submit mini test / mock test answers | `LiveExam.js`, `GeneralMTExam.js` |
| POST | `/student-mocktest-submit/` | Finalize mock test submission | `LiveExam.js` |
| POST | `/student-pt-submit/` | Submit practice test | `PracticeLiveTest.js` |
| POST | `/student-flt-submit/` | Submit full-length test | `FullLengthLiveTest.js` |
| POST | `/student-speakingblock-submit/` | Submit speaking block exam | `LiveSpeakingTest.js` |
| POST | `/student-assignment-submit/` | Submit live assignment | `LiveAssignment.js` |
| POST | `/answer/practice-test/` | Save practice test answers | `PracticeLiveTest.js` |
| POST | `/answer/full-length-test/` | Save full-length test answers | `FullLengthLiveTest.js` |
| POST | `/speaking-answers/` | Upload speaking audio transcription | `PTEAudioRecorder.js`, `ASQRecorder.js` |
| POST | `/test-submission/` | Record test completion event / analytics | All live exam components |

---

### Exam Results & Answer Review

| Method | Endpoint | Description | File |
|---|---|---|---|
| GET | `/exam-block-answers/:examId/` | Get student answers for a mini/mock test | `Answer.js`, `GeneralMTAnswer.js` |
| GET | `/practice-answers/:examId/` | Get student answers for a practice test | `PracticeTestAnswer.js` |
| GET | `/flt-answers/:examId/` | Get student answers for a full-length test | `FullLengthTestAnswer.js` |
| GET | `/practice-answers/:paperId/` | Get practice paper answers | `ScoreCard.js`, `Progress.js` |
| GET | `/exam/block/:blockId/` | Get block detail for answer review | `WritingAnswerTable.js` |
| GET | `/speaking-block/:blockId/` | Get speaking block for answer review | `RASpeakingAnswer.js` |

---

### Live Classes

| Method | Endpoint | Description | File |
|---|---|---|---|
| GET | `/liveclass_list_view/?live_class_type=` | List live classes by type (admin) | `ViewLiveClasses.js` |
| GET | `/liveclass_list_view/?live_class_type=&is_public=1` | Public live class listing | `UnPaidDashboard.js` |
| POST | `/liveclass_create_view/` | Create a live class | `CreateLiveClass.js` |
| POST | `/liveclass/attachment/:id` | Upload live class attachment | `CreateLiveClass.js` |
| GET | `/liveclass/student/?live_class_type=&start=&end=` | Get classes for admin report | `LiveClassReport.js`, `TutorLiveClass.js` |
| GET | `/liveclass/studentonly/?liveClassType=Regular Class` | Student regular classes | `RegularClass.js` |
| GET | `/liveclass/studentonly/?liveClassType=Speaking-Practice` | Speaking practice slots | `SpeakingSlots.js` |
| GET | `/liveclass/studentonly/?liveClassType=Counselling` | Counselling sessions | `Counselling.js` |
| GET | `/liveclass/studentonly/?liveClassType=Webinar` | Webinars | `Webinar.js` |
| GET | `/liveclass/studentonly/?liveClassType=Tutor Support` | Tutor support sessions | `TutorSupport.js` |
| GET | `/liveclass/studentonly/?liveClassType=One-To-One-Doubt-Solving` | 1-to-1 doubt sessions | `DoubtSolving.js` |
| GET | `/liveclass/studentonly/?liveClassType=Group-Doubt Solving` | Group doubt sessions | `GroupDoubtSolving.js` |
| GET | `/liveclass/recording/?class_type=` | Recorded class videos | `RecordedClasses.js` |
| GET | `/student/upcoming-class/others/` | Upcoming live classes for student | `UpcomingLiveClasses.js` |
| POST | `/students-join-live-class/` | Mark student as joined | `UpcomingClass.js` |
| POST | `/enroll-students-in-live-class/` | Enroll student in a class | `ClassList.js` |
| POST | `/add-bookslot/:id/` | Book a slot in a class | `ClassList.js` |
| GET | `/liveclass-webinar/` | Public webinar listings | `CoursesPage.js`, `HomePage.js` |

---

### Lessons & Course Content

| Method | Endpoint | Description | File |
|---|---|---|---|
| POST | `/lesson-create/` | Create a new lesson (admin) | `CreateLesson.js` |
| PUT | `/lesson-edit/:lessonId/` | Edit a lesson | `EditLesson.js` |
| GET | `/lesson-get/` | Get all lessons | `ViewLesson.js` |
| GET | `/list/lessons-videos/` | List all lesson videos | `CreateLesson.js`, `EditLesson.js` |
| GET | `/student/:studentId/lessons/` | Get lessons for a student | `LessonList.js` |
| POST | `/section/create/` | Create a lesson section | `CreateSection.js` |
| POST | `/enroll-lesson/` | Mark lesson as enrolled/started | `LessonContent.js` |
| POST | `/save-video-data/` | Save video watch progress | `LessonContent.js` |
| GET | `/courseretupddelview/:courseId/` | Get course structure for lessons | `Lesson.js` |
| GET | `/course-materials/:courseId/` | Get downloadable materials for course | `Material.js` |
| GET | `/additional-resources/:courseId/` | Get additional resources for course | `AdditionalResources.js` |
| GET | `/getyoutubedataview/` | Fetch YouTube video metadata | `NextLesson.js`, `Lesson.js` |
| POST | `/s3-presigned-url/` | Get S3 pre-signed URL for video upload | `UploadLesson.js` |

---

### Notes

| Method | Endpoint | Description | File |
|---|---|---|---|
| GET | `/notes/:lessonId/:studentId/` | Get notes for a lesson | `FloatingNote.js` |
| POST | `/notes/createview/` | Create a new note | `FloatingNote.js` |

---

### Resources & Paper Tests

| Method | Endpoint | Description | File |
|---|---|---|---|
| GET/POST | `/resources/` | List or create resources | `CreateResources.js`, `CreatePaperTest.js` |
| GET | `/resources/?is_paper=true` | List paper test resources | `PaperTest.js`, `ViewPaperTest.js` |
| GET | `/resources/?is_paper=false` | List study resources (non-paper) | `Resources.js`, `ViewResources.js` |

---

### Gamification & Badges

| Method | Endpoint | Description | File |
|---|---|---|---|
| GET/POST | `/gamification/points/` | Get or award points | `UpcomingClass.js`, `LessonContent.js` |
| GET | `/gamification/points/summary/?course_id=` | Leaderboard points summary | `LeaderBoard.js` |
| GET/POST | `/gamification/badges/` | List or create badges | `CreateBadge.js`, `ViewBadges.js` |
| GET/POST | `/gamification/flashcard/` | Manage flashcards | `FlashCard.js`, `CreateFlashCard.js` |
| GET/POST | `/gamification/` | Gamification settings | `CreateGamification.js` |
| GET | `/gamification/objects/?model=Live Class` | Get gamification-linked classes | `CreateGamification.js` |

---

### Reports & Statistics

| Method | Endpoint | Description | File |
|---|---|---|---|
| GET | `/student-stats/` | Overall student performance statistics | `Progress.js`, `MockTest.js` |
| GET | `/get-student-mock/` | Student mock test summary | `MiniTestReport.js` |
| GET | `/get-student-pt/` | Student practice test summary | `PracticeTestReport.js` |
| GET | `/get-student-flt/` | Student full-length test summary | `FullLengthTestReport.js` |
| GET | `/get-student-speaking/` | Student speaking test summary | `MiniTestReport.js` |
| GET | `/given-test-count/?category=PTE` | Count of PTE tests given | `Progress.js` |
| GET | `/given-diagnostic/?name=Diagnostic` | Get given diagnostic test records | `LevelOfStudent.js` |
| GET | `/admin/student-dashboard/` | Admin view of student stats | `Student.js` |
| GET | `/dashboard/pte/` | PTE-specific dashboard data | `PTEDashboard.js` |

---

### Notices

| Method | Endpoint | Description | File |
|---|---|---|---|
| POST | `/noticeboard/` | Create a notice (admin) | `CreateNotice.js` |
| GET | `/noticeboard-list/` | List all notices | `NoticeBoard.js`, `ViewNotice.js` |

---

### Blogs & Testimonials

| Method | Endpoint | Description | File |
|---|---|---|---|
| GET | `/blog-list/` | List all blog posts | `BlogsPage.js`, `CoursesPage.js` |
| GET | `/blog-list/:slug/` | Get single blog post by slug | `BlogDetail.js` |
| GET | `/testimonial/` | List testimonials | `Testimonial.js`, `AboutSection.js` |
| POST | `/testimonial-create/` | Create testimonial (admin) | `CreateTestimonial.js` |

---

### Podcasts

| Method | Endpoint | Description | File |
|---|---|---|---|
| GET/POST | `/podcast/` | List or create podcast episodes | `Podcast.js`, `CreatePodcast.js` |

---

### AI / OpenAI Proxy

| Method | Endpoint | Description | File |
|---|---|---|---|
| POST | `/ai/chat-completion/` | Primary secure OpenAI proxy (backend) | `openAIHelper.js` |
| POST | `/openai/chat-completion/` | Alternative OpenAI proxy endpoint | `SecureOpenAIExample.js` |
| POST | `/security/log/` | Log security events | `secureOpenAIService.js` |

---

*Last updated: March 2026*
