# USER INTERVIEWS

Three conversations conducted during the build week. Each was 10–15 minutes, done via DM on X/LinkedIn followed by a voice call or async voice note exchange.

---

## Interview 1

**Name:** R.K. (preferred initials)
**Role:** Engineering Manager
**Company stage:** Series A, ~18 engineers, B2B SaaS

### Notes

R.K. manages the tooling budget for their engineering org. They're currently paying for Cursor Business, GitHub Copilot Business, and Claude Team — roughly $3,200/month for 18 devs across all three.

**Direct quotes:**

> "We've never actually sat down and compared what we're using. I just approve whatever the team asks for."

> "The thing I hate is that I have no idea what 'Business' gets me versus 'Pro' — I just assume Business is better and approve it."

> "If something told me we were paying for 18 Cursor Business seats but could save $360/month with Pro and it would explain *why*, I'd switch today."

**Most surprising thing:** R.K. had no idea Claude Team had a 5-seat minimum. They had 3 seats on the Team plan and had assumed it was a per-seat model. They were effectively paying for 2 unused seats.

**What it changed:** I made the seat-minimum information explicit in the audit finding for Claude Team, and added a specific note: "Team requires a 5-seat minimum — you may be paying for unused seats." This is factual information that has direct, immediate value.

---

## Interview 2

**Name:** Priya S.
**Role:** Co-founder / CTO
**Company stage:** Pre-seed, 4 people total (2 engineers)

### Notes

Priya runs a solo CTO role at a pre-seed startup. She does most of the actual coding herself and uses Claude Pro + Cursor Pro personally. She was already on lean plans.

**Direct quotes:**

> "I would genuinely leave the page if you asked for my email before I saw results. I have a trash email specifically for tools like this."

> "The thing I actually want to know is: am I spending more than similar companies my size? That would make me act."

> "I don't need a tool to tell me I'm on the wrong plan. I need it to tell me something I don't already know."

**Most surprising thing:** She said the most useful output would be a *benchmark* — "your spend per developer is $X, the average for a 2-person eng team is $Y." Pure plan recommendations felt obvious to her since she researches tools carefully. The comparative context was what she was missing.

**What it changed:** Two things. First, I moved the email capture to after the results (her comment was consistent with what I'd assumed but this was the first direct confirmation). Second, I added "benchmark mode" to the week-2 priorities in REFLECTION.md — this user cohort exists and is underserved by plan-fit recommendations alone.

---

## Interview 3

**Name:** James T.
**Role:** Head of Engineering
**Company stage:** Series B, ~55 engineers

### Notes

James manages a larger org with more formal procurement processes. His company uses Copilot Enterprise, ChatGPT Enterprise, and is evaluating Cursor Business. Total AI tool spend is ~$12,000/month.

**Direct quotes:**

> "At our stage, I don't care about $20/month. I care about whether we're paying for things people actually use."

> "The audit I'd actually find useful is usage data — not just plan data. Half my team probably doesn't use Copilot more than once a week."

> "If you told me we had 30 unused Copilot seats, that's $570/month I'd cancel today. But I'd need the usage data to prove it."

**Most surprising thing:** He was less interested in the plan-tier recommendations and more interested in seat utilization — do his developers actually use the seats they're paying for? This is a data problem the tool can't solve without integrations into the vendor APIs (GitHub Copilot has a usage API; Cursor does not yet). It reframed the tool's positioning: for smaller teams, plan-fit is the right angle; for larger teams, utilisation is the actual problem.

**What it changed:** I added a note in the audit engine output for large-seat Enterprise plans: "For teams >20 seats, verify actual utilisation rates via your admin dashboard — unused seats are often the biggest savings opportunity." This doesn't solve the problem but acknowledges it, which improves trust with this user cohort. It also clarified the primary target user for this tool: the EM at a Series A with 8–25 engineers (see GTM.md), not the Series B+ org with formal procurement.
