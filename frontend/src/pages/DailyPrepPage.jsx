import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Calendar, Clock, Save, CheckCircle2, AlertCircle, BookOpen } from 'lucide-react';

export const DailyPrepPage = () => {
  const [selectedDay, setSelectedDay] = useState(20);
  const [completionStatus, setCompletionStatus] = useState('done');
  const [hours, setHours] = useState({
    java: '2.0',
    dsa: '2.5',
    springBoot: '1.5',
    aws: '1.0',
    aiMl: '1.5',
    project: '1.5'
  });
  const [jobsApplied, setJobsApplied] = useState('3');
  const [reflection, setReflection] = useState({
    learned: 'Understood Spring Data JPA Custom Queries and Sliding Window DSA technique.',
    difficulties: 'Graph BFS recursion edge cases.',
    tomorrowFocus: 'Tree traversals and System Design URL shortener.'
  });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const totalCalculatedHours = Object.values(hours)
    .reduce((sum, h) => sum + (parseFloat(h) || 0), 0)
    .toFixed(1);

  const handleSave = async (e) => {
    e.preventDefault();
    await api.saveDailyLog({
      dayNumber: selectedDay,
      completionStatus,
      totalStudyHours: parseFloat(totalCalculatedHours),
      javaHours: parseFloat(hours.java) || 0,
      dsaHours: parseFloat(hours.dsa) || 0,
      springBootHours: parseFloat(hours.springBoot) || 0,
      awsHours: parseFloat(hours.aws) || 0,
      aiMlHours: parseFloat(hours.aiMl) || 0,
      projectHours: parseFloat(hours.project) || 0,
      jobsAppliedCount: parseInt(jobsApplied) || 0,
      reflectionLearned: reflection.learned,
      reflectionDifficulties: reflection.difficulties,
      reflectionTomorrowFocus: reflection.tomorrowFocus
    });

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-indigo-600" />
            Structured Daily Preparation Log
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Record study hours by subject, DSA problem details, reflection, and save directly to cloud storage.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-xs font-bold text-slate-600 uppercase">Jump to Day:</label>
          <select
            value={selectedDay}
            onChange={(e) => setSelectedDay(parseInt(e.target.value))}
            className="p-2 border border-slate-300 rounded-lg text-sm font-semibold focus:ring-2 focus:ring-indigo-500 bg-white"
          >
            {Array.from({ length: 60 }, (_, i) => i + 1).map(day => (
              <option key={day} value={day}>
                Day {day} ({day % 2 === 1 ? 'Core CS' : 'Web/AI'})
              </option>
            ))}
          </select>
        </div>
      </div>

      {savedSuccess && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 px-4 py-3 rounded-xl text-sm flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>Successfully synchronized Day {selectedDay} preparation data to JobPrep OS Cloud DB!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Status Selection */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
          <h3 className="text-lg font-bold text-slate-900">Completion Status for Day {selectedDay}</h3>
          <div className="grid grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => setCompletionStatus('done')}
              className={`p-3.5 rounded-xl border-2 font-semibold text-sm transition ${
                completionStatus === 'done'
                  ? 'bg-emerald-50 border-emerald-500 text-emerald-700'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              ✓ Done (10+ hrs)
            </button>

            <button
              type="button"
              onClick={() => setCompletionStatus('partial')}
              className={`p-3.5 rounded-xl border-2 font-semibold text-sm transition ${
                completionStatus === 'partial'
                  ? 'bg-amber-50 border-amber-500 text-amber-700'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              ⚠ Partial (4-8 hrs)
            </button>

            <button
              type="button"
              onClick={() => setCompletionStatus('reset')}
              className={`p-3.5 rounded-xl border-2 font-semibold text-sm transition ${
                completionStatus === 'reset'
                  ? 'bg-rose-50 border-rose-500 text-rose-700'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              ↺ Reset
            </button>
          </div>
        </div>

        {/* Study Hours Breakdown */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-indigo-600" />
              Study Hours by Subject
            </h3>
            <div className="text-right">
              <span className="text-xs text-slate-500">Calculated Total</span>
              <p className="text-lg font-bold text-indigo-600">{totalCalculatedHours} hrs</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Java Core (hrs)</label>
              <input
                type="number"
                step="0.5"
                value={hours.java}
                onChange={(e) => setHours({ ...hours, java: e.target.value })}
                className="w-full p-3 border border-slate-300 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">DSA Practice (hrs)</label>
              <input
                type="number"
                step="0.5"
                value={hours.dsa}
                onChange={(e) => setHours({ ...hours, dsa: e.target.value })}
                className="w-full p-3 border border-slate-300 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Spring Boot (hrs)</label>
              <input
                type="number"
                step="0.5"
                value={hours.springBoot}
                onChange={(e) => setHours({ ...hours, springBoot: e.target.value })}
                className="w-full p-3 border border-slate-300 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">AWS Cloud (hrs)</label>
              <input
                type="number"
                step="0.5"
                value={hours.aws}
                onChange={(e) => setHours({ ...hours, aws: e.target.value })}
                className="w-full p-3 border border-slate-300 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">AI / ML (hrs)</label>
              <input
                type="number"
                step="0.5"
                value={hours.aiMl}
                onChange={(e) => setHours({ ...hours, aiMl: e.target.value })}
                className="w-full p-3 border border-slate-300 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Full-Stack Project (hrs)</label>
              <input
                type="number"
                step="0.5"
                value={hours.project}
                onChange={(e) => setHours({ ...hours, project: e.target.value })}
                className="w-full p-3 border border-slate-300 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Job Applications Count & Reflection */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
          <h3 className="text-lg font-bold text-slate-900">Job Search & Daily Reflections</h3>

          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Applications Sent Today</label>
            <input
              type="number"
              value={jobsApplied}
              onChange={(e) => setJobsApplied(e.target.value)}
              className="w-full p-3 border border-slate-300 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">What did I learn today?</label>
              <textarea
                rows="2"
                value={reflection.learned}
                onChange={(e) => setReflection({ ...reflection, learned: e.target.value })}
                className="w-full p-3 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">What challenges / mistakes occurred?</label>
              <textarea
                rows="2"
                value={reflection.difficulties}
                onChange={(e) => setReflection({ ...reflection, difficulties: e.target.value })}
                className="w-full p-3 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">What should I focus on tomorrow?</label>
              <textarea
                rows="2"
                value={reflection.tomorrowFocus}
                onChange={(e) => setReflection({ ...reflection, tomorrowFocus: e.target.value })}
                className="w-full p-3 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-base shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition"
        >
          <Save className="w-5 h-5" />
          <span>Save Today's Preparation to Cloud DB</span>
        </button>
      </form>
    </div>
  );
};
