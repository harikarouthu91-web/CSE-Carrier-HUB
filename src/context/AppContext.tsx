import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  GovJob,
  GovExam,
  StudyTopic,
  QuizQuestion,
  AppNotification,
  ApplicationTrackItem,
  ApplicationStatus,
  JobCategory
} from '../types';
import {
  INITIAL_JOBS,
  INITIAL_EXAMS,
  INITIAL_STUDY_TOPICS,
  INITIAL_QUIZ_QUESTIONS,
  INITIAL_NOTIFICATIONS
} from '../data/mockData';

interface AppContextType {
  jobs: GovJob[];
  exams: GovExam[];
  studyTopics: StudyTopic[];
  quizQuestions: QuizQuestion[];
  notifications: AppNotification[];
  savedJobIds: string[];
  savedExamIds: string[];
  applications: Record<string, ApplicationTrackItem>;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedJob: GovJob | null;
  setSelectedJob: (job: GovJob | null) => void;
  selectedExam: GovExam | null;
  setSelectedExam: (exam: GovExam | null) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedQualification: string;
  setSelectedQualification: (qual: string) => void;
  selectedOrgType: string;
  setSelectedOrgType: (org: string) => void;
  selectedExamReq: string;
  setSelectedExamReq: (req: string) => void;
  toggleSaveJob: (jobId: string) => void;
  toggleSaveExam: (examId: string) => void;
  updateApplicationStatus: (
    jobId: string,
    status: ApplicationStatus,
    notes?: string,
    registrationNumber?: string,
    rollNumber?: string
  ) => void;
  removeApplication: (jobId: string) => void;
  updateTopicStatus: (topicId: string, status: 'Not Started' | 'In Progress' | 'Completed') => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  addNotification: (notif: { title: string; message: string; type: AppNotification['type']; linkId?: string }) => void;
  addJob: (newJob: GovJob) => void;
  updateJob: (updatedJob: GovJob) => void;
  deleteJob: (jobId: string) => void;
  resetToDemoData: () => void;
  downloadIcsReminder: (job: GovJob) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Jobs
  const [jobs, setJobs] = useState<GovJob[]>(() => {
    const saved = localStorage.getItem('govtech_jobs');
    return saved ? JSON.parse(saved) : INITIAL_JOBS;
  });

  // Exams
  const [exams, setExams] = useState<GovExam[]>(() => {
    const saved = localStorage.getItem('govtech_exams');
    return saved ? JSON.parse(saved) : INITIAL_EXAMS;
  });

  // Study Topics
  const [studyTopics, setStudyTopics] = useState<StudyTopic[]>(() => {
    const saved = localStorage.getItem('govtech_study_topics');
    return saved ? JSON.parse(saved) : INITIAL_STUDY_TOPICS;
  });

  // Quiz Questions
  const [quizQuestions] = useState<QuizQuestion[]>(INITIAL_QUIZ_QUESTIONS);

  // Notifications
  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    const saved = localStorage.getItem('govtech_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  // Saved Jobs & Exams
  const [savedJobIds, setSavedJobIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('govtech_saved_jobs');
    return saved ? JSON.parse(saved) : ['isro-sc-cs-2026', 'nic-scientist-b-2026'];
  });

  const [savedExamIds, setSavedExamIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('govtech_saved_exams');
    return saved ? JSON.parse(saved) : ['isro-icrb-exam'];
  });

  // Applications Tracker
  const [applications, setApplications] = useState<Record<string, ApplicationTrackItem>>(() => {
    const saved = localStorage.getItem('govtech_applications');
    if (saved) return JSON.parse(saved);
    return {
      'isro-sc-cs-2026': {
        jobId: 'isro-sc-cs-2026',
        status: 'Applied',
        appliedDate: '2026-09-20',
        registrationNumber: 'ISRO-ICRB-2026-CS-8921',
        rollNumber: 'BLR-90412',
        notes: 'Chose Bengaluru exam center. Keep photo ID ready.',
        updatedAt: '2026-09-20'
      },
      'nic-scientist-b-2026': {
        jobId: 'nic-scientist-b-2026',
        status: 'Bookmarked',
        notes: 'Need to get degree certificate signed by college registrar.',
        updatedAt: '2026-09-22'
      }
    };
  });

  // Navigation & Modals
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedJob, setSelectedJob] = useState<GovJob | null>(null);
  const [selectedExam, setSelectedExam] = useState<GovExam | null>(null);

  // Global Filter State
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedQualification, setSelectedQualification] = useState<string>('all');
  const [selectedOrgType, setSelectedOrgType] = useState<string>('all');
  const [selectedExamReq, setSelectedExamReq] = useState<string>('all');

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem('govtech_jobs', JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem('govtech_exams', JSON.stringify(exams));
  }, [exams]);

  useEffect(() => {
    localStorage.setItem('govtech_study_topics', JSON.stringify(studyTopics));
  }, [studyTopics]);

  useEffect(() => {
    localStorage.setItem('govtech_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('govtech_saved_jobs', JSON.stringify(savedJobIds));
  }, [savedJobIds]);

  useEffect(() => {
    localStorage.setItem('govtech_saved_exams', JSON.stringify(savedExamIds));
  }, [savedExamIds]);

  useEffect(() => {
    localStorage.setItem('govtech_applications', JSON.stringify(applications));
  }, [applications]);

  // Actions
  const toggleSaveJob = (jobId: string) => {
    setSavedJobIds((prev) => {
      const exists = prev.includes(jobId);
      if (exists) {
        return prev.filter((id) => id !== jobId);
      } else {
        // Also add to applications tracker as Bookmarked if not present
        if (!applications[jobId]) {
          setApplications((prevApps) => ({
            ...prevApps,
            [jobId]: {
              jobId,
              status: 'Bookmarked',
              updatedAt: new Date().toISOString().split('T')[0]
            }
          }));
        }
        return [...prev, jobId];
      }
    });
  };

  const toggleSaveExam = (examId: string) => {
    setSavedExamIds((prev) =>
      prev.includes(examId) ? prev.filter((id) => id !== examId) : [...prev, examId]
    );
  };

  const updateApplicationStatus = (
    jobId: string,
    status: ApplicationStatus,
    notes?: string,
    registrationNumber?: string,
    rollNumber?: string
  ) => {
    setApplications((prev) => ({
      ...prev,
      [jobId]: {
        jobId,
        status,
        notes: notes ?? prev[jobId]?.notes,
        registrationNumber: registrationNumber ?? prev[jobId]?.registrationNumber,
        rollNumber: rollNumber ?? prev[jobId]?.rollNumber,
        appliedDate: status === 'Applied' && !prev[jobId]?.appliedDate ? new Date().toISOString().split('T')[0] : prev[jobId]?.appliedDate,
        updatedAt: new Date().toISOString().split('T')[0]
      }
    }));
    // ensure job is in savedJobIds as well
    if (!savedJobIds.includes(jobId)) {
      setSavedJobIds((prev) => [...prev, jobId]);
    }
  };

  const removeApplication = (jobId: string) => {
    setApplications((prev) => {
      const copy = { ...prev };
      delete copy[jobId];
      return copy;
    });
  };

  const updateTopicStatus = (topicId: string, status: 'Not Started' | 'In Progress' | 'Completed') => {
    setStudyTopics((prev) =>
      prev.map((t) => (t.id === topicId ? { ...t, status } : t))
    );
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const addNotification = (notif: {
    title: string;
    message: string;
    type: AppNotification['type'];
    linkId?: string;
  }) => {
    const newNotif: AppNotification = {
      id: 'notif-' + Date.now(),
      title: notif.title,
      message: notif.message,
      type: notif.type,
      date: new Date().toISOString().split('T')[0],
      read: false,
      linkId: notif.linkId
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const addJob = (newJob: GovJob) => {
    setJobs((prev) => [newJob, ...prev]);
    addNotification({
      title: `New Job Added: ${newJob.title}`,
      message: `${newJob.organization} has published a recruitment opening. Deadline: ${newJob.lastDate}`,
      type: 'job',
      linkId: newJob.id
    });
  };

  const updateJob = (updatedJob: GovJob) => {
    setJobs((prev) => prev.map((j) => (j.id === updatedJob.id ? updatedJob : j)));
  };

  const deleteJob = (jobId: string) => {
    setJobs((prev) => prev.filter((j) => j.id !== jobId));
    setSavedJobIds((prev) => prev.filter((id) => id !== jobId));
    removeApplication(jobId);
  };

  const resetToDemoData = () => {
    setJobs(INITIAL_JOBS);
    setExams(INITIAL_EXAMS);
    setStudyTopics(INITIAL_STUDY_TOPICS);
    setNotifications(INITIAL_NOTIFICATIONS);
    localStorage.removeItem('govtech_jobs');
    localStorage.removeItem('govtech_exams');
    localStorage.removeItem('govtech_study_topics');
    localStorage.removeItem('govtech_notifications');
  };

  const downloadIcsReminder = (job: GovJob) => {
    // Generate valid iCalendar (.ics) format
    const deadlineStr = job.lastDate.replace(/-/g, '');
    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//GovTech Careers//Government Jobs Portal//EN',
      'CALSCALE:GREGORIAN',
      'BEGIN:VEVENT',
      `UID:${job.id}@govtechcareers.in`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `DTSTART;VALUE=DATE:${deadlineStr}`,
      `DTEND;VALUE=DATE:${deadlineStr}`,
      `SUMMARY:LAST DATE: ${job.title} - ${job.organization}`,
      `DESCRIPTION:Application deadline for ${job.title} at ${job.organization}. Apply on official portal: ${job.officialApplyUrl}\\n\\nNotice: Always verify details from the official gazette notification before applying.`,
      `URL:${job.officialApplyUrl}`,
      'STATUS:CONFIRMED',
      'BEGIN:VALARM',
      'TRIGGER:-P1D',
      'ACTION:DISPLAY',
      'DESCRIPTION:Reminder: Application closes tomorrow for ' + job.title,
      'END:VALARM',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${job.id}-deadline-reminder.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AppContext.Provider
      value={{
        jobs,
        exams,
        studyTopics,
        quizQuestions,
        notifications,
        savedJobIds,
        savedExamIds,
        applications,
        activeTab,
        setActiveTab,
        selectedJob,
        setSelectedJob,
        selectedExam,
        setSelectedExam,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedQualification,
        setSelectedQualification,
        selectedOrgType,
        setSelectedOrgType,
        selectedExamReq,
        setSelectedExamReq,
        toggleSaveJob,
        toggleSaveExam,
        updateApplicationStatus,
        removeApplication,
        updateTopicStatus,
        markNotificationRead,
        markAllNotificationsRead,
        addNotification,
        addJob,
        updateJob,
        deleteJob,
        resetToDemoData,
        downloadIcsReminder
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
