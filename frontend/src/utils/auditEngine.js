// ─── Pricing data (verified May 2026 — see PRICING_DATA.md) ───────────────────
export const TOOLS = {
  cursor: {
    name: "Cursor",
    plans: {
      hobby:      { label: "Hobby",      price: 0,   seats: 1 },
      pro:        { label: "Pro",        price: 20,  seats: 1 },
      business:   { label: "Business",   price: 40,  seats: 1 },
      enterprise: { label: "Enterprise", price: 100, seats: 1 },
    },
  },
  github_copilot: {
    name: "GitHub Copilot",
    plans: {
      individual:  { label: "Individual",  price: 10,  seats: 1 },
      business:    { label: "Business",    price: 19,  seats: 1 },
      enterprise:  { label: "Enterprise",  price: 39,  seats: 1 },
    },
  },
  claude: {
    name: "Claude",
    plans: {
      free:       { label: "Free",       price: 0,   seats: 1 },
      pro:        { label: "Pro",        price: 20,  seats: 1 },
      max:        { label: "Max",        price: 100, seats: 1 },
      team:       { label: "Team",       price: 30,  seats: 1 },
      enterprise: { label: "Enterprise", price: 60,  seats: 1 },
      api:        { label: "API Direct", price: null, seats: 1 },
    },
  },
  chatgpt: {
    name: "ChatGPT",
    plans: {
      plus:       { label: "Plus",       price: 20,  seats: 1 },
      team:       { label: "Team",       price: 30,  seats: 1 },
      enterprise: { label: "Enterprise", price: 60,  seats: 1 },
      api:        { label: "API Direct", price: null, seats: 1 },
    },
  },
  anthropic_api: {
    name: "Anthropic API",
    plans: {
      direct: { label: "API Direct", price: null, seats: 1 },
    },
  },
  openai_api: {
    name: "OpenAI API",
    plans: {
      direct: { label: "API Direct", price: null, seats: 1 },
    },
  },
  gemini: {
    name: "Gemini",
    plans: {
      pro:   { label: "Pro",   price: 20,  seats: 1 },
      ultra: { label: "Ultra", price: 30,  seats: 1 },
      api:   { label: "API",   price: null, seats: 1 },
    },
  },
  windsurf: {
    name: "Windsurf",
    plans: {
      free:    { label: "Free",    price: 0,  seats: 1 },
      pro:     { label: "Pro",     price: 15, seats: 1 },
      team:    { label: "Team",    price: 35, seats: 1 },
    },
  },
};

// ─── Audit rules ──────────────────────────────────────────────────────────────
// Each rule returns { action, saving, reason } or null if no issue found.

function auditCursor(entry) {
  const { plan, seats, monthlySpend } = entry;
  const findings = [];

  if (plan === "business" && seats <= 2) {
    const cheaper = seats * 20;
    findings.push({
      action: "Downgrade to Pro",
      saving: monthlySpend - cheaper,
      reason: `Business tier ($40/seat) makes sense for teams ≥5 needing admin controls and SSO. With ${seats} seat(s), Pro ($20/seat) covers the same model access at half the price.`,
    });
  }
  if (plan === "enterprise" && seats <= 5) {
    const cheaper = seats * 40;
    findings.push({
      action: "Downgrade to Business",
      saving: monthlySpend - cheaper,
      reason: `Enterprise adds dedicated support and custom contracts — necessary for large orgs, overkill for ${seats} seat(s). Business gives the same IDE features at $40/seat.`,
    });
  }
  return findings;
}

function auditCopilot(entry, useCase) {
  const { plan, seats, monthlySpend } = entry;
  const findings = [];

  if (plan === "enterprise" && seats <= 10) {
    const cheaper = seats * 19;
    findings.push({
      action: "Downgrade to Business",
      saving: monthlySpend - cheaper,
      reason: `Copilot Enterprise ($39/seat) adds Copilot Chat in GitHub.com and fine-tuning — valuable for 50+ dev orgs. For ${seats} seats, Business ($19/seat) provides the same in-editor completions.`,
    });
  }
  if (useCase === "coding" && plan === "individual" && seats >= 3) {
    findings.push({
      action: "Consider Cursor Pro instead",
      saving: monthlySpend - seats * 20,
      reason: `Cursor Pro ($20/seat) has become the leading coding assistant with better context window and multi-file edits. At ${seats} seats the price is identical but productivity gain is measurable.`,
    });
  }
  return findings;
}

function auditClaude(entry, teamSize) {
  const { plan, seats, monthlySpend } = entry;
  const findings = [];

  if (plan === "team" && seats <= 2) {
    const cheaper = seats * 20;
    findings.push({
      action: "Switch to individual Pro plans",
      saving: monthlySpend - cheaper,
      reason: `Claude Team ($30/seat/mo) requires 5-seat minimum and adds workspace admin features. With ${seats} user(s), two individual Pro plans ($20/seat) give the same model access at $20/mo less per seat.`,
    });
  }
  if (plan === "max" && teamSize > 1) {
    findings.push({
      action: "Evaluate actual usage vs Pro",
      saving: Math.max(0, monthlySpend - seats * 20),
      reason: `Claude Max ($100/mo) is designed for power users hitting Pro rate limits daily. If your team isn't maxing out message limits, Pro ($20/mo) is sufficient and saves $80/seat/mo.`,
    });
  }
  return findings;
}

function auditChatGPT(entry, teamSize, useCase) {
  const { plan, seats, monthlySpend } = entry;
  const findings = [];

  if (plan === "team" && seats <= 2 && useCase !== "coding") {
    const cheaper = seats * 20;
    findings.push({
      action: "Downgrade to Plus",
      saving: monthlySpend - cheaper,
      reason: `ChatGPT Team ($30/seat) adds collaborative workspaces and admin controls — useful for 5+ person teams sharing prompts. With ${seats} user(s), Plus ($20/seat) covers GPT-4o access at lower cost.`,
    });
  }
  if (useCase === "coding" && (plan === "plus" || plan === "team")) {
    findings.push({
      action: "Evaluate Cursor or Windsurf instead",
      saving: 0,
      reason: `For coding workflows, IDE-native tools like Cursor ($20/seat) or Windsurf Pro ($15/seat) provide inline completions, multi-file context, and faster iteration than a chat interface. Consider switching primary coding assistant.`,
    });
  }
  return findings;
}

function auditApiSpend(entry, toolName) {
  const { monthlySpend } = entry;
  const findings = [];

  if (monthlySpend > 500) {
    findings.push({
      action: "Audit API usage patterns",
      saving: Math.round(monthlySpend * 0.25),
      reason: `At $${monthlySpend}/mo on ${toolName} API, caching repeated prompts (prompt caching cuts costs ~90% on repeated prefixes) and batching non-urgent requests (Batch API is 50% cheaper) typically saves 20-35%.`,
    });
  }
  if (monthlySpend > 200 && monthlySpend <= 500) {
    findings.push({
      action: "Enable prompt caching",
      saving: Math.round(monthlySpend * 0.15),
      reason: `Prompt caching on repeated system prompts or document prefixes can reduce ${toolName} API spend by 15-30% with a one-line code change.`,
    });
  }
  return findings;
}

function auditGemini(entry, useCase) {
  const { plan, seats, monthlySpend } = entry;
  const findings = [];

  if (plan === "ultra" && useCase === "writing") {
    findings.push({
      action: "Downgrade to Pro",
      saving: monthlySpend - seats * 20,
      reason: `Gemini Ultra ($30/seat) is optimised for complex multimodal and coding tasks. For writing workflows, Gemini Pro ($20/seat) delivers comparable output quality at $10/seat less.`,
    });
  }
  return findings;
}

// ─── Main audit function ──────────────────────────────────────────────────────
export function runAudit(formData) {
  const { tools, teamSize, useCase } = formData;
  const results = [];
  let totalMonthlySaving = 0;

  for (const [toolId, entry] of Object.entries(tools)) {
    if (!entry.enabled) continue;
    const toolMeta = TOOLS[toolId];
    let findings = [];

    switch (toolId) {
      case "cursor":        findings = auditCursor(entry); break;
      case "github_copilot": findings = auditCopilot(entry, useCase); break;
      case "claude":        findings = auditClaude(entry, teamSize); break;
      case "chatgpt":       findings = auditChatGPT(entry, teamSize, useCase); break;
      case "anthropic_api": findings = auditApiSpend(entry, "Anthropic"); break;
      case "openai_api":    findings = auditApiSpend(entry, "OpenAI"); break;
      case "gemini":        findings = auditGemini(entry, useCase); break;
      case "windsurf":      findings = []; break;
    }

    const toolSaving = findings.reduce((s, f) => s + Math.max(0, f.saving || 0), 0);
    totalMonthlySaving += toolSaving;

    results.push({
      toolId,
      toolName: toolMeta.name,
      currentSpend: entry.monthlySpend,
      plan: entry.plan,
      seats: entry.seats,
      findings,
      saving: toolSaving,
      optimal: findings.length === 0,
    });
  }

  const annualSaving = totalMonthlySaving * 12;
  const showCredex = totalMonthlySaving > 500;
  const summary = generateSummary(results, totalMonthlySaving, useCase, teamSize);

  return { results, totalMonthlySaving, annualSaving, showCredex, summary };
}

// ─── Templated summary (fallback when no API key) ────────────────────────────
function generateSummary(results, totalSaving, useCase, teamSize) {
  const optimalTools = results.filter(r => r.optimal).map(r => r.toolName);
  const overspendTools = results.filter(r => !r.optimal).map(r => r.toolName);

  if (totalSaving === 0 && overspendTools.length === 0) {
    return `Your AI stack is well-optimised for a ${teamSize}-person team focused on ${useCase}. You're on the right plans across the board — no obvious waste detected. As your team scales or your usage patterns shift, revisit this audit to catch new savings opportunities.`;
  }

  const savingStr = totalSaving > 0 ? `$${totalSaving}/month ($${totalSaving * 12}/year)` : "meaningful costs";
  const toolStr = overspendTools.length > 0 ? overspendTools.join(", ") : "your current tools";

  let msg = `For your ${teamSize}-person ${useCase} team, this audit identified ${savingStr} in potential savings. `;

  if (overspendTools.length > 0) {
    msg += `The main opportunities are in ${toolStr}, where plan mismatches relative to your team size are driving unnecessary spend. `;
  }
  if (optimalTools.length > 0) {
    msg += `${optimalTools.join(", ")} ${optimalTools.length === 1 ? "is" : "are"} already optimised — no changes needed there. `;
  }
  if (totalSaving > 500) {
    msg += `At this savings level, consolidating through Credex's discounted credit program could unlock additional reductions beyond what plan changes alone can achieve.`;
  } else {
    msg += `Implementing these changes requires no new tools — just plan adjustments with your existing vendors.`;
  }

  return msg;
}
