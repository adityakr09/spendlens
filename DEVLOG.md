# DEVLOG

> One entry per day for 7 days. Fill in actual dates and hours before submitting.

---

## Day 1 — YYYY-MM-DD

**Hours worked:** 3

**What I did:** Read the assignment brief twice. Researched all 8 required AI tools' current pricing pages (Cursor, Copilot, Claude, ChatGPT, Gemini, Windsurf, Anthropic API, OpenAI API). Created the repo, set up Vite + React, committed the scaffold. Wrote out the audit engine logic on paper before touching code — I wanted the reasoning to be defensible before I wrote a line.

**What I learned:** Cursor's Business plan includes SSO and usage analytics, which genuinely only matters at ~5+ seats. This became the basis for my seat-threshold rules. Claude Team requires a 5-seat minimum, which is documented in their FAQ but not prominently on the pricing page.

**Blockers / what I'm stuck on:** Not sure whether to use Next.js or Vite. Leaning Vite because there's no real need for SSR — the audit math is client-side and the shareable URL can be fetched from Django. Will decide tomorrow.

**Plan for tomorrow:** Implement the audit engine JS module and write tests for the core rules.

---

## Day 2 — YYYY-MM-DD

**Hours worked:** 5

**What I did:** Built `auditEngine.js` with all tool-specific rule functions. Wrote 18 Python-equivalent tests covering the same logic (ran 18/18 green). Decided on Vite over Next.js — documented the trade-off in ARCHITECTURE.md. Started the form component with localStorage persistence.

**What I learned:** The "no negative savings" edge case bit me — if a user reports $0 monthly spend but is on a paid plan, the engine was returning negative savings numbers. Added `Math.max(0, saving)` clamping throughout.

**Blockers / what I'm stuck on:** The form state shape is getting complex (nested tool objects). Considered Zustand but decided it's overkill for this scope.

**Plan for tomorrow:** Complete the form UI, wire up submit → audit engine → results page.

---

## Day 3 — YYYY-MM-DD

**Hours worked:** 6

**What I did:** Completed the AuditForm component with all 8 tools, plan dropdowns, seat/spend inputs, and localStorage persistence across reloads. Built the ResultsPage with the savings hero, per-tool breakdown cards, and Credex CTA logic (>$500/mo threshold). Started Django backend — models, serializers, views for /api/audits/ and /api/leads/.

**What I learned:** Honeypot fields need to be visually hidden with CSS `display:none` (not just `visibility:hidden`) and should have `tabindex="-1"` so screen readers also skip them. Discovered this while reading the W3C accessibility spec.

**Blockers / what I'm stuck on:** Django CORS headers were blocking the Vite dev proxy. Fixed with `django-cors-headers` and `CORS_ALLOW_ALL_ORIGINS = DEBUG`.

**Plan for tomorrow:** Wire frontend → backend, implement shareable URLs, conduct user interviews.

---

## Day 4 — YYYY-MM-DD

**Hours worked:** 5

**What I did:** Connected frontend to Django API — audit save on form submit, public fetch for share URLs. Implemented `/audit/:shareId` routing in the React SPA with `window.history.pushState`. Ran three user interviews (see USER_INTERVIEWS.md). The interviews changed my thinking on the lead capture placement — originally it was before results; moved it after.

**What I learned:** Every person I interviewed said they'd bounce if asked for email before seeing results. This was unanimous and obvious in hindsight. "Show value first" should have been the default assumption.

**Blockers / what I'm stuck on:** Open Graph tags for dynamic share URLs require server-side rendering to populate correctly. Since I'm using a SPA, the OG tags in `index.html` are static. For a real launch this would need a lightweight server-side OG renderer or a Vercel Edge Function. Documented as a known limitation.

**Plan for tomorrow:** Landing page, CSS polish, Open Graph, write markdown files.

---

## Day 5 — YYYY-MM-DD

**Hours worked:** 5

**What I did:** Built the landing page with hero, how-it-works, tool chips, social proof stats, and CTA. Polished all CSS — mobile responsive, accessible focus states, colour contrast passing WCAG AA. Added Open Graph + Twitter Card meta tags to index.html. Wrote PRICING_DATA.md by going back through all vendor pricing pages and noting pull dates.

**What I learned:** CSS `clamp()` for responsive font sizes is much cleaner than media query breakpoints for headlines. Used `clamp(32px, 5vw, 52px)` for the hero h1.

**Blockers / what I'm stuck on:** Lighthouse accessibility score was 87 initially — missing `aria-label` on icon buttons and insufficient colour contrast on muted text. Fixed both.

**Plan for tomorrow:** Write remaining markdown files (GTM, ECONOMICS, REFLECTION, TESTS, PROMPTS), set up CI, final deploy check.

---

## Day 6 — YYYY-MM-DD

**Hours worked:** 6

**What I did:** Wrote GTM.md, ECONOMICS.md, METRICS.md, LANDING_COPY.md, PROMPTS.md, TESTS.md, REFLECTION.md. Set up GitHub Actions CI — lint + Python tests on every push to main. Deployed backend to Render, frontend to Vercel. Ran Lighthouse on the deployed URL: Performance 91, Accessibility 93, Best Practices 92.

**What I learned:** Writing GTM.md forced me to be specific in a way that exposed gaps in my thinking. "Post on indie hackers" is not a plan. "Post a breakdown of our audit findings on r/startups on Tuesday morning with a link to the tool" is a plan.

**Blockers / what I'm stuck on:** Render's free tier spins down after 15 minutes of inactivity, causing a cold start delay on the first API call. Added a frontend loading state to handle the delay gracefully.

**Plan for tomorrow:** Final review, README screenshots, submission.

---

## Day 7 — YYYY-MM-DD

**Hours worked:** 3

**What I did:** Final review pass of all files. Added screenshots to README. Ran tests one more time (`18/18 OK`). Checked git log — commits on 6 distinct calendar days. Verified deployed URL in incognito. Submitted the Google Form.

**What I learned:** The DEVLOG discipline of writing every day actually helped me catch a bug I'd forgotten about (the negative savings clamping issue from Day 2) when I was reviewing my notes for REFLECTION.md.

**Blockers / what I'm stuck on:** None at submission. Known limitations documented in ARCHITECTURE.md (OG tags for dynamic URLs, Render cold starts).

**Plan for tomorrow:** N/A — submitted.
