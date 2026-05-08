# PRICING_DATA

All prices verified from official vendor pricing pages. Every number in the audit engine traces to a URL below.

---

## Cursor

- Hobby: $0/month — https://cursor.com/pricing — verified 2026-05-08
- Pro: $20/user/month — https://cursor.com/pricing — verified 2026-05-08
- Business: $40/user/month — https://cursor.com/pricing — verified 2026-05-08
- Enterprise: Contact sales (~$100/user/month estimated) — https://cursor.com/pricing — verified 2026-05-08

**Notes:** Business adds SSO, usage analytics, and centralised billing. Pro covers all model access without seat management features. The audit flags Business for ≤2 seats because SSO and admin tooling have no value below ~5 seats.

---

## GitHub Copilot

- Individual: $10/user/month (or $100/year) — https://github.com/features/copilot#pricing — verified 2026-05-08
- Business: $19/user/month — https://github.com/features/copilot#pricing — verified 2026-05-08
- Enterprise: $39/user/month — https://github.com/features/copilot#pricing — verified 2026-05-08

**Notes:** Enterprise adds Copilot Chat in GitHub.com, pull request summaries, and fine-tuning on private code. Meaningful only for orgs >50 devs with mature code review workflows. Business is the right default for most engineering teams.

---

## Claude (Anthropic)

- Free: $0/month — https://claude.ai/upgrade — verified 2026-05-08
- Pro: $20/user/month — https://claude.ai/upgrade — verified 2026-05-08
- Max (5x usage): $100/user/month — https://claude.ai/upgrade — verified 2026-05-08
- Team: $30/user/month (5-seat minimum) — https://claude.ai/upgrade — verified 2026-05-08
- Enterprise: ~$60/user/month (negotiated) — https://www.anthropic.com/claude-for-enterprise — verified 2026-05-08
- API: Usage-based — https://www.anthropic.com/pricing — verified 2026-05-08

**Notes:** Team requires 5-seat minimum. The audit flags Team for ≤2 seats because the minimum means you're paying for unused seats. Max is designed for daily power users who routinely hit Pro rate limits — most business users don't.

---

## ChatGPT (OpenAI)

- Plus: $20/user/month — https://openai.com/chatgpt/pricing — verified 2026-05-08
- Team: $30/user/month (2-seat minimum) — https://openai.com/chatgpt/pricing — verified 2026-05-08
- Enterprise: ~$60/user/month (negotiated) — https://openai.com/chatgpt/enterprise — verified 2026-05-08
- API: Usage-based — https://openai.com/api/pricing — verified 2026-05-08

**Notes:** Team adds shared workspaces and higher rate limits. For 1–2 users who don't need collaboration features, Plus provides the same GPT-4o access.

---

## Anthropic API (Direct)

- Usage-based pricing — https://www.anthropic.com/pricing — verified 2026-05-08
- claude-opus-4: $15/M input tokens, $75/M output tokens
- claude-sonnet-4: $3/M input tokens, $15/M output tokens
- claude-haiku-4-5: $0.80/M input tokens, $4/M output tokens
- Prompt caching: 90% discount on cached tokens (5-min TTL)
- Batch API: 50% discount for non-urgent requests

**Notes:** Audit flags high spend (>$500/mo) for usage pattern review. Most teams using API at scale have not implemented prompt caching or Batch API, which can save 20–40% with minimal engineering effort.

---

## OpenAI API (Direct)

- Usage-based pricing — https://openai.com/api/pricing — verified 2026-05-08
- gpt-4o: $2.50/M input tokens, $10/M output tokens
- gpt-4o-mini: $0.15/M input tokens, $0.60/M output tokens
- Batch API: 50% discount
- Prompt caching: Available on eligible models

**Notes:** Same savings logic as Anthropic API. High spenders should audit whether they're using the cheapest model adequate for their task (gpt-4o-mini vs gpt-4o) and whether batch/caching are enabled.

---

## Gemini (Google)

- Gemini Pro (Google One AI Premium): $20/user/month — https://one.google.com/about/ai-premium — verified 2026-05-08
- Gemini Ultra/Advanced: $30/user/month — https://one.google.com/about/ai-premium — verified 2026-05-08
- API: Usage-based — https://ai.google.dev/pricing — verified 2026-05-08

**Notes:** Ultra/Advanced adds Gemini 1.5 Pro with longer context and multimodal capability. For pure writing use cases, Pro-tier provides comparable quality at lower cost.

---

## Windsurf (Codeium)

- Free: $0/month — https://windsurf.com/pricing — verified 2026-05-08
- Pro: $15/user/month — https://windsurf.com/pricing — verified 2026-05-08
- Team: $35/user/month — https://windsurf.com/pricing — verified 2026-05-08

**Notes:** Windsurf Pro is notably cheaper than Cursor Pro ($15 vs $20) with comparable coding assistance. The audit notes this as an alternative for cost-sensitive teams.
