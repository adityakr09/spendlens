import { useState, useEffect } from "react";
import { TOOLS, runAudit } from "../utils/auditEngine";

const DEFAULT_TOOL = { enabled: false, plan: "", seats: 1, monthlySpend: 0 };

const USE_CASES = [
  { value: "coding", label: "Coding / Engineering" },
  { value: "writing", label: "Writing / Content" },
  { value: "data", label: "Data / Analysis" },
  { value: "research", label: "Research" },
  { value: "mixed", label: "Mixed / General" },
];

function initTools() {
  const tools = {};
  for (const id of Object.keys(TOOLS)) {
    tools[id] = { ...DEFAULT_TOOL };
  }
  return tools;
}

export default function AuditForm({ onComplete, storageKey }) {
  const [teamSize, setTeamSize] = useState(5);
  const [useCase, setUseCase] = useState("coding");
  const [tools, setTools] = useState(initTools);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Persist form state
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const data = JSON.parse(saved);
        if (data.teamSize) setTeamSize(data.teamSize);
        if (data.useCase) setUseCase(data.useCase);
        if (data.tools) setTools(data.tools);
      }
    } catch {}
  }, [storageKey]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify({ teamSize, useCase, tools }));
  }, [teamSize, useCase, tools, storageKey]);

  function updateTool(id, field, value) {
    setTools(prev => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  }

  function toggleTool(id) {
    const toolMeta = TOOLS[id];
    const firstPlan = Object.keys(toolMeta.plans)[0];
    setTools(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        enabled: !prev[id].enabled,
        plan: prev[id].plan || firstPlan,
      },
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const enabledTools = Object.values(tools).filter(t => t.enabled);
    if (enabledTools.length === 0) {
      setError("Please enable at least one AI tool.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const formData = { tools, teamSize, useCase };
      const auditResult = runAudit(formData);

      // Save to backend
      let shareId = null;
      try {
        const res = await fetch("/api/audits/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ form_data: formData, result: auditResult }),
        });
        if (res.ok) {
          const data = await res.json();
          shareId = data.share_id;
        }
      } catch {
        // Backend unavailable — generate a local ID
        shareId = Math.random().toString(36).slice(2, 10);
      }

      onComplete(auditResult, shareId);
    } catch (err) {
      setError("Something went wrong running the audit. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const enabledCount = Object.values(tools).filter(t => t.enabled).length;

  return (
    <div className="form-page">
      <nav className="nav">
        <div className="nav-inner">
          <span className="logo">💸 SpendLens</span>
        </div>
      </nav>

      <div className="form-container">
        <div className="form-header">
          <h1>Your AI spend audit</h1>
          <p>Enable every AI tool your team pays for. Takes 2 minutes.</p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          {/* Team context */}
          <div className="form-section">
            <h2>Team context</h2>
            <div className="field-row">
              <div className="field">
                <label htmlFor="teamSize">Team size</label>
                <input
                  id="teamSize"
                  type="number"
                  min={1}
                  max={10000}
                  value={teamSize}
                  onChange={e => setTeamSize(Number(e.target.value))}
                />
              </div>
              <div className="field">
                <label htmlFor="useCase">Primary use case</label>
                <select id="useCase" value={useCase} onChange={e => setUseCase(e.target.value)}>
                  {USE_CASES.map(u => (
                    <option key={u.value} value={u.value}>{u.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Tools */}
          <div className="form-section">
            <h2>AI tools you pay for</h2>
            <p className="section-note">Toggle on each tool you're currently paying for.</p>

            <div className="tools-list">
              {Object.entries(TOOLS).map(([id, meta]) => {
                const tool = tools[id];
                const plans = Object.entries(meta.plans);

                return (
                  <div key={id} className={`tool-card ${tool.enabled ? "tool-card--active" : ""}`}>
                    <div className="tool-header">
                      <div className="tool-toggle">
                        <input
                          type="checkbox"
                          id={`toggle-${id}`}
                          checked={tool.enabled}
                          onChange={() => toggleTool(id)}
                        />
                        <label htmlFor={`toggle-${id}`} className="tool-name">{meta.name}</label>
                      </div>
                      {tool.enabled && (
                        <span className="tool-spend-preview">
                          ${(tool.monthlySpend || 0).toLocaleString()}/mo
                        </span>
                      )}
                    </div>

                    {tool.enabled && (
                      <div className="tool-fields">
                        <div className="field">
                          <label>Plan</label>
                          <select
                            value={tool.plan}
                            onChange={e => updateTool(id, "plan", e.target.value)}
                          >
                            {plans.map(([pid, p]) => (
                              <option key={pid} value={pid}>
                                {p.label}{p.price != null ? ` — $${p.price}/seat/mo` : " — usage-based"}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="field-row">
                          <div className="field">
                            <label>Seats / users</label>
                            <input
                              type="number"
                              min={1}
                              value={tool.seats}
                              onChange={e => updateTool(id, "seats", Number(e.target.value))}
                            />
                          </div>
                          <div className="field">
                            <label>Monthly spend ($)</label>
                            <input
                              type="number"
                              min={0}
                              step={1}
                              placeholder="0"
                              value={tool.monthlySpend || ""}
                              onChange={e => updateTool(id, "monthlySpend", Number(e.target.value))}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {error && <p className="form-error">{error}</p>}

          <div className="form-submit">
            <button
              type="submit"
              className="btn btn-primary btn-lg"
              disabled={loading || enabledCount === 0}
            >
              {loading ? "Running audit…" : `Audit ${enabledCount} tool${enabledCount !== 1 ? "s" : ""} →`}
            </button>
            {enabledCount === 0 && (
              <p className="submit-hint">Enable at least one tool above to continue.</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
