import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/auth.service";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

function LoginPage() {
  const navigate = useNavigate();
  const { setToken, setUser } = useAuth();
  const toast = useToast();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await loginUser(form);
      setToken(data.token);
      setUser(data.user);
      toast("Welcome back!", "success");
      navigate("/");
    } catch (err) {
      toast(err.response?.data?.message || "Login failed", "error");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#080b14] flex items-center justify-center p-4">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-sm animate-fadein relative">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center overflow-hidden shadow-lg shadow-indigo-500/20">
            <img
              src="/logo.png"
              alt="DevCollab"
              className="w-7 h-7 object-contain translate-x-[1px]"
            />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Sign in to DevCollab</h1>
          <p className="text-slate-400 text-sm mt-1">Your collaborative dev workspace</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-[#0d1117] border border-[#1e2535] rounded-2xl p-6 flex flex-col gap-4"
        >
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@company.com"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2.5 bg-[#1a2035] border border-[#2a3550] rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/60 transition-all"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2.5 bg-[#1a2035] border border-[#2a3550] rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/60 transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-medium rounded-xl text-sm transition-all flex items-center justify-center gap-2 mt-1"
          >
            {loading && <span className="spinner" />}
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-5">
          Don't have an account?{" "}
          <Link to="/register" className="text-indigo-400 hover:text-indigo-300 font-medium">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
