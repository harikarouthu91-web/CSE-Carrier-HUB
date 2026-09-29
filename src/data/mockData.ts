import { GovJob, GovExam, StudyTopic, QuizQuestion, AppNotification } from '../types';

export const INITIAL_JOBS: GovJob[] = [
  {
    id: 'isro-sc-cs-2026',
    title: 'Scientist / Engineer \'SC\' (Computer Science)',
    organization: 'Indian Space Research Organisation (ISRO)',
    organizationType: 'Defence & Space',
    category: 'Scientific/Research roles',
    eligibility: 'B.E. / B.Tech or equivalent in Computer Science & Engineering with aggregate minimum 65% marks or 6.84/10 CGPA.',
    educationalQualification: [
      'B.E. / B.Tech in Computer Science & Engineering',
      'B.Tech in Information Technology',
      'Integrated M.Tech (CSE)'
    ],
    branches: ['Computer Science', 'Information Technology', 'Software Engineering'],
    minimumPercentage: '65% or 6.84 CGPA',
    ageLimit: '18 to 28 years (Relaxation: 3 years for OBC, 5 years for SC/ST)',
    vacancies: 48,
    salaryPayLevel: 'Pay Level 10 (₹56,100 - ₹1,77,500)',
    monthlyGrossApprox: '₹95,000 / month + HRA & DA',
    startDate: '2026-09-15',
    lastDate: '2026-10-14',
    examDate: '2026-12-06',
    jobLocation: 'Bengaluru / Ahmedabad / Thiruvananthapuram',
    officialNotificationUrl: 'https://www.isro.gov.in/Careers.html',
    officialApplyUrl: 'https://www.isro.gov.in/icrb.html',
    examRequirement: 'Direct Written Exam',
    selectionProcess: [
      'Written Test (Part A: Core Discipline 80 marks + Part B: General Aptitude 20 marks)',
      'Interview (Minimum 50/100 to qualify)',
      'Empanelment based on 50% Written + 50% Interview weightage'
    ],
    description: 'ISRO Centralised Recruitment Board (ICRB) invites online applications for the post of Scientist/Engineer \'SC\' in Level 10 of Pay Matrix for Computer Science engineers across ISRO/DOS centres.',
    isDemoData: true,
    featured: true,
    closingSoonDays: 16
  },
  {
    id: 'nic-scientist-b-2026',
    title: 'Scientist \'B\' (Computer Science & IT)',
    organization: 'National Informatics Centre (NIC) / MeitY',
    organizationType: 'Central Ministry / Department',
    category: 'Computer Science',
    eligibility: 'Bachelor Degree in Engineering or Technology in Computer Science/IT or MCA/M.Sc in Computer Science with First Class.',
    educationalQualification: [
      'B.Tech / B.E. (Computer Science / IT)',
      'MCA (Master of Computer Applications)',
      'M.Sc Computer Science / IT',
      'M.Tech in CSE / Software Systems'
    ],
    branches: ['Computer Science', 'Information Technology', 'Computer Applications'],
    minimumPercentage: '60% or 6.5 CGPA',
    ageLimit: 'Up to 30 years for General/EWS (33 for OBC, 35 for SC/ST)',
    vacancies: 142,
    salaryPayLevel: 'Pay Level 10 (₹56,100 - ₹1,77,500)',
    monthlyGrossApprox: '₹92,500 / month (Class A Cities)',
    startDate: '2026-09-20',
    lastDate: '2026-10-05',
    examDate: '2026-11-22',
    jobLocation: 'Pan-India (New Delhi HQ and State Centres)',
    officialNotificationUrl: 'https://www.nic.in/recruitment/',
    officialApplyUrl: 'https://www.calicut.nielit.in/nic26/',
    examRequirement: 'Direct Written Exam',
    selectionProcess: [
      'OMR-based Written Test (120 Questions: 65% Core Computer Science, 35% Generic Aptitude)',
      'Personal Interview (for candidates shortlisted 1:3 ratio)',
      'Document Verification & Medical Fitness'
    ],
    description: 'National Informatics Centre under the Ministry of Electronics & IT invites bright, tech-driven CSE graduates to develop national digital infrastructure, DigiLocker, UPI interfaces, and egovernance applications.',
    isDemoData: true,
    featured: true,
    closingSoonDays: 7
  },
  {
    id: 'drdo-rac-sc-b-2026',
    title: 'Scientist \'B\' (Computer Science & Engineering)',
    organization: 'Defence Research and Development Organisation (DRDO)',
    organizationType: 'Defence & Space',
    category: 'Scientific/Research roles',
    eligibility: 'At least First Class Bachelor Degree in Engineering or Technology in Computer Science from a recognized University + Valid GATE Score in CS.',
    educationalQualification: [
      'B.E. / B.Tech in Computer Science & Engineering',
      'B.Tech in Information Technology'
    ],
    branches: ['Computer Science', 'Information Technology'],
    minimumPercentage: 'First Class (60% or 6.75 CGPA)',
    ageLimit: 'Not exceeding 28 years (Relaxations as per Central Govt. Rules)',
    vacancies: 35,
    salaryPayLevel: 'Pay Level 10 (₹56,100 - ₹1,77,500)',
    monthlyGrossApprox: '₹98,000 / month approx.',
    startDate: '2026-09-01',
    lastDate: '2026-10-02',
    examDate: 'Screening via GATE CS + Personal Interview',
    jobLocation: 'Bengaluru (CAIR / ADE), Hyderabad, New Delhi',
    officialNotificationUrl: 'https://rac.gov.in',
    officialApplyUrl: 'https://rac.gov.in/index.php?lang=en&id=0',
    examRequirement: 'GATE Score',
    selectionProcess: [
      'Shortlisting based on valid GATE Computer Science score (1:10 ratio)',
      'Personal Interview at RAC, Delhi (80% weightage GATE + 20% Interview)',
      'Final Merit List'
    ],
    description: 'Recruitment & Assessment Centre (RAC) DRDO recruits Scientist \'B\' in Computer Science to work on mission-critical airborne defense systems, cyber security operations, and autonomous vehicle computing.',
    isDemoData: true,
    featured: true,
    closingSoonDays: 4
  },
  {
    id: 'cdac-project-engineer-2026',
    title: 'Project Engineer (AI & High Performance Computing)',
    organization: 'Centre for Development of Advanced Computing (C-DAC)',
    organizationType: 'Central Ministry / Department',
    category: 'Data/AI',
    eligibility: 'B.E./B.Tech in CSE/IT or MCA with minimum 65% marks. Prior experience in Python, PyTorch, C++ or distributed computing preferred.',
    educationalQualification: [
      'B.E. / B.Tech in CSE / IT',
      'MCA (Master of Computer Applications)',
      'M.Tech in AI / Data Science / CSE'
    ],
    branches: ['Computer Science', 'Information Technology', 'Data Science', 'AI'],
    minimumPercentage: '65% aggregate',
    ageLimit: 'Below 30 years as on closing date',
    vacancies: 75,
    salaryPayLevel: 'Consolidated ₹40,000 - ₹65,000 / month based on profile',
    monthlyGrossApprox: '₹55,000 / month',
    startDate: '2026-09-18',
    lastDate: '2026-10-18',
    examDate: '2026-11-15',
    jobLocation: 'Pune, Bengaluru, Noida, Hyderabad',
    officialNotificationUrl: 'https://cdac.in/index.aspx?id=career',
    officialApplyUrl: 'https://careers.cdac.in/',
    examRequirement: 'Direct Written Exam',
    selectionProcess: [
      'Computer-Based Technical Assessment (Algorithms, Python, ML, System Design)',
      'Technical Interview (Domain & Coding Problem)',
      'Offer of Appointment'
    ],
    description: 'C-DAC requires bright software and machine learning engineers to contribute to the National Supercomputing Mission (NSM), Param supercomputers, and multilingual generative AI models.',
    isDemoData: true,
    featured: false,
    closingSoonDays: 20
  },
  {
    id: 'bel-trainee-engineer-cs-2026',
    title: 'Trainee Engineer - I / Software Development',
    organization: 'Bharat Electronics Limited (BEL)',
    organizationType: 'Public Sector Undertaking (PSU)',
    category: 'PSU technical jobs',
    eligibility: '4 years full time B.Sc (Engg.) / B.E. / B.Tech in Computer Science with Pass Class for SC/ST/PwBD and 55% for Gen/OBC.',
    educationalQualification: [
      'B.E. / B.Tech in Computer Science',
      'B.E. / B.Tech in Computer Technology',
      'B.Tech in Information Technology'
    ],
    branches: ['Computer Science', 'Information Technology'],
    minimumPercentage: '55% aggregate (Pass Class for SC/ST)',
    ageLimit: 'Upper age limit 28 years',
    vacancies: 50,
    salaryPayLevel: '1st Year: ₹30,000/-, 2nd Year: ₹35,000/-, 3rd Year: ₹40,000/-',
    monthlyGrossApprox: '₹34,000 / month + allowances',
    startDate: '2026-09-22',
    lastDate: '2026-10-08',
    examDate: '2026-10-25',
    jobLocation: 'Bengaluru / Kotdwara / Ghaziabad',
    officialNotificationUrl: 'https://bel-india.in/Careers.aspx',
    officialApplyUrl: 'https://jobapply.in/bel2026te/',
    examRequirement: 'Direct Written Exam',
    selectionProcess: [
      'Written Test (85% weightage - 120 Objective Questions)',
      'Interview (15% weightage)',
      'Verification of Original Credentials'
    ],
    description: 'Navratna PSU Bharat Electronics Limited seeks young software engineers for military communications, naval radar console systems, and tactical embedded operating systems.',
    isDemoData: true,
    featured: false,
    closingSoonDays: 10
  },
  {
    id: 'barc-oces-cs-2026',
    title: 'Scientific Officer \'C\' (Computer Science - OCES/DGFS)',
    organization: 'Bhabha Atomic Research Centre (BARC)',
    organizationType: 'Scientific & Research',
    category: 'Scientific/Research roles',
    eligibility: 'B.E./B.Tech/B.Sc (Engg)/5-year Integrated M.Tech in CS/IT with min 60% aggregate. Valid GATE-2025/2026 CS or Online BARC Exam score.',
    educationalQualification: [
      'B.E. / B.Tech in Computer Science / IT',
      'Integrated M.Tech in Computer Science'
    ],
    branches: ['Computer Science', 'Information Technology'],
    minimumPercentage: '60% aggregate',
    ageLimit: 'General: 26 years; OBC: 29 years; SC/ST: 31 years',
    vacancies: 22,
    salaryPayLevel: 'Pay Level 10 (₹56,100 - ₹1,77,500)',
    monthlyGrossApprox: '₹1,02,000 / month with DA/HRA',
    startDate: '2026-09-10',
    lastDate: '2026-10-04',
    examDate: '2026-10-28',
    jobLocation: 'Mumbai (Trombay), Kalpakkam, Indore, Visakhapatnam',
    officialNotificationUrl: 'https://www.barconlineexam.in',
    officialApplyUrl: 'https://www.barconlineexam.in/registration',
    examRequirement: 'Direct Written Exam',
    selectionProcess: [
      'Shortlisting via BARC Computer-Based Online Exam OR GATE CS Score',
      'Extensive Technical Interview (Testing fundamental principles in CS)',
      '1-Year Orientation Training Course followed by posting as Scientific Officer C'
    ],
    description: 'Premier nuclear science institute BARC recruits Computer Science engineers for high-reliability reactor telemetry, cryptographic protocols, computational physics, and supercomputing clusters.',
    isDemoData: true,
    featured: true,
    closingSoonDays: 6
  },
  {
    id: 'rbi-am-it-2026',
    title: 'Assistant Manager (Information Technology - Grade A)',
    organization: 'Reserve Bank of India (RBI)',
    organizationType: 'Banking & Financial Regulatory',
    category: 'Software/IT',
    eligibility: 'Bachelor\'s Degree in Engineering in Computer Science/Information Technology or Master\'s in Computer Applications with minimum 60% marks.',
    educationalQualification: [
      'B.Tech / B.E. in Computer Science or IT',
      'Master of Computer Applications (MCA)',
      'M.Tech / M.E. in Computer Science'
    ],
    branches: ['Computer Science', 'Information Technology', 'Software Engineering'],
    minimumPercentage: '60% (50% for SC/ST)',
    ageLimit: '21 to 30 years',
    vacancies: 30,
    salaryPayLevel: 'Starting Basic ₹44,500/- in scale of ₹44500-89150 (Total CTC ~₹24 Lakhs/yr)',
    monthlyGrossApprox: '₹1,15,000 / month + RBI Quarters',
    startDate: '2026-09-25',
    lastDate: '2026-10-15',
    examDate: '2026-11-29',
    jobLocation: 'Mumbai (Central Office) / Major Metro Branches',
    officialNotificationUrl: 'https://www.rbi.org.in/Scripts/BS_Vacancies.aspx',
    officialApplyUrl: 'https://ibpsonline.ibps.in/rbiamit26/',
    examRequirement: 'Direct Written Exam',
    selectionProcess: [
      'Phase I Online Exam (General Awareness, Reasoning, English, Quant)',
      'Phase II Descriptive & Objective Technical Paper (CS, Security, Cloud, FinTech)',
      'Interview (Final selection based on Phase II + Interview marks)'
    ],
    description: 'India\'s central bank invites software and systems engineers to architect RTGS, NEFT, Central Bank Digital Currency (CBDC / Digital Rupee), and banking cyber defense mechanisms.',
    isDemoData: true,
    featured: false,
    closingSoonDays: 17
  },
  {
    id: 'nielit-ta-a-2026',
    title: 'Technical Assistant \'A\' (Computer Science)',
    organization: 'National Institute of Electronics and Information Technology (NIELIT)',
    organizationType: 'Central Ministry / Department',
    category: 'Government technical assistant roles',
    eligibility: 'M.Sc./MS/MCA/B.E./B.Tech in Computer Science/Computer Applications/Information Technology.',
    educationalQualification: [
      'B.E. / B.Tech in CSE / IT',
      'M.Sc Computer Science / IT',
      'MCA (Master of Computer Applications)'
    ],
    branches: ['Computer Science', 'Information Technology'],
    minimumPercentage: 'First Class or 60%',
    ageLimit: 'Up to 30 years for Unreserved',
    vacancies: 80,
    salaryPayLevel: 'Pay Level 6 (₹35,400 - ₹1,12,400)',
    monthlyGrossApprox: '₹58,000 / month',
    startDate: '2026-09-12',
    lastDate: '2026-10-10',
    examDate: '2026-11-08',
    jobLocation: 'Various Centres across India',
    officialNotificationUrl: 'https://www.nielit.gov.in/recruitments',
    officialApplyUrl: 'https://apply-delhi.nielit.gov.in',
    examRequirement: 'Direct Written Exam',
    selectionProcess: [
      'Written Examination (120 Objective Questions, 3 Hours, 0.25 Negative Marking)',
      'Direct selection based solely on Written Test marks (No Interview for Group B Non-Gazetted)'
    ],
    description: 'Recruitment for Technical Assistant \'A\' post in MeitY and attached autonomous societies. Complete selection is strictly determined by written competitive test without any interview round.',
    isDemoData: true,
    featured: false,
    closingSoonDays: 12
  },
  {
    id: 'ecil-technical-officer-2026',
    title: 'Technical Officer (Cybersecurity & Networks)',
    organization: 'Electronics Corporation of India Limited (ECIL)',
    organizationType: 'Public Sector Undertaking (PSU)',
    category: 'Cybersecurity',
    eligibility: 'First Class Engineering Graduate in CSE or IT with minimum 60% marks and 1 year post-qualification experience in Linux/Network Admin/Security.',
    educationalQualification: [
      'B.E. / B.Tech in Computer Science',
      'B.E. / B.Tech in Information Technology'
    ],
    branches: ['Computer Science', 'Information Technology', 'Cyber Security'],
    minimumPercentage: '60% aggregate (50% for SC/ST)',
    ageLimit: '30 years as of application date',
    vacancies: 40,
    salaryPayLevel: 'Consolidated ₹25,000/- (1st yr), ₹28,000/- (2nd yr), ₹31,000/- (3rd yr)',
    monthlyGrossApprox: '₹28,500 / month',
    startDate: '2026-09-26',
    lastDate: '2026-10-03',
    examDate: 'Walk-in Document Verification & Technical Interview',
    jobLocation: 'Hyderabad HQ / Strategic Project Sites',
    officialNotificationUrl: 'https://www.ecil.co.in/jobs.html',
    officialApplyUrl: 'https://careers.ecil.co.in/login.php',
    examRequirement: 'Interview Only',
    selectionProcess: [
      'Shortlisting based on academic percentage in B.Tech',
      'Walk-in Technical Interview and verification of security certifications'
    ],
    description: 'ECIL, a Schedule \'A\' PSU under the Department of Atomic Energy, is hiring technical officers for the setup and maintenance of hardened secure networking gear and electronic voting machines.',
    isDemoData: true,
    featured: false,
    closingSoonDays: 5
  },
  {
    id: 'sbi-sco-system-2026',
    title: 'Specialist Cadre Officer - Deputy Manager (Systems & Cloud)',
    organization: 'State Bank of India (SBI)',
    organizationType: 'Banking & Financial Regulatory',
    category: 'Software/IT',
    eligibility: 'B.Tech/B.E. in Computer Science/Computer Science & Engineering/Information Technology/Software Engineering or MCA with 60% marks.',
    educationalQualification: [
      'B.Tech in CSE / IT / Software Eng.',
      'MCA',
      'M.Tech Computer Science'
    ],
    branches: ['Computer Science', 'Information Technology', 'Software Engineering'],
    minimumPercentage: '60% aggregate',
    ageLimit: '25 to 35 years',
    vacancies: 110,
    salaryPayLevel: 'Scale II (₹48,170 - ₹69,810) + Bank Allowances',
    monthlyGrossApprox: '₹90,000 / month + Leased Accommodation',
    startDate: '2026-09-14',
    lastDate: '2026-10-06',
    examDate: '2026-11-14',
    jobLocation: 'Navi Mumbai (Global IT Centre) / Hyderabad',
    officialNotificationUrl: 'https://sbi.co.in/web/careers',
    officialApplyUrl: 'https://ibpsonline.ibps.in/sbiscosep26/',
    examRequirement: 'Direct Written Exam',
    selectionProcess: [
      'Online Written Test (General Reasoning, English, Professional Knowledge CS)',
      'Shortlisting for Interaction / Interview',
      'Final Merit List based on Professional Test + Interview'
    ],
    description: 'State Bank of India\'s Global IT Centre (GITC) requires experienced CSE professionals for YONO 2.0 modernization, microservices architecture, core banking resilience, and cloud migration.',
    isDemoData: true,
    featured: false,
    closingSoonDays: 8
  }
];

export const INITIAL_EXAMS: GovExam[] = [
  {
    id: 'isro-icrb-exam',
    name: 'ISRO Centralised Recruitment Board (ICRB) - Scientist/Engineer \'SC\' (CS)',
    shortName: 'ISRO ICRB (CS)',
    conductingOrganization: 'Indian Space Research Organisation (ISRO)',
    targetRole: 'Scientist / Engineer \'SC\' (Group \'A\' Gazetted Equivalent, Level 10)',
    eligibility: 'B.E./B.Tech or equivalent in CSE/IT with First Class (65% or 6.84 CGPA).',
    frequency: 'Annual / Bi-annual based on vacancies',
    examPatternSummary: 'Single-stage Computer-Based / OMR Written Exam (100 Questions) followed by Technical Interview for qualified candidates.',
    negativeMarking: '0.33 marks deducted per wrong answer in Part A',
    selectionStages: [
      'Written Test (Part A: 80 discipline questions, Part B: 20 aptitude questions)',
      'Shortlisting in 1:5 ratio for Interview',
      'Personal Technical Interview (Testing fundamental engineering concepts)',
      'Final Merit (50% Written + 50% Interview marks)'
    ],
    patternSections: [
      { name: 'Part A: Core Discipline (CSE/IT)', questions: 80, marks: 80, durationMinutes: 90 },
      { name: 'Part B: Aptitude & Reasoning', questions: 20, marks: 20, durationMinutes: 30 }
    ],
    syllabusOverview: {
      generalAptitude: [
        'Numerical ability and data interpretation',
        'Logical reasoning and pattern deduction',
        'Spatial comprehension and basic verbal aptitude'
      ],
      technicalCore: [
        'Engineering Mathematics: Discrete Maths, Linear Algebra, Probability, Calculus',
        'Data Structures: Arrays, Stacks, Queues, Linked Lists, Trees, Graphs, Heaps',
        'Algorithms: Asymptotic analysis, Divide & Conquer, Greedy, Dynamic Programming, Graph Algorithms',
        'Operating Systems: Process management, Threads, CPU scheduling, Memory Paging, Virtual Memory, Deadlocks',
        'Computer Networks: OSI/TCP layers, IP Subnetting, Routing protocols, TCP/UDP sockets, DNS, Flow & Congestion control',
        'DBMS: ER Diagrams, Relational Algebra, SQL, Normalization (1NF to BCNF), Transaction ACID, Indexing (B+ Trees)'
      ],
      specialized: [
        'Theory of Computation: Regular expressions, Finite Automata, Context-Free Grammars, Turing Machines',
        'Compiler Design: Lexical analysis, Parsing, Syntax Directed Translation, Code Optimization',
        'Computer Organization & Architecture: Machine instructions, Addressing modes, ALU, Pipelining, Cache memory mapping'
      ]
    },
    importantDates: {
      notificationTentative: 'September every year',
      applicationWindow: '15 to 25 days from notification date',
      examDate: 'Within 60-75 days of application close'
    },
    officialWebsite: 'https://www.isro.gov.in/icrb.html',
    previousYearPaperUrl: 'https://www.isro.gov.in/QuestionPapers.html'
  },
  {
    id: 'nic-meity-exam',
    name: 'NIC / NIELIT Scientist \'B\' & Scientific Officer Recruitment Exam',
    shortName: 'NIC Scientist \'B\'',
    conductingOrganization: 'National Informatics Centre (NIC) through NIELIT',
    targetRole: 'Scientist \'B\' (Group \'A\' Gazetted, Level 10) & Scientific Officer / SB',
    eligibility: 'B.E./B.Tech in CSE/IT/ECE or MCA or M.Sc in Computer Science with min 60% marks.',
    frequency: 'Once every 12 to 18 months',
    examPatternSummary: '120 Multiple Choice Questions (3 hours). 65% weightage to Technical Core CSE and 35% to Generic Aptitude. Negative marking 0.25.',
    negativeMarking: '0.25 marks deducted per wrong answer',
    selectionStages: [
      'Written Examination (120 Questions - 120 Marks)',
      'Shortlisting 1:3 for Personal Interview',
      'Personal Interview (85% Written + 15% Interview weightage)',
      'Medical & Police Verification'
    ],
    patternSections: [
      { name: 'Section A: Generic Aptitude', questions: 42, marks: 42, durationMinutes: 60 },
      { name: 'Section B: Technical Computer Science', questions: 78, marks: 78, durationMinutes: 120 }
    ],
    syllabusOverview: {
      generalAptitude: [
        'Quantitative Aptitude, Ratios, Percentages, Work-Time',
        'Analytical and Logical Reasoning',
        'General English comprehension and vocabulary'
      ],
      technicalCore: [
        'Programming in C, C++, Java and Object-Oriented paradigms',
        'Data Structures & Algorithms: Sorting, Searching, Hashing, Graph Algorithms',
        'Operating Systems: Process synchronization, Semaphores, Scheduling, Virtual Memory',
        'Database Systems: Relational schema, SQL, Triggers, Normalization, Query optimization',
        'Computer Networks: IPv4/IPv6, CIDR, Transport layer protocols, Network security (Firewalls, SSL/TLS, IDS)'
      ],
      specialized: [
        'Software Engineering: SDLC models, Agile, Testing methods, Version control',
        'Cyber Security & Cryptography: Symmetric/Asymmetric key ciphers, SHA, Digital Signatures, OWASP Top 10',
        'Web Technologies: HTML5, CSS, RESTful APIs, JSON, Cloud Computing fundamentals'
      ]
    },
    importantDates: {
      notificationTentative: 'Announced on NIELIT recruitment portal',
      applicationWindow: '30 days application window',
      examDate: 'Typically 6-8 weeks after application deadline'
    },
    officialWebsite: 'https://www.nic.in/recruitment/',
    previousYearPaperUrl: 'https://www.calicut.nielit.in/nic26/faq.aspx'
  },
  {
    id: 'drdo-rac-exam',
    name: 'DRDO RAC Scientist \'B\' Recruitment (Computer Science Discipline)',
    shortName: 'DRDO RAC (CSE)',
    conductingOrganization: 'Recruitment & Assessment Centre (RAC), DRDO',
    targetRole: 'Scientist \'B\' (Group \'A\' Gazetted, Level 10)',
    eligibility: 'First Class Bachelor\'s in Engineering/Technology in CSE + Valid GATE Score in CS.',
    frequency: 'Annual (aligned with GATE results)',
    examPatternSummary: 'Primary shortlisting through GATE Computer Science percentile (1:10 or 1:12 ratio) followed by a comprehensive Technical Board Interview in Delhi.',
    negativeMarking: 'As per GATE marking rules',
    selectionStages: [
      'Screening by GATE CS score (Cut-off typically 700+ score for General)',
      'Personal Technical Interview at RAC, Timarpur, Delhi',
      'Weightage: 80% GATE Score + 20% Technical Interview',
      'Final Merit List and Lab Allocation'
    ],
    patternSections: [
      { name: 'Stage 1: GATE CS Score Screening', questions: 65, marks: 100, durationMinutes: 180 },
      { name: 'Stage 2: Personal Technical Interview', questions: 1, marks: 100, durationMinutes: 45 }
    ],
    syllabusOverview: {
      generalAptitude: [
        'GATE General Aptitude (Verbal Ability & Numerical Ability)'
      ],
      technicalCore: [
        'Full GATE CS/IT Official Syllabus:',
        'Discrete Mathematics: Sets, Relations, Functions, Propositional Logic, Graph Theory',
        'Digital Logic & Computer Organization',
        'Programming & Data Structures',
        'Design and Analysis of Algorithms',
        'Theory of Computation & Compiler Design',
        'Operating Systems & System Programming',
        'Databases & Computer Networks'
      ],
      specialized: [
        'Defence Application Concepts: Real-time Operating Systems (RTOS), Embedded C, Signal Processing basics, Autonomous AI'
      ]
    },
    importantDates: {
      notificationTentative: 'April - May post GATE results',
      applicationWindow: '21 days',
      examDate: 'Interviews held June - August'
    },
    officialWebsite: 'https://rac.gov.in',
    previousYearPaperUrl: 'https://rac.gov.in'
  },
  {
    id: 'barc-oces-exam',
    name: 'BARC OCES / DGFS Scientific Officer (Computer Science)',
    shortName: 'BARC OCES (CS)',
    conductingOrganization: 'Bhabha Atomic Research Centre (BARC) / DAE',
    targetRole: 'Scientific Officer \'C\' (Level 10)',
    eligibility: 'B.E./B.Tech in CSE/IT with min 60% aggregate. Valid GATE CS score or BARC Online Screening Exam.',
    frequency: 'Annual (Every January - February window)',
    examPatternSummary: '100 Multiple Choice Questions (2 Hours). All 100 questions are pure engineering discipline (No general aptitude). 3 marks for correct, -1 for wrong.',
    negativeMarking: '1 mark deducted per incorrect answer (3 marks per correct)',
    selectionStages: [
      'Online Screening Examination (Computer-Based, 100 Questions) OR GATE CS Score cutoff',
      'Intensive Technical Interview (30-60 minutes in-depth blackboard session on 5 chosen core CS subjects)',
      'Final selection is 100% based on Technical Interview performance'
    ],
    patternSections: [
      { name: 'BARC Online CS Examination', questions: 100, marks: 300, durationMinutes: 120 }
    ],
    syllabusOverview: {
      generalAptitude: [
        'No general aptitude section; 100% focus on technical computer engineering'
      ],
      technicalCore: [
        'Algorithms: Complexity, divide and conquer, dynamic programming, greedy algorithms',
        'Data Structures: Arrays, stacks, queues, trees, balanced binary trees, heaps, hash tables',
        'Operating Systems: Concurrency, semaphores, monitors, virtual memory, file systems',
        'Computer Networks: Transport protocols, congestion control algorithms, routing, TCP flow control',
        'Database Management Systems: Relational calculus, indexing, normalization, transaction processing',
        'Computer Architecture: Cache memory design, pipelining, hazards, memory hierarchies'
      ],
      specialized: [
        'Object-Oriented Programming (C++/Java fundamentals)',
        'Discrete Mathematics & Logic',
        'Basic Cryptography & Systems Security'
      ]
    },
    importantDates: {
      notificationTentative: 'January every year',
      applicationWindow: 'January to February',
      examDate: 'Mid March (Online Exam) / June (Interviews)'
    },
    officialWebsite: 'https://www.barconlineexam.in',
    previousYearPaperUrl: 'https://www.barconlineexam.in'
  }
];

export const INITIAL_STUDY_TOPICS: StudyTopic[] = [
  {
    id: 'topic-os',
    subject: 'Operating Systems',
    topicName: 'CPU Scheduling, Paging & Deadlocks',
    weightage: 'High',
    description: 'Crucial for NIC, ISRO & BARC exams. Focus on Banker\'s algorithm, page replacement (LRU/FIFO), and semaphore synchronization.',
    keyConcepts: [
      'Process State Transition & Context Switching',
      'CPU Scheduling Algorithms: FCFS, SJF, Round Robin (Turnaround vs Waiting time)',
      'Inter-Process Communication: Critical Section Problem, Semaphores, Mutex Locks',
      'Deadlocks: Necessary conditions, Deadlock Prevention, Banker\'s Safety Algorithm',
      'Memory Management: Paging, Page Table Structure, TLB, Page Fault calculation, Demand Paging'
    ],
    status: 'In Progress'
  },
  {
    id: 'topic-cn',
    subject: 'Computer Networks',
    topicName: 'TCP/IP, Subnetting & Routing Protocols',
    weightage: 'High',
    description: 'Frequently tested in PSU technical and scientific officer tests. Emphasizes CIDR subnetting, TCP handshake, flow control, and sliding window.',
    keyConcepts: [
      'OSI Model vs TCP/IP Protocol Suite: Functions of each layer',
      'Data Link Layer: Framing, CRC Error Detection, Sliding Window (Stop & Wait, Go-Back-N, Selective Repeat)',
      'Network Layer: IPv4 Addressing, CIDR, Subnet Masks, Subnetting & Supernetting calculations',
      'Routing Protocols: Distance Vector Routing (Count to Infinity), Link State Routing (Dijkstra)',
      'Transport Layer: TCP vs UDP, 3-Way Handshake, TCP Congestion Control (Slow Start, Congestion Avoidance)'
    ],
    status: 'Not Started'
  },
  {
    id: 'topic-dbms',
    subject: 'Database Management Systems',
    topicName: 'Relational Normalization & SQL Queries',
    weightage: 'High',
    description: 'Guaranteed 8-12 questions in NIC Scientist B & IBPS IT. Focus on Functional Dependencies, Normal Forms (1NF to BCNF), and ACID transactions.',
    keyConcepts: [
      'Relational Algebra: Select, Project, Cartesian Product, Natural Join, Theta Join',
      'Functional Dependencies: Armstrong\'s Axioms, Canonical Cover, Attribute Closure',
      'Normalization: 1NF, 2NF, 3NF, BCNF (Lossless Decomposition & Dependency Preservation checks)',
      'Transactions: ACID properties, Serializability (Conflict vs View Serializable), Precedence Graph',
      'Indexing: Primary index, Secondary index, Dense/Sparse, B-Trees and B+ Trees order calculations'
    ],
    status: 'Completed'
  },
  {
    id: 'topic-dsa',
    subject: 'Data Structures & Algorithms',
    topicName: 'Trees, Graphs & Dynamic Programming',
    weightage: 'High',
    description: 'Forms the backbone of technical written exams and interview rounds at ISRO and DRDO RAC.',
    keyConcepts: [
      'Asymptotic Notation: Big-O, Omega, Theta; Recurrence relations (Master Theorem)',
      'Binary Trees & Binary Search Trees: Traversals (Inorder, Preorder, Postorder), AVL Tree balancing',
      'Heap Data Structure: Min-Heap, Max-Heap, Heapify operation, Priority Queues, HeapSort',
      'Graph Algorithms: BFS, DFS, Topological Sorting, Dijkstra\'s Shortest Path, Prim\'s & Kruskal\'s MST',
      'Dynamic Programming: 0/1 Knapsack, Longest Common Subsequence (LCS), Matrix Chain Multiplication'
    ],
    status: 'In Progress'
  },
  {
    id: 'topic-sec',
    subject: 'Cybersecurity & Cryptography',
    topicName: 'Symmetric/Asymmetric Encryption & Web Security',
    weightage: 'Medium',
    description: 'Rapidly growing weightage in NIC, C-DAC, and banking regulatory examinations.',
    keyConcepts: [
      'Classical Ciphers vs Modern Block Ciphers: DES, AES structure & key sizes',
      'Asymmetric Cryptography: RSA algorithm mathematics, Diffie-Hellman Key Exchange',
      'Cryptographic Hash Functions: SHA-256, MD5, Message Authentication Codes (MAC), Digital Signatures',
      'Network Security: SSL/TLS Handshake, IPsec (AH and ESP modes), Packet filtering Firewalls',
      'Application Security: SQL Injection, Cross-Site Scripting (XSS), CSRF, Zero-Day vulnerabilities'
    ],
    status: 'Not Started'
  },
  {
    id: 'topic-coa',
    subject: 'Computer Organization & Architecture',
    topicName: 'Pipelining, Cache Memory & Addressing Modes',
    weightage: 'Medium',
    description: 'Core hardware-software interface questions frequently asked in ISRO and BARC scientific recruitments.',
    keyConcepts: [
      'Machine Instructions & Addressing Modes (Immediate, Direct, Indirect, Register, Indexed)',
      'Instruction Pipelining: Stages, Speedup factor, Pipeline Hazards (Structural, Data, Control)',
      'Cache Memory: Direct Mapped, Fully Associative, Set Associative; Hit ratio & Average Memory Access Time',
      'Memory Hierarchy: Cache, Main RAM, Virtual Memory mapping, Cache Write Policies',
      'Input/Output Organization: Programmed I/O, Interrupt-driven I/O, Direct Memory Access (DMA)'
    ],
    status: 'Not Started'
  }
];

export const INITIAL_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    subject: 'Operating Systems',
    question: 'In a demand-paging memory system with page fault service time of 8 ms and memory access time of 200 ns, what is the maximum acceptable page fault rate for a performance degradation of no more than 10%?',
    options: [
      'Less than 0.00025%',
      'Less than 0.0025%',
      'Less than 0.025%',
      'Less than 0.25%'
    ],
    correctOptionIndex: 0,
    explanation: 'Effective Access Time (EAT) = (1 - p) * 200ns + p * 8,000,000ns. For maximum 10% degradation: EAT <= 220ns. 200 + p * (8,000,000 - 200) <= 220 => p * 8,000,000 <= 20 => p <= 20 / 8,000,000 = 0.0000025 = 0.00025%.',
    previousExamReference: 'ISRO ICRB CS Previous Paper'
  },
  {
    id: 'q2',
    subject: 'Computer Networks',
    question: 'An organization is granted the block 130.56.0.0/16. The administrator wants to create 1024 subnets. What will be the new subnet mask and how many usable host addresses will each subnet support?',
    options: [
      'Subnet mask 255.255.255.192, 62 usable hosts',
      'Subnet mask 255.255.255.192, 64 usable hosts',
      'Subnet mask 255.255.255.240, 14 usable hosts',
      'Subnet mask 255.255.255.128, 126 usable hosts'
    ],
    correctOptionIndex: 0,
    explanation: 'To create 1024 subnets, we need log2(1024) = 10 additional subnet bits. Starting prefix is /16, so new prefix is /26 (16 + 10). A /26 mask has 26 ones, corresponding to 255.255.255.192. Remaining host bits = 32 - 26 = 6 bits. Usable hosts = 2^6 - 2 = 64 - 2 = 62 hosts.',
    previousExamReference: 'NIC Scientist B 2023 Exam'
  },
  {
    id: 'q3',
    subject: 'Database Management Systems',
    question: 'Consider a relation R(A, B, C, D) with functional dependencies: {A -> B, B -> C, C -> D, D -> A}. In which normal form is this relation?',
    options: [
      '1NF only',
      '2NF only',
      '3NF but not BCNF',
      'BCNF'
    ],
    correctOptionIndex: 3,
    explanation: 'Computing attribute closures: A+ = {A,B,C,D}, B+ = {A,B,C,D}, C+ = {A,B,C,D}, D+ = {A,B,C,D}. Hence every single attribute A, B, C, and D is an individual Candidate Key. In every given FD (X -> Y), the left-hand side X is a superkey. Therefore, relation R is strictly in BCNF (Boyce-Codd Normal Form).',
    previousExamReference: 'BARC OCES CS Exam'
  },
  {
    id: 'q4',
    subject: 'Data Structures & Algorithms',
    question: 'What is the worst-case time complexity of building a Max-Heap from an unsorted array of n elements using the bottom-up Heapify approach?',
    options: [
      'O(n log n)',
      'O(n)',
      'O(n^2)',
      'O(log n)'
    ],
    correctOptionIndex: 1,
    explanation: 'Although calling max-heapify takes O(h) where h is node height, summing across all heights yields: sum_{h=0}^{floor(log n)} (ceil(n / 2^(h+1)) * O(h)) = O(n * sum_{h=0}^{inf} h / 2^h) = O(n * 2) = O(n). Hence building a heap takes linear O(n) time.',
    previousExamReference: 'DRDO RAC CS Technical Test'
  },
  {
    id: 'q5',
    subject: 'Operating Systems',
    question: 'A system has 4 processes and 5 allocated instances of the same resource type. What is the maximum resource demand that each process can request such that the system is guaranteed to remain free from deadlock?',
    options: [
      '1 instance',
      '2 instances',
      '3 instances',
      '4 instances'
    ],
    correctOptionIndex: 1,
    explanation: 'Deadlock-free guarantee condition: Total Resources R >= sum(Max_i - 1) + 1. If each process needs k instances: 5 >= 4*(k - 1) + 1 => 4 >= 4*(k - 1) => 1 >= k - 1 => k <= 2. Each process can demand at most 2 instances safely without causing deadlock.',
    previousExamReference: 'ISRO ICRB CS'
  },
  {
    id: 'q6',
    subject: 'Cybersecurity',
    question: 'In asymmetric RSA encryption, if prime numbers p = 7 and q = 11, and public exponent e = 13, what is the private decryption key d?',
    options: [
      '17',
      '37',
      '43',
      '29'
    ],
    correctOptionIndex: 1,
    explanation: 'Euler\'s totient phi(n) = (p - 1)(q - 1) = 6 * 10 = 60. We must find d such that (d * e) mod phi(n) = 1 => (13 * d) mod 60 = 1. Testing options: 13 * 37 = 481. 481 mod 60 = (8 * 60 + 1) mod 60 = 1. Therefore, d = 37.',
    previousExamReference: 'NIC Scientist B Technical'
  },
  {
    id: 'q7',
    subject: 'Computer Organization',
    question: 'A 5-stage instruction pipeline has stage delays of 150 ps, 120 ps, 160 ps, 140 ps, and 110 ps. The pipeline register overhead delay is 20 ps. What is the clock cycle time of this pipelined processor?',
    options: [
      '160 ps',
      '180 ps',
      '680 ps',
      '700 ps'
    ],
    correctOptionIndex: 1,
    explanation: 'The clock cycle of a pipeline is bounded by the slowest stage delay plus the pipeline register latch overhead. Slowest stage = 160 ps. Adding register delay: 160 ps + 20 ps = 180 ps.',
    previousExamReference: 'NIELIT Scientific Officer Exam'
  },
  {
    id: 'q8',
    subject: 'Theory of Computation',
    question: 'Which of the following problems is decidable for a Context-Free Language (CFL)?',
    options: [
      'Whether L is empty (L = empty set)',
      'Whether L is universal (L = Sigma*)',
      'Whether L1 intersection L2 is empty',
      'Whether L is regular'
    ],
    correctOptionIndex: 0,
    explanation: 'The emptiness problem (L = empty set) and membership problem (w in L) for Context-Free Languages are decidable. In contrast, universality, equivalence, intersection emptiness, and regularity of CFLs are provably undecidable.',
    previousExamReference: 'GATE / ISRO ICRB Computer Science'
  }
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'NIC Scientist \'B\' Deadline Approaching',
    message: 'National Informatics Centre application window closes in 7 days (October 05, 2026). Ensure degree certificates are uploaded.',
    type: 'deadline',
    date: '2026-09-28',
    read: false,
    linkId: 'nic-scientist-b-2026'
  },
  {
    id: 'notif-2',
    title: 'New Notification: ISRO ICRB 2026',
    message: 'ISRO has published ICRB-03/2026 for 48 Scientist/Engineer \'SC\' (Computer Science) posts across URSC, SAC & VSSC.',
    type: 'job',
    date: '2026-09-25',
    read: false,
    linkId: 'isro-sc-cs-2026'
  },
  {
    id: 'notif-3',
    title: 'DRDO RAC Application Closes in 4 Days',
    message: 'DRDO RAC Scientist \'B\' recruitment using GATE CS score closes on October 02, 2026.',
    type: 'deadline',
    date: '2026-09-27',
    read: false,
    linkId: 'drdo-rac-sc-b-2026'
  },
  {
    id: 'notif-4',
    title: 'BARC Online Exam Dates Finalized',
    message: 'Bhabha Atomic Research Centre has scheduled the Computer-Based screening test for October 28, 2026.',
    type: 'exam',
    date: '2026-09-24',
    read: true,
    linkId: 'barc-oces-cs-2026'
  }
];
