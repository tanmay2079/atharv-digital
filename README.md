<div align="center">
  <br />
  <img src="apps/web/public/favicon.png" alt="Atharv Digital Logo" width="80" />
  <h1>Atharv Digital Photo Studio</h1>
  <p>
    <strong>Premium Photography & Digital Imaging — Bhogewadi, Maharashtra</strong>
  </p>
  <p>
    <a href="#features">Features</a> ·
    <a href="#tech-stack">Tech Stack</a> ·
    <a href="#project-structure">Structure</a> ·
    <a href="#getting-started">Getting Started</a> ·
    <a href="#api">API</a> ·
    <a href="#deployment">Deployment</a>
  </p>
  <br />
</div>

A full-stack digital presence for **Atharv Digital Photo Studio**, a professional photography studio in Bhogewadi, Maharashtra-413223. Combines an interactive marketing website with a cross-platform mobile application to showcase services, manage portfolios, process customer inquiries, and handle bookings.

---

## ✨ Features

### Website (`apps/web`)
- **3D Interactive Hero** — Real-time 3D scene built with React Three Fiber featuring floating camera shapes, torus geometry, icosahedrons, and particle fields
- **Parallax Scrolling** — Scroll-driven animations with `motion/react` across all sections
- **Service Showcase** — Dynamic service cards with 3D hover effects, loaded from the database
- **Portfolio Gallery** — Category-filterable gallery with hover previews and status badges
- **Contact & Inquiry System** — Validated form with API submission, SQLite persistence, and email notification via Nodemailer
- **WhatsApp Integration** — Fixed floating button for instant customer chat
- **Custom Cursor Trail** — Spring-physics cursor follower
- **Authentication** — Email/password signup and sign-in with Better Auth
- **Responsive Design** — Mobile-first with hamburger navigation
- **Animated Micro-interactions** — Loading skeletons, scroll-triggered reveals, hover effects

### Mobile App (`apps/mobile`)
- Cross-platform (iOS, Android, Web) with Expo SDK 54
- File-based routing with Expo Router
- Auth system with persisted sessions via SecureStore
- In-app purchases and subscriptions via RevenueCat
- Camera, audio recording, video playback
- Maps, location services, file picker
- Push notifications
- Crash reporting with Sentry
- Google Mobile Ads

---

## 🛠 Tech Stack

### Website

| Category | Libraries |
|----------|-----------|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router) |
| **3D Graphics** | [React Three Fiber](https://r3f.docs.pmnd.rs/), [Drei](https://github.com/pmndrs/drei), [Three.js](https://threejs.org/) |
| **Animation** | [Motion](https://motion.dev/) (formerly Framer Motion) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/), `class-variance-authority`, `tailwind-merge` |
| **UI Components** | [Radix UI](https://www.radix-ui.com/), [Base UI](https://base-ui.com/), [Vaul](https://vaul.emilkowal.ski/) |
| **Auth** | [Better Auth](https://www.better-auth.com/) |
| **Database** | SQLite (dev) / Neon PostgreSQL (prod) via [Kysely](https://kysely.dev/) |
| **Email** | [Nodemailer](https://nodemailer.com/) (Gmail SMTP) |
| **State** | [TanStack React Query](https://tanstack.com/query) |
| **Charts** | [Recharts](https://recharts.org/) |
| **Icons** | [Lucide React](https://lucide.dev/), Font Awesome Pro |
| **Linting** | Oxlint, Oxfmt, ESLint, TypeScript |

### Mobile

| Category | Libraries |
|----------|-----------|
| **Framework** | [Expo SDK 54](https://docs.expo.dev/) |
| **Navigation** | [Expo Router](https://docs.expo.dev/router/introduction/), React Navigation (bottom tabs, native stack) |
| **Animations** | [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/), [Moti](https://moti.fyi/), [react-native-gesture-handler](https://docs.swmansion.com/react-native-gesture-handler/) |
| **UI** | [Gorhom Bottom Sheet](https://gorhom.github.io/bottom-sheet/), `react-native-calendars`, `react-native-reanimated-carousel` |
| **Payments** | [RevenueCat](https://www.revenuecat.com/) (react-native-purchases) |
| **Ads** | [Google Mobile Ads](https://github.com/invertase/react-native-google-mobile-ads) |
| **Maps** | react-native-maps, `@teovilla/react-native-web-maps` |
| **Media** | expo-camera, expo-video, expo-audio, expo-image, expo-gl, Three.js |
| **Notifications** | expo-notifications |
| **Monitoring** | [Sentry](https://sentry.io/) (react-native) |
| **State** | [Zustand](https://github.com/pmndrs/zustand), TanStack React Query |
| **Storage** | AsyncStorage, SecureStore, expo-file-system |

---

## 📁 Project Structure

```
atharv-digital/
├── apps/
│   ├── web/                          # Next.js marketing website
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── page.tsx          # Landing page (Hero, Services, About, Contact)
│   │   │   │   ├── layout.tsx        # Root layout with providers
│   │   │   │   ├── global.css        # Tailwind entry
│   │   │   │   ├── not-found.tsx     # Custom 404
│   │   │   │   ├── providers.tsx     # React Query + Toaster
│   │   │   │   ├── api/
│   │   │   │   │   ├── services/     # GET /api/services
│   │   │   │   │   ├── portfolio/    # GET /api/portfolio
│   │   │   │   │   ├── inquiries/    # POST /api/inquiries
│   │   │   │   │   ├── auth/         # Better Auth endpoints
│   │   │   │   │   ├── session/      # Session management
│   │   │   │   │   ├── studio/       # DB utilities
│   │   │   │   │   └── test-email/   # Email test endpoint
│   │   │   │   └── account/
│   │   │   │       ├── signin/       # Sign-in page
│   │   │   │       ├── signup/       # Sign-up page
│   │   │   │       └── logout/       # Logout handler
│   │   │   ├── components/
│   │   │   │   ├── studio/
│   │   │   │   │   ├── Header.tsx        # Fixed nav with scroll-aware styling
│   │   │   │   │   ├── Hero.tsx          # Parallax hero with live stats
│   │   │   │   │   ├── Scene3D.tsx       # 3D canvas with floating geometry
│   │   │   │   │   ├── Services.tsx      # Dynamic service cards
│   │   │   │   │   ├── Portfolio.tsx     # Filterable portfolio gallery
│   │   │   │   │   ├── About.tsx         # Studio info + tech specs
│   │   │   │   │   ├── Contact.tsx       # Inquiry form + contact info
│   │   │   │   │   ├── ParallaxSection.tsx
│   │   │   │   │   ├── CursorTrail.tsx   # Custom cursor follower
│   │   │   │   │   └── WhatsAppButton.tsx# Floating WhatsApp widget
│   │   │   │   └── ui/               # 43 reusable primitives (button, input, dialog, etc.)
│   │   │   ├── hooks/
│   │   │   ├── lib/                  # Auth client, email, utilities
│   │   │   └── utils/
│   │   ├── data/
│   │   │   ├── schema.sql            # Database schema
│   │   │   └── studio.db             # SQLite (dev)
│   │   └── public/
│   │
│   ├── mobile/                       # Expo / React Native app
│   │   ├── src/
│   │   │   ├── app/                  # Expo Router pages
│   │   │   ├── components/
│   │   │   ├── utils/                # Auth, IAP, upload utils
│   │   │   └── __create/             # Platform scaffold
│   │   ├── assets/
│   │   ├── App.tsx / App.web.tsx
│   │   └── app.json / eas.json
│   │
│   └── ...
├── publisher/                        # AWS S3 / OpenNext deployment
├── package.json                      # Yarn workspaces root
├── .yarnrc.yml
├── .gitignore
├── .eslintignore
├── .oxlintrc.json
└── .oxfmtrc.json
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 20+
- [Yarn](https://yarnpkg.com/) 4.12.0 (`corepack enable && corepack prepare yarn@4.12.0 --activate`)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd atharv-digital

# Install all workspace dependencies
yarn install
```

### Environment Variables

**`apps/web/.env`**

| Variable | Description | Required |
|----------|-------------|----------|
| `ANYTHING_PROJECT_TOKEN` | Anything platform token | Yes |
| `DATABASE_URL` | PostgreSQL connection (omit for SQLite) | For prod |
| `SMTP_HOST` | SMTP server (default: `smtp.gmail.com`) | For email |
| `SMTP_PORT` | SMTP port (default: `587`) | For email |
| `SMTP_USER` | SMTP/Gmail username | For email |
| `SMTP_PASS` | SMTP/Gmail app password | For email |
| `INQUIRY_EMAIL_TO` | Recipient for inquiry notifications | For email |

**`apps/mobile/.env`**

| Variable | Description | Required |
|----------|-------------|----------|
| `EXPO_PUBLIC_BASE_URL` | API base URL | Yes |
| `EXPO_PUBLIC_APP_URL` | App URL | Yes |
| `EXPO_PUBLIC_GOOGLE_MAPS_API_KEY` | Google Maps key | For maps |
| `EXPO_PUBLIC_UPLOADCARE_PUBLIC_KEY` | UploadCare key | For uploads |

### Development

```bash
# Start the website (port 4000)
yarn workspace web dev

# Start the mobile app
yarn workspace mobile expo start

# Type-check the website
yarn workspace web typecheck
```

---

## 🗄 Database

In development, the website uses SQLite (`apps/web/data/studio.db`). In production, set `DATABASE_URL` to a Neon PostgreSQL connection.

### Schema (`apps/web/data/schema.sql`)

```sql
services    — id, title, description, icon_name, features (JSON), created_at
portfolio   — id, title, category, image_url, status, created_at
inquiries   — id, name, phone, service_required, message, created_at
```

The web app seeds default services on first load and falls back to hardcoded data if the database is unavailable.

---

## 🌐 API

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/api/services` | Fetch all photography services |
| `GET` | `/api/portfolio` | Fetch portfolio items |
| `POST` | `/api/inquiries` | Submit a customer inquiry |
| `GET` | `/api/session` | Get current session |
| `POST` | `/api/auth/*` | Better Auth endpoints (sign-in, sign-up, etc.) |

---

## 📦 Deployment

The `publisher/` directory contains an [OpenNext](https://opennext.js.org/) AWS adapter for serverless deployment:

```bash
cd publisher
yarn install
node run-next-build.mjs
```

---

## 📄 License

This project is proprietary software owned by **Atharv Digital Photo Studio**.

---

<div align="center">
  <sub>Built with Next.js, Expo, React Three Fiber & Motion</sub>
  <br />
  <sub>Bhogewadi, Maharashtra — 413223</sub>
</div>
