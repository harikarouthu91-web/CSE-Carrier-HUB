import React from 'react';
import { GovJob } from '../types';
import { useApp } from '../context/AppContext';
import {
  Building2,
  Calendar,
  Clock,
  ExternalLink,
  Bookmark,
  BookmarkCheck,
  ChevronRight,
  GraduationCap,
  Download
} from 'lucide-react';

interface JobCardProps {
  job: GovJob;
  onSelect: (job: GovJob) => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onSelect }) => {
  const { savedJobIds, toggleSaveJob, downloadIcsReminder } = useApp();
  const isSaved = savedJobIds.includes(job.id);

  // Compute days remaining until deadline
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const deadline = new Date(job.lastDate);
  deadline.setHours(0, 0, 0, 0);
  const diffTime = deadline.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const isUrgent = diffDays >= 0 && diffDays <= 5;
  const isExpired = diffDays < 0;

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-5 hover:border-slate-400 transition-all duration-200 hover:shadow-xs flex flex-col justify-between">
      <div>
        {/* Top Kicker: Clean unboxed metadata with subtle dot separators */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-2 font-mono">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-slate-700">{job.organizationType}</span>
            <span aria-hidden="true">·</span>
            <span>{job.category}</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-400">{job.isDemoData ? 'Demo Data' : 'Official Verified'}</span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0 ml-2">
            <button
              onClick={() => toggleSaveJob(job.id)}
              className={`p-1.5 rounded transition-colors ${
                isSaved
                  ? 'text-sky-700 bg-sky-50 hover:bg-sky-100'
                  : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
              }`}
              title={isSaved ? 'Remove from saved jobs' : 'Save this job'}
              aria-label={isSaved ? 'Job saved' : 'Save job'}
            >
              {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Primary Job Title: Leading focal point */}
        <h3
          onClick={() => onSelect(job)}
          className="text-base font-bold text-slate-900 hover:text-sky-700 cursor-pointer transition-colors leading-snug mb-1"
        >
          {job.title}
        </h3>

        {/* Organization Name & Location */}
        <div className="flex items-center gap-2 text-xs text-slate-600 mb-3.5 flex-wrap">
          <span className="flex items-center gap-1 font-medium text-slate-800">
            <Building2 className="w-3.5 h-3.5 text-slate-500" />
            <span>{job.organization}</span>
          </span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span>{job.jobLocation}</span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span className="font-semibold text-slate-800">{job.vacancies} Vacancies</span>
        </div>

        {/* Core Eligibility & Qualifications */}
        <div className="space-y-2 mb-4 text-xs text-slate-600 border-t border-slate-100 pt-3">
          <div className="flex items-start gap-1.5">
            <GraduationCap className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <p className="line-clamp-2 leading-relaxed">
              <span className="font-medium text-slate-900">Eligibility: </span>
              {job.eligibility}
            </p>
          </div>

          {/* Pay Scale & Age Limit */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-mono text-[11px] text-slate-600">
            <div className="bg-slate-50 px-2.5 py-1.5 rounded border border-slate-100">
              <span className="text-slate-400 block text-[10px]">PAY SCALE</span>
              <span className="font-medium text-slate-900">{job.salaryPayLevel}</span>
            </div>
            <div className="bg-slate-50 px-2.5 py-1.5 rounded border border-slate-100">
              <span className="text-slate-400 block text-[10px]">AGE LIMIT</span>
              <span className="font-medium text-slate-900">{job.ageLimit.split('(')[0]}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info: Key Dates, Deadline status & Actions */}
      <div className="border-t border-slate-100 pt-3.5 mt-2">
        <div className="flex items-center justify-between text-xs mb-3">
          <div className="flex items-center gap-1.5 text-slate-600">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>Last Date:</span>
            <span className="font-semibold font-mono text-slate-900">{job.lastDate}</span>
          </div>

          <div className="flex items-center gap-1 text-[11px] font-mono">
            {isExpired ? (
              <span className="text-slate-400 font-medium">Application Closed</span>
            ) : isUrgent ? (
              <span className="text-amber-700 font-semibold flex items-center gap-1">
                <Clock className="w-3 h-3 text-amber-600" />
                {diffDays === 0 ? 'Closes Today' : `${diffDays} days left`}
              </span>
            ) : (
              <span className="text-emerald-700 font-medium">
                {diffDays} days remaining
              </span>
            )}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={() => onSelect(job)}
            className="flex-1 py-2 px-3 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded transition-colors flex items-center justify-center gap-1"
          >
            <span>View Details</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => downloadIcsReminder(job)}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded transition-colors"
            title="Download Calendar Reminder (.ics)"
            aria-label="Add deadline reminder to calendar"
          >
            <Download className="w-4 h-4" />
          </button>

          <a
            href={job.officialApplyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2 px-3.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded transition-colors flex items-center justify-center gap-1.5 shrink-0"
          >
            <span>Apply Official</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
