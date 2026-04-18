import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

// Module Federation remotes — loaded at runtime
const RemoteAuth = React.lazy(() => import("remote-auth/Module"));
const RemoteDashboard = React.lazy(() => import("remote-dashboard/Module"));

function Loading() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full" />
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        {/* Shell Navigation */}
        <nav className="bg-white shadow-sm border-b px-6 py-3 flex items-center gap-6">
          <span className="font-bold text-lg text-blue-600">MFE Platform</span>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-medium"
                : "text-gray-600 hover:text-gray-900"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/auth"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-medium"
                : "text-gray-600 hover:text-gray-900"
            }
          >
            Auth
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-medium"
                : "text-gray-600 hover:text-gray-900"
            }
          >
            Dashboard
          </NavLink>
        </nav>

        {/* Remote Module Rendering */}
        <main className="p-6">
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route
                path="/"
                element={
                  <div className="max-w-2xl mx-auto text-center py-12">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                      Nx Micro-Frontend Platform
                    </h1>
                    <p className="text-gray-600 mb-8">
                      This shell application dynamically loads independent
                      remote modules via Module Federation. Each remote is built
                      and deployed independently.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-6 rounded-lg border bg-white">
                        <h3 className="font-semibold mb-2">🔐 Auth Remote</h3>
                        <p className="text-sm text-gray-500">
                          Login, signup, password reset
                        </p>
                      </div>
                      <div className="p-6 rounded-lg border bg-white">
                        <h3 className="font-semibold mb-2">
                          📊 Dashboard Remote
                        </h3>
                        <p className="text-sm text-gray-500">
                          Analytics, charts, data views
                        </p>
                      </div>
                    </div>
                  </div>
                }
              />
              <Route path="/auth/*" element={<RemoteAuth />} />
              <Route path="/dashboard/*" element={<RemoteDashboard />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
