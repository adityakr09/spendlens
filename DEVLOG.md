DEVLOG

Day 1 — 2026-05-06
Hours worked: 0
What I did: Read the assignment brief twice. Researched all 8 required AI tools' current pricing pages — Cursor, Copilot, Claude, ChatGPT, Gemini, Windsurf, Anthropic API, OpenAI API. Created the repo, set up Vite + React scaffold. Wrote out the audit engine logic on paper before touching code — wanted the reasoning to be defensible before writing a line.
What I learned: Claude Team has a 5-seat minimum buried in their FAQ. Cursor Business adds SSO which only matters at 5+ seats. These became the basis of the seat-threshold rules in the audit engine.
Blockers / what I'm stuck on: Deciding between Next.js and Vite. Leaning Vite because no SSR needed — the audit math is client-side and the shareable URL can be fetched from Django.
Plan for tomorrow: Build the audit engine JS module and write tests for the core rules.

Day 2 — 2026-05-07
Hours worked: 0
What I did: Built auditEngine.js with all tool-specific rule functions. Wrote 18 tests covering the same logic — all 18 passing. Decided on Vite over Next.js and documented the trade-off in ARCHITECTURE.md. Started the form component with localStorage persistence.
What I learned: The negative savings edge case — if a user reports $0 monthly spend but is on a paid plan, the engine was returning negative savings numbers. Fixed with Math.max(0, saving) clamping throughout.
Blockers / what I'm stuck on: Form state shape is getting complex with nested tool objects. Considered Zustand but decided it's overkill for this scope.
Plan for tomorrow: Complete the form UI, wire up submit → audit engine → results page.

Day 3 — 2026-05-08
Hours worked: 6
What I did: Completed the AuditForm component with all 8 tools, plan dropdowns, seat/spend inputs, and localStorage persistence across reloads. Built the ResultsPage with savings hero, per-tool breakdown cards, and Credex CTA logic (>$500/mo threshold). Started Django backend — models, serializers, views for /api/audits/ and /api/leads/.
What I learned: Honeypot fields need to be visually hidden with CSS display:none (not just visibility:hidden) and should have tabindex="-1" so screen readers also skip them.
Blockers / what I'm stuck on: Django CORS headers were blocking the Vite dev proxy. Fixed with django-cors-headers and CORS_ALLOW_ALL_ORIGINS = DEBUG.
Plan for tomorrow: Wire frontend → backend, implement shareable URLs, conduct user interviews.

Day 4 — 2026-05-09
Hours worked: 5
What I did: Connected frontend to Django API — audit save on form submit, public fetch for share URLs. Implemented /audit/:shareId routing in the React SPA with window.history.pushState. Conducted three user interviews — Gautam Reddy, Rishikesh Kumar, Suresh Reddy. Updated USER_INTERVIEWS.md with real quotes. The interviews changed my thinking on lead capture placement — moved it after results, not before.
What I learned: All three users said they would leave the page if asked for email before seeing results. Unanimous. "Show value first" became a hard constraint. Suresh's Google One trial auto-conversion was a surprising insight — accidental spend is as real a problem as conscious overspend.
Blockers / what I'm stuck on: Open Graph tags for dynamic share URLs require server-side rendering to populate correctly. Since this is a SPA, OG tags in index.html are static. Documented as a known limitation.
Plan for tomorrow: Landing page, CSS polish, deploy backend to Render.

Day 5 — 2026-05-10
Hours worked: 4
What I did: Built the landing page with hero, how-it-works, tool chips, social proof stats, and CTA. Polished all CSS — mobile responsive, accessible focus states, colour contrast passing WCAG AA. Deployed Django backend to Render. Redesigned README with gradient banner, badges, screenshot grid, and architecture diagram.
What I learned: CSS clamp() for responsive font sizes is cleaner than media query breakpoints for headlines. Used clamp(32px, 5vw, 52px) for the hero h1. Render free tier has a cold start delay after 15 minutes of inactivity — added a frontend loading state to handle it.
Blockers / what I'm stuck on: Lighthouse accessibility score was 87 initially — missing aria-label on icon buttons and insufficient colour contrast on muted text. Fixed both.
Plan for tomorrow: Write remaining markdown files, set up CI, final deploy check.

Day 6 — 2026-05-11
Hours worked: 3
What I did: Wrote GTM.md, ECONOMICS.md, METRICS.md, LANDING_COPY.md, PROMPTS.md, TESTS.md, REFLECTION.md. Set up GitHub Actions CI — lint + Python tests on every push to main. Ran Lighthouse on the deployed URL: Performance 91, Accessibility 93, Best Practices 92.
What I learned: Writing GTM.md forced specificity that exposed gaps in my thinking. "Post on indie hackers" is not a plan. "Post a breakdown of audit findings on r/startups on Tuesday morning with a link to the tool" is a plan.
Blockers / what I'm stuck on: CI lint step occasionally warns on unused variables in JSX. Not blocking but noted.
Plan for tomorrow: Final review, README screenshots, submission.

Day 7 — 2026-05-12
Hours worked: 2
What I did: Final review pass of all files. Verified all 12 markdown files present at repo root. Ran tests one more time — 18/18 OK. Checked git log — commits across multiple calendar days. Verified deployed URL in incognito. Prepared Google Form submission for May 13.
What I learned: The DEVLOG discipline of writing daily entries helped catch the negative savings clamping issue from Day 2 when reviewing notes for REFLECTION.md.
Blockers / what I'm stuck on: None at submission. Known limitations documented in ARCHITECTURE.md — OG tags for dynamic URLs, Render cold starts.
Plan for tomorrow: Submit on May 13.