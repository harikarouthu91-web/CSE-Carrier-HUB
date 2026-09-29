import React, { useState } from 'react';
import { GovJob, ApplicationStatus } from '../types';
import { useApp } from '../context/AppContext';
import {
  X,
  ExternalLink,
  Download,
  Bookmark,
  BookmarkCheck,
  Building2,
  Calendar,
  AlertTriangle,
  GraduationCap,
  Briefcase,
  CheckCircle2,
  Clock,
  MapPin,
  Banknote,
  FileText
} from 'lucide-react';

interface JobDetailModalProps {
  job: GovJob;
  onClose: () => void;
}

export const JobDetailModal: React.FC<JobDetailModalProps> = ({ job, onClose }) => {
  const {
    savedJobIds,
    toggleSaveJob,
    applications,
    updateApplicationStatus,
    downloadIcsReminder
  } = useApp();

  const isSaved = savedJobIds.includes(job.id);
  const currentApp = applications[job.id];

  const [status, setStatus] = useState<ApplicationStatus>(
    currentApp?.status || (isSaved ? 'Bookmarked' : 'Bookmarked')
  );
  const [regNo, setRegNo] = useState(currentApp?.registrationNumber || '');
  const [rollNo, setRollNo] = useState(currentApp?.rollNumber || '');
  const [notes, setNotes] = useState(currentApp?.notes || '');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleUpdateTracker = (e: React.FormEvent) => {
    e.preventDefault();
    updateApplicationStatus(job.id, status, notes, regNo, rollNo);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  // Compute days remaining
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const deadline = new Date(job.lastDate);
  deadline.setHours(0, 0, 0, 0);
  const diffDays = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-lg border border-slate-200 shadow-2xl w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in duration-200">
        {/* Top Header Bar */}
        <div className="bg-slate-900 text-white px-5 py-4 flex items-start justify-between gap-4 shrink-0">
          <div>
            <div className="flex items-center gap-2 text-xs text-sky-400 font-mono mb-1">
              <span>{job.organizationType}</span>
              <span aria-hidden="true">·</span>
              <span>{job.category}</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-400">{job.isDemoData ? 'Demo Reference' : 'Official Listing'}</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white leading-snug">
              {job.title}
            </h2>
            <div className="flex items-center gap-3 text-xs text-slate-300 mt-1 flex-wrap">
              <span className="flex items-center gap-1 font-medium">
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                <span>{job.organization}</span>
              </span>
              <span aria-hidden="true" className="text-slate-500">·</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{job.jobLocation}</span>
              </span>
              <span aria-hidden="true" className="text-slate-500">·</span>
              <span>{job.vacancies} Technical Posts</span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => toggleSaveJob(job.id)}
              className={`p-2 rounded text-slate-300 hover:text-white hover:bg-slate-800 transition-colors ${
                isSaved ? 'text-sky-400' : ''
              }`}
              title={isSaved ? 'Saved in My Dashboard' : 'Save opportunity'}
            >
              {isSaved ? <BookmarkCheck className="w-5 h-5 text-sky-400" /> : <Bookmark className="w-5 h-5" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Official Accuracy Disclaimer Callout */}
        <div className="bg-amber-50 border-b border-amber-200/80 px-5 py-2.5 flex items-start gap-2.5 text-amber-900 text-xs shrink-0">
          <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <span className="font-semibold">Notice to Aspirants: </span>
            Always verify eligibility, dates, vacancies, syllabus, and examination centres from the official government gazette or agency portal before submitting your application.
          </p>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-sm text-slate-700">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded">
              <span className="text-slate-500 text-[10px] block font-sans uppercase">Pay Level</span>
              <span className="font-bold text-slate-900 block mt-0.5">{job.salaryPayLevel}</span>
              {job.monthlyGrossApprox && (
                <span className="text-[11px] text-emerald-700 block mt-0.5">{job.monthlyGrossApprox}</span>
              )}
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded">
              <span className="text-slate-500 text-[10px] block font-sans uppercase">Application Last Date</span>
              <span className="font-bold text-slate-900 block mt-0.5">{job.lastDate}</span>
              <span className={`text-[11px] block mt-0.5 ${diffDays <= 5 ? 'text-amber-700 font-semibold' : 'text-slate-500'}`}>
                {diffDays < 0 ? 'Closed' : `${diffDays} days remaining`}
              </span>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded">
              <span className="text-slate-500 text-[10px] block font-sans uppercase">Exam / Screening Mode</span>
              <span className="font-bold text-slate-900 block mt-0.5">{job.examRequirement}</span>
              {job.examDate && (
                <span className="text-[11px] text-slate-500 block mt-0.5 truncate">{job.examDate}</span>
              )}
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded">
              <span className="text-slate-500 text-[10px] block font-sans uppercase">Age Limit</span>
              <span className="font-bold text-slate-900 block mt-0.5">{job.ageLimit.split('(')[0]}</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">Govt. Relaxations Apply</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              Role & Department Overview
            </h4>
            <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
              {job.description}
            </p>
          </div>

          {/* Eligibility & Qualifications */}
          <div className="border-t border-slate-200 pt-5">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-sky-700" />
              <span>Educational Eligibility & Criteria</span>
            </h4>
            <div className="bg-slate-50 border border-slate-200 rounded p-4 space-y-3 text-xs sm:text-sm">
              <p className="text-slate-800 font-medium leading-relaxed">
                {job.eligibility}
              </p>

              <div>
                <span className="text-xs font-semibold text-slate-500 block mb-1">
                  Accepted Degree Formats:
                </span>
                <ul className="list-disc list-inside space-y-1 text-slate-700 text-xs pl-1">
                  {job.educationalQualification.map((qual, idx) => (
                    <li key={idx}>{qual}</li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center gap-4 text-xs pt-1 border-t border-slate-200/80">
                <div>
                  <span className="text-slate-500">Minimum Qualifying Marks: </span>
                  <span className="font-semibold text-slate-900">{job.minimumPercentage || 'First Class'}</span>
                </div>
                <span>·</span>
                <div>
                  <span className="text-slate-500">Eligible Branches: </span>
                  <span className="font-semibold text-slate-900">{job.branches.join(', ')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Selection Process Stages */}
          <div className="border-t border-slate-200 pt-5">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 text-sky-700" />
              <span>Selection Process & Scheme</span>
            </h4>
            <ol className="space-y-2 text-xs sm:text-sm">
              {job.selectionProcess.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-slate-900 text-white font-mono text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="text-slate-700 leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Candidate Personal Application Tracker */}
          <div className="border-t border-slate-200 pt-5">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-sky-700" />
              <span>Track Your Application in My Dashboard</span>
            </h4>
            <form onSubmit={handleUpdateTracker} className="bg-slate-50 border border-slate-200 rounded p-4 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Application Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as ApplicationStatus)}
                    className="w-full text-xs bg-white border border-slate-300 rounded px-2.5 py-1.5 focus:ring-1 focus:ring-sky-500 focus:outline-none"
                  >
                    <option value="Bookmarked">Bookmarked</option>
                    <option value="Applied">Applied (Form Submitted)</option>
                    <option value="Admit Card Released">Admit Card Released</option>
                    <option value="Exam Attended">Exam Attended</option>
                    <option value="Interview">Interview Shortlisted</option>
                    <option value="Result Declared">Result Declared</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Application / Reg. Number
                  </label>
                  <input
                    type="text"
                    value={regNo}
                    onChange={(e) => setRegNo(e.target.value)}
                    placeholder="e.g. NIC-2026-91823"
                    className="w-full text-xs bg-white border border-slate-300 rounded px-2.5 py-1.5 focus:ring-1 focus:ring-sky-500 focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Roll Number / Hall Ticket
                  </label>
                  <input
                    type="text"
                    value={rollNo}
                    onChange={(e) => setRollNo(e.target.value)}
                    placeholder="e.g. BLR-40192"
                    className="w-full text-xs bg-white border border-slate-300 rounded px-2.5 py-1.5 focus:ring-1 focus:ring-sky-500 focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Candidate Notes / Center Choice
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Center: Delhi, photo uploaded, application fee paid receipt saved."
                  className="w-full text-xs bg-white border border-slate-300 rounded px-2.5 py-1.5 focus:ring-1 focus:ring-sky-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-slate-500">
                  Data saved securely in your browser's local candidate storage.
                </span>
                <div className="flex items-center gap-2">
                  {saveSuccess && (
                    <span className="text-xs text-emerald-600 font-medium">
                      Status updated!
                    </span>
                  )}
                  <button
                    type="submit"
                    className="px-3.5 py-1.5 bg-slate-900 text-white rounded text-xs font-medium hover:bg-slate-800 transition-colors"
                  >
                    Save Status
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Footer Actions Bar */}
        <div className="bg-slate-50 border-t border-slate-200 px-5 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => downloadIcsReminder(job)}
              className="flex-1 sm:flex-initial py-2 px-3 text-xs font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded transition-colors flex items-center justify-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Add to Calendar (.ics)</span>
            </button>

            <a
              href={job.officialNotificationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial py-2 px-3 text-xs font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded transition-colors flex items-center justify-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5 text-slate-500" />
              <span>Official Notification</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </div>

          <a
            href={job.officialApplyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto py-2.5 px-6 text-xs font-bold text-white bg-sky-700 hover:bg-sky-800 rounded transition-colors flex items-center justify-center gap-2 shadow-xs"
          >
            <span>Apply on Official Website</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
