import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { GovExam } from '../types';
import {
  Award,
  BookOpen,
  Calendar,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Bookmark,
  BookmarkCheck,
  CheckCircle,
  FileText,
  AlertCircle
} from 'lucide-react';

export const ExamsSection: React.FC = () => {
  const { exams, savedExamIds, toggleSaveExam, setActiveTab } = useApp();
  const [expandedExamId, setExpandedExamId] = useState<string | null>('isro-icrb-exam');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 text-white rounded-lg p-6 border border-slate-800">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs text-sky-400 font-mono mb-1">
            <Award className="w-3.5 h-3.5" />
            <span>CENTRAL RECRUITMENT BOARDS & SYLLABI</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight mb-2">
            Government Recruitment Exams for CSE
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Detailed examination blueprints, scoring patterns, negative marking schemes, and official syllabus breakdowns for premier national scientific and technical cadre tests.
          </p>
        </div>
      </div>

      {/* Official Disclaimer */}
      <div className="bg-slate-50 border border-slate-200 rounded p-4 flex items-start gap-2.5 text-xs text-slate-700">
        <AlertCircle className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          Exam patterns and subject weightages are compiled from recent official notifications and information brochures. Minor syllabus variations may be notified by conducting bodies for specific recruitment cycles.
        </p>
      </div>

      {/* Exam Cards Grid */}
      <div className="space-y-4">
        {exams.map((exam) => {
          const isExpanded = expandedExamId === exam.id;
          const isSaved = savedExamIds.includes(exam.id);

          return (
            <div
              key={exam.id}
              className="bg-white border border-slate-200 rounded-lg overflow-hidden transition-all duration-200"
            >
              {/* Card Summary Header */}
              <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                    <span className="font-semibold text-slate-700">{exam.conductingOrganization}</span>
                    <span aria-hidden="true">·</span>
                    <span>{exam.frequency}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 leading-snug">
                    {exam.name}
                  </h3>

                  <div className="flex items-center gap-2 text-xs text-slate-600 flex-wrap">
                    <span className="font-medium text-slate-800">{exam.targetRole}</span>
                    <span aria-hidden="true" className="text-slate-300">·</span>
                    <span>Negative: {exam.negativeMarking}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => toggleSaveExam(exam.id)}
                    className={`p-2 rounded transition-colors ${
                      isSaved
                        ? 'text-sky-700 bg-sky-50 hover:bg-sky-100'
                        : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                    }`}
                    title={isSaved ? 'Exam saved in dashboard' : 'Save exam to dashboard'}
                  >
                    {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                  </button>

                  <a
                    href={exam.officialWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded transition-colors"
                    title="Visit Official Portal"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  <button
                    onClick={() => setExpandedExamId(isExpanded ? null : exam.id)}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded transition-colors flex items-center gap-1"
                  >
                    <span>{isExpanded ? 'Collapse' : 'View Pattern & Syllabus'}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Expanded Details Section */}
              {isExpanded && (
                <div className="border-t border-slate-200 bg-slate-50/70 p-5 sm:p-6 space-y-6 text-xs text-slate-700">
                  {/* Eligibility & Stages */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white border border-slate-200 rounded p-4 space-y-2">
                      <span className="text-[11px] font-bold text-slate-900 uppercase tracking-wider block">
                        Eligibility Criteria
                      </span>
                      <p className="leading-relaxed text-slate-700">
                        {exam.eligibility}
                      </p>
                    </div>

                    <div className="bg-white border border-slate-200 rounded p-4 space-y-2">
                      <span className="text-[11px] font-bold text-slate-900 uppercase tracking-wider block">
                        Selection Scheme & Stages
                      </span>
                      <ul className="space-y-1">
                        {exam.selectionStages.map((stage, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-slate-400 font-mono">{idx + 1}.</span>
                            <span>{stage}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Exam Pattern Structure Table */}
                  <div>
                    <span className="text-[11px] font-bold text-slate-900 uppercase tracking-wider block mb-2">
                      Question Paper Blueprint
                    </span>
                    <div className="bg-white border border-slate-200 rounded overflow-hidden">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                            <th className="p-2.5">Section Name</th>
                            <th className="p-2.5">Questions</th>
                            <th className="p-2.5">Max Marks</th>
                            <th className="p-2.5">Duration</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-mono">
                          {exam.patternSections.map((sec, idx) => (
                            <tr key={idx} className="hover:bg-slate-50">
                              <td className="p-2.5 font-sans font-medium text-slate-900">{sec.name}</td>
                              <td className="p-2.5">{sec.questions} Qs</td>
                              <td className="p-2.5">{sec.marks} Marks</td>
                              <td className="p-2.5">{sec.durationMinutes} mins</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Negative Marking Rule: {exam.negativeMarking}
                    </p>
                  </div>

                  {/* Core Syllabus Breakdown */}
                  <div>
                    <span className="text-[11px] font-bold text-slate-900 uppercase tracking-wider block mb-2">
                      Syllabus Topics Breakdown
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Tech Core */}
                      <div className="bg-white border border-slate-200 rounded p-4 space-y-2">
                        <span className="font-semibold text-slate-900 block text-xs border-b border-slate-100 pb-1.5">
                          Core Computer Science & Engineering
                        </span>
                        <ul className="space-y-1.5 pl-1">
                          {exam.syllabusOverview.technicalCore.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle className="w-3.5 h-3.5 text-sky-700 shrink-0 mt-0.5" />
                              <span className="leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Specialized & General */}
                      <div className="space-y-4">
                        <div className="bg-white border border-slate-200 rounded p-4 space-y-2">
                          <span className="font-semibold text-slate-900 block text-xs border-b border-slate-100 pb-1.5">
                            Specialized Topics / Architecture
                          </span>
                          <ul className="space-y-1.5 pl-1">
                            {exam.syllabusOverview.specialized.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <CheckCircle className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                                <span className="leading-relaxed">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-white border border-slate-200 rounded p-4 space-y-2">
                          <span className="font-semibold text-slate-900 block text-xs border-b border-slate-100 pb-1.5">
                            General Aptitude & Reasoning
                          </span>
                          <ul className="space-y-1.5 pl-1">
                            {exam.syllabusOverview.generalAptitude.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <CheckCircle className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                                <span className="leading-relaxed">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Bar inside Expanded */}
                  <div className="pt-2 flex items-center justify-between flex-wrap gap-3 border-t border-slate-200">
                    <button
                      onClick={() => setActiveTab('study')}
                      className="px-4 py-2 bg-sky-700 hover:bg-sky-800 text-white rounded text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Open Study Prep & Take Practice Quiz</span>
                    </button>

                    <div className="flex items-center gap-2">
                      {exam.previousYearPaperUrl && (
                        <a
                          href={exam.previousYearPaperUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded text-xs font-medium flex items-center gap-1"
                        >
                          <FileText className="w-3.5 h-3.5 text-slate-500" />
                          <span>Official Previous Papers</span>
                        </a>
                      )}
                      <a
                        href={exam.officialWebsite}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-medium flex items-center gap-1"
                      >
                        <span>Official Portal</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
