import React, { useState } from "react";

/**
 * Auth Remote Module — Login/Signup flows.
 * This module is loaded dynamically by the shell via Module Federation.
 */
export function AuthModule() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`${mode}:`, { email, password });
  };

  return (
    <div className="max-w-md mx-auto py-8">
      <div className="bg-white rounded-lg shadow-sm border p-8">
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setMode("login")}
            className={`flex-1 py-2 rounded-md text-sm font-medium ${mode === "login" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"}`}
          >
            Login
          </button>
          <button
            onClick={() => setMode("signup")}
            className={`flex-1 py-2 rounded-md text-sm font-medium ${mode === "signup" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"}`}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
          >
            {mode === "login" ? "Log In" : "Create Account"}
          </button>
        </form>

        <p className="mt-4 text-xs text-center text-gray-400">
          Remote Module: <code>remote-auth</code> · Port 4201
        </p>
      </div>
    </div>
  );
}

export default AuthModule;
