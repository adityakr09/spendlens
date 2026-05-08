import { useState, useEffect } from "react";
import LandingPage from "./pages/LandingPage";
import AuditForm from "./pages/AuditForm";
import ResultsPage from "./pages/ResultsPage";
import "./index.css";

const STORAGE_KEY = "spendlens_form";

export default function App() {
  const [page, setPage] = useState("landing");
  const [auditResult, setAuditResult] = useState(null);
  const [shareId, setShareId] = useState(null);

  // Check for shared result URL
  useEffect(() => {
    const path = window.location.pathname;
    const match = path.match(/^\/audit\/([a-zA-Z0-9]+)$/);
    if (match) {
      const id = match[1];
      fetchSharedAudit(id);
    }
  }, []);

  async function fetchSharedAudit(id) {
    try {
      const res = await fetch(`/api/audits/${id}/public/`);
      if (res.ok) {
        const data = await res.json();
        setAuditResult(data.result);
        setShareId(id);
        setPage("results");
      }
    } catch (e) {
      console.error("Could not load shared audit", e);
    }
  }

  function handleStartAudit() {
    setPage("form");
  }

  function handleAuditComplete(result, id) {
    setAuditResult(result);
    setShareId(id);
    setPage("results");
    window.history.pushState({}, "", `/audit/${id}`);
  }

  function handleRestart() {
    setPage("form");
    setAuditResult(null);
    setShareId(null);
    window.history.pushState({}, "", "/");
  }

  return (
    <div className="app">
      {page === "landing" && <LandingPage onStart={handleStartAudit} />}
      {page === "form" && (
        <AuditForm
          onComplete={handleAuditComplete}
          storageKey={STORAGE_KEY}
        />
      )}
      {page === "results" && auditResult && (
        <ResultsPage
          result={auditResult}
          shareId={shareId}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}
