import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Code2, Plus, AlertTriangle } from 'lucide-react';

export const DsaTrackerPage = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [patternFilter, setPatternFilter] = useState('ALL');

  const [form, setForm] = useState({
    problemTitle: '',
    platform: 'LeetCode',
    difficulty: 'MEDIUM',
    pattern: 'Arrays',
    timeTakenMinutes: 30,
    hintsUsed: false,
    solvedIndependently: true,
    needsRevision: false,
    solutionUrl: '',
    notes: ''
  });

  useEffect(() => {
    loadProblems();
  }, []);

  const loadProblems = async () => {
    setLoading(true);
    const data = await api.getDsaProblems();
    setProblems(data);
    setLoading(false);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    await api.createDsaProblem(form);
    setShowModal(false);
    setForm({
      problemTitle: '',
      platform: 'LeetCode',
      difficulty: 'MEDIUM',
      pattern: 'Arrays',
      timeTakenMinutes: 30,
      hintsUsed: false,
      solvedIndependently: true,
      needsRevision: false,
      solutionUrl: '',
      notes: ''
    });
    loadProblems();
  };

  const patternsList = ['Arrays', 'Hashing', 'Two Pointers', 'Sliding Window', 'Linked List', 'Stack', 'Queue', 'Trees', 'Graphs', 'Greedy', 'Dynamic Programming', 'Backtracking'];

  const filteredProblems = problems.filter(p => patternFilter === 'ALL' || p.pattern === patternFilter);

  const patternCounts = {};
  patternsList.forEach(p => { patternCounts[p] = 0; });
  problems.forEach(p => {
    if (patternCounts[p.pattern] !== undefined) {
      patternCounts[p.pattern] += 1;
    }
  });

  const weakPatterns = patternsList.filter(p => patternCounts[p] < 2);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Code2 className="w-6 h-6 text-purple-600" />
            DSA Problem & Pattern Tracker
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Categorize solved problems by algorithm pattern, difficulty, solving speed, and hint dependency.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-4 py-2.5 rounded-xl font-bold text-sm shadow-md shadow-purple-600/30 transition"
        >
          <Plus className="w-4 h-4" />
          <span>Log New DSA Problem</span>
        </button>
      </div>

      {weakPatterns.length > 0 && (
        <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
          <div>
            <h4 className="text-sm font-bold text-amber-900">System Weak Pattern Alert</h4>
            <p className="text-xs text-amber-800 mt-0.5">
              Lower activity detected in: <strong className="font-semibold">{weakPatterns.slice(0, 4).join(', ')}</strong>. Focus on these patterns in your next practice sessions.
            </p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 space-y-3">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Activity Breakdown by Pattern</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
          {patternsList.map(pat => {
            const count = patternCounts[pat] || 0;
            const isSelected = patternFilter === pat;
            return (
              <button
                key={pat}
                onClick={() => setPatternFilter(isSelected ? 'ALL' : pat)}
                className={`p-2.5 rounded-xl text-left border transition ${
                  isSelected
                    ? 'bg-purple-50 border-purple-500 text-purple-900 font-bold'
                    : count > 0
                    ? 'bg-slate-50 border-slate-200 text-slate-700 hover:border-purple-300'
                    : 'bg-slate-50/50 border-slate-100 text-slate-400'
                }`}
              >
                <div className="text-xs truncate">{pat}</div>
                <div className="text-lg font-extrabold">{count}</div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <span className="text-sm font-bold text-slate-800">
            Showing {filteredProblems.length} Problems {patternFilter !== 'ALL' && `(Filtered: ${patternFilter})`}
          </span>
          {patternFilter !== 'ALL' && (
            <button onClick={() => setPatternFilter('ALL')} className="text-xs text-purple-600 hover:underline">
              Clear Filter
            </button>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-700">
            <thead className="bg-slate-50 text-slate-500 uppercase text-xs font-semibold border-b border-slate-100">
              <tr>
                <th className="py-3.5 px-4">Problem</th>
                <th className="py-3.5 px-4">Platform</th>
                <th className="py-3.5 px-4">Difficulty</th>
                <th className="py-3.5 px-4">Pattern</th>
                <th className="py-3.5 px-4">Time Taken</th>
                <th className="py-3.5 px-4">Hints / Revision</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProblems.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3.5 px-4 font-semibold text-slate-900">{p.problemTitle}</td>
                  <td className="py-3.5 px-4"><span className="bg-slate-100 px-2 py-1 rounded text-xs">{p.platform}</span></td>
                  <td className="py-3.5 px-4">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${
                      p.difficulty === 'EASY' ? 'bg-emerald-100 text-emerald-800' :
                      p.difficulty === 'MEDIUM' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {p.difficulty}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-purple-700">{p.pattern}</td>
                  <td className="py-3.5 px-4">{p.timeTakenMinutes} mins</td>
                  <td className="py-3.5 px-4 space-x-2">
                    {p.hintsUsed && <span className="text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded border border-amber-200">Hint Used</span>}
                    {p.needsRevision && <span className="text-xs bg-rose-50 text-rose-700 px-2 py-0.5 rounded border border-rose-200">Needs Revision</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Log New Solved DSA Problem</h3>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Problem Title</label>
                <input
                  type="text"
                  required
                  value={form.problemTitle}
                  onChange={(e) => setForm({ ...form, problemTitle: e.target.value })}
                  placeholder="e.g. 3Sum"
                  className="w-full p-3 border border-slate-300 rounded-xl text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Platform</label>
                  <select
                    value={form.platform}
                    onChange={(e) => setForm({ ...form, platform: e.target.value })}
                    className="w-full p-3 border border-slate-300 rounded-xl text-sm"
                  >
                    <option value="LeetCode">LeetCode</option>
                    <option value="GFG">GeeksforGeeks</option>
                    <option value="HackerRank">HackerRank</option>
                    <option value="CodeChef">CodeChef</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Difficulty</label>
                  <select
                    value={form.difficulty}
                    onChange={(e) => setForm({ ...form, difficulty: e.target.value })}
                    className="w-full p-3 border border-slate-300 rounded-xl text-sm"
                  >
                    <option value="EASY">EASY</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="HARD">HARD</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Pattern</label>
                <select
                  value={form.pattern}
                  onChange={(e) => setForm({ ...form, pattern: e.target.value })}
                  className="w-full p-3 border border-slate-300 rounded-xl text-sm"
                >
                  {patternsList.map(pat => <option key={pat} value={pat}>{pat}</option>)}
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-3 border border-slate-300 rounded-xl text-slate-700 font-semibold text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold text-sm shadow-md"
                >
                  Save Problem
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
