# REFLECTION

---

## 1. The hardest bug I hit this week

The trickiest bug was the negative savings calculation. On Day 2, I was testing the audit engine with edge case inputs and noticed that if a user entered $0 as their monthly spend for a tool but was on a Business plan with 2 seats, the savings calculation returned `-$40` — because the formula was `monthlySpend - recommendedSpend`, and `0 - 40 = -40`.

My first hypothesis was that I had the formula backwards. I checked — no, the direction was right. My second hypothesis was that the input validation on the form was allowing zero-spend entries through, and the engine shouldn't be running rules on tools with no spend. That felt right: if you're paying $0, there's nothing to save.

But then I reconsidered: a user *might* enter $0 because they don't know their exact spend, or because they're on a free plan that they want to audit anyway. Blocking zero-spend entries would silently drop valid inputs.

The fix I landed on was simpler: clamp all saving values to `Math.max(0, saving)` inside each rule function. The finding still appears ("Downgrade to Pro"), the reason still shows, but the saving displayed is $0 rather than a negative number. A finance person reading the output wouldn't be confused by a negative — they'd see a recommendation with no savings attached and understand it's a plan-fit suggestion rather than a cost-cutting one.

I replicated the fix in the Python tests to make sure the same logic applied, and added a specific test case (`test_zero_spend_no_crash`) to prevent regression.

---

## 2. A decision I reversed mid-week

I originally planned to gate the audit results behind an email capture — show a blurred/teased results page and ask for email to unlock the full report. This felt logical from a lead-generation standpoint: capture the email at peak interest.

I reversed this on Day 4, after all three user interviews said independently and without prompting that they would leave the page rather than enter their email before seeing results. One founder said: "I've been burned too many times by tools that promise a report and then the 'report' is a sales pitch." Another said she had an email address specifically for tools like this because she expected to be spammed.

The logic flip was simple: the email is worth more *after* the user has seen real savings numbers. A lead who has seen "$4,200/year in potential savings" and then chooses to enter their email is a warm lead. A lead captured before value is shown is a cold list entry with high unsubscribe rates.

The change required moving the lead capture form to the bottom of the results page and rewriting the CTA copy to emphasise "get this report in your inbox" rather than "unlock your results."

---

## 3. What I'd build in week 2

The most valuable week-2 feature is **benchmark mode**: "your AI spend per developer is $X — companies your size average $Y."

This requires a dataset, which I'd seed initially from published surveys (Andreessen Horowitz, Retool's State of Internal Tools survey) and from aggregating anonymised data from week-1 audits. Even rough benchmarks make the audit dramatically more shareable — "we're spending 2x the industry average on AI tools" is a tweet. "We could save $4,200/year" is not.

Second priority: a **proper server-side OG renderer** for share URLs. Currently the Open Graph tags are static in `index.html`, which means every share URL shows the same preview. A Vercel Edge Function could intercept `/audit/:id` requests from crawlers and inject dynamic OG tags with the actual savings number: "Found $4,200/year in AI savings — see the full audit." That image-with-number preview is the viral loop.

Third: **embeddable widget** — a `<script>` tag version of the form that indie hackers and SaaS bloggers can drop into their sites. Distribution through content creators is a high-leverage channel that requires almost no paid budget.

---

## 4. How I used AI tools

I used Claude (claude.ai) as my primary assistant throughout the week.

**What I used it for:** Drafting the initial structure of the audit engine rules, writing the CSS (I described the design intent and it generated a starting point I then edited heavily), generating the markdown file templates, and rubber-ducking architectural decisions ("should the audit math run client-side or server-side, and why?").

**What I didn't trust it with:** Pricing data. Every number in PRICING_DATA.md was pulled manually from vendor pricing pages. AI models have stale training data and pricing changes frequently — trusting Claude to know that GitHub Copilot Business is currently $19/seat would be a mistake that would undermine the core value proposition of the tool.

**One specific time it was wrong:** I asked Claude to confirm the Claude Team plan pricing and minimum seat requirement. It said "Team is $25/seat/month with no minimum." The actual pricing at time of submission is $30/seat/month with a 5-seat minimum. I caught this because I verified every number against the official pricing page before writing PRICING_DATA.md. If I'd trusted the model here, the audit engine would have been meaningfully wrong for one of the most prominent tools.

---

## 5. Self-rating

**Discipline: 7/10**
I committed code on 6 of 7 days and kept daily DEVLOG entries. Lost a point because Day 1 and Day 7 were lighter — I could have started the form scaffold on Day 1 instead of just researching.

**Code quality: 7/10**
The audit engine is clean, modular, and well-tested. The React components are readable. I'd give myself a higher score if I'd added TypeScript (I used plain JS to move faster) and if I'd separated the CSS into component-level modules rather than a single file.

**Design sense: 7/10**
The results page looks polished enough to screenshot and share — the savings hero is visually strong, the per-tool cards are scannable, and the Credex CTA is prominent without being obnoxious. The landing page is functional but not remarkable. I'd invest more in illustration and whitespace in week 2.

**Problem-solving: 8/10**
The negative savings bug was caught and fixed correctly. The OG tag limitation was identified, documented, and noted as a known issue rather than ignored. The lead capture reversal was data-driven. I feel good about the quality of decisions made under time pressure.

**Entrepreneurial thinking: 8/10**
The GTM plan is specific (named subreddits, specific post formats, concrete week-1 targets). The economics model shows the math even where inputs are rough. The user interviews changed the product. I think I genuinely understand the user and the distribution opportunity. One point off because I didn't attempt the bonus blog post / Twitter thread.
