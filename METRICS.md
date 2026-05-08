# METRICS

## North Star metric

**Credex consultation bookings per week**

Why: SpendLens exists to generate qualified leads for Credex. A "consultation booked" is the point at which a user has self-identified as having significant AI spend, seen a specific savings number, and taken an action that signals purchase intent. It's the tightest possible proxy for downstream revenue. DAU or audit completions are vanity metrics at this stage — they don't differentiate between curious browsers and buyers.

---

## 3 input metrics that drive the North Star

**1. Audit completion rate** (audits completed ÷ audits started)

This is the first gate. If users start the form but abandon it, the savings calculation never runs, the lead is never captured, and the consultation CTA is never shown. A low completion rate means the form is too long, confusing, or the value proposition on the form page isn't clear enough. Target: >65%.

**2. High-savings audit rate** (audits showing >$500/mo savings ÷ total audits completed)

Only audits above $500/mo show the Credex consultation CTA. This metric tells us whether we're reaching the right users (teams with meaningful AI spend) or mostly optimising small stacks. If this rate is low, the GTM targeting needs adjustment — we're reaching the wrong audience. Target: >25% of completed audits.

**3. CTA click-through rate** (consultation CTA clicks ÷ high-savings audits shown)

Even users who see the Credex CTA may not click. A low CTR here means the CTA copy, placement, or value proposition of the consultation isn't compelling. This is the closest-to-revenue metric we can instrument without talking to Credex's sales team. Target: >15%.

---

## What we'd instrument first

In priority order:

1. **Audit completion funnel** — track form start, each tool toggle, form submit, results render. Identify the drop-off point.
2. **Share URL clicks** — how many completed audits generate a share link click? This measures the viral coefficient.
3. **Email capture rate** — email submits ÷ results page views. Baseline the lead capture performance.
4. **Consultation CTA clicks** — for high-savings audits only.
5. **Return visits** — users who audit twice (stack changed, or sharing with a colleague). Signals product stickiness.

Tool: Plausible Analytics (privacy-preserving, no cookie banner needed, $9/mo) or self-hosted Umami. Avoid GA4 for a tool that competes on trust.

---

## What number triggers a pivot decision

**If audit completion rate falls below 40% after 200 audit starts:** The form is too long or confusing. Run a 5-question usability test and cut form fields.

**If high-savings audit rate falls below 15%:** The GTM is reaching the wrong audience (too many small individual users, not enough team leads). Shift distribution to engineering manager communities and away from indie hacker channels.

**If consultation CTA CTR falls below 8% for 3 consecutive weeks:** The Credex consultation offer isn't landing. A/B test CTA copy, placement, or offer framing (e.g., "See if Credex credits apply to your stack" vs "Book a free consultation").

**If email capture rate falls below 15%:** Email-gated report isn't compelling. Test alternative value offers (Slack notification, waitlist for benchmark mode).

**The kill metric:** If we run 500 audits and generate fewer than 10 consultation bookings (2% conversion), the tool isn't generating qualified leads at a rate that justifies continued investment. At that point, investigate whether the issue is targeting (wrong users), product (audit isn't compelling enough), or offer (consultation isn't appealing). Don't kill before 500 audits — the sample is too small to conclude anything.
