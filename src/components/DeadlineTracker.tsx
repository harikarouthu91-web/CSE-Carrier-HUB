import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { GovJob } from '../types';
import {
  Calendar,
  Clock,
  AlertTriangle,
  Download,
  Building2,
  ExternalLink,
  ChevronRight,
  Filter
} from 'lucide-react';

export const DeadlineTracker: React.FC = () => {
  const { jobs, setSelectedJob, downloadIcsReminder, savedJobIds } = useApp();
  const [filterType, setFilterType] = useState<'all' | 'saved' | 'urgent' | 'exams'>('all');
  const [now, setNow] = useState<Date>(new Date());

  // Update clock every minute for live countdown
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const getDaysLeft = (dateString: string) => {
    const target = new Date(dateString);
    target.setHours(23, 59, 59, 999);
    const diff = target.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  // Group jobs
  const jobsWithDiff = jobs.map((job) => ({
    ...job,
    daysLeft: getDaysLeft(job.lastDate)
  }));

  // Filtered jobs
  let displayed = jobsWithDiff;
  if (filterType === 'saved') {
    displayed = displayed.filter((j) => savedJobIds.includes(j.id));
  } else if (filterType === 'urgent') {
    displayed = displayed.filter((j) => j.daysLeft >= 0 && j.daysLeft <= 7);
  } else if (filterType === 'exams') {
    displayed = displayed.filter((j) => j.examDate && j.examDate.includes('2026'));
  }

  // Sort by days left ascending (most urgent first)
  displayed.sort((a, b) => a.daysLeft - b.daysLeft);

  const urgentCount = jobsWithDiff.filter((j) => j.daysLeft >= 0 && j.daysLeft <= 7).length;
  const activeCount = jobsWithDiff.filter((j) => j.daysLeft >= 0).length;

  return (
    <div className="space-y-6">
      {/* Top Banner and Summary */}
      <div className="bg-slate-900 text-white rounded-lg p-6 border border-slate-800">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs text-sky-400 font-mono mb-1">
            <Clock className="w-3.5 h-3.5" />
            <span>CENTRAL RECRUITMENT CALENDAR</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight mb-2">
            Government CSE Deadline Tracker
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Monitor real-time application closing dates, payment windows, and upcoming computer-based tests for technical roles across ISRO, DRDO, NIC, BARC, and PSUs.
          </p>

          <div className="flex items-center gap-4 sm:gap-6 mt-4 pt-4 border-t border-slate-800 text-xs font-mono">
            <div>
              <span className="text-slate-400 block text-[10px]">ACTIVE WINDOWS</span>
              <span className="text-lg font-bold text-white">{activeCount} Positions</span>
            </div>
            <div className="h-8 w-px bg-slate-800" />
            <div>
              <span className="text-amber-400 block text-[10px]">CLOSING IN ≤ 7 DAYS</span>
              <span className="text-lg font-bold text-amber-400">{urgentCount} Positions</span>
            </div>
            <div className="h-8 w-px bg-slate-800" />
            <div>
              <span className="text-slate-400 block text-[10px]">SAVED BY YOU</span>
              <span className="text-lg font-bold text-sky-400">{savedJobIds.length} Tracked</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg text-xs font-medium">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded transition-colors ${
              filterType === 'all'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Openings ({jobsWithDiff.length})
          </button>
          <button
            onClick={() => setFilterType('urgent')}
            className={`px-3 py-1.5 rounded transition-colors flex items-center gap-1 ${
              filterType === 'urgent'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span>Closing Soon ({urgentCount})</span>
          </button>
          <button
            onClick={() => setFilterType('saved')}
            className={`px-3 py-1.5 rounded transition-colors ${
              filterType === 'saved'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            My Saved ({savedJobIds.length})
          </button>
          <button
            onClick={() => setFilterType('exams')}
            className={`px-3 py-1.5 rounded transition-colors ${
              filterType === 'exams'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Upcoming Written Tests
          </button>
        </div>

        <div className="text-xs text-slate-500 font-mono">
          Last Synced: {now.toLocaleDateString()}
        </div>
      </div>

      {/* Deadlines List Table / Cards */}
      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xs">
        <div className="divide-y divide-slate-100">
          {displayed.length === 0 ? (
            <div className="py-12 text-center text-slate-500 text-sm">
              No government technical positions match this deadline filter.
            </div>
          ) : (
            displayed.map((job) => {
              const isUrgent = job.daysLeft >= 0 && job.daysLeft <= 5;
              const isExpired = job.daysLeft < 0;

              return (
                <div
                  key={job.id}
                  className="p-4 sm:p-5 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1 flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                      <span className="font-semibold text-slate-700">{job.organizationType}</span>
                      <span aria-hidden="true">·</span>
                      <span>{job.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{job.vacancies} Posts</span>
                    </div>

                    <h3
                      onClick={() => setSelectedJob(job)}
                      className="text-base font-bold text-slate-900 hover:text-sky-700 cursor-pointer transition-colors leading-snug truncate"
                    >
                      {job.title}
                    </h3>

                    <div className="flex items-center gap-3 text-xs text-slate-600 flex-wrap">
                      <span className="flex items-center gap-1 font-medium text-slate-800">
                        <Building2 className="w-3.5 h-3.5 text-slate-400" />
                        <span>{job.organization}</span>
                      </span>
                      <span aria-hidden="true" className="text-slate-300">·</span>
                      <span>Salary: {job.salaryPayLevel.split('(')[0]}</span>
                      {job.examDate && (
                        <>
                          <span aria-hidden="true" className="text-slate-300">·</span>
                          <span className="text-slate-500">Exam: {job.examDate}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Deadline & Actions */}
                  <div className="flex items-center sm:items-end flex-row sm:flex-col justify-between sm:justify-center gap-2 shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                    <div className="text-right">
                      <span className="text-[11px] text-slate-400 block font-mono">
                        CLOSING DATE
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-semibold font-mono text-slate-900">
                          {job.lastDate}
                        </span>
                        {isExpired ? (
                          <span className="text-[11px] font-mono text-slate-400">
                            (Closed)
                          </span>
                        ) : isUrgent ? (
                          <span className="text-[11px] font-mono text-amber-700 font-bold bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                            {job.daysLeft === 0 ? 'Today!' : `${job.daysLeft}d left`}
                          </span>
                        ) : (
                          <span className="text-[11px] font-mono text-emerald-700 font-medium">
                            {job.daysLeft}d left
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => downloadIcsReminder(job)}
                        className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-200 rounded transition-colors"
                        title="Download Calendar Reminder (.ics)"
                        aria-label="Add to calendar"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => setSelectedJob(job)}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-medium rounded transition-colors"
                      >
                        Details
                      </button>

                      <a
                        href={job.officialApplyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium rounded transition-colors flex items-center gap-1"
                      >
                        <span>Apply</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
