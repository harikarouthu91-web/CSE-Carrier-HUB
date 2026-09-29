import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { QuizQuestion, StudyTopic } from '../types';
import {
  BookOpen,
  CheckCircle2,
  HelpCircle,
  RotateCcw,
  Check,
  ChevronRight,
  ExternalLink,
  Award,
  Layers,
  FileText,
  Clock,
  Sparkles
} from 'lucide-react';

export const StudySection: React.FC = () => {
  const { studyTopics, updateTopicStatus, quizQuestions, exams } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'topics' | 'quiz' | 'papers' | 'planner'>('topics');
  const [selectedTopic, setSelectedTopic] = useState<StudyTopic>(studyTopics[0]);

  // Quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const completedCount = studyTopics.filter((t) => t.status === 'Completed').length;
  const inProgressCount = studyTopics.filter((t) => t.status === 'In Progress').length;
  const progressPercent = Math.round((completedCount / studyTopics.length) * 100);

  const currentQ = quizQuestions[currentQuestionIndex];

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);
    setAnsweredCount((prev) => prev + 1);
    if (selectedOption === currentQ.correctOptionIndex) {
      setQuizScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleResetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setQuizScore(0);
    setAnsweredCount(0);
    setQuizFinished(false);
  };

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="relative rounded-lg overflow-hidden border border-slate-800 bg-slate-900 text-white min-h-[220px] flex flex-col justify-end p-6 sm:p-8">
        <img
          src="/src/assets/images/study_prep_workspace_1790659593038.jpg"
          alt="Technical study desk with computer science algorithms and engineering books"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent" />

        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 text-xs text-sky-400 font-mono mb-1">
            <BookOpen className="w-3.5 h-3.5" />
            <span>CSE TECHNICAL PREPARATION WORKSPACE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2 text-white">
            Syllabus, Practice & Revision Hub
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl">
            Target high-yield topics frequently tested across ISRO, DRDO RAC, NIC Scientist 'B', and PSU examinations. Track topic mastery and evaluate with standard MCQs.
          </p>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg text-xs font-medium border border-slate-200">
        <button
          onClick={() => setActiveSubTab('topics')}
          className={`px-3.5 py-1.5 rounded transition-colors ${
            activeSubTab === 'topics'
              ? 'bg-white text-slate-900 shadow-xs font-semibold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          High-Yield Topics & Notes
        </button>
        <button
          onClick={() => setActiveSubTab('quiz')}
          className={`px-3.5 py-1.5 rounded transition-colors flex items-center gap-1.5 ${
            activeSubTab === 'quiz'
              ? 'bg-white text-slate-900 shadow-xs font-semibold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>Practice Question Bank</span>
          <span className="font-mono text-[10px] bg-sky-100 text-sky-800 px-1.5 rounded">
            {quizQuestions.length} Qs
          </span>
        </button>
        <button
          onClick={() => setActiveSubTab('planner')}
          className={`px-3.5 py-1.5 rounded transition-colors flex items-center gap-1.5 ${
            activeSubTab === 'planner'
              ? 'bg-white text-slate-900 shadow-xs font-semibold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>Study Planner ({progressPercent}%)</span>
        </button>
        <button
          onClick={() => setActiveSubTab('papers')}
          className={`px-3.5 py-1.5 rounded transition-colors ${
            activeSubTab === 'papers'
              ? 'bg-white text-slate-900 shadow-xs font-semibold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Previous Papers Archive
        </button>
      </div>

      {/* TAB 1: High Yield Topics & Detailed Revision */}
      {activeSubTab === 'topics' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Topic List (Col 1) */}
          <div className="bg-white border border-slate-200 rounded-lg p-4 space-y-2">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              High-Frequency CSE Modules
            </h3>
            <div className="space-y-1.5">
              {studyTopics.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => setSelectedTopic(topic)}
                  className={`w-full text-left p-3 rounded transition-all text-xs border ${
                    selectedTopic.id === topic.id
                      ? 'bg-sky-50/70 border-sky-300 text-slate-900 font-semibold'
                      : 'border-slate-100 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-mono text-slate-500 uppercase">
                      {topic.subject}
                    </span>
                    <span
                      className={`text-[10px] font-mono ${
                        topic.weightage === 'High' ? 'text-red-700 font-bold' : 'text-slate-600'
                      }`}
                    >
                      {topic.weightage} Weightage
                    </span>
                  </div>
                  <div className="font-medium text-slate-900">{topic.topicName}</div>
                  <div className="mt-1 flex items-center justify-between text-[11px] text-slate-500">
                    <span
                      className={
                        topic.status === 'Completed'
                          ? 'text-emerald-700 font-medium'
                          : topic.status === 'In Progress'
                          ? 'text-amber-700 font-medium'
                          : 'text-slate-400'
                      }
                    >
                      Status: {topic.status}
                    </span>
                    <ChevronRight className="w-3 h-3 text-slate-400" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Topic Detail View (Col 2 & 3) */}
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-lg p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-sky-700 font-mono mb-1">
                  <span>{selectedTopic.subject}</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedTopic.weightage} Frequency</span>
                </div>
                <h2 className="text-xl font-bold text-slate-900">
                  {selectedTopic.topicName}
                </h2>
              </div>

              {/* Status Selector */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-medium">Status:</span>
                <select
                  value={selectedTopic.status}
                  onChange={(e) =>
                    updateTopicStatus(
                      selectedTopic.id,
                      e.target.value as StudyTopic['status']
                    )
                  }
                  className="text-xs bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-sky-500 font-medium"
                >
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                Exam Relevance & Significance
              </h4>
              <p className="text-slate-700 text-sm leading-relaxed">
                {selectedTopic.description}
              </p>
            </div>

            {/* Key Concepts Checklist */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                Mandatory Concepts To Master
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm">
                {selectedTopic.keyConcepts.map((concept, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 p-2 rounded hover:bg-slate-50">
                    <span className="w-5 h-5 rounded bg-slate-100 text-slate-700 font-mono text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="text-slate-800 leading-relaxed font-medium">
                      {concept}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Tip: Test your grasp on this concept in the Practice Question Bank.
              </span>
              <button
                onClick={() => setActiveSubTab('quiz')}
                className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-semibold flex items-center gap-1.5"
              >
                <span>Launch Practice Test</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Interactive Practice Quiz */}
      {activeSubTab === 'quiz' && (
        <div className="bg-white border border-slate-200 rounded-lg p-6 max-w-3xl mx-auto space-y-6">
          {!quizFinished ? (
            <>
              {/* Quiz Progress Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[11px] font-mono text-slate-500 uppercase block">
                    {currentQ.subject} {currentQ.previousExamReference && `· ${currentQ.previousExamReference}`}
                  </span>
                  <span className="text-sm font-semibold text-slate-900">
                    Question {currentQuestionIndex + 1} of {quizQuestions.length}
                  </span>
                </div>
                <div className="text-right font-mono text-xs">
                  <span className="text-slate-400 block text-[10px]">CURRENT SCORE</span>
                  <span className="font-bold text-sky-700">
                    {quizScore} / {answeredCount}
                  </span>
                </div>
              </div>

              {/* Question Statement */}
              <div className="space-y-3">
                <p className="text-sm sm:text-base font-semibold text-slate-900 leading-relaxed">
                  {currentQ.question}
                </p>
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {currentQ.options.map((option, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect = idx === currentQ.correctOptionIndex;

                  let optionStyle = 'border-slate-200 hover:bg-slate-50 text-slate-800';
                  if (isAnswerSubmitted) {
                    if (isCorrect) {
                      optionStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-medium';
                    } else if (isSelected && !isCorrect) {
                      optionStyle = 'border-red-400 bg-red-50 text-red-900';
                    }
                  } else if (isSelected) {
                    optionStyle = 'border-sky-500 bg-sky-50/70 text-slate-900 font-medium ring-1 ring-sky-500';
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={isAnswerSubmitted}
                      className={`w-full text-left p-3.5 rounded border text-xs sm:text-sm flex items-start gap-3 transition-colors ${optionStyle}`}
                    >
                      <span className="w-5 h-5 rounded-full border border-current font-mono text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="flex-1 leading-relaxed">{option}</span>
                    </button>
                  );
                })}
              </div>

              {/* Answer Explanation & Next Control */}
              {isAnswerSubmitted && (
                <div className="p-4 bg-slate-50 border border-slate-200 rounded text-xs space-y-2 animate-in fade-in duration-200">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900">
                    <Sparkles className="w-4 h-4 text-sky-700" />
                    <span>Technical Explanation:</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    {currentQ.explanation}
                  </p>
                </div>
              )}

              {/* Controls */}
              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={handleResetQuiz}
                  className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-900 flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restart Quiz</span>
                </button>

                {!isAnswerSubmitted ? (
                  <button
                    onClick={handleSubmitAnswer}
                    disabled={selectedOption === null}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white rounded text-xs font-semibold transition-colors"
                  >
                    Submit Answer
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    className="px-4 py-2 bg-sky-700 hover:bg-sky-800 text-white rounded text-xs font-semibold transition-colors flex items-center gap-1.5"
                  >
                    <span>
                      {currentQuestionIndex < quizQuestions.length - 1
                        ? 'Next Question'
                        : 'Finish & View Summary'}
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </>
          ) : (
            /* Quiz Completed View */
            <div className="text-center py-8 space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto border border-emerald-200">
                <Award className="w-6 h-6" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Practice Assessment Complete!
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm mt-1">
                  You scored <span className="font-bold text-slate-900 font-mono text-base">{quizScore}</span> out of{' '}
                  <span className="font-bold font-mono text-base">{quizQuestions.length}</span> ({Math.round((quizScore / quizQuestions.length) * 100)}%).
                </p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded max-w-md mx-auto text-xs text-slate-600 text-left space-y-2">
                <span className="font-semibold text-slate-800 block">
                  Recommended Next Steps:
                </span>
                <p>
                  Review high-frequency OS & Network subnetting formulas. Regular practice with previous year question sets is key for ISRO and NIC technical screening.
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleResetQuiz}
                  className="px-4 py-2 bg-slate-900 text-white rounded text-xs font-semibold hover:bg-slate-800 transition-colors"
                >
                  Take Quiz Again
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: Study Planner */}
      {activeSubTab === 'planner' && (
        <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Personal CSE Government Exam Study Planner
              </h2>
              <p className="text-xs text-slate-600 mt-0.5">
                Check off core subject milestones as you revise. Progress automatically synchronizes with your local browser storage.
              </p>
            </div>

            <div className="text-left sm:text-right font-mono">
              <span className="text-xs text-slate-500 block">SYLLABUS PROGRESS</span>
              <span className="text-xl font-bold text-sky-700">{progressPercent}%</span>
              <span className="text-[11px] text-slate-500 block">
                {completedCount} of {studyTopics.length} Modules Mastered
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-sky-600 h-full transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Topics Checklist */}
          <div className="divide-y divide-slate-100">
            {studyTopics.map((topic) => (
              <div
                key={topic.id}
                className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                    <span className="font-semibold text-slate-700">{topic.subject}</span>
                    <span aria-hidden="true">·</span>
                    <span className={topic.weightage === 'High' ? 'text-red-700 font-bold' : ''}>
                      {topic.weightage} Priority
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-slate-900 mt-0.5">
                    {topic.topicName}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                    {topic.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {(['Not Started', 'In Progress', 'Completed'] as const).map((status) => (
                    <button
                      key={status}
                      onClick={() => updateTopicStatus(topic.id, status)}
                      className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                        topic.status === status
                          ? status === 'Completed'
                            ? 'bg-emerald-600 text-white font-semibold'
                            : status === 'In Progress'
                            ? 'bg-amber-600 text-white font-semibold'
                            : 'bg-slate-800 text-white font-semibold'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: Previous Papers Archive */}
      {activeSubTab === 'papers' && (
        <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Official Previous Question Papers Archive
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">
              Access authentic prior papers directly from official government recruiting repositories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {exams.map((exam) => (
              <div
                key={exam.id}
                className="p-4 border border-slate-200 rounded-lg bg-slate-50/50 space-y-2 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">
                    {exam.conductingOrganization}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 mt-0.5">
                    {exam.name}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                    {exam.examPatternSummary}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-mono">
                    Negative: {exam.negativeMarking}
                  </span>
                  {exam.previousYearPaperUrl ? (
                    <a
                      href={exam.previousYearPaperUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-medium flex items-center gap-1"
                    >
                      <FileText className="w-3 h-3" />
                      <span>Download Archive</span>
                      <ExternalLink className="w-2.5 h-2.5 text-slate-400" />
                    </a>
                  ) : (
                    <a
                      href={exam.officialWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-slate-200 text-slate-700 hover:bg-slate-300 rounded text-xs font-medium flex items-center gap-1"
                    >
                      <span>Official Website</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
