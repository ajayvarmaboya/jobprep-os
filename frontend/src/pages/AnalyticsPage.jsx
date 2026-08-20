import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { BarChart3, Sparkles, Brain, TrendingUp, Award, AlertCircle, RefreshCw } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export const AnalyticsPage = () => {
  const [analytics, setAnalytics] = useState(null);
  const [aiCoach, setAiCoach] = useState(null);
  const [loading, setLoading] = useState(true);
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const data = await api.getAnalyticsSummary();
    setAnalytics(data);
    setLoading(false);
  };

  const handleAskAiCoach = async () => {
    setAiLoading(true);
    const result = await api.getAiCoachRecommendation();
    setAiCoach(result);
    setAiLoading(false);
  };

  if (loading || !analytics) {
    return <div className="p-8 text-center text-slate-500">Calculating analytical metrics...</div>;
  }

  // Charts data formatting
  const dsaDifficultyData = [
    { name: 'Easy', value: analytics.dsaByDifficulty?.EASY || 7, color: '#10b981' },
    { name: 'Medium', value: analytics.dsaByDifficulty?.MEDIUM || 5, color: '#f59e0b' },
    { name: 'Hard', value: analytics.dsaByDifficulty?.HARD || 2, color: '#f43f5e' }
  ];

  const dsaPatternData = Object.entries(analytics.dsaByPattern || {}).map(([pattern, count]) => ({
    name: pattern,
    count
  }));

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-indigo-600" />
          Preparation Analytics & AI Coach Hub
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Quantitative preparation metrics, DSA pattern performance, conversion funnels, and Amazon Bedrock focus advice.
        </p>
      </div>

      {/* AI Coach Card */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl border border-purple-800/50 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-purple-500/20 p-3 rounded-2xl text-purple-300 border border-purple-500/30">
              <Brain className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Amazon Bedrock AI Preparation Coach</h2>
              <p className="text-xs text-purple-200">Generative AI analysis evaluating historical preparation trajectory</p>
            </div>
          </div>

          <button
            onClick={handleAskAiCoach}
            disabled={aiLoading}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-bold text-sm px-5 py-3 rounded-xl shadow-lg transition"
          >
            {aiLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            <span>{aiCoach ? 'Refresh AI Analysis' : 'Ask AI Coach For Focus Advice'}</span>
          </button>
        </div>

        {aiCoach && (
          <div className="bg-purple-950/60 border border-purple-800/60 rounded-xl p-5 space-y-3 animate-fade-in">
            <div className="flex items-center justify-between text-xs text-purple-300 font-mono border-b border-purple-800/40 pb-2">
              <span>MODEL: {aiCoach.provider}</span>
              <span>GENERATED: {new Date(aiCoach.generatedAt).toLocaleTimeString()}</span>
            </div>
            <p className="text-sm text-purple-100 font-medium leading-relaxed">
              "{aiCoach.recommendation}"
            </p>
            <div className="pt-2">
              <span className="text-xs font-bold text-purple-300 uppercase tracking-wider block mb-2">Recommended Target Focus Areas:</span>
              <div className="flex flex-wrap gap-2">
                {aiCoach.focusAreas.map((area, i) => (
                  <span key={i} className="bg-purple-900/80 text-purple-200 border border-purple-700/50 text-xs px-3 py-1 rounded-lg font-semibold">
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Metrics Overview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase">Independent Solve Rate</span>
          <div className="text-3xl font-extrabold text-indigo-600 mt-1">{analytics.independentSolveRatePercentage}%</div>
          <p className="text-xs text-slate-400 mt-1">Solved without hints</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase">Avg DSA Solving Speed</span>
          <div className="text-3xl font-extrabold text-purple-600 mt-1">{analytics.avgSolveTimeMinutes} mins</div>
          <p className="text-xs text-slate-400 mt-1">Per problem average</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase">App → Interview Funnel</span>
          <div className="text-3xl font-extrabold text-emerald-600 mt-1">{analytics.applicationToInterviewConversion}%</div>
          <p className="text-xs text-slate-400 mt-1">Conversion efficiency</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase">Interview → Offer Funnel</span>
          <div className="text-3xl font-extrabold text-blue-600 mt-1">{analytics.interviewToOfferConversion}%</div>
          <p className="text-xs text-slate-400 mt-1">Offer conversion rate</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* DSA Difficulty Breakdown */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900">DSA Problem Difficulty Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={dsaDifficultyData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {dsaDifficultyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 text-xs font-semibold">
            <span className="text-emerald-600">● Easy ({analytics.dsaByDifficulty?.EASY || 7})</span>
            <span className="text-amber-600">● Medium ({analytics.dsaByDifficulty?.MEDIUM || 5})</span>
            <span className="text-rose-600">● Hard ({analytics.dsaByDifficulty?.HARD || 2})</span>
          </div>
        </div>

        {/* Pattern Solve Count Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900">Solved Problems by Pattern</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dsaPatternData}>
                <XAxis dataKey="name" tick={{ fontSize: 10 }} interval={0} angle={-25} textAnchor="end" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#6366f1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
