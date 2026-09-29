import React from 'react';
import { useApp } from '../context/AppContext';
import { Shield, ExternalLink, AlertTriangle, FileText, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs mt-20">
      {/* Disclaimer Banner */}
      <div className="bg-slate-900/90 border-b border-slate-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 text-slate-300">
            <div className="p-2 bg-amber-500/10 text-amber-400 rounded shrink-0 border border-amber-500/20">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="text-xs leading-relaxed">
              <span className="font-semibold text-white">Important Accuracy & Legal Notice: </span>
              GovTech Careers does not host proprietary recruitment or issue appointment letters. Always verify eligibility criteria, age relaxation, exam dates, reservation quotas, and fee payment details directly from the official notification document published by the respective department (ISRO, DRDO, NIC, BARC, BEL, UPSC, SSC, etc.) before applying.
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand & Mission */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <div className="w-6 h-6 rounded bg-sky-600 flex items-center justify-center text-white">
                <Shield className="w-3.5 h-3.5" />
              </div>
              <span>GovTech Careers</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              Centralized recruitment tracker and study workspace built specifically for Computer Science & IT engineering students and graduates seeking public sector opportunities.
            </p>
            <div className="flex items-center gap-1.5 text-emerald-400 text-[11px] font-medium pt-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>100% Free Public Technical Job Discovery</span>
            </div>
          </div>

          {/* Col 2: High Demand Portals */}
          <div>
            <h4 className="text-slate-200 font-semibold mb-3 text-xs tracking-wider">
              KEY GOVERNMENT ORGS
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://www.isro.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center gap-1 transition-colors"
                >
                  <span>ISRO - Space Research</span>
                  <ExternalLink className="w-2.5 h-2.5 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://rac.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center gap-1 transition-colors"
                >
                  <span>DRDO RAC - Defence Labs</span>
                  <ExternalLink className="w-2.5 h-2.5 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.nic.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center gap-1 transition-colors"
                >
                  <span>NIC / MeitY - Informatics</span>
                  <ExternalLink className="w-2.5 h-2.5 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.barconlineexam.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center gap-1 transition-colors"
                >
                  <span>BARC - Department of Atomic Energy</span>
                  <ExternalLink className="w-2.5 h-2.5 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://cdac.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center gap-1 transition-colors"
                >
                  <span>C-DAC - Advanced Computing</span>
                  <ExternalLink className="w-2.5 h-2.5 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Portal Navigation */}
          <div>
            <h4 className="text-slate-200 font-semibold mb-3 text-xs tracking-wider">
              PORTAL NAVIGATION
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => {
                    setActiveTab('jobs');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white text-left transition-colors"
                >
                  All CSE Technical Jobs
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('exams');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white text-left transition-colors"
                >
                  Recruitment Exam Syllabi
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('study');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white text-left transition-colors"
                >
                  Study Preparation & Practice Quiz
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('deadlines');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white text-left transition-colors"
                >
                  Application Deadline Tracker
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('dashboard');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white text-left transition-colors"
                >
                  Candidate Workstation & Notes
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Model & Integrity */}
          <div>
            <h4 className="text-slate-200 font-semibold mb-3 text-xs tracking-wider">
              OPEN ACCESS PLEDGE
            </h4>
            <p className="text-slate-400 text-xs leading-relaxed mb-3">
              Core job search, deadline countdowns, official links, and syllabus archives remain completely free for all engineering students.
            </p>
            <div className="p-3 bg-slate-900 border border-slate-800 rounded">
              <span className="text-slate-300 font-medium block mb-1 text-[11px]">
                Future Roadmap:
              </span>
              <span className="text-slate-400 text-[11px] leading-relaxed block">
                Personalized interview preparation, offline test series, and resume screening matching government eligibility matrices.
              </span>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} GovTech Careers. Built for Computer Science and Information Technology Engineering Graduates.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <FileText className="w-3.5 h-3.5" />
              <span>Official Recruitment Sources Only</span>
            </span>
            <span>·</span>
            <span>Zero-Paywall Public Notice Guarantee</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
