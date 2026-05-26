const STATUS_STYLES = {
  "todo":        "bg-slate-700/60 text-slate-300 border-slate-600/40",
  "in-progress": "bg-blue-500/15 text-blue-300 border-blue-500/30",
  "In Progress": "bg-blue-500/15 text-blue-300 border-blue-500/30",
  "done":        "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  "Done":        "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  "blocked":     "bg-red-500/15 text-red-300 border-red-500/30",
};

const PRIORITY_STYLES = {
  low:    "bg-slate-700/60 text-slate-400 border-slate-600/40",
  medium: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  high:   "bg-red-500/15 text-red-300 border-red-500/30",
};

export function StatusBadge({ status }) {
  const style = STATUS_STYLES[status] || STATUS_STYLES["todo"];
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border ${style}`}>
      {status || "todo"}
    </span>
  );
}

export function PriorityBadge({ priority }) {
  const style = PRIORITY_STYLES[priority] || PRIORITY_STYLES["medium"];
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border ${style}`}>
      {priority || "medium"}
    </span>
  );
}
