export default function LandingPage({ onStart }) {
  return (
    <div className="landing">
      <nav className="nav">
        <div className="nav-inner">
          <span className="logo">💸 SpendLens</span>
          <button className="btn btn-outline" onClick={onStart}>Run free audit</button>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-inner">
          <div className="badge">Free · No signup required</div>
          <h1>Find out if you're<br />overpaying for AI tools</h1>
          <p className="subhead">
            Most startups overspend on AI subscriptions by 30–60%. SpendLens audits your stack in 2 minutes and shows exactly where to cut — with numbers, not guesses.
          </p>
          <button className="btn btn-primary btn-lg" onClick={onStart}>
            Audit my AI spend →
          </button>
          <p className="hero-note">Takes 2 minutes. No credit card. No login.</p>
        </div>
      </section>

      <section className="how-it-works">
        <div className="container">
          <h2>How it works</h2>
          <div className="steps">
            <div className="step">
              <div className="step-num">1</div>
              <h3>Enter your stack</h3>
              <p>Tell us which AI tools you pay for, which plan, and how many seats.</p>
            </div>
            <div className="step">
              <div className="step-num">2</div>
              <h3>Get your audit</h3>
              <p>Our engine checks every tool against your team size and use case with real pricing data.</p>
            </div>
            <div className="step">
              <div className="step-num">3</div>
              <h3>Save money</h3>
              <p>See exactly what to downgrade, switch, or optimise — with one-sentence reasons you can act on today.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="tools-section">
        <div className="container">
          <h2>Covers all major AI tools</h2>
          <div className="tool-chips">
            {["Cursor", "GitHub Copilot", "Claude", "ChatGPT", "Anthropic API", "OpenAI API", "Gemini", "Windsurf"].map(t => (
              <span key={t} className="chip">{t}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="social-proof">
        <div className="container">
          <div className="proof-grid">
            <div className="proof-card">
              <div className="proof-num">$4,200</div>
              <div className="proof-label">avg annual savings found</div>
            </div>
            <div className="proof-card">
              <div className="proof-num">8</div>
              <div className="proof-label">AI tools audited</div>
            </div>
            <div className="proof-card">
              <div className="proof-num">2 min</div>
              <div className="proof-label">to complete audit</div>
            </div>
          </div>
          <p className="proof-note">* Numbers based on modelled savings. Individual results vary.</p>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Stop guessing. Start saving.</h2>
          <button className="btn btn-primary btn-lg" onClick={onStart}>
            Run my free audit →
          </button>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <p>Built by <a href="https://credex.rocks" target="_blank" rel="noopener noreferrer">Credex</a> · Discounted AI infrastructure credits for startups</p>
        </div>
      </footer>
    </div>
  );
}
