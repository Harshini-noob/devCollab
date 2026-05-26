import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProjects, createProject } from "../services/project.service";
import { getWorkspaceActivity } from "../services/activity.service";
import { useToast } from "../context/ToastContext";
import Modal from "../components/Modal";
import Button from "../components/Button";
import EmptyState from "../components/EmptyState";

const TABS = ["Projects", "Activity"];

function ProjectPage() {
  const { workspaceId } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const [tab, setTab]               = useState("Projects");
  const [projects, setProjects]     = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading]       = useState(true);
  const [modal, setModal]           = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm]             = useState({ name: "", description: "" });

  const fetchProjects = async () => {
    try {
      const data = await getProjects(workspaceId);
      setProjects(data.projects || []);
    } catch {
      toast("Failed to load projects", "error");
    } finally {
      setLoading(false);
    }
  };

  const fetchActivity = async () => {
    try {
      const data = await getWorkspaceActivity(workspaceId);
      setActivities(data.activities || []);
    } catch {
      toast("Failed to load activity", "error");
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchActivity();
  }, [workspaceId]);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    setSubmitting(true);
    try {
      await createProject({ ...form, workspaceId });
      toast("Project created!", "success");
      setModal(false);
      setForm({ name: "", description: "" });
      fetchProjects();
    } catch (err) {
      toast(err.response?.data?.message || "Failed", "error");
    }
    setSubmitting(false);
  };

  const timeAgo = (date) => {
    const diff = Date.now() - new Date(date);
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Back + Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate("/")}
          className="text-slate-500 hover:text-slate-300 text-sm mb-4 flex items-center gap-1 transition-colors"
        >
          ← Back to Workspaces
        </button>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white tracking-tight">Workspace</h1>
          {tab === "Projects" && (
            <Button onClick={() => setModal(true)}>+ New Project</Button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-[#0d1117] border border-[#1e2535] rounded-xl p-1 w-fit">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              tab === t
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Projects Tab */}
      {tab === "Projects" && (
        loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-[#0d1117] border border-[#1e2535] rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <EmptyState
            icon="◈"
            title="No projects yet"
            subtitle="Create your first project in this workspace"
            action={<Button onClick={() => setModal(true)}>Create Project</Button>}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((p) => (
              <div
                key={p._id}
                onClick={() => navigate(`/workspace/${workspaceId}/project/${p._id}`)}
                className="group bg-[#0d1117] border border-[#1e2535] hover:border-indigo-500/40 rounded-2xl p-5 cursor-pointer transition-all hover:shadow-lg hover:shadow-indigo-500/5 animate-fadein"
              >
                <div className="w-9 h-9 rounded-lg bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-300 font-bold text-xs mb-3">
                  {p.name.slice(0, 2).toUpperCase()}
                </div>
                <h2 className="font-semibold text-white text-[15px] mb-1 truncate">{p.name}</h2>
                <p className="text-slate-400 text-sm line-clamp-2">{p.description || "No description"}</p>
                <div className="mt-4 pt-3 border-t border-[#1e2535] flex items-center justify-between">
                  <span className="text-xs text-slate-500">View tasks & wiki →</span>
                </div>
              </div>
            ))}
          </div>
        )
      )}

      {/* Activity Tab */}
      {tab === "Activity" && (
        <div className="space-y-1">
          {activities.length === 0 ? (
            <EmptyState icon="◎" title="No activity yet" subtitle="Actions will appear here" />
          ) : (
            activities.map((a, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-xl hover:bg-[#0d1117] transition-all animate-fadein">
                <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-300 text-xs font-bold flex-shrink-0">
                  {(a.user?.name || "U").slice(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-300">
                    <span className="font-medium text-white">{a.user?.name || "Someone"}</span>
                    {" "}{a.action}
                    {a.project?.name && (
                      <span className="text-indigo-400"> in {a.project.name}</span>
                    )}
                  </p>
                  {a.metadata?.taskTitle && (
                    <p className="text-xs text-slate-500 mt-0.5">"{a.metadata.taskTitle}"</p>
                  )}
                  <p className="text-xs text-slate-600 mt-1">{timeAgo(a.createdAt)}</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Create Modal */}
      {modal && (
        <Modal title="New Project" onClose={() => setModal(false)}>
          <form onSubmit={handleCreate} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Project Name</label>
              <input
                autoFocus
                placeholder="My Project"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                required
                className="w-full px-3 py-2.5 bg-[#1a2035] border border-[#2a3550] rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/60 transition-all"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Description</label>
              <textarea
                rows={3}
                placeholder="What are you building?"
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                className="w-full px-3 py-2.5 bg-[#1a2035] border border-[#2a3550] rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/60 transition-all resize-none"
              />
            </div>
            <div className="flex gap-3 justify-end pt-1">
              <Button variant="ghost" type="button" onClick={() => setModal(false)}>Cancel</Button>
              <Button type="submit" loading={submitting}>Create</Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

export default ProjectPage;
