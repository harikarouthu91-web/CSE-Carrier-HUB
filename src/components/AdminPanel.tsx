import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { GovJob, JobCategory, OrganizationType, ExamRequirement } from '../types';
import {
  SlidersHorizontal,
  PlusCircle,
  Edit2,
  Trash2,
  Send,
  RotateCcw,
  CheckCircle,
  ExternalLink,
  Users,
  Briefcase,
  AlertCircle
} from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const {
    jobs,
    addJob,
    updateJob,
    deleteJob,
    addNotification,
    resetToDemoData,
    applications
  } = useApp();

  const [activeTab, setActiveTab] = useState<'manage' | 'add' | 'announcement'>('manage');
  const [editingJob, setEditingJob] = useState<GovJob | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // New Job Form State
  const initialFormState: Omit<GovJob, 'id'> = {
    title: '',
    organization: '',
    organizationType: 'Central Ministry / Department',
    category: 'Computer Science',
    eligibility: '',
    educationalQualification: ['B.Tech / B.E. (CSE/IT)'],
    branches: ['Computer Science', 'Information Technology'],
    minimumPercentage: '60% or 6.5 CGPA',
    ageLimit: '18 to 30 years',
    vacancies: 25,
    salaryPayLevel: 'Pay Level 10 (₹56,100 - ₹1,77,500)',
    monthlyGrossApprox: '₹90,000 / month',
    startDate: new Date().toISOString().split('T')[0],
    lastDate: new Date(Date.now() + 25 * 86400000).toISOString().split('T')[0],
    examDate: 'Tentative November 2026',
    jobLocation: 'Pan-India / New Delhi',
    officialNotificationUrl: 'https://www.nic.in/recruitment/',
    officialApplyUrl: 'https://apply-delhi.nielit.gov.in',
    examRequirement: 'Direct Written Exam',
    selectionProcess: [
      'Written Examination (Objective MCQs in Core CS + Aptitude)',
      'Document Verification & Technical Interview'
    ],
    description: '',
    isDemoData: false
  };

  const [formData, setFormData] = useState(initialFormState);

  // Announcement Form State
  const [announcementTitle, setAnnouncementTitle] = useState('');
  const [announcementMessage, setAnnouncementMessage] = useState('');
  const [announcementType, setAnnouncementType] = useState<'job' | 'deadline' | 'exam' | 'admit_card' | 'result'>('exam');

  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.organization) return;

    if (editingJob) {
      // Update existing
      updateJob({
        ...formData,
        id: editingJob.id
      });
      setSuccessMessage(`Updated position "${formData.title}" successfully.`);
      setEditingJob(null);
    } else {
      // Create new
      const newJobId = `job-${Date.now()}`;
      addJob({
        ...formData,
        id: newJobId
      });
      setSuccessMessage(`Published new job opening "${formData.title}"!`);
    }

    setFormData(initialFormState);
    setActiveTab('manage');
    setTimeout(() => setSuccessMessage(null), 4000);
  };

  const handleStartEdit = (job: GovJob) => {
    setEditingJob(job);
    setFormData({
      title: job.title,
      organization: job.organization,
      organizationType: job.organizationType,
      category: job.category,
      eligibility: job.eligibility,
      educationalQualification: job.educationalQualification,
      branches: job.branches,
      minimumPercentage: job.minimumPercentage || '',
      ageLimit: job.ageLimit,
      vacancies: job.vacancies,
      salaryPayLevel: job.salaryPayLevel,
      monthlyGrossApprox: job.monthlyGrossApprox || '',
      startDate: job.startDate,
      lastDate: job.lastDate,
      examDate: job.examDate || '',
      jobLocation: job.jobLocation,
      officialNotificationUrl: job.officialNotificationUrl,
      officialApplyUrl: job.officialApplyUrl,
      examRequirement: job.examRequirement,
      selectionProcess: job.selectionProcess,
      description: job.description,
      isDemoData: job.isDemoData
    });
    setActiveTab('add');
  };

  const handleSendAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!announcementTitle || !announcementMessage) return;

    addNotification({
      title: announcementTitle,
      message: announcementMessage,
      type: announcementType
    });

    setSuccessMessage('Announcement broadcasted to candidate notification stream!');
    setAnnouncementTitle('');
    setAnnouncementMessage('');
    setTimeout(() => setSuccessMessage(null), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-lg p-6 border border-slate-800">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs text-sky-400 font-mono mb-1">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>PORTAL ADMINISTRATION CONSOLE</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight mb-2">
            GovTech Recruitment Control Center
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Publish verified technical job notifications, modify official application links, archive expired posts, and broadcast announcements to engineering aspirants.
          </p>

          <div className="flex items-center gap-4 sm:gap-6 mt-4 pt-4 border-t border-slate-800 text-xs font-mono">
            <div>
              <span className="text-slate-400 block text-[10px]">TOTAL LISTED JOBS</span>
              <span className="text-lg font-bold text-white">{jobs.length} Positions</span>
            </div>
            <div className="h-8 w-px bg-slate-800" />
            <div>
              <span className="text-slate-400 block text-[10px]">ACTIVE APPLICANTS</span>
              <span className="text-lg font-bold text-sky-400">
                {Object.keys(applications).length} Candidates
              </span>
            </div>
          </div>
        </div>
      </div>

      {successMessage && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs rounded flex items-center gap-2 animate-in fade-in">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg text-xs font-medium border border-slate-200">
          <button
            onClick={() => {
              setEditingJob(null);
              setActiveTab('manage');
            }}
            className={`px-3.5 py-1.5 rounded transition-colors ${
              activeTab === 'manage'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Manage Jobs ({jobs.length})
          </button>
          <button
            onClick={() => setActiveTab('add')}
            className={`px-3.5 py-1.5 rounded transition-colors flex items-center gap-1 ${
              activeTab === 'add'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>{editingJob ? 'Edit Job' : 'Add New Job'}</span>
          </button>
          <button
            onClick={() => setActiveTab('announcement')}
            className={`px-3.5 py-1.5 rounded transition-colors flex items-center gap-1 ${
              activeTab === 'announcement'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>Broadcast Alert</span>
          </button>
        </div>

        <button
          onClick={() => {
            if (confirm('Reset to verified default demo data? All local edits will be reset.')) {
              resetToDemoData();
              setSuccessMessage('Reset to initial official demo dataset successfully.');
            }
          }}
          className="px-3 py-1.5 bg-white border border-slate-300 text-slate-600 hover:text-slate-900 text-xs rounded transition-colors flex items-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Demo Data</span>
        </button>
      </div>

      {/* VIEW 1: Manage Existing Jobs */}
      {activeTab === 'manage' && (
        <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xs">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-700">
              Published Government Technical Roles
            </span>
            <span className="text-slate-500 font-mono">
              Click edit or trash to modify listings
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                    <span className="font-semibold text-slate-700">{job.organization}</span>
                    <span aria-hidden="true">·</span>
                    <span>{job.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-slate-400 font-sans">
                      {job.isDemoData ? 'Demo' : 'Published'}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">{job.title}</h4>
                  <div className="flex items-center gap-3 text-xs text-slate-500 font-mono">
                    <span>Deadline: {job.lastDate}</span>
                    <span aria-hidden="true">·</span>
                    <span>Vacancies: {job.vacancies}</span>
                    <span aria-hidden="true">·</span>
                    <span>{job.salaryPayLevel.split('(')[0]}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleStartEdit(job)}
                    className="p-2 text-slate-600 hover:text-sky-700 hover:bg-slate-200 rounded transition-colors"
                    title="Edit Job Information"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Remove position "${job.title}"?`)) {
                        deleteJob(job.id);
                        setSuccessMessage(`Archived job "${job.title}".`);
                      }
                    }}
                    className="p-2 text-slate-400 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                    title="Delete / Expire Job"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 2: Add or Edit Job Form */}
      {activeTab === 'add' && (
        <form
          onSubmit={handleCreateJob}
          className="bg-white border border-slate-200 rounded-lg p-6 space-y-6 text-xs text-slate-700"
        >
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">
              {editingJob ? 'Edit Government Technical Job' : 'Add New Technical Job Opening'}
            </h3>
            <span className="text-slate-500 font-mono text-[11px]">
              Fields must match official notification
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-slate-800 mb-1">
                Job Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Scientist 'B' (Computer Science)"
                className="w-full bg-white border border-slate-300 rounded p-2 focus:ring-1 focus:ring-sky-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-800 mb-1">
                Recruiting Organization *
              </label>
              <input
                type="text"
                required
                value={formData.organization}
                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                placeholder="e.g. National Informatics Centre (NIC)"
                className="w-full bg-white border border-slate-300 rounded p-2 focus:ring-1 focus:ring-sky-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-800 mb-1">
                Organization Type
              </label>
              <select
                value={formData.organizationType}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    organizationType: e.target.value as OrganizationType
                  })
                }
                className="w-full bg-white border border-slate-300 rounded p-2 focus:outline-none"
              >
                <option value="Central Ministry / Department">Central Ministry / Department</option>
                <option value="Scientific & Research">Scientific & Research</option>
                <option value="Public Sector Undertaking (PSU)">Public Sector Undertaking (PSU)</option>
                <option value="Defence & Space">Defence & Space</option>
                <option value="Banking & Financial Regulatory">Banking & Financial Regulatory</option>
                <option value="State Government">State Government</option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-slate-800 mb-1">
                CSE / IT Category
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value as JobCategory })
                }
                className="w-full bg-white border border-slate-300 rounded p-2 focus:outline-none"
              >
                <option value="Computer Science">Computer Science</option>
                <option value="Software/IT">Software/IT</option>
                <option value="Cybersecurity">Cybersecurity</option>
                <option value="Data/AI">Data/AI</option>
                <option value="Networking">Networking</option>
                <option value="Technical Officer">Technical Officer</option>
                <option value="Programmer">Programmer</option>
                <option value="Scientific/Research roles">Scientific/Research roles</option>
                <option value="PSU technical jobs">PSU technical jobs</option>
                <option value="Government technical assistant roles">Government technical assistant roles</option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-slate-800 mb-1">
                Salary / Pay Level *
              </label>
              <input
                type="text"
                required
                value={formData.salaryPayLevel}
                onChange={(e) => setFormData({ ...formData, salaryPayLevel: e.target.value })}
                placeholder="e.g. Pay Level 10 (₹56,100 - ₹1,77,500)"
                className="w-full bg-white border border-slate-300 rounded p-2 focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-800 mb-1">
                Age Limit *
              </label>
              <input
                type="text"
                required
                value={formData.ageLimit}
                onChange={(e) => setFormData({ ...formData, ageLimit: e.target.value })}
                placeholder="e.g. 18 to 30 years (Standard relaxations)"
                className="w-full bg-white border border-slate-300 rounded p-2 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-800 mb-1">
                Application Start Date
              </label>
              <input
                type="date"
                required
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded p-2 font-mono"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-800 mb-1">
                Application Last Date *
              </label>
              <input
                type="date"
                required
                value={formData.lastDate}
                onChange={(e) => setFormData({ ...formData, lastDate: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded p-2 font-mono"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-800 mb-1">
                Job Location
              </label>
              <input
                type="text"
                value={formData.jobLocation}
                onChange={(e) => setFormData({ ...formData, jobLocation: e.target.value })}
                placeholder="e.g. Pan-India / Bengaluru / New Delhi"
                className="w-full bg-white border border-slate-300 rounded p-2"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-800 mb-1">
                Number of Vacancies
              </label>
              <input
                type="number"
                value={formData.vacancies}
                onChange={(e) => setFormData({ ...formData, vacancies: Number(e.target.value) })}
                className="w-full bg-white border border-slate-300 rounded p-2 font-mono"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-800 mb-1">
                Exam / Screening Mode
              </label>
              <select
                value={formData.examRequirement}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    examRequirement: e.target.value as ExamRequirement
                  })
                }
                className="w-full bg-white border border-slate-300 rounded p-2"
              >
                <option value="Direct Written Exam">Direct Written Exam</option>
                <option value="GATE Score">GATE Score Screening</option>
                <option value="Interview Only">Interview Only / Merit</option>
                <option value="Non-GATE">Non-GATE Exam</option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-slate-800 mb-1">
                Tentative Exam Date
              </label>
              <input
                type="text"
                value={formData.examDate}
                onChange={(e) => setFormData({ ...formData, examDate: e.target.value })}
                placeholder="e.g. November 22, 2026"
                className="w-full bg-white border border-slate-300 rounded p-2"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-medium text-slate-800 mb-1">
                Eligibility Summary *
              </label>
              <textarea
                required
                rows={2}
                value={formData.eligibility}
                onChange={(e) => setFormData({ ...formData, eligibility: e.target.value })}
                placeholder="e.g. First Class B.E. / B.Tech in Computer Science / Information Technology or MCA with min 60% marks."
                className="w-full bg-white border border-slate-300 rounded p-2"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-800 mb-1">
                Official Notification URL (PDF/Gazette) *
              </label>
              <input
                type="url"
                required
                value={formData.officialNotificationUrl}
                onChange={(e) =>
                  setFormData({ ...formData, officialNotificationUrl: e.target.value })
                }
                className="w-full bg-white border border-slate-300 rounded p-2 font-mono"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-800 mb-1">
                Official Application Portal URL *
              </label>
              <input
                type="url"
                required
                value={formData.officialApplyUrl}
                onChange={(e) =>
                  setFormData({ ...formData, officialApplyUrl: e.target.value })
                }
                className="w-full bg-white border border-slate-300 rounded p-2 font-mono"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-medium text-slate-800 mb-1">
                Role Description
              </label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief department responsibilities and key projects."
                className="w-full bg-white border border-slate-300 rounded p-2"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => {
                setEditingJob(null);
                setActiveTab('manage');
              }}
              className="px-4 py-2 border border-slate-300 rounded text-slate-700 hover:bg-slate-50 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-slate-900 text-white rounded font-semibold hover:bg-slate-800 transition-colors"
            >
              {editingJob ? 'Save Modifications' : 'Publish Job Opening'}
            </button>
          </div>
        </form>
      )}

      {/* VIEW 3: Send Announcement to Candidate Stream */}
      {activeTab === 'announcement' && (
        <form
          onSubmit={handleSendAnnouncement}
          className="bg-white border border-slate-200 rounded-lg p-6 space-y-4 max-w-2xl text-xs text-slate-700"
        >
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Broadcast System Announcement
            </h3>
            <p className="text-slate-500 mt-0.5">
              This message will immediately appear in all students' notification bell dropdowns and trigger the unread badge.
            </p>
          </div>

          <div>
            <label className="block font-medium text-slate-800 mb-1">
              Alert Category
            </label>
            <select
              value={announcementType}
              onChange={(e) =>
                setAnnouncementType(e.target.value as any)
              }
              className="w-full bg-white border border-slate-300 rounded p-2"
            >
              <option value="exam">Exam Date / Schedule Announcement</option>
              <option value="admit_card">Admit Card Released</option>
              <option value="deadline">Application Deadline Reminder</option>
              <option value="job">New CSE Opening Published</option>
              <option value="result">Final Merit / Results Declared</option>
            </select>
          </div>

          <div>
            <label className="block font-medium text-slate-800 mb-1">
              Headline Title *
            </label>
            <input
              type="text"
              required
              value={announcementTitle}
              onChange={(e) => setAnnouncementTitle(e.target.value)}
              placeholder="e.g. NIC Scientist B Admit Cards are now live on NIELIT portal"
              className="w-full bg-white border border-slate-300 rounded p-2 font-medium"
            />
          </div>

          <div>
            <label className="block font-medium text-slate-800 mb-1">
              Announcement Message Body *
            </label>
            <textarea
              required
              rows={3}
              value={announcementMessage}
              onChange={(e) => setAnnouncementMessage(e.target.value)}
              placeholder="Provide exact instructions, exam dates, or download link details..."
              className="w-full bg-white border border-slate-300 rounded p-2"
            />
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-sky-700 hover:bg-sky-800 text-white rounded font-semibold transition-colors flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Broadcast Now</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
