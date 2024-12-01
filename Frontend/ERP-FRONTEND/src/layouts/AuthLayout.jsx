import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-200">
      <header className="w-full max-w-2xl px-4 py-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-full shadow-lg">
            <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm3 9H7a1 1 0 010-2h6a1 1 0 010 2z" />
            </svg>
          </div>
          <h1 className="text-xl font-semibold tracking-tight">ERP Portal</h1>
        </div>
        <nav className="flex gap-4">
          <a href="#" className="text-sm font-medium hover:text-blue-400 transition-colors">Home</a>
          <a href="#" className="text-sm font-medium hover:text-blue-400 transition-colors">Support</a>
        </nav>
      </header>

      <main className="flex-1 w-full max-w-full px-4 py-8">
        <Outlet />
      </main>

      <footer className="w-full max-w-2xl px-4 py-6 text-center text-sm text-slate-400">
        &copy; {new Date().getFullYear()} ERP Portal. All rights reserved.
      </footer>
    </div>
  );
};

export default AuthLayout;
