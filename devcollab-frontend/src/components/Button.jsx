function Button({ children, variant = "primary", size = "md", loading = false, className = "", ...props }) {
  const base = "inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-indigo-600 hover:bg-indigo-500 text-white border border-indigo-500/50",
    ghost:   "bg-transparent hover:bg-[#1a2035] text-slate-300 border border-[#2a3550] hover:border-[#3a4560]",
    danger:  "bg-transparent hover:bg-red-500/10 text-red-400 border border-red-500/30 hover:border-red-500/50",
    subtle:  "bg-[#1a2035] hover:bg-[#222b45] text-slate-300 border border-[#2a3550]",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-2.5 text-sm",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && <span className="spinner" />}
      {children}
    </button>
  );
}

export default Button;
