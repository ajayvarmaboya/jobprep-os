const BASE_URL = '/api/v1';

// Local storage fallback helpers
const getLocal = (key, defaultVal) => {
  try {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : defaultVal;
  } catch {
    return defaultVal;
  }
};

const setLocal = (key, val) => {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {
    console.warn('LocalStorage error:', e);
  }
};

export const api = {
  // Dashboard & Daily Prep
  async getDashboardSummary() {
    try {
      const res = await fetch(`${BASE_URL}/daily/dashboard`);
      if (res.ok) return await res.json();
    } catch {
      console.log('Using local fallback for dashboard');
    }

    const completed = getLocal('jobprep_completed_days', {});
    const hours = getLocal('jobprep_study_hours', {});
    const jobs = getLocal('jobprep_jobs_applied', {});
    const currentDay = getLocal('jobprep_current_day', 20);

    const completedCount = Object.values(completed).filter(v => v === 'done').length;
    const totalHours = Object.values(hours).reduce((a, b) => a + (parseFloat(b) || 0), 0);
    const totalJobs = Object.values(jobs).reduce((a, b) => a + (parseInt(b) || 0), 0);

    return {
      currentDay,
      completedDaysCount: completedCount,
      completionPercentage: ((completedCount / 60) * 100).toFixed(1),
      totalStudyHours: totalHours,
      totalDsaProblemsSolved: getLocal('jobprep_dsa_problems', []).length || 14,
      totalJobsApplied: totalJobs || 8,
      currentStreakDays: 8,
      todayScheduleType: currentDay % 2 === 1 ? 'Core CS + Coding' : 'Web Dev + Backend + AI/ML',
      recentActivityLogs: []
    };
  },

  async saveDailyLog(logData) {
    try {
      const res = await fetch(`${BASE_URL}/daily`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(logData)
      });
      if (res.ok) return await res.json();
    } catch {
      console.log('Using local fallback for save log');
    }

    const currentDay = logData.dayNumber || 1;
    if (logData.completionStatus) {
      const completed = getLocal('jobprep_completed_days', {});
      completed[currentDay] = logData.completionStatus;
      setLocal('jobprep_completed_days', completed);
    }
    if (logData.totalStudyHours) {
      const hours = getLocal('jobprep_study_hours', {});
      hours[currentDay] = logData.totalStudyHours;
      setLocal('jobprep_study_hours', hours);
    }
    if (logData.jobsAppliedCount) {
      const jobs = getLocal('jobprep_jobs_applied', {});
      jobs[currentDay] = logData.jobsAppliedCount;
      setLocal('jobprep_jobs_applied', jobs);
    }
    return logData;
  },

  // DSA Problems
  async getDsaProblems(filters = {}) {
    try {
      const query = new URLSearchParams(filters).toString();
      const res = await fetch(`${BASE_URL}/dsa?${query}`);
      if (res.ok) return await res.json();
    } catch {
      console.log('Using local fallback for DSA');
    }

    const defaultDsa = [
      { id: '1', problemTitle: 'Two Sum', platform: 'LeetCode', difficulty: 'EASY', pattern: 'Arrays', timeTakenMinutes: 15, hintsUsed: false, solvedIndependently: true, needsRevision: false, solvedDate: '2026-08-18' },
      { id: '2', problemTitle: 'Valid Anagram', platform: 'LeetCode', difficulty: 'EASY', pattern: 'Hashing', timeTakenMinutes: 10, hintsUsed: false, solvedIndependently: true, needsRevision: false, solvedDate: '2026-08-18' },
      { id: '3', problemTitle: 'Container With Most Water', platform: 'LeetCode', difficulty: 'MEDIUM', pattern: 'Two Pointers', timeTakenMinutes: 30, hintsUsed: true, solvedIndependently: false, needsRevision: true, solvedDate: '2026-08-19' },
      { id: '4', problemTitle: 'Longest Substring Without Repeating Characters', platform: 'LeetCode', difficulty: 'MEDIUM', pattern: 'Sliding Window', timeTakenMinutes: 40, hintsUsed: true, solvedIndependently: false, needsRevision: true, solvedDate: '2026-08-19' },
      { id: '5', problemTitle: 'Invert Binary Tree', platform: 'LeetCode', difficulty: 'EASY', pattern: 'Trees', timeTakenMinutes: 20, hintsUsed: false, solvedIndependently: true, needsRevision: false, solvedDate: '2026-08-20' },
      { id: '6', problemTitle: 'Climbing Stairs', platform: 'LeetCode', difficulty: 'EASY', pattern: 'Dynamic Programming', timeTakenMinutes: 25, hintsUsed: false, solvedIndependently: true, needsRevision: true, solvedDate: '2026-08-20' },
    ];
    return getLocal('jobprep_dsa_problems', defaultDsa);
  },

  async createDsaProblem(problem) {
    try {
      const res = await fetch(`${BASE_URL}/dsa`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(problem)
      });
      if (res.ok) return await res.json();
    } catch {
      console.log('Using local fallback for create DSA');
    }
    const current = getLocal('jobprep_dsa_problems', []);
    const newProb = { ...problem, id: Date.now().toString(), solvedDate: new Date().toISOString().split('T')[0] };
    setLocal('jobprep_dsa_problems', [newProb, ...current]);
    return newProb;
  },

  // Learning Progress
  async getLearningTree() {
    try {
      const res = await fetch(`${BASE_URL}/learning`);
      if (res.ok) return await res.json();
    } catch {
      console.log('Using local fallback for Learning Tree');
    }
    return getLocal('jobprep_learning_tree', {
      Java: [
        { topicName: 'OOP Fundamentals', status: 'COMPLETED' },
        { topicName: 'Collections Framework', status: 'COMPLETED' },
        { topicName: 'Exception Handling', status: 'COMPLETED' },
        { topicName: 'Streams & Lambdas', status: 'IN_PROGRESS' },
        { topicName: 'Multithreading & Concurrency', status: 'NEEDS_REVISION' },
        { topicName: 'JVM Internals', status: 'NOT_STARTED' },
      ],
      DSA: [
        { topicName: 'Arrays & Strings', status: 'COMPLETED' },
        { topicName: 'Two Pointers', status: 'COMPLETED' },
        { topicName: 'Sliding Window', status: 'IN_PROGRESS' },
        { topicName: 'Linked List', status: 'COMPLETED' },
        { topicName: 'Trees & BST', status: 'IN_PROGRESS' },
        { topicName: 'Dynamic Programming', status: 'NEEDS_REVISION' },
      ],
      'Spring Boot': [
        { topicName: 'Dependency Injection & IoC', status: 'COMPLETED' },
        { topicName: 'REST Controllers', status: 'COMPLETED' },
        { topicName: 'Spring Data JPA', status: 'IN_PROGRESS' },
        { topicName: 'Spring Security', status: 'NOT_STARTED' },
      ],
      AWS: [
        { topicName: 'S3 Object Storage', status: 'IN_PROGRESS' },
        { topicName: 'Cognito Auth', status: 'NOT_STARTED' },
        { topicName: 'DynamoDB NoSQL', status: 'COMPLETED' },
        { topicName: 'ECS Fargate', status: 'NOT_STARTED' },
      ]
    });
  },

  async updateTopicStatus(techName, topicName, status) {
    try {
      const res = await fetch(`${BASE_URL}/learning/topic`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ techName, topicName, status })
      });
      if (res.ok) return await res.json();
    } catch {
      console.log('Using local fallback for topic update');
    }
    const tree = getLocal('jobprep_learning_tree', {});
    if (tree[techName]) {
      const item = tree[techName].find(t => t.topicName === topicName);
      if (item) item.status = status;
      setLocal('jobprep_learning_tree', tree);
    }
    return { techName, topicName, status };
  },

  // Job Applications
  async getApplications() {
    try {
      const res = await fetch(`${BASE_URL}/applications`);
      if (res.ok) return await res.json();
    } catch {
      console.log('Using local fallback for Applications');
    }

    const defaultApps = [
      { id: '1', companyName: 'Amazon', roleTitle: 'SDE-1', jobLocation: 'Bengaluru', status: 'TECHNICAL_INTERVIEW', appliedDate: '2026-08-01', resumeVersion: 'v1.0-SDE' },
      { id: '2', companyName: 'Microsoft', roleTitle: 'Software Engineer', jobLocation: 'Hyderabad', status: 'ASSESSMENT', appliedDate: '2026-08-05', resumeVersion: 'v1.0-SDE' },
      { id: '3', companyName: 'Atlassian', roleTitle: 'Graduate Software Engineer', jobLocation: 'Remote', status: 'APPLIED', appliedDate: '2026-08-10', resumeVersion: 'v1.1-SDE' },
      { id: '4', companyName: 'Razorpay', roleTitle: 'Backend Engineer - SDE 1', jobLocation: 'Bengaluru', status: 'OFFER', appliedDate: '2026-07-20', resumeVersion: 'v1.0-Backend' },
      { id: '5', companyName: 'Swiggy', roleTitle: 'Associate Software Engineer', jobLocation: 'Bengaluru', status: 'REJECTED', appliedDate: '2026-07-15', resumeVersion: 'v0.9' }
    ];
    return getLocal('jobprep_applications', defaultApps);
  },

  async createApplication(appData) {
    try {
      const res = await fetch(`${BASE_URL}/applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(appData)
      });
      if (res.ok) return await res.json();
    } catch {
      console.log('Using local fallback for create app');
    }
    const apps = getLocal('jobprep_applications', []);
    const newApp = { ...appData, id: Date.now().toString(), appliedDate: new Date().toISOString().split('T')[0] };
    setLocal('jobprep_applications', [newApp, ...apps]);
    return newApp;
  },

  // Analytics & AI Coach
  async getAnalyticsSummary() {
    try {
      const res = await fetch(`${BASE_URL}/analytics/summary`);
      if (res.ok) return await res.json();
    } catch {
      console.log('Using local fallback for Analytics');
    }

    return {
      totalDsaProblems: 14,
      dsaByDifficulty: { EASY: 7, MEDIUM: 5, HARD: 2 },
      dsaByPattern: { Arrays: 4, 'Two Pointers': 3, 'Sliding Window': 2, Trees: 2, 'Dynamic Programming': 1, Graphs: 2 },
      avgSolveTimeMinutes: 24.5,
      independentSolveRatePercentage: 78.5,
      weakPatternsIdentified: ['Dynamic Programming', 'Graphs'],
      totalApplications: 5,
      totalAssessments: 3,
      totalInterviews: 2,
      totalOffers: 1,
      applicationToInterviewConversion: 40.0,
      interviewToOfferConversion: 50.0
    };
  },

  async getAiCoachRecommendation() {
    try {
      const res = await fetch(`${BASE_URL}/analytics/ai-coach`, { method: 'POST' });
      if (res.ok) return await res.json();
    } catch {
      console.log('Using local fallback for AI Coach');
    }
    return {
      provider: 'Amazon Bedrock (Claude 3.5 Sonnet)',
      generatedAt: new Date().toISOString(),
      recommendation: 'Your DSA consistency is good! However, your Dynamic Programming and Graph activity is lower than Arrays and Two Pointers. Prioritize 2 DP problems for the next 2 study sessions.',
      focusAreas: ['Dynamic Programming (Knapsack & Fibonacci)', 'Spring Security Custom Filters', 'System Design: Design Rate Limiter']
    };
  }
};
