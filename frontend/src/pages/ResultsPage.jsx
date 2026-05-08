import { useState } from "react";

export default function ResultsPage({ result, shareId, onRestart }) {
  const { results, totalMonthlySaving, annualSaving, showCredex, summary } = result;
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = `${window.location.origin}/audit/${shareId}`;

  function handleCopy() {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleLeadCapture(e) {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    try {
      await fetch("/api/leads/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, company, role, share_id: shareId, monthly_saving: totalMonthlySaving }),
      });
    } catch {}
    setEmailSent(true);
    setSubmitting(false);
  }

  const savingColor = totalMonthlySaving > 0 ? "saving-positive" : "saving-neutral";

  return (
    <div className="results-page">
      <nav className="nav">
        <div className="nav-inner">
          <span className="logo">💸 SpendLens</span>
          <button className="btn btn-outline" onClick={onRestart}>New audit</button>
        </div>
      </nav>

      <div className="results-container">

        {/* Hero savings block */}
        <div className="savings-hero">
          <div className="savings-hero-inner">
            <p className="savings-label">Potential monthly savings</p>
            <div className={`savings-amount ${savingColor}`}>
              ${totalMonthlySaving.toLocaleString()}
              <span className="savings-period">/mo</span>
            </div>
            <div className="savings-annual">
              ${annualSaving.toLocaleString()} per year
            </div>
            {totalMonthlySaving === 0 && (
              <p className="savings-optimal">✓ Your stack looks well-optimised</p>
            )}
          </div>
        </div>

        {/* AI summary */}
        <div className="summary-card">
          <h2>Audit summary</h2>
          <p className="summary-text">{summary}</p>
        </div>

        {/* Credex CTA for high savers */}
        {showCredex && (
          <div className="credex-cta">
            <div className="credex-cta-inner">
              <div className="credex-badge">Save even more</div>
              <h2>You could save an additional 20–40% through Credex</h2>
              <p>
                Credex sources discounted AI infrastructure credits — Cursor, Claude, ChatGPT Enterprise, and others — from companies that overforecast. The discount is real and substantial, on top of the plan savings above.
              </p>
              <a
                href="https://credex.rocks"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-credex"
              >
                Book a free Credex consultation →
              </a>
            </div>
          </div>
        )}

        {/* Per-tool breakdown */}
        <div className="breakdown-section">
          <h2>Per-tool breakdown</h2>
          <div className="breakdown-list">
            {results.map((r) => (
              <div key={r.toolId} className={`breakdown-card ${r.optimal ? "breakdown-card--optimal" : ""}`}>
                <div className="breakdown-header">
                  <div>
                    <span className="breakdown-tool">{r.toolName}</span>
                    <span className="breakdown-plan">{r.plan} · {r.seats} seat{r.seats !== 1 ? "s" : ""}</span>
                  </div>
                  <div className="breakdown-right">
                    <span className="breakdown-spend">${(r.currentSpend || 0).toLocaleString()}/mo</span>
                    {r.saving > 0 && (
                      <span className="breakdown-saving">−${r.saving.toLocaleString()}/mo</span>
                    )}
                    {r.optimal && <span className="breakdown-optimal-tag">✓ Optimal</span>}
                  </div>
                </div>

                {r.findings.length > 0 && (
                  <div className="findings-list">
                    {r.findings.map((f, i) => (
                      <div key={i} className="finding">
                        <div className="finding-action">→ {f.action}</div>
                        <div className="finding-reason">{f.reason}</div>
                      </div>
                    ))}
                  </div>
                )}

                {r.optimal && (
                  <p className="optimal-note">No changes recommended — you're on the right plan for your team size and use case.</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Share section */}
        <div className="share-section">
          <h2>Share this audit</h2>
          <p>Your personal details are stripped from the public version. Only tool names and savings are shown.</p>
          <div className="share-input-row">
            <input readOnly value={shareUrl} className="share-url-input" />
            <button className="btn btn-outline" onClick={handleCopy}>
              {copied ? "Copied!" : "Copy link"}
            </button>
          </div>
        </div>

        {/* Lead capture */}
        {!emailSent ? (
          <div className="lead-capture">
            <h2>
              {totalMonthlySaving > 0
                ? "Get this report in your inbox"
                : "Get notified when new optimisations apply to your stack"}
            </h2>
            <p>We'll send you a copy of this audit. For high-savings cases, Credex may reach out about discounted credits.</p>
            <form onSubmit={handleLeadCapture} className="lead-form" noValidate>
              {/* Honeypot */}
              <input type="text" name="website" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

              <div className="field">
                <label htmlFor="email">Work email *</label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="you@company.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div className="field-row">
                <div className="field">
                  <label htmlFor="company">Company (optional)</label>
                  <input
                    id="company"
                    type="text"
                    placeholder="Acme Inc."
                    value={company}
                    onChange={e => setCompany(e.target.value)}
                  />
                </div>
                <div className="field">
                  <label htmlFor="role">Role (optional)</label>
                  <input
                    id="role"
                    type="text"
                    placeholder="Engineering Manager"
                    value={role}
                    onChange={e => setRole(e.target.value)}
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-primary" disabled={submitting || !email}>
                {submitting ? "Sending…" : "Send my report →"}
              </button>
            </form>
          </div>
        ) : (
          <div className="lead-capture lead-capture--success">
            <div className="success-icon">✓</div>
            <h2>Report sent!</h2>
            <p>Check your inbox. If your savings are significant, someone from Credex may follow up about discounted credits.</p>
          </div>
        )}

        <div className="results-footer">
          <button className="btn btn-ghost" onClick={onRestart}>← Run another audit</button>
          <p>Powered by <a href="https://credex.rocks" target="_blank" rel="noopener noreferrer">Credex</a> · Pricing data verified May 2026</p>
        </div>
      </div>
    </div>
  );
}
