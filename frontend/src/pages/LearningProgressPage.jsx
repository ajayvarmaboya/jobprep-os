import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { BookOpen, CheckCircle, Clock, AlertTriangle, ChevronDown, ChevronRight } from 'lucide-react';

export const LearningProgressPage = () => {
  const [tree, setTree] = useState({});
  const [loading, setLoading] = useState(true);
  const [expandedTech, setExpandedTech] = useState({ Java: true, DSA: true, 'Spring Boot': true });

  useEffect(() => {
    loadTree();
  }, []);

  const loadTree = async () => {
    setLoading(true);
    const data = await api.getLearningTree();
    setTree(data);
    setLoading(false);
  };

  const handleStatusChange = async (techName, topicName, newStatus) => {
    await api.updateTopicStatus(techName, topicName, newStatus);
    loadTree();
  };

  const toggleExpand = (tech) => {
    setExpandedTech(prev => ({ ...prev, [tech]: !prev[tech] }));
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'COMPLETED':
        return <span className="bg-emerald-100 text-emerald-800 text-xs px-2.5 py-1 rounded-full font-semibold flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5" /> Completed</span>;
      case 'IN_PROGRESS':
        return <span className="bg-blue-100 text-blue-800 text-xs px-2.5 py-1 rounded-full font-semibold flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> In Progress</span>;
      case 'NEEDS_REVISION':
        return <span className="bg-amber-100 text-amber-800 text-xs px-2.5 py-1 rounded-full font-semibold flex items-center gap-1"><AlertTriangle className="w-3.5 h-3.5" /> Needs Revision</span>;
      default:
        return <span className="bg-slate-100 text-slate-600 text-xs px-2.5 py-1 rounded-full font-semibold">Not Started</span>;
    }
  };

  if (loading) return <div className="p-8 text-center text-slate-500">Loading technology progress tree...</div>;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-indigo-600" />
          Technology Curriculum & Topic Mastery
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Track technical topics across core computer science and software development domains.
        </p>
      </div>

      <div className="space-y-4">
        {Object.entries(tree).map(([tech, topics]) => {
          const completed = topics.filter(t => t.status === 'COMPLETED').length;
          const total = topics.length;
          const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
          const isExpanded = expandedTech[tech];

          return (
            <div key={tech} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div
                onClick={() => toggleExpand(tech)}
                className="p-5 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition border-b border-slate-100"
              >
                <div className="flex items-center space-x-3">
                  {isExpanded ? <ChevronDown className="w-5 h-5 text-slate-400" /> : <ChevronRight className="w-5 h-5 text-slate-400" />}
                  <h3 className="text-lg font-bold text-slate-900">{tech}</h3>
                  <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full font-medium">
                    {completed}/{total} Topics
                  </span>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-32 hidden sm:block">
                    <div className="flex justify-between text-xs font-semibold mb-1 text-slate-600">
                      <span>Progress</span>
                      <span>{percent}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${percent}%` }}></div>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-indigo-600">{percent}%</span>
                </div>
              </div>

              {isExpanded && (
                <div className="p-4 bg-slate-50/50 space-y-2">
                  {topics.map((item) => (
                    <div key={item.topicName} className="bg-white p-3.5 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <span className="text-sm font-semibold text-slate-800">{item.topicName}</span>

                      <div className="flex items-center space-x-3">
                        {getStatusBadge(item.status)}
                        <select
                          value={item.status}
                          onChange={(e) => handleStatusChange(tech, item.topicName, e.target.value)}
                          className="text-xs p-1.5 border border-slate-300 rounded-lg bg-white font-medium text-slate-700"
                        >
                          <option value="NOT_STARTED">Not Started</option>
                          <option value="IN_PROGRESS">In Progress</option>
                          <option value="COMPLETED">Completed</option>
                          <option value="NEEDS_REVISION">Needs Revision</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
