# 💸 SpendLens — Free AI Tool Spend Audit

SpendLens is a free web app for startup founders and engineering managers to audit their AI tool subscriptions — finding plan mismatches, cheaper alternatives, and wasted seats across Cursor, Claude, ChatGPT, GitHub Copilot, Gemini, and more. Built as a lead-generation asset for [Credex](https://credex.rocks).

**Live demo:** https://spendlens.vercel.app

---


## Screenshots

| Landing Page | Audit Form |
|---|---|
| ![Landing](landing.png) | ![Audit Form](audit.png) |

| Results Page | How It Works |
|---|---|
| ![Results](results.png) | ![How It Works](how.png) |

**Live Demo:** https://spendlens-mocha.vercel.app
---

## Quick start

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

The Vite dev server proxies `/api/*` to Django automatically.

### Run tests

```bash
cd backend
python api/tests.py
```

### Deploy

- **Frontend:** Push to GitHub → Vercel auto-deploys. Set `VITE_API_URL` env var pointing to your backend.
- **Backend:** Deploy to Render (free tier). Set `SECRET_KEY`, `DEBUG=False`, `ALLOWED_HOSTS`, `CORS_ALLOWED_ORIGINS`.

---

## Decisions

1. **React + Vite over Next.js** — No SSR needed for this SPA. Vite is faster to build and deploy, and avoids Next.js complexity for a 7-day build.

2. **Audit engine in pure JS (no AI for math)** — Hardcoded rules are auditable, fast, and defensible to a finance person. AI is used only for the summary paragraph where natural language adds value.

3. **Templated AI summary fallback** — Anthropic API calls will occasionally fail or be unavailable. The fallback produces a coherent, data-driven paragraph that degrades gracefully without breaking the user experience.

4. **SQLite for development, Postgres-ready for production** — Django's ORM abstracts the DB layer; switching to Postgres on Render requires a single settings change and `DATABASE_URL` env var. Zero code changes.

5. **Honeypot abuse protection over hCaptcha** — hCaptcha adds friction for real users and requires a third-party JS load. A hidden `website` field catches the overwhelming majority of form bots with zero UX impact. Rate limiting (30 req/hr per IP) handles the rest.
