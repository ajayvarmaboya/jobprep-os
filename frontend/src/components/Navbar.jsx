import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Calendar, BookOpen, Code2, Briefcase, BarChart3, ShieldCheck, Sparkles } from 'lucide-react';

export const Navbar = () => {
  const navItems = [
    { to: '/', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/daily', label: 'Daily Prep', icon: Calendar },
    { to: '/learning', label: 'Learning Progress', icon: BookOpen },
    { to: '/dsa', label: 'DSA Tracker', icon: Code2 },
    { to: '/applications', label: 'Job Applications', icon: Briefcase },
    { to: '/analytics', label: 'Analytics & AI Coach', icon: BarChart3 },
  ];

  return (
    <header className="bg-slate-900 text-white shadow-xl sticky top-0 z-50 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-md shadow-indigo-500/30">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                JobPrep OS
              </span>
              <span className="ml-2 text-xs bg-indigo-950 text-indigo-300 px-2 py-0.5 rounded-full border border-indigo-800 font-mono">
                v1.0 Cloud
              </span>
            </div>
          </div>

          <nav className="hidden md:flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-lg text-xs text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>SDE-1 Architect Mode</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile nav bar */}
      <div className="md:hidden flex overflow-x-auto border-t border-slate-800 px-2 py-2 space-x-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs whitespace-nowrap font-medium ${
                  isActive ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-800'
                }`
              }
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </header>
  );
};
