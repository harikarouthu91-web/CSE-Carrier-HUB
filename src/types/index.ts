export type JobCategory =
  | 'Software/IT'
  | 'Computer Science'
  | 'Cybersecurity'
  | 'Data/AI'
  | 'Networking'
  | 'Technical Officer'
  | 'Programmer'
  | 'Scientific/Research roles'
  | 'PSU technical jobs'
  | 'Government technical assistant roles';

export type OrganizationType =
  | 'Scientific & Research'
  | 'Central Ministry / Department'
  | 'Public Sector Undertaking (PSU)'
  | 'Banking & Financial Regulatory'
  | 'Defence & Space'
  | 'State Government';

export type DegreeQualification =
  | 'B.Tech / B.E. (CSE/IT)'
  | 'M.Tech / M.E. (CSE/IT)'
  | 'MCA'
  | 'M.Sc (CS/IT)'
  | 'BCA / B.Sc (CS/IT)'
  | 'Diploma (CS/IT)';

export type ExamRequirement = 'GATE Score' | 'Direct Written Exam' | 'Interview Only' | 'Non-GATE';

export interface GovJob {
  id: string;
  title: string;
  organization: string;
  organizationType: OrganizationType;
  category: JobCategory;
  eligibility: string;
  educationalQualification: string[];
  branches: string[];
  minimumPercentage?: string;
  ageLimit: string;
  vacancies: number;
  salaryPayLevel: string; // e.g. "Pay Level 10 (₹56,100 - ₹1,77,500)"
  monthlyGrossApprox?: string; // e.g. "₹95,000/month approx."
  startDate: string; // YYYY-MM-DD
  lastDate: string; // YYYY-MM-DD
  examDate?: string;
  jobLocation: string;
  officialNotificationUrl: string;
  officialApplyUrl: string;
  examRequirement: ExamRequirement;
  selectionProcess: string[];
  description: string;
  isDemoData: boolean;
  featured?: boolean;
  closingSoonDays?: number;
}

export interface ExamPatternSection {
  name: string;
  questions: number;
  marks: number;
  durationMinutes: number;
}

export interface GovExam {
  id: string;
  name: string;
  shortName: string;
  conductingOrganization: string;
  targetRole: string;
  eligibility: string;
  frequency: string;
  examPatternSummary: string;
  negativeMarking: string;
  selectionStages: string[];
  patternSections: ExamPatternSection[];
  syllabusOverview: {
    generalAptitude: string[];
    technicalCore: string[];
    specialized: string[];
  };
  importantDates: {
    notificationTentative: string;
    applicationWindow: string;
    examDate: string;
  };
  officialWebsite: string;
  previousYearPaperUrl?: string;
}

export type ApplicationStatus =
  | 'Bookmarked'
  | 'Applied'
  | 'Admit Card Released'
  | 'Exam Attended'
  | 'Interview'
  | 'Result Declared';

export interface ApplicationTrackItem {
  jobId: string;
  status: ApplicationStatus;
  appliedDate?: string;
  registrationNumber?: string;
  rollNumber?: string;
  examDate?: string;
  notes?: string;
  updatedAt: string;
}

export interface StudyTopic {
  id: string;
  subject: string;
  topicName: string;
  weightage: 'High' | 'Medium' | 'Low';
  description: string;
  keyConcepts: string[];
  status: 'Not Started' | 'In Progress' | 'Completed';
}

export interface QuizQuestion {
  id: string;
  subject: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  previousExamReference?: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'job' | 'deadline' | 'exam' | 'admit_card' | 'result' | 'system';
  date: string;
  read: boolean;
  linkId?: string;
}
