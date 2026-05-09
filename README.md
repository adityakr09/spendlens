<div align="center">
<img src="https://raw.githubusercontent.com/adityakr09/spendlens/main/landing.png" alt="SpendLens" width="100%">
# 💸 SpendLens
 
### Find out if you're overpaying for AI tools — in 2 minutes, for free.
 
[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-spendlens--mocha.vercel.app-0f5cf5?style=for-the-badge)](https://spendlens-mocha.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-adityakr09%2Fspendlens-181717?style=for-the-badge&logo=github)](https://github.com/adityakr09/spendlens)
[![Backend](https://img.shields.io/badge/API-Render-46E3B7?style=for-the-badge&logo=render)](https://spendlens-74r5.onrender.com)
[![Tests](https://img.shields.io/badge/Tests-18%20passing-16a34a?style=for-the-badge)](#tests)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)
 
<br/>
> **SpendLens** is a free audit tool for startup founders and engineering managers.
> Input your AI tool stack → get an instant breakdown of overspend, plan mismatches,
> and wasted seats — with real numbers and one-sentence reasons you can act on today.
>
> Built as a lead-generation asset for [Credex](https://credex.rocks) — discounted AI infrastructure credits for startups.
 
<br/>
---
 
</div>
## 🖼️ Screenshots
 
<table>
  <tr>
    <td align="center"><strong>🏠 Landing Page</strong></td>
    <td align="center"><strong>📋 Audit Form</strong></td>
  </tr>
  <tr>
    <td><img src="landing.png" alt="Landing Page" width="100%"/></td>
    <td><img src="audit.png" alt="Audit Form" width="100%"/></td>
  </tr>
  <tr>
    <td align="center"><strong>📊 Results Page</strong></td>
    <td align="center"><strong>⚙️ How It Works</strong></td>
  </tr>
  <tr>
    <td><img src="results.png" alt="Results Page" width="100%"/></td>
    <td><img src="how.png" alt="How It Works" width="100%"/></td>
  </tr>
</table>
<div align="center">
🔗 **[→ Try it live: spendlens-mocha.vercel.app](https://spendlens-mocha.vercel.app)**
 
</div>
---
 
## ✨ Features
 
| Feature | Status |
|---|---|
| 🔍 Audit engine for 8 AI tools | ✅ |
| 💰 Monthly + annual savings calculation | ✅ |
| 🤖 AI-generated personalized summary (with fallback) | ✅ |
| 📧 Lead capture with honeypot abuse protection | ✅ |
| 🔗 Shareable public audit URL (PII stripped) | ✅ |
| 💾 Form state persisted across page reloads | ✅ |
| 📱 Mobile responsive + WCAG AA accessible | ✅ |
| 🚀 Credex CTA for high-savings audits (>$500/mo) | ✅ |
 
---
 
## 🛠️ Tech Stack
 
```
Frontend          Backend           Infrastructure
─────────         ─────────         ──────────────
React 18          Django 4.2        Vercel (frontend)
Vite 5            Django REST       Render (backend)
Plain CSS         SQLite / Postgres GitHub Actions CI
```
 
---
 
## 🚀 Quick Start
 
### Prerequisites
- Node 20+
- Python 3.11+
### Frontend (React + Vite)
 
```bash
cd frontend
npm install
npm run dev
# → http://localhost:5173
```
 
### Backend (Django)
 
```bash
cd backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
# → http://localhost:8000
```
 
> The Vite dev server proxies `/api/*` to Django automatically via `vite.config.js`.
 
### Run Tests
 
```bash
cd backend
python api/tests.py
# → Ran 18 tests in 0.001s — OK
```
 
### Deploy
 
| Layer | Platform | Command |
|---|---|---|
| Frontend | Vercel | Push to `main` → auto-deploys |
| Backend | Render | Connect repo → set env vars below |
 
**Required env vars (backend):**
```env
SECRET_KEY=your-secret-key
DEBUG=False
ALLOWED_HOSTS=*.onrender.com
CORS_ALLOWED_ORIGINS=https://your-vercel-url.vercel.app
```
 
---
 
## 🏗️ Architecture
 
```
User Browser
     │
     ▼
React SPA (Vercel)
     │
     ├── auditEngine.js (client-side, instant)
     │        └── Rules for 8 tools → findings + savings
     │
     └── /api/* (proxied to Django on Render)
              ├── POST /api/audits/   → save audit, get share_id
              ├── GET  /api/audits/:id/public/ → share URL (no PII)
              └── POST /api/leads/    → email capture + honeypot
```
 
See [ARCHITECTURE.md](ARCHITECTURE.md) for full Mermaid diagram and 10k/day scaling notes.
 
---
 
## ⚖️ Decisions
 
**1. React + Vite over Next.js**
No SSR needed — audit math is client-side and instant. Vite is faster to build and deploy, avoids Next.js complexity for a 7-day build.
 
**2. Audit engine in pure JS — no AI for math**
Hardcoded rules are auditable, fast, and defensible to a finance person. AI is used only for the summary paragraph where natural language adds value. Knowing when *not* to use AI is part of the design.
 
**3. Templated AI summary fallback**
Anthropic API calls occasionally fail. The fallback generates a coherent, data-driven paragraph so the user experience never breaks — no spinner of death, no empty card.
 
**4. SQLite for dev, Postgres-ready for prod**
Django's ORM abstracts the DB layer completely. Switching to Postgres on Render requires one env var (`DATABASE_URL`) and zero code changes.
 
**5. Honeypot over hCaptcha**
hCaptcha adds user friction and a third-party JS load that hurts Lighthouse scores. A hidden `website` field catches the majority of bots with zero UX impact. DRF rate limiting (30 req/hr per IP) handles the rest.
 
---
 
## 🧪 Tests
 
18 tests covering the audit engine. All pass.
 
```bash
cd backend && python api/tests.py
# Ran 18 tests in 0.001s
# OK
```
 
See [TESTS.md](TESTS.md) for full test inventory.
 
---
 
## 📁 Required Files
 
| File | Description |
|---|---|
| [README.md](README.md) | This file |
| [ARCHITECTURE.md](ARCHITECTURE.md) | System diagram, data flow, stack rationale |
| [DEVLOG.md](DEVLOG.md) | 7-day build log |
| [REFLECTION.md](REFLECTION.md) | 5 reflection questions |
| [TESTS.md](TESTS.md) | Test inventory |
| [PRICING_DATA.md](PRICING_DATA.md) | All pricing sources with URLs + dates |
| [PROMPTS.md](PROMPTS.md) | LLM prompts used in the tool |
| [GTM.md](GTM.md) | Go-to-market plan |
| [ECONOMICS.md](ECONOMICS.md) | Unit economics + $1M ARR model |
| [USER_INTERVIEWS.md](USER_INTERVIEWS.md) | 3 user interviews |
| [LANDING_COPY.md](LANDING_COPY.md) | Landing page copy |
| [METRICS.md](METRICS.md) | North Star metric + instrumentation plan |
 
---
 
<div align="center">
Built with ❤️ for the [Credex](https://credex.rocks) Web Dev Intern Assignment · May 2026
 
**[🚀 Try SpendLens →](https://spendlens-mocha.vercel.app)**
 
</div>
