function EmptyState({ icon = "◇", title, subtitle, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="text-4xl mb-4 opacity-30">{icon}</div>
      <p className="text-slate-300 font-medium mb-1">{title}</p>
      {subtitle && <p className="text-slate-500 text-sm mb-5">{subtitle}</p>}
      {action && action}
    </div>
  );
}

export default EmptyState;
