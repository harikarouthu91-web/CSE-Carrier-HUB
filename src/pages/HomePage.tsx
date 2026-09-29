import React from 'react';
import { useApp } from '../context/AppContext';
import { JobCard } from '../components/JobCard';
import {
  Search,
  ArrowRight,
  Shield,
  Clock,
  BookOpen,
  Award,
  CheckCircle2,
  AlertTriangle,
  Building2,
  FileText,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Users
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const {
    jobs,
    exams,
    setActiveTab,
    setSelectedJob,
    searchQuery,
    setSearchQuery,
    setSelectedCategory
  } = useApp();

  // Top urgent closing jobs (deadline in <= 10 days)
  const urgentJobs = jobs
    .filter((j) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const deadline = new Date(j.lastDate);
      deadline.setHours(0, 0, 0, 0);
      const diff = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      return diff >= 0 && diff <= 10;
    })
    .slice(0, 3);

  // Latest 4 jobs
  const latestJobs = jobs.slice(0, 4);

  // Top exam spotlights
  const spotlightExams = exams.slice(0, 3);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveTab('jobs');
  };

  const categoryPresets = [
    { label: 'Software/IT', key: 'Software/IT' },
    { label: 'Computer Science', key: 'Computer Science' },
    { label: 'Cybersecurity', key: 'Cybersecurity' },
    { label: 'Data & AI', key: 'Data/AI' },
    { label: 'Scientific / Research', key: 'Scientific/Research roles' },
    { label: 'PSU Technical Roles', key: 'PSU technical jobs' }
  ];

  return (
    <div className="space-y-16">
      {/* 1. HERO SECTION */}
      <section className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-900 text-white min-h-[460px] flex items-center">
        {/* Background Image Asset generated specifically for GovTech */}
        <img
          src="/src/assets/images/hero_govtech_institute_1790659576517.jpg"
          alt="Modern high-tech national scientific research institute campus"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-900/60" />

        <div className="relative z-10 max-w-4xl px-6 sm:px-10 py-12 sm:py-16 space-y-6">
          <div className="flex items-center gap-2 text-xs text-sky-400 font-mono tracking-wider">
            <Shield className="w-4 h-4 text-sky-400" />
            <span>CENTRALIZED TECHNICAL RECRUITMENT GATEWAY</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Find Government Opportunities for Your CSE Career
          </h1>

          {/* Problem & Solution Statement */}
          <div className="space-y-2 text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
            <p>
              Computer Science & IT graduates often struggle to find technical government job openings because notifications are dispersed across dozens of fragmented gazettes, PSU portals, and autonomous society websites.
            </p>
            <p className="text-sky-200 font-medium">
              GovTech Careers brings together verified technical officer openings, syllabus patterns, and application deadlines into one authoritative, search-ready platform.
            </p>
          </div>

          {/* Quick Search Bar */}
          <form onSubmit={handleSearchSubmit} className="pt-2 max-w-xl flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search ISRO, NIC, DRDO, C-DAC, Cyber, Level 10..."
                className="w-full pl-10 pr-4 py-3 bg-slate-800/90 border border-slate-700 rounded-lg text-xs sm:text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-inner"
              />
            </div>
            <button
              type="submit"
              className="py-3 px-5 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 shrink-0 shadow-md"
            >
              <span>Search</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Primary Action Buttons */}
          <div className="flex items-center gap-3 pt-2 flex-wrap">
            <button
              onClick={() => {
                setActiveTab('jobs');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-5 py-2.5 bg-white text-slate-950 font-bold rounded-lg text-xs sm:text-sm hover:bg-slate-100 transition-colors shadow-xs"
            >
              Find Technical Jobs
            </button>

            <button
              onClick={() => {
                setActiveTab('exams');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-5 py-2.5 bg-slate-800/80 hover:bg-slate-700 text-slate-200 font-semibold rounded-lg text-xs sm:text-sm border border-slate-700 transition-colors"
            >
              Explore Government Exams
            </button>
          </div>

          {/* Institutional Trust Indicators */}
          <div className="pt-4 border-t border-slate-800/80 flex items-center gap-4 sm:gap-6 text-xs text-slate-400 font-mono flex-wrap">
            <span>Verified Sources:</span>
            <span className="text-slate-300 font-medium">ISRO</span>
            <span>·</span>
            <span className="text-slate-300 font-medium">DRDO RAC</span>
            <span>·</span>
            <span className="text-slate-300 font-medium">NIC / MeitY</span>
            <span>·</span>
            <span className="text-slate-300 font-medium">BARC</span>
            <span>·</span>
            <span className="text-slate-300 font-medium">BEL</span>
            <span>·</span>
            <span className="text-slate-300 font-medium">C-DAC</span>
            <span>·</span>
            <span className="text-slate-300 font-medium">RBI / PSUs</span>
          </div>
        </div>
      </section>

      {/* 2. SEARCH & QUICK CATEGORY FILTER BAR */}
      <section className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Browse Government Openings by Specialization
            </h2>
            <p className="text-xs text-slate-500">
              Instant filters curated exclusively for Computer Science and Information Technology domains.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('jobs')}
            className="text-xs font-semibold text-sky-700 hover:text-sky-800 flex items-center gap-1 shrink-0"
          >
            <span>All Filter Options</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Category button row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {categoryPresets.map((preset) => (
            <button
              key={preset.key}
              onClick={() => {
                setSelectedCategory(preset.key);
                setActiveTab('jobs');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="p-3 text-left bg-slate-50 hover:bg-sky-50 hover:border-sky-300 border border-slate-200 rounded-lg transition-colors group"
            >
              <span className="text-xs font-bold text-slate-800 group-hover:text-sky-900 block truncate">
                {preset.label}
              </span>
              <span className="text-[11px] text-slate-500 block mt-0.5">
                View openings →
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* 4. CLOSING SOON (DEADLINE TRACKER SPOTLIGHT) */}
      {urgentJobs.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
              <h2 className="text-xl font-bold text-slate-900">
                Applications Closing Soon
              </h2>
            </div>
            <button
              onClick={() => {
                setActiveTab('deadlines');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-xs font-semibold text-sky-700 hover:text-sky-800 flex items-center gap-1"
            >
              <span>View Deadline Calendar</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {urgentJobs.map((job) => (
              <JobCard key={job.id} job={job} onSelect={(j) => setSelectedJob(j)} />
            ))}
          </div>
        </section>
      )}

      {/* 3. LATEST CSE/IT OPPORTUNITIES */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Latest Technical Recruitment Openings
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Verified computer science vacancies from central ministries, scientific cadre, and PSUs.
            </p>
          </div>
          <button
            onClick={() => {
              setActiveTab('jobs');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs font-semibold text-sky-700 hover:text-sky-800 flex items-center gap-1"
          >
            <span>View All ({jobs.length}) Positions</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {latestJobs.map((job) => (
            <JobCard key={job.id} job={job} onSelect={(j) => setSelectedJob(j)} />
          ))}
        </div>
      </section>

      {/* 5. GOVERNMENT EXAMS SECTION SPOTLIGHT */}
      <section className="bg-slate-50 border border-slate-200 rounded-lg p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-sky-700 mb-1">
              <Award className="w-3.5 h-3.5" />
              <span>OFFICIAL SYLLABI & EXAMINATION BLUEPRINTS</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Key Government Recruitment Exams for CSE
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Understand the scoring scheme, negative marking, section durations, and core technical topics tested by top national recruitment boards.
            </p>
          </div>
          <button
            onClick={() => {
              setActiveTab('exams');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-semibold transition-colors flex items-center gap-1.5 shrink-0"
          >
            <span>Explore All Exams</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {spotlightExams.map((exam) => (
            <div
              key={exam.id}
              className="bg-white border border-slate-200 rounded-lg p-5 flex flex-col justify-between space-y-3 shadow-xs hover:border-slate-300 transition-colors"
            >
              <div>
                <span className="text-[10px] font-mono text-slate-500 uppercase block">
                  {exam.conductingOrganization}
                </span>
                <h3 className="text-sm font-bold text-slate-900 mt-0.5">
                  {exam.name}
                </h3>
                <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                  {exam.examPatternSummary}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-mono">
                  Negative: {exam.negativeMarking}
                </span>
                <button
                  onClick={() => {
                    setActiveTab('exams');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="font-semibold text-sky-700 hover:text-sky-800"
                >
                  View Blueprint →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. PREPARATION RESOURCES SPOTLIGHT */}
      <section className="bg-white border border-slate-200 rounded-lg p-6 sm:p-8 flex flex-col lg:flex-row items-center gap-8 shadow-xs">
        <div className="lg:w-1/2 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-sky-700">
            <BookOpen className="w-3.5 h-3.5" />
            <span>INTERACTIVE STUDY WORKSPACE</span>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Target High-Yield CSE Topics with Interactive Practice
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Prepare with verified questions modeled after previous ISRO ICRB, NIC Scientist 'B', and DRDO RAC written papers. Check detailed step-by-step explanations and track topic mastery in your personal study planner.
          </p>

          <div className="space-y-2 pt-2 text-xs text-slate-700">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Operating Systems, Paging, Deadlocks & CPU Scheduling</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Computer Networks, CIDR Subnetting & Congestion Control</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>DBMS Normalization (1NF to BCNF) & SQL Transactions</span>
            </div>
          </div>

          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={() => {
                setActiveTab('study');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-4 py-2 bg-sky-700 hover:bg-sky-800 text-white rounded text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <span>Take 10-Question Practice Test</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="lg:w-1/2 w-full">
          <div className="rounded-lg overflow-hidden border border-slate-200 relative aspect-4/3">
            <img
              src="/src/assets/images/study_prep_workspace_1790659593038.jpg"
              alt="Technical engineering study workspace with dual monitors displaying computer science algorithms"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      {/* 7. HOW IT WORKS */}
      <section className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            How It Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            A transparent 5-step pipeline from discovery to submitting your official application.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {[
            {
              step: '01',
              title: 'Search & Discover',
              desc: 'Locate active technical vacancies tailored strictly for computer science engineering.'
            },
            {
              step: '02',
              title: 'Filter by Branch',
              desc: 'Filter by degree (B.Tech, MCA, M.Tech) and department (PSU, Research Lab, Central Gov).'
            },
            {
              step: '03',
              title: 'Check Eligibility',
              desc: 'Review exact qualifying CGPA cutoffs, age limits, and required screening test format.'
            },
            {
              step: '04',
              title: 'Read Gazette',
              desc: 'Verify official recruitment notifications directly on the conducting agency portal.'
            },
            {
              step: '05',
              title: 'Apply Directly',
              desc: 'Submit your candidature on the verified official government portal without intermediaries.'
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-lg p-4 space-y-2 relative"
            >
              <span className="font-mono text-xs font-bold text-sky-700 block">
                {item.step}
              </span>
              <h3 className="text-xs font-bold text-slate-900 leading-snug">
                {item.title}
              </h3>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. WHY USE GOVTECH CAREERS? */}
      <section className="bg-slate-900 text-white rounded-lg p-6 sm:p-10 space-y-8 border border-slate-800">
        <div className="max-w-2xl space-y-2">
          <div className="flex items-center gap-2 text-xs text-sky-400 font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>BUILT FOR TECHNICAL ASPIRANTS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Why Use GovTech Careers?
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Unlike generic employment bulletin sites that mix hundreds of clerk, peon, and non-technical listings, GovTech Careers is precision-tuned exclusively for CSE & IT engineers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2 border-l-2 border-sky-500 pl-4">
            <h3 className="text-sm font-bold text-white">
              CSE-Exclusively Curated
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Every position features an explicit Computer Science or IT branch requirement. No noise, zero irrelevance.
            </p>
          </div>

          <div className="space-y-2 border-l-2 border-emerald-500 pl-4">
            <h3 className="text-sm font-bold text-white">
              Direct Official Links
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              We never charge fees or mask application URLs. Every single listing links directly to the conducting department's official server.
            </p>
          </div>

          <div className="space-y-2 border-l-2 border-amber-500 pl-4">
            <h3 className="text-sm font-bold text-white">
              Integrated Candidate Workstation
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Export deadline reminders to your Google/Apple calendar (.ics), save application numbers, and track stages in Kanban.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
