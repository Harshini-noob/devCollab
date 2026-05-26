import { useAuth } from "../context/AuthContext";

function Sidebar() {
  const { user, logout } = useAuth();

  return (
    <div className="w-[260px] bg-slate-800 border-r border-slate-700 p-5 flex flex-col justify-between">
      <div>
        <h1 className="text-3xl font-bold mb-10">
          DevCollab 🚀
        </h1>

        <div className="space-y-3">
          <button className="w-full text-left p-3 rounded hover:bg-slate-700">
            Dashboard
          </button>

          <button className="w-full text-left p-3 rounded hover:bg-slate-700">
            Projects
          </button>

          <button className="w-full text-left p-3 rounded hover:bg-slate-700">
            Activity
          </button>

          <button className="w-full text-left p-3 rounded hover:bg-slate-700">
            AI Assistant
          </button>
        </div>
      </div>

      <div>
        <div className="mb-4">
          <p className="font-semibold">
            {user?.name}
          </p>

          <p className="text-sm text-slate-400">
            {user?.email}
          </p>
        </div>

        <button
          onClick={logout}
          className="w-full bg-red-600 hover:bg-red-700 p-3 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;