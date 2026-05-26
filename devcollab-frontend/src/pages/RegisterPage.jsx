import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { registerUser } from "../services/auth.service";

import { useAuth } from "../context/AuthContext";

function RegisterPage() {
  const navigate = useNavigate();

  const { setToken, setUser } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await registerUser(formData);

      setToken(data.token);

      setUser(data.user);

      navigate("/");
    } catch (error) {
        console.log(error.response?.data);

        alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-800 p-8 rounded-xl w-[400px] flex flex-col gap-4"
      >
        <h1 className="text-3xl font-bold text-center">
          Register
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Name"
          className="p-3 rounded bg-slate-700"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="p-3 rounded bg-slate-700"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="p-3 rounded bg-slate-700"
          onChange={handleChange}
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 p-3 rounded font-semibold"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;