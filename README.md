# DevLog Frontend — Developer Daily Standup Tracker
> A SaaS frontend that replaces daily standup meetings with a simple 3-question daily log. Developers stay accountable, team leads get visibility — no meetings needed.
---
## 📌 Table of Contents
- [Overview](#overview)
- [Core Features](#core-features)
- [Pricing](#pricing)
- [Roles](#roles)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Routing](#routing)
- [Backend API Integration](#backend-api-integration)
- [Email System](#email-system)
- [Project Structure](#project-structure)
---
## 📖 Overview
This is the Next.js App Router frontend for DevLog. It handles:
- Daily standup submission and history for solo users
- Team workspace dashboard and activity feed
- Blocker tracking and workspace admin resolution flow
- Plan upgrade flow with Stripe checkout and payment result pages
- Super admin dashboards for users/workspaces/platform stats
- Auth flows (register, login, verify email, notice flow)
**Backend API** → `https://devlog-backend-a8sc.onrender.com/api/v1`  
**Frontend Stack** → Next.js + React Query + Tailwind CSS
---
## ✨ Core Features
### 👤 Solo
- Daily standup logging *(What did I do? What will I do? Any blockers?)*
- Streak tracking + longest streak personal best
- GitHub-style activity calendar
- Log history — 30 days (Free) / Unlimited (Pro)
### 👥 Team
- Create workspaces and invite members via email
- Team feed — see everyone's standup in one place
- Blocker alerts — admin gets instant email when someone is blocked
- Blocker resolution — member notified when admin unblocks them
- Automatic weekly email report every Sunday
---
## 💳 Pricing
| Feature | Free | Pro |
|---|---|---|
| Price | $0 | $20 one-time |
| Solo standup logging | ✅ | ✅ |
| Streak tracking | ✅ | ✅ |
| Join workspaces | ✅ | ✅ |
| Log history | 30 days | Unlimited |
| Create workspaces | ❌ | ✅ |
| Invite members | ❌ | ✅ |
| Blocker alerts | ❌ | ✅ |
| Weekly reports | ❌ | ✅ |
---
## 🔐 Roles
| Role | Scope | Access |
|---|---|---|
| Super Admin | Platform | Manages all users, workspaces, platform stats |
| Workspace Admin | Team | Creates workspace, invites members, resolves blockers |
| Member | Personal | Logs daily standups, joins workspaces |
---
## 🛠️ Tech Stack
| Technology | Purpose |
|---|---|
| Next.js (App Router) | Framework and routing |
| React 19 | UI runtime |
| TypeScript | Type safety |
| Tailwind CSS 4 | Styling |
| React Query | Server state, caching, hydration |
| TanStack React Form + Zod | Forms and validation |
| Axios + fetch wrappers | API communication |
| Better Auth client/session cookies | Authentication flow |
| Recharts | Analytics and dashboard charts |
| Sonner | Toast notifications |
---
## 🚀 Getting Started
### Prerequisites
- Node.js 18+
- pnpm
- Running DevLog backend API
- Valid `.env` configuration
### Installation
```bash
# Clone repository
git clone https://github.com/Musfique55/devlog-frontend.git
cd devlog-frontend
# Install dependencies
Pnpm install
# Create environment file (.env) in project root
# and add required keys listed in this README
# Start development server
pnpm run dev
```
### Scripts
```bash
pnpm dev       # Start development server (Next.js)
pnpm build     # Build production bundle
pnpm start     # Start production server
pnpm lint      # Run ESLint
```
---
## 🔑 Environment Variables
Defined and validated in `src/env.ts`:
```env
API_URL=http://localhost:5000/api/v1
AUTH_URL=http://localhost:5000/api/v1/auth
BACKEND_URL=http://localhost:5000
FRONTEND_URL=http://localhost:3000
BETTER_AUTH_SECRET=your_secret
JWT_SECRET_KEY=your_jwt_secret
STRIPE_SECRET_KEY=sk_test_xxx
```
---
## 🗺️ Routing
### App Router Notes
- Route groups such as `(auth)`, `(commonLayout)`, and `(PrivateLayout)` are organizational and are not part of public URL paths.
- Dynamic segments use bracket syntax, e.g. `workspace/[id]` maps to `/workspace/:id`.
### Pages
| Route | Description |
|---|---|
| `/` | Landing page |
| `/pricing` | Pricing page |
| `/auth/login` | Login |
| `/auth/register` | Register |
| `/auth/verify-email` | Email verification |
| `/auth/verify-email-notice` | Verification notice after signup |
| `/dashboard` | User dashboard |
| `/dashboard/my-logs` | My standup logs |
| `/dashboard/team` | Team and workspace list |
| `/settings` | Profile and plan management |
| `/workspace/[id]` | Workspace redirect/entry |
| `/workspace/[id]/activity` | Workspace team feed activity |
| `/workspace/[id]/admin-dashboard` | Workspace admin dashboard |
| `/payment/success` | Payment success page |
| `/payment/failed` | Payment failed/canceled page |
| `/admin/dashboard` | Super admin dashboard |
| `/admin/workspaces` | Super admin workspace management |
| `/admin/users` | Super admin user management |
### Route Error Boundaries
| File | Scope |
|---|---|
| `src/app/(commonLayout)/error.tsx` | Public/common routes |
| `src/app/(auth)/error.tsx` | Auth routes |
| `src/app/(PrivateLayout)/error.tsx` | Protected/private routes |
---
## 🔌 Backend API Integration
### API Base
Frontend service calls are built from:
- `API_URL` (for app endpoints, typically `/api/v1`)
- `AUTH_URL` (for auth endpoints, typically `/api/v1/auth`)
### API Route Groups Used by Frontend
| Group | Endpoints used in frontend |
|---|---|
| Auth | `/register`, `/login` *(from `AUTH_URL`)* |
| Dashboard | `/dashboard/me` |
| Logs | `/logs`, `/logs/:id`, `/logs/workspaces/:workspaceId` |
| Workspaces | `/workspaces`, `/workspaces/me`, `/workspaces/me/stats`, `/workspaces/:workspaceId`, `/workspaces/:workspaceId/members`, `/workspaces/:workspaceId/stats`, `/workspaces/:workspaceId/invite`, `/workspaces/:workspaceId/remove-member` |
| Invites | `/invites/accept/:token` |
| Admin | `/admin/dashboard`, `/admin/dashboard/yearly-profit`, `/admin/dashboard/user-growth`, `/admin/users`, `/admin/users/:userId`, `/admin/workspaces` |
| Payments | `/payment/create-checkout-session`, `/payment/:transactionId` |
---
## 📧 Email System
Email rendering/sending is handled by the backend, while frontend triggers user flows that invoke these templates:
| Template | Trigger from frontend flow |
|---|---|
| `verify-email` | After registration |
| `invite` | Workspace invite action |
| `blocker-alert` | Standup with blocker submitted |
| `blocker-resolved` | Admin resolves blocker |
| `weekly-report` | Automated schedule (backend cron) |
| `payment-success` | Stripe success callback flow |
| `subscription-expired` | Plan expiry handling |
---
## 📁 Project Structure
```txt
src/
├── app/
│   ├── (commonLayout)/                # Public routes (landing, pricing)
│   ├── (auth)/                        # Auth routes and actions
│   ├── (PrivateLayout)/               # Protected user/admin/workspace routes
│   └── layout.tsx                     # Root layout
├── components/
│   ├── modules/                       # Feature modules (auth, dashboard, workspace, admin)
│   ├── shared/                        # Shared reusable components
│   └── ui/                            # UI primitives
├── services/                          # API service layer
├── hooks/                             # Custom hooks (auth/workspace)
├── providers/                         # Query provider and app providers
├── lib/                               # Auth, token, fetch, validation
├── zod/                               # Validation schemas
└── env.ts                             # Runtime environment 
```
---
<div align="center">
  <p>
    <a href="https://github.com/Musfique55/devlog-backend">Backend Repo</a> •
    <a href="[https://devlog-frontend-two.vercel.app/](https://devlog-backend-a8sc.onrender.com/)">Live Demo</a>
  </p>
</div>
