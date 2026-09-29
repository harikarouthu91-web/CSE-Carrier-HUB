import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { JobCard } from './JobCard';
import { GovJob, JobCategory } from '../types';
import {
  Search,
  SlidersHorizontal,
  X,
  Building2,
  GraduationCap,
  Calendar,
  Briefcase,
  MapPin,
  RotateCcw
} from 'lucide-react';

export const JobsListSection: React.FC = () => {
  const {
    jobs,
    setSelectedJob,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedQualification,
    setSelectedQualification,
    selectedOrgType,
    setSelectedOrgType,
    selectedExamReq,
    setSelectedExamReq
  } = useApp();

  // Local additional filters
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [deadlineFilter, setDeadlineFilter] = useState<'all' | 'urgent' | '10days'>('all');
  const [sortBy, setSortBy] = useState<'deadline' | 'vacancies' | 'newest'>('deadline');

  const categories: { id: string; label: string }[] = [
    { id: 'all', label: 'All Categories' },
    { id: 'Computer Science', label: 'Computer Science' },
    { id: 'Software/IT', label: 'Software/IT' },
    { id: 'Cybersecurity', label: 'Cybersecurity' },
    { id: 'Data/AI', label: 'Data/AI' },
    { id: 'Networking', label: 'Networking' },
    { id: 'Scientific/Research roles', label: 'Scientific & Research' },
    { id: 'PSU technical jobs', label: 'PSU Technical Roles' },
    { id: 'Technical Officer', label: 'Technical Officer' },
    { id: 'Government technical assistant roles', label: 'Technical Assistant' }
  ];

  const qualifications = [
    { id: 'all', label: 'All Degrees' },
    { id: 'B.Tech', label: 'B.Tech / B.E.' },
    { id: 'MCA', label: 'MCA' },
    { id: 'M.Tech', label: 'M.Tech / M.E.' },
    { id: 'M.Sc', label: 'M.Sc (CS/IT)' },
    { id: 'BCA', label: 'BCA / B.Sc' }
  ];

  const orgTypes = [
    { id: 'all', label: 'All Organizations' },
    { id: 'Defence & Space', label: 'Defence & Space (ISRO/DRDO)' },
    { id: 'Scientific & Research', label: 'Scientific Labs (BARC)' },
    { id: 'Central Ministry / Department', label: 'Central Ministry / NIC' },
    { id: 'Public Sector Undertaking (PSU)', label: 'PSUs (BEL/ECIL)' },
    { id: 'Banking & Financial Regulatory', label: 'Banking Regulatory (RBI/SBI)' }
  ];

  const examModes = [
    { id: 'all', label: 'Any Screening Mode' },
    { id: 'Direct Written Exam', label: 'Direct Written Exam' },
    { id: 'GATE Score', label: 'GATE Score Screening' },
    { id: 'Interview Only', label: 'Interview Only' }
  ];

  // Filtering Logic
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = job.title.toLowerCase().includes(query);
        const matchesOrg = job.organization.toLowerCase().includes(query);
        const matchesEligibility = job.eligibility.toLowerCase().includes(query);
        const matchesLocation = job.jobLocation.toLowerCase().includes(query);
        const matchesCategory = job.category.toLowerCase().includes(query);
        if (!matchesTitle && !matchesOrg && !matchesEligibility && !matchesLocation && !matchesCategory) {
          return false;
        }
      }

      // Category
      if (selectedCategory !== 'all' && job.category !== selectedCategory) {
        return false;
      }

      // Qualification
      if (selectedQualification !== 'all') {
        const hasQual = job.educationalQualification.some((q) =>
          q.toLowerCase().includes(selectedQualification.toLowerCase())
        );
        if (!hasQual) return false;
      }

      // Org Type
      if (selectedOrgType !== 'all' && job.organizationType !== selectedOrgType) {
        return false;
      }

      // Exam Requirement
      if (selectedExamReq !== 'all' && job.examRequirement !== selectedExamReq) {
        return false;
      }

      // Location
      if (selectedLocation !== 'all') {
        if (!job.jobLocation.toLowerCase().includes(selectedLocation.toLowerCase())) {
          return false;
        }
      }

      // Deadline filter
      if (deadlineFilter !== 'all') {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const deadline = new Date(job.lastDate);
        deadline.setHours(0, 0, 0, 0);
        const diffDays = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        if (deadlineFilter === 'urgent' && (diffDays < 0 || diffDays > 5)) {
          return false;
        }
        if (deadlineFilter === '10days' && (diffDays < 0 || diffDays > 10)) {
          return false;
        }
      }

      return true;
    });
  }, [
    jobs,
    searchQuery,
    selectedCategory,
    selectedQualification,
    selectedOrgType,
    selectedExamReq,
    selectedLocation,
    deadlineFilter
  ]);

  // Sorting Logic
  const sortedJobs = useMemo(() => {
    const list = [...filteredJobs];
    if (sortBy === 'deadline') {
      list.sort((a, b) => new Date(a.lastDate).getTime() - new Date(b.lastDate).getTime());
    } else if (sortBy === 'vacancies') {
      list.sort((a, b) => b.vacancies - a.vacancies);
    } else if (sortBy === 'newest') {
      list.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
    }
    return list;
  }, [filteredJobs, sortBy]);

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedQualification('all');
    setSelectedOrgType('all');
    setSelectedExamReq('all');
    setSelectedLocation('all');
    setDeadlineFilter('all');
  };

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedCategory !== 'all' ||
    selectedQualification !== 'all' ||
    selectedOrgType !== 'all' ||
    selectedExamReq !== 'all' ||
    selectedLocation !== 'all' ||
    deadlineFilter !== 'all';

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-slate-900 text-white rounded-lg p-6 border border-slate-800">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs text-sky-400 font-mono mb-1">
            <Briefcase className="w-3.5 h-3.5" />
            <span>CENTRAL RECRUITMENT REPOSITORY</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight mb-2">
            Government Technical Vacancies for CSE / IT
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Discover permanent and contract technical postings in central ministries, scientific institutions, defence labs, and major PSUs tailored for computer science graduates.
          </p>
        </div>
      </div>

      {/* Main Filter & Search Control Panel */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by job title, organization (ISRO, NIC, DRDO), branch, skills, or city..."
            className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs sm:text-sm focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-500 transition-all placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Dropdowns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {/* Category */}
          <div>
            <label className="block text-[11px] font-medium text-slate-500 mb-1">
              CSE / IT Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded p-2 focus:bg-white focus:outline-none"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          {/* Qualification */}
          <div>
            <label className="block text-[11px] font-medium text-slate-500 mb-1">
              Degree Qualification
            </label>
            <select
              value={selectedQualification}
              onChange={(e) => setSelectedQualification(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded p-2 focus:bg-white focus:outline-none"
            >
              {qualifications.map((q) => (
                <option key={q.id} value={q.id}>
                  {q.label}
                </option>
              ))}
            </select>
          </div>

          {/* Organization Type */}
          <div>
            <label className="block text-[11px] font-medium text-slate-500 mb-1">
              Organization Sector
            </label>
            <select
              value={selectedOrgType}
              onChange={(e) => setSelectedOrgType(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded p-2 focus:bg-white focus:outline-none"
            >
              {orgTypes.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>

          {/* Screening / Exam Mode */}
          <div>
            <label className="block text-[11px] font-medium text-slate-500 mb-1">
              Selection Exam Type
            </label>
            <select
              value={selectedExamReq}
              onChange={(e) => setSelectedExamReq(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded p-2 focus:bg-white focus:outline-none"
            >
              {examModes.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Secondary Row: Urgency & Sorting Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-slate-500 font-medium">Quick Filters:</span>
            <button
              onClick={() => setDeadlineFilter(deadlineFilter === 'urgent' ? 'all' : 'urgent')}
              className={`px-2.5 py-1 rounded text-xs transition-colors font-medium ${
                deadlineFilter === 'urgent'
                  ? 'bg-amber-100 text-amber-900 border border-amber-300 font-semibold'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Closing in ≤ 5 days
            </button>
            <button
              onClick={() => setSelectedOrgType(selectedOrgType === 'Defence & Space' ? 'all' : 'Defence & Space')}
              className={`px-2.5 py-1 rounded text-xs transition-colors font-medium ${
                selectedOrgType === 'Defence & Space'
                  ? 'bg-sky-100 text-sky-900 border border-sky-300 font-semibold'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              ISRO / DRDO
            </button>
            <button
              onClick={() => setSelectedOrgType(selectedOrgType === 'Public Sector Undertaking (PSU)' ? 'all' : 'Public Sector Undertaking (PSU)')}
              className={`px-2.5 py-1 rounded text-xs transition-colors font-medium ${
                selectedOrgType === 'Public Sector Undertaking (PSU)'
                  ? 'bg-sky-100 text-sky-900 border border-sky-300 font-semibold'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              PSUs Only
            </button>

            {hasActiveFilters && (
              <button
                onClick={resetAllFilters}
                className="text-xs text-sky-700 hover:text-sky-900 flex items-center gap-1 font-medium ml-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

          {/* Sort By Selector */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-slate-500">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-slate-300 rounded px-2.5 py-1 text-xs focus:outline-none font-medium"
            >
              <option value="deadline">Closing Date (Urgent First)</option>
              <option value="vacancies">Number of Vacancies</option>
              <option value="newest">Recently Announced</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count & Disclaimer Note */}
      <div className="flex items-center justify-between text-xs text-slate-600 px-1">
        <span>
          Showing <strong className="text-slate-900 font-mono">{sortedJobs.length}</strong> government opportunities matching your criteria
        </span>
        <span className="text-slate-600 hidden sm:inline">
          Always check official notifications for recent amendments
        </span>
      </div>

      {/* Job Cards Grid */}
      {sortedJobs.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-lg p-12 text-center space-y-3">
          <Briefcase className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-900">
            No Opportunities Match Your Current Filter
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Try resetting your search query or selecting "All Categories" and "All Degrees" to see all active postings.
          </p>
          <button
            onClick={resetAllFilters}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-semibold"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sortedJobs.map((job) => (
            <JobCard key={job.id} job={job} onSelect={(j) => setSelectedJob(j)} />
          ))}
        </div>
      )}
    </div>
  );
};
