import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Briefcase, Plus } from 'lucide-react';

export const JobApplicationsPage = () => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('kanban');
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    companyName: '',
    roleTitle: 'SDE-1',
    jobLocation: 'Bengaluru / Remote',
    jobUrl: '',
    status: 'APPLIED',
    resumeVersion: 'v1.0-SDE'
  });

  useEffect(() => {
    loadApps();
  }, []);

  const loadApps = async () => {
    setLoading(true);
    const data = await api.getApplications();
    setApps(data);
    setLoading(false);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    await api.createApplication(form);
    setShowModal(false);
    setForm({ companyName: '', roleTitle: 'SDE-1', jobLocation: 'Bengaluru / Remote', jobUrl: '', status: 'APPLIED', resumeVersion: 'v1.0-SDE' });
    loadApps();
  };

  const statuses = ['APPLIED', 'ASSESSMENT', 'TECHNICAL_INTERVIEW', 'HR', 'OFFER', 'REJECTED'];

  const totalApps = apps.length;
  const totalInterviews = apps.filter(a => ['TECHNICAL_INTERVIEW', 'HR', 'OFFER'].includes(a.status)).length;
  const totalOffers = apps.filter(a => a.status === 'OFFER').length;

  const appToInterviewRate = totalApps === 0 ? '0.0' : ((totalInterviews / totalApps) * 100).toFixed(1);
  const interviewToOfferRate = totalInterviews === 0 ? '0.0' : ((totalOffers / totalInterviews) * 100).toFixed(1);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-indigo-600" />
            Job Application Pipeline
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Track interview stages, application conversion rates, and attach resume versions via S3 Presigned URLs.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-100 p-1 rounded-xl flex items-center">
            <button
              onClick={() => setViewMode('kanban')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${viewMode === 'kanban' ? 'bg-white shadow text-slate-900' : 'text-slate-600'}`}
            >
              Kanban
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${viewMode === 'table' ? 'bg-white shadow text-slate-900' : 'text-slate-600'}`}
            >
              Table
            </button>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-xl font-bold text-sm shadow-md shadow-indigo-600/30 transition"
          >
            <Plus className="w-4 h-4" />
            <span>New Application</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase">Total Applications</span>
          <div className="text-2xl font-bold text-slate-900">{totalApps}</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase">Active Interviews</span>
          <div className="text-2xl font-bold text-indigo-600">{totalInterviews}</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase">App → Interview Rate</span>
          <div className="text-2xl font-bold text-emerald-600">{appToInterviewRate}%</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase">Interview → Offer Rate</span>
          <div className="text-2xl font-bold text-purple-600">{interviewToOfferRate}%</div>
        </div>
      </div>

      {viewMode === 'kanban' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3 overflow-x-auto pb-4">
          {statuses.map(st => {
            const statusApps = apps.filter(a => a.status === st);
            return (
              <div key={st} className="bg-slate-100/70 p-3 rounded-2xl border border-slate-200/80 space-y-3 min-w-[200px]">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-slate-600 tracking-wider">
                    {st.replace('_', ' ')}
                  </span>
                  <span className="text-xs bg-slate-200 text-slate-700 font-bold px-2 py-0.5 rounded-full">
                    {statusApps.length}
                  </span>
                </div>

                <div className="space-y-2">
                  {statusApps.map(app => (
                    <div key={app.id} className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm space-y-2">
                      <div className="font-bold text-sm text-slate-900">{app.companyName}</div>
                      <div className="text-xs font-medium text-slate-600">{app.roleTitle}</div>
                      <div className="text-xs text-slate-400">{app.jobLocation}</div>
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="text-indigo-600 font-medium">{app.resumeVersion}</span>
                        <span className="text-slate-400">{app.appliedDate}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full text-left text-sm text-slate-700">
            <thead className="bg-slate-50 text-slate-500 uppercase text-xs font-semibold border-b border-slate-100">
              <tr>
                <th className="py-3.5 px-4">Company</th>
                <th className="py-3.5 px-4">Role</th>
                <th className="py-3.5 px-4">Location</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Resume Version</th>
                <th className="py-3.5 px-4">Applied Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {apps.map(a => (
                <tr key={a.id} className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-bold text-slate-900">{a.companyName}</td>
                  <td className="py-3 px-4">{a.roleTitle}</td>
                  <td className="py-3 px-4 text-xs text-slate-500">{a.jobLocation}</td>
                  <td className="py-3 px-4">
                    <span className="text-xs font-bold px-2 py-1 bg-indigo-50 text-indigo-700 rounded border border-indigo-200">
                      {a.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-xs font-mono">{a.resumeVersion}</td>
                  <td className="py-3 px-4 text-xs text-slate-500">{a.appliedDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Add New Job Application</h3>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Company Name</label>
                <input
                  type="text"
                  required
                  value={form.companyName}
                  onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                  placeholder="e.g. Google"
                  className="w-full p-3 border border-slate-300 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Role Title</label>
                <input
                  type="text"
                  required
                  value={form.roleTitle}
                  onChange={(e) => setForm({ ...form, roleTitle: e.target.value })}
                  className="w-full p-3 border border-slate-300 rounded-xl text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Status Stage</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="w-full p-3 border border-slate-300 rounded-xl text-sm"
                  >
                    {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Resume Tag</label>
                  <input
                    type="text"
                    value={form.resumeVersion}
                    onChange={(e) => setForm({ ...form, resumeVersion: e.target.value })}
                    className="w-full p-3 border border-slate-300 rounded-xl text-sm"
                  />
                </div>
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
                  className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm shadow-md"
                >
                  Create Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
