/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { JobsListSection } from './components/JobsListSection';
import { ExamsSection } from './components/ExamsSection';
import { StudySection } from './components/StudySection';
import { DeadlineTracker } from './components/DeadlineTracker';
import { UserDashboard } from './components/UserDashboard';
import { AdminPanel } from './components/AdminPanel';
import { JobDetailModal } from './components/JobDetailModal';

const AppContent: React.FC = () => {
  const { activeTab, selectedJob, setSelectedJob } = useApp();

  // Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedJob) {
        setSelectedJob(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedJob, setSelectedJob]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-900 font-sans antialiased selection:bg-sky-500 selection:text-white">
      {/* Top Bar Navigation */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'home' && <HomePage />}
        {activeTab === 'jobs' && <JobsListSection />}
        {activeTab === 'exams' && <ExamsSection />}
        {activeTab === 'study' && <StudySection />}
        {activeTab === 'deadlines' && <DeadlineTracker />}
        {activeTab === 'dashboard' && <UserDashboard />}
        {activeTab === 'admin' && <AdminPanel />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Job Detail Modal */}
      {selectedJob && (
        <JobDetailModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
        />
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
