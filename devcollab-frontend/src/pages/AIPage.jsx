import { useState } from "react";
import { useToast } from "../context/ToastContext";
import {
  getProjectSummary,
  detectBlockers,
  generateSubtasks,
} from "../services/ai.service";
import Button from "../components/Button";

const TABS = [
  { id: "summary",  label: "✦ Summary",  desc: "Get a progress overview of your project" },
  { id: "blockers", label: "⚠ Blockers", desc: "Detect risks in in-progress tasks" },
  { id: "subtasks", label: "⊞ Subtasks", desc: "Break a feature into actionable subtasks" },
];

function AILoadingDots() {
  return (
    <div className="flex items-center gap-2 text-slate-400 text-sm">
      <div className="flex gap-1">
        <span className="w-2 h-2 rounded-full bg-indigo-500 dot-1" />
        <span className="w-2 h-2 rounded-full bg-indigo-500 dot-2" />
        <span className="w-2 h-2 rounded-full bg-indigo-500 dot-3" />
      </div>
      AI is thinking…
    </div>
  );
}

function AIResult({ text }) {
  if (!text) return null;
  return (
    <div className="mt-5 bg-[#0d1117] border border-indigo-500/20 border-l-2 border-l-indigo-500 rounded-xl p-5 animate-fadein">
      <p className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-3">AI Response</p>
      <pre className="text-sm text-slate-300 leading-7 whitespace-pre-wrap font-sans">{text}</pre>
    </div>
  );
}

function AIPage() {
  const toast = useToast();
  const [tab, setTab]           = useState("summary");
  const [projectId, setProjectId] = useState("");
  const [feature, setFeature]   = useState("");
  const [result, setResult]     = useState(null);
  const [loading, setLoading]   = useState(false);

  const reset = () => setResult(null);

  const handleRun = async () => {
    if ((tab === "summary" || tab === "blockers") && !projectId.trim()) {
      return toast("Enter a Project ID", "error");
    }
    if (tab === "subtasks" && !feature.trim()) {
      return toast("Describe your feature", "error");
    }
    setLoading(true);
    reset();
    try {
      let data;
      if (tab === "summary")  data = await getProjectSummary(projectId);
      if (tab === "blockers") data = await detectBlockers(projectId);
      if (tab === "subtasks") data = await generateSubtasks(feature);
      setResult(data.summary || data.blockers || data.subtasks || JSON.stringify(data, null, 2));
    } catch (err) {
      toast(err.response?.data?.message || "AI request failed", "error");
    }
    setLoading(false);
  };

  const currentTab = TABS.find((t) => t.id === tab);

  return (
    <div className="p-8 max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium mb-4">
          ✦ AI Features
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight">AI Assistant</h1>
        <p className="text-slate-400 text-sm mt-1">Powered by Gemini AI</p>
      </div>

      {/* Tab selector */}
      <div className="flex gap-1 bg-[#0d1117] border border-[#1e2535] rounded-xl p-1 mb-6 w-fit">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => { setTab(t.id); reset(); }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              tab === t.id
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Card */}
      <div className="bg-[#0d1117] border border-[#1e2535] rounded-2xl p-6">
        <p className="text-sm text-slate-400 mb-5">{currentTab.desc}</p>

        {/* Inputs */}
        {(tab === "summary" || tab === "blockers") && (
          <div className="flex flex-col gap-1.5 mb-5">
            <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Project ID</label>
            <input
              placeholder="Paste a project _id from MongoDB"
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              className="w-full px-3 py-2.5 bg-[#1a2035] border border-[#2a3550] rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/60 transition-all font-mono"
            />
            <p className="text-xs text-slate-600">Find this in the URL when you open a project</p>
          </div>
        )}

        {tab === "subtasks" && (
          <div className="flex flex-col gap-1.5 mb-5">
            <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Feature Description</label>
            <textarea
              rows={4}
              placeholder="Describe a feature, e.g. 'Add OAuth login with Google and GitHub providers'"
              value={feature}
              onChange={(e) => setFeature(e.target.value)}
              className="w-full px-3 py-2.5 bg-[#1a2035] border border-[#2a3550] rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/60 transition-all resize-none"
            />
          </div>
        )}

        <Button onClick={handleRun} loading={loading} disabled={loading}>
          {tab === "summary"  && "Generate Summary"}
          {tab === "blockers" && "Detect Blockers"}
          {tab === "subtasks" && "Generate Subtasks"}
        </Button>

        {loading && <div className="mt-5"><AILoadingDots /></div>}
        <AIResult text={result} />
      </div>
    </div>
  );
}

export default AIPage;
