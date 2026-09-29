import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ApplicationStatus, GovJob } from '../types';
import {
  Bookmark,
  Building2,
  Calendar,
  ExternalLink,
  Trash2,
  Edit3,
  CheckCircle2,
  Clock,
  Download,
  Award,
  BookOpen,
  PlusCircle,
  FileCheck
} from 'lucide-react';

export const UserDashboard: React.FC = () => {
  const {
    jobs,
    exams,
    savedJobIds,
    savedExamIds,
    toggleSaveJob,
    toggleSaveExam,
    applications,
    updateApplicationStatus,
    removeApplication,
    studyTopics,
    downloadIcsReminder,
    setSelectedJob,
    setActiveTab
  } = useApp();

  const [activeTab, setActiveViewTab] = useState<'applications' | 'saved' | 'exams' | 'prep'>('applications');
  const [editingJobId, setEditingJobId] = useState<string | null>(null);

  // Form edit state
  const [editStatus, setEditStatus] = useState<ApplicationStatus>('Applied');
  const [editRegNo, setEditRegNo] = useState('');
  const [editRollNo, setEditRollNo] = useState('');
  const [editNotes, setEditNotes] = useState('');

  // Map of tracked jobs
  const trackedJobs = Object.keys(applications)
    .map((id) => jobs.find((j) => j.id === id))
    .filter((j): j is GovJob => j !== undefined);

  // Saved jobs
  const savedJobsList = savedJobIds
    .map((id) => jobs.find((j) => j.id === id))
    .filter((j): j is GovJob => j !== undefined);

  // Saved exams
  const savedExamsList = savedExamIds
    .map((id) => exams.find((e) => e.id === id))
    .filter((e) => e !== undefined);

  const completedStudyCount = studyTopics.filter((t) => t.status === 'Completed').length;
  const studyProgress = Math.round((completedStudyCount / studyTopics.length) * 100);

  const handleStartEdit = (job: GovJob) => {
    const item = applications[job.id];
    setEditingJobId(job.id);
    setEditStatus(item?.status || 'Bookmarked');
    setEditRegNo(item?.registrationNumber || '');
    setEditRollNo(item?.rollNumber || '');
    setEditNotes(item?.notes || '');
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingJobId) {
      updateApplicationStatus(editingJobId, editStatus, editNotes, editRegNo, editRollNo);
      setEditingJobId(null);
    }
  };

  const getStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case 'Applied':
        return <span className="text-sky-700 font-semibold font-mono text-xs">● Applied</span>;
      case 'Admit Card Released':
        return <span className="text-amber-700 font-semibold font-mono text-xs">● Admit Card Released</span>;
      case 'Exam Attended':
        return <span className="text-indigo-700 font-semibold font-mono text-xs">● Exam Attended</span>;
      case 'Interview':
        return <span className="text-purple-700 font-semibold font-mono text-xs">● Interview Shortlisted</span>;
      case 'Result Declared':
        return <span className="text-emerald-700 font-semibold font-mono text-xs">● Result Declared</span>;
      default:
        return <span className="text-slate-500 font-medium font-mono text-xs">○ Bookmarked</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-lg p-6 border border-slate-800">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs text-sky-400 font-mono mb-1">
            <Bookmark className="w-3.5 h-3.5" />
            <span>CANDIDATE RECRUITMENT WORKSPACE</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight mb-2">
            My Applications & Saved Pipeline
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Keep registration numbers, hall ticket codes, examination centers, and application deadlines organized in one private place.
          </p>

          <div className="flex items-center gap-4 sm:gap-6 mt-4 pt-4 border-t border-slate-800 text-xs font-mono">
            <div>
              <span className="text-slate-400 block text-[10px]">TRACKED POSITIONS</span>
              <span className="text-lg font-bold text-white">{trackedJobs.length} Active</span>
            </div>
            <div className="h-8 w-px bg-slate-800" />
            <div>
              <span className="text-slate-400 block text-[10px]">SAVED EXAMS</span>
              <span className="text-lg font-bold text-sky-400">{savedExamsList.length} Syllabi</span>
            </div>
            <div className="h-8 w-px bg-slate-800" />
            <div>
              <span className="text-slate-400 block text-[10px]">STUDY SYLLABUS</span>
              <span className="text-lg font-bold text-emerald-400">{studyProgress}% Mastered</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg text-xs font-medium border border-slate-200">
        <button
          onClick={() => setActiveViewTab('applications')}
          className={`px-3.5 py-1.5 rounded transition-colors ${
            activeTab === 'applications'
              ? 'bg-white text-slate-900 shadow-xs font-semibold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Application Tracker ({trackedJobs.length})
        </button>
        <button
          onClick={() => setActiveViewTab('saved')}
          className={`px-3.5 py-1.5 rounded transition-colors ${
            activeTab === 'saved'
              ? 'bg-white text-slate-900 shadow-xs font-semibold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Bookmarked Jobs ({savedJobsList.length})
        </button>
        <button
          onClick={() => setActiveViewTab('exams')}
          className={`px-3.5 py-1.5 rounded transition-colors ${
            activeTab === 'exams'
              ? 'bg-white text-slate-900 shadow-xs font-semibold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Saved Exams ({savedExamsList.length})
        </button>
        <button
          onClick={() => setActiveViewTab('prep')}
          className={`px-3.5 py-1.5 rounded transition-colors ${
            activeTab === 'prep'
              ? 'bg-white text-slate-900 shadow-xs font-semibold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Preparation Summary
        </button>
      </div>

      {/* VIEW 1: Applications Pipeline */}
      {activeTab === 'applications' && (
        <div className="space-y-4">
          {trackedJobs.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-lg p-10 text-center space-y-3">
              <FileCheck className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-slate-900">
                No Applications Added Yet
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                When you apply to ISRO, NIC, DRDO or any technical PSU role, click "Track in Dashboard" to save your application number and track dates.
              </p>
              <button
                onClick={() => setActiveTab('jobs')}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-semibold"
              >
                Explore Current Jobs
              </button>
            </div>
          ) : (
            trackedJobs.map((job) => {
              const item = applications[job.id];
              const isEditing = editingJobId === job.id;

              return (
                <div
                  key={job.id}
                  className="bg-white border border-slate-200 rounded-lg p-5 space-y-4 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                        <span className="font-semibold text-slate-700">{job.organization}</span>
                        <span aria-hidden="true">·</span>
                        <span>{job.salaryPayLevel.split('(')[0]}</span>
                        <span aria-hidden="true">·</span>
                        {getStatusBadge(item.status)}
                      </div>

                      <h3
                        onClick={() => setSelectedJob(job)}
                        className="text-base font-bold text-slate-900 hover:text-sky-700 cursor-pointer transition-colors"
                      >
                        {job.title}
                      </h3>

                      <div className="flex items-center gap-3 text-xs text-slate-500 font-mono">
                        <span>Last Date: {job.lastDate}</span>
                        {job.examDate && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span>Exam: {job.examDate}</span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => downloadIcsReminder(job)}
                        className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded transition-colors"
                        title="Download Calendar (.ics)"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleStartEdit(job)}
                        className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded transition-colors"
                        title="Edit Details / Notes"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => removeApplication(job.id)}
                        className="p-1.5 text-slate-400 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                        title="Remove from tracker"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <a
                        href={job.officialApplyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-semibold flex items-center gap-1"
                      >
                        <span>Portal</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  {/* Registered Details Box */}
                  <div className="bg-slate-50 border border-slate-200/80 rounded p-3 text-xs grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono">
                    <div>
                      <span className="text-slate-400 block text-[10px]">REGISTRATION NO.</span>
                      <span className="font-semibold text-slate-800">
                        {item.registrationNumber || 'Not entered yet'}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">ROLL NO. / SEAT</span>
                      <span className="font-semibold text-slate-800">
                        {item.rollNumber || 'Awaiting Admit Card'}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">CANDIDATE NOTES</span>
                      <span className="font-sans text-slate-700 truncate block">
                        {item.notes || 'No notes added'}
                      </span>
                    </div>
                  </div>

                  {/* Inline Edit Form */}
                  {isEditing && (
                    <form
                      onSubmit={handleSaveEdit}
                      className="border-t border-slate-200 pt-3 space-y-3 bg-slate-50 p-4 rounded text-xs animate-in fade-in"
                    >
                      <h4 className="font-bold text-slate-900">Update Application Record</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-slate-600 mb-1">Status</label>
                          <select
                            value={editStatus}
                            onChange={(e) => setEditStatus(e.target.value as ApplicationStatus)}
                            className="w-full bg-white border border-slate-300 rounded p-1.5 focus:outline-none"
                          >
                            <option value="Bookmarked">Bookmarked</option>
                            <option value="Applied">Applied</option>
                            <option value="Admit Card Released">Admit Card Released</option>
                            <option value="Exam Attended">Exam Attended</option>
                            <option value="Interview">Interview Shortlisted</option>
                            <option value="Result Declared">Result Declared</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-slate-600 mb-1">Registration No</label>
                          <input
                            type="text"
                            value={editRegNo}
                            onChange={(e) => setEditRegNo(e.target.value)}
                            className="w-full bg-white border border-slate-300 rounded p-1.5 font-mono"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-600 mb-1">Roll / Admit Card No</label>
                          <input
                            type="text"
                            value={editRollNo}
                            onChange={(e) => setEditRollNo(e.target.value)}
                            className="w-full bg-white border border-slate-300 rounded p-1.5 font-mono"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-slate-600 mb-1">Notes</label>
                        <input
                          type="text"
                          value={editNotes}
                          onChange={(e) => setEditNotes(e.target.value)}
                          placeholder="e.g. Center: Delhi, photo uploaded, exam date Nov 22."
                          className="w-full bg-white border border-slate-300 rounded p-1.5"
                        />
                      </div>
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setEditingJobId(null)}
                          className="px-3 py-1 bg-slate-200 text-slate-700 rounded hover:bg-slate-300"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-3 py-1 bg-sky-700 text-white rounded hover:bg-sky-800"
                        >
                          Save Changes
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}

      {/* VIEW 2: Bookmarked Jobs */}
      {activeTab === 'saved' && (
        <div className="space-y-4">
          {savedJobsList.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-lg p-10 text-center space-y-2">
              <Bookmark className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="text-xs text-slate-500">No bookmarked jobs.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {savedJobsList.map((job) => (
                <div
                  key={job.id}
                  className="bg-white border border-slate-200 rounded-lg p-4 space-y-3 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-500 font-mono mb-1">
                      <span>{job.organization}</span>
                      <button
                        onClick={() => toggleSaveJob(job.id)}
                        className="text-slate-400 hover:text-red-600"
                        title="Remove bookmark"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <h4
                      onClick={() => setSelectedJob(job)}
                      className="text-sm font-bold text-slate-900 hover:text-sky-700 cursor-pointer"
                    >
                      {job.title}
                    </h4>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                      {job.eligibility}
                    </p>
                  </div>

                  <div className="border-t border-slate-100 pt-2 flex items-center justify-between text-xs">
                    <span className="font-mono text-slate-500">Last: {job.lastDate}</span>
                    <button
                      onClick={() => setSelectedJob(job)}
                      className="text-xs font-semibold text-sky-700 hover:text-sky-800"
                    >
                      View Details →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* VIEW 3: Saved Exams */}
      {activeTab === 'exams' && (
        <div className="space-y-4">
          {savedExamsList.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-lg p-10 text-center space-y-2">
              <Award className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="text-xs text-slate-500">No saved recruitment exams.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {savedExamsList.map((exam) => (
                <div
                  key={exam.id}
                  className="bg-white border border-slate-200 rounded-lg p-4 space-y-2"
                >
                  <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                    <span>{exam.conductingOrganization}</span>
                    <button
                      onClick={() => toggleSaveExam(exam.id)}
                      className="text-slate-400 hover:text-red-600"
                      title="Remove exam"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">{exam.name}</h4>
                  <p className="text-xs text-slate-600 line-clamp-2">
                    {exam.examPatternSummary}
                  </p>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-mono">{exam.frequency}</span>
                    <a
                      href={exam.officialWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sky-700 hover:text-sky-800 font-medium flex items-center gap-1"
                    >
                      <span>Official Portal</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* VIEW 4: Preparation Summary */}
      {activeTab === 'prep' && (
        <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Study Checklist Overview
              </h3>
              <p className="text-xs text-slate-600">
                Keep up the revision momentum across operating systems, networking, DBMS, and algorithms.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('study')}
              className="px-3.5 py-1.5 bg-slate-900 text-white rounded text-xs font-semibold hover:bg-slate-800"
            >
              Go to Study Hub →
            </button>
          </div>

          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-emerald-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${studyProgress}%` }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {studyTopics.map((topic) => (
              <div
                key={topic.id}
                className="p-3 border border-slate-100 bg-slate-50 rounded flex items-center justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">
                    {topic.subject}
                  </span>
                  <span className="font-semibold text-slate-900 block">{topic.topicName}</span>
                </div>
                <span
                  className={`text-[11px] font-mono px-2 py-0.5 rounded font-medium ${
                    topic.status === 'Completed'
                      ? 'bg-emerald-100 text-emerald-800'
                      : topic.status === 'In Progress'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {topic.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
