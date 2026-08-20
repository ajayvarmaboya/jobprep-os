import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { DashboardPage } from './pages/DashboardPage';
import { DailyPrepPage } from './pages/DailyPrepPage';
import { LearningProgressPage } from './pages/LearningProgressPage';
import { DsaTrackerPage } from './pages/DsaTrackerPage';
import { JobApplicationsPage } from './pages/JobApplicationsPage';
import { AnalyticsPage } from './pages/AnalyticsPage';

export function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
        <Navbar />
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/daily" element={<DailyPrepPage />} />
            <Route path="/learning" element={<LearningProgressPage />} />
            <Route path="/dsa" element={<DsaTrackerPage />} />
            <Route path="/applications" element={<JobApplicationsPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
          </Routes>
        </main>
        <footer className="bg-slate-900 border-t border-slate-800 py-6 text-center text-slate-400 text-xs">
          <p>JobPrep OS — Enterprise Cloud Job Preparation Management Platform</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
