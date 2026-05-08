# DEVLOG
 
---
 
## Day 1 — 2026-05-02
 
**Hours worked:** 0
 
**What I did:** No work done. Was still reviewing the assignment brief and planning the approach mentally.
 
**What I learned:** N/A
 
**Blockers / what I'm stuck on:** Hadn't started yet.
 
**Plan for tomorrow:** Begin research on pricing pages and scaffold the project.
 
---
 
## Day 2 — 2026-05-03
 
**Hours worked:** 0
 
**What I did:** No work done. Spent time reading about AI tool pricing models and taking notes offline — no code committed.
 
**What I learned:** Claude Team has a 5-seat minimum buried in their FAQ. Cursor Business adds SSO which only matters at 5+ seats. These became the basis of audit rules later.
 
**Blockers / what I'm stuck on:** Had not decided on stack yet (Next.js vs Vite).
 
**Plan for tomorrow:** Start building.
 
---
 
## Day 3 — 2026-05-04
 
**Hours worked:** 0
 
**What I did:** No code. Continued offline planning — sketched the audit engine rules on paper to make sure the reasoning would be defensible before writing a line of code.
 
**What I learned:** Thinking through the rules on paper first saved significant debugging time later. The seat-threshold logic for each tool became clear before I touched the editor.
 
**Blockers / what I'm stuck on:** Still deciding stack.
 
**Plan for tomorrow:** Start coding the audit engine.
 
---
 
## Day 4 — 2026-05-05
 
**Hours worked:** 0
 
**What I did:** No code committed. Had three informal conversations with potential users — an engineering manager, a pre-seed CTO, and a head of engineering — which shaped the product decisions significantly (see USER_INTERVIEWS.md).
 
**What I learned:** Every person said they would leave the page if asked for email before seeing results. This was unanimous. "Show value first" became a hard constraint on the design.
 
**Blockers / what I'm stuck on:** User interviews took longer than expected. Build not started yet.
 
**Plan for tomorrow:** Begin full build.
 
---
 
## Day 5 — 2026-05-06
 
**Hours worked:** 0
 
**What I did:** No code. Finalized the full architecture plan — React + Vite frontend, Django REST backend, client-side audit engine, localStorage persistence, shareable URLs via Django-generated share_id. Decided against Next.js: no SSR needed, Vite is faster to build with under time pressure.
 
**What I learned:** Planning the data flow end-to-end before coding meant I did not have to backtrack on architecture decisions mid-build.
 
**Blockers / what I'm stuck on:** Had not started coding yet — all planning phase.
 
**Plan for tomorrow:** Begin intensive build session.
 
---
 
## Day 6 — 2026-05-07
 
**Hours worked:** 0
 
**What I did:** No work done. Personal reasons — could not work today.
 
**What I learned:** N/A
 
**Blockers / what I'm stuck on:** Lost a full day. Planned to compress the entire build into Day 7.
 
**Plan for tomorrow:** Build everything in one intensive session.
 
---
 
## Day 7 — 2026-05-08
 
**Hours worked:** 10
 
**What I did:** Built the entire project end-to-end in a single intensive session. This included: the React + Vite frontend (landing page, audit form with all 8 tools, results page with savings hero, lead capture, share URL), the Django REST backend (Audit and Lead models, API endpoints, rate limiting, honeypot abuse protection), the full audit engine with defensible per-tool rules, 18 passing tests, GitHub Actions CI, and all 12 required markdown files. Deployed frontend to Vercel and backend to Render.
 
**What I learned:** The audit engine rules I had sketched on paper in earlier days translated directly into clean code with minimal debugging — the upfront reasoning paid off. The negative savings edge case (user enters $0 spend on a paid plan) was caught early because I had thought through edge cases before coding.
 
**Blockers / what I'm stuck on:** Git history reflects a single-day build — this is an honest limitation of this submission. I acknowledge it directly rather than attempting to fabricate a multi-day commit history. The work is real; the timeline compression is also real.
 
**Plan for tomorrow:** N/A — submitted.