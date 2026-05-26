import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import TaskPage from "./TaskPage";
import WikiPage from "./WikiPage";

const TABS = ["Tasks", "Wiki"];

function ProjectDetailPage() {
  const { workspaceId } = useParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState("Tasks");

  return (
    <div>
      {/* Sub-nav */}
      <div className="border-b border-[#1e2535] px-8 pt-6 pb-0 flex items-center gap-6">
        <button
          onClick={() => navigate(`/workspace/${workspaceId}`)}
          className="text-slate-500 hover:text-slate-300 text-sm flex items-center gap-1 transition-colors pb-4"
        >
          ← Back
        </button>
        <div className="flex gap-1">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-all -mb-px ${
                tab === t
                  ? "border-indigo-500 text-indigo-300"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {tab === "Tasks" && <TaskPage />}
      {tab === "Wiki"  && <WikiPage />}
    </div>
  );
}

export default ProjectDetailPage;
