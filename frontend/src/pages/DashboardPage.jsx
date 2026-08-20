import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { dailySchedule, weeklyPlan, motivationalQuotes } from '../data/masterplanSchedule';
import { Calendar, Clock, Target, CheckCircle2, Flame, Briefcase, Code2, ArrowRight, Zap, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

export const DashboardPage = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showMotivation, setShowMotivation] = useState(true);

  useEffect(() => {
    loadSummary();
  }, []);

  const loadSummary = async () => {
    setLoading(true);
    const data = await api.getDashboardSummary();
    setSummary(data);
    setLoading(false);
  };

  if (loading || !summary) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <RefreshCw className="w-8 h-8 text-indigo-600 animate-spin" />
      </div>
    );
  }

  const currentDay = summary.currentDay || 20;
  const currentDayType = currentDay % 2 === 1 ? 'dayA' : 'dayB';
  const schedule = dailySchedule[currentDayType];
  const currentPlan = weeklyPlan.find(w => w.days.includes(currentDay));
  const motivationQuote = motivationalQuotes[(currentDay - 1) % motivationalQuotes.length];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl border border-indigo-900/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 transform translate-x-8 -translate-y-8 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center space-x-2 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-3 py-1 rounded-full text-xs font-semibold mb-3">
              <Zap className="w-3.5 h-3.5" />
              <span>Day {currentDay} of 60-Day Masterplan</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-white">
              Ajay's JobPrep OS Dashboard
            </h1>
            <p className="text-slate-300 text-sm mt-1">
              Cloud-Persistent Job Preparation & Technical Capability Engine
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/daily"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition shadow-lg shadow-indigo-600/30"
            >
              <span>Log Today's Work</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {showMotivation && (
          <div className="mt-6 bg-indigo-900/50 border border-indigo-700/50 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🔥</span>
              <p className="text-sm font-medium text-indigo-100">
                "{motivationQuote}"
              </p>
            </div>
            <button
              onClick={() => setShowMotivation(false)}
              className="text-xs text-indigo-300 hover:text-white underline ml-4"
            >
              Dismiss
            </button>
          </div>
        )}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Prep Day</span>
            <Calendar className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">Day {currentDay}</div>
          <div className="text-xs text-slate-500 mt-1">of 60 total days</div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Completed</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-emerald-600">{summary.completedDaysCount} / 60</div>
          <div className="text-xs text-emerald-700 font-medium mt-1">{summary.completionPercentage}% Overall</div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Study Hours</span>
            <Clock className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-blue-600">{parseFloat(summary.totalStudyHours).toFixed(1)} hrs</div>
          <div className="text-xs text-slate-500 mt-1">Logged to cloud</div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">DSA Problems</span>
            <Code2 className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-purple-600">{summary.totalDsaProblemsSolved} Solved</div>
          <div className="text-xs text-slate-500 mt-1">Pattern tracked</div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Prep Streak</span>
            <Flame className="w-4 h-4 text-orange-500" />
          </div>
          <div className="text-2xl font-bold text-orange-500">{summary.currentStreakDays} Days</div>
          <div className="text-xs text-orange-700 font-medium mt-1">Active streak</div>
        </div>
      </div>

      {/* Main Grid: Today's Schedule + Focus Areas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule Widget */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <span className={`inline-block text-xs font-bold px-2.5 py-1 rounded-md mb-1 ${schedule.badgeColor}`}>
                {schedule.type}
              </span>
              <h2 className="text-xl font-bold text-slate-900">Today's Schedule & Focus</h2>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-500">Goal</span>
              <p className="text-lg font-bold text-indigo-600">10 - 12 Hours</p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Today's Masterplan Curriculum:</h4>
            <p className="text-sm font-medium text-slate-800 leading-relaxed">
              {currentDayType === 'dayA' ? currentPlan?.dayA : currentPlan?.dayB}
            </p>
          </div>

          <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-1">
            {schedule.schedule.map((item, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-xl p-3.5 hover:border-indigo-300 transition flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
                  <div>
                    <span className="text-xs font-bold text-slate-500 block">{item.time}</span>
                    <span className="text-sm font-semibold text-slate-900">{item.activity}</span>
                  </div>
                </div>
                {item.focus && (
                  <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md font-medium">
                    {item.focus}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions & Navigation */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-6 text-white shadow-lg">
            <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
              <Target className="w-5 h-5" />
              Quick Preparation Actions
            </h3>
            <p className="text-xs text-indigo-100 mb-6">
              Record your progress across modules to feed the cloud analytics engine.
            </p>

            <div className="space-y-3">
              <Link
                to="/daily"
                className="w-full flex items-center justify-between bg-white/10 hover:bg-white/20 border border-white/20 p-3.5 rounded-xl transition text-sm font-semibold"
              >
                <span>Log Daily Study Hours</span>
                <Clock className="w-4 h-4" />
              </Link>
              <Link
                to="/dsa"
                className="w-full flex items-center justify-between bg-white/10 hover:bg-white/20 border border-white/20 p-3.5 rounded-xl transition text-sm font-semibold"
              >
                <span>Record Solved DSA Problem</span>
                <Code2 className="w-4 h-4" />
              </Link>
              <Link
                to="/applications"
                className="w-full flex items-center justify-between bg-white/10 hover:bg-white/20 border border-white/20 p-3.5 rounded-xl transition text-sm font-semibold"
              >
                <span>Add Job Application</span>
                <Briefcase className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">
              Preparation Progress Overview
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-600 mb-1">
                  <span>60-Day Schedule</span>
                  <span>{summary.completionPercentage}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${summary.completionPercentage}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-600 mb-1">
                  <span>Target Hours Logged</span>
                  <span>{parseFloat(summary.totalStudyHours).toFixed(0)} / 600 hrs</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${Math.min(100, (summary.totalStudyHours / 600) * 100)}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
