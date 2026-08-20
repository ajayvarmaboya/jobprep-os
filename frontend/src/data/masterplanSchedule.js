export const dailySchedule = {
  dayA: {
    type: "Core CS + Coding",
    color: "bg-blue-50 border-blue-200 text-blue-800",
    badgeColor: "bg-blue-600 text-white",
    schedule: [
      { time: "5:00-6:00 AM", activity: "Wake up, freshen up, light breakfast" },
      { time: "6:00-8:00 AM", activity: "Java Core Concepts + OOP", focus: "Theory & coding practice" },
      { time: "8:00-8:15 AM", activity: "Micro Break - Stretch, walk" },
      { time: "8:15-10:15 AM", activity: "DSA Practice", focus: "LeetCode/GFG problems (3-4 problems)" },
      { time: "10:15-11:00 AM", activity: "Breakfast Break" },
      { time: "11:00 AM-1:00 PM", activity: "Computer Networks Theory", focus: "Notes + practice questions" },
      { time: "1:00-2:00 PM", activity: "Lunch Break + Rest" },
      { time: "2:00-4:00 PM", activity: "Operating Systems Theory", focus: "Concepts + interview questions" },
      { time: "4:00-4:15 PM", activity: "Micro Break" },
      { time: "4:15-5:45 PM", activity: "SQL Practice", focus: "Queries + optimization" },
      { time: "5:45-6:00 PM", activity: "Evening Break" },
      { time: "6:00-7:00 PM", activity: "Job Applications", focus: "Apply to 5-10 companies" },
      { time: "7:00-8:30 PM", activity: "Project Work / Web Practice", focus: "Build or debug projects" },
      { time: "8:30-9:00 PM", activity: "Dinner" },
      { time: "9:00-10:00 PM", activity: "Revision + Day Summary", focus: "Review notes, plan tomorrow" },
      { time: "10:00 PM", activity: "Sleep" }
    ]
  },
  dayB: {
    type: "Web Dev + Backend + AI/ML",
    color: "bg-emerald-50 border-emerald-200 text-emerald-800",
    badgeColor: "bg-emerald-600 text-white",
    schedule: [
      { time: "5:00-6:00 AM", activity: "Wake up, freshen up, light breakfast" },
      { time: "6:00-8:00 AM", activity: "Frontend (HTML/CSS/JS/React)", focus: "Build components, practice" },
      { time: "8:00-8:15 AM", activity: "Micro Break" },
      { time: "8:15-10:15 AM", activity: "Backend Development", focus: "Spring Boot / Node.js fundamentals" },
      { time: "10:15-11:00 AM", activity: "Breakfast Break" },
      { time: "11:00 AM-1:00 PM", activity: "Automation Testing", focus: "Selenium + TestNG practice" },
      { time: "1:00-2:00 PM", activity: "Lunch Break + Rest" },
      { time: "2:00-4:00 PM", activity: "AI/ML Learning", focus: "Python, libraries, mini projects" },
      { time: "4:00-4:15 PM", activity: "Micro Break" },
      { time: "4:15-5:45 PM", activity: "Full-Stack Project Work", focus: "Integrate frontend + backend" },
      { time: "5:45-6:00 PM", activity: "Evening Break" },
      { time: "6:00-7:00 PM", activity: "Job Applications", focus: "Apply to 5-10 companies" },
      { time: "7:00-8:30 PM", activity: "Project Deployment / Testing", focus: "Deploy projects, write tests" },
      { time: "8:30-9:00 PM", activity: "Dinner" },
      { time: "9:00-10:00 PM", activity: "Revision + Day Summary", focus: "Review code, update GitHub" },
      { time: "10:00 PM", activity: "Sleep" }
    ]
  }
};

export const weeklyPlan = [
  { week: 1, days: [1,2], dayA: "Java Basics: Variables, Data Types, Operators, Control Flow | DSA: Arrays, Strings basics | CN: OSI Model, TCP/IP | OS: Process basics | SQL: SELECT, WHERE", dayB: "HTML5 semantics, Forms | CSS Basics: Selectors, Box Model | JS: Variables, Data Types | React: Setup, JSX basics | Backend: What is Node.js, npm basics | Automation: Selenium setup | AI/ML: Python numpy basics" },
  { week: 1, days: [3,4], dayA: "Java: Methods, Arrays | DSA: Array problems (Easy) | CN: HTTP, HTTPS | OS: Threads vs Process | SQL: JOIN basics", dayB: "HTML: Tables, Media | CSS: Flexbox | JS: Functions, Scope | React: Components, Props | Backend: Express setup, routing | Automation: WebDriver basics | AI/ML: Pandas fundamentals" },
  { week: 2, days: [5,6], dayA: "Java: OOP - Classes, Objects | DSA: 2D Arrays | CN: DNS, DHCP | OS: Scheduling algorithms | SQL: GROUP BY, HAVING", dayB: "CSS: Grid Layout | JS: Arrays, Objects | React: State, useState | Backend: Middleware, req/res | Automation: Locators (ID, Name, XPath) | AI/ML: Data visualization (Matplotlib)" },
  { week: 2, days: [7,8], dayA: "Java: Inheritance, Polymorphism | DSA: Linked List basics | CN: Routing protocols | OS: Memory management | SQL: Subqueries", dayB: "JS: ES6 features (let, const, arrow functions) | React: useEffect, Lifecycle | Backend: RESTful API basics | Automation: XPath advanced | AI/ML: Seaborn, data cleaning" },
  { week: 3, days: [9,10], dayA: "Java: Encapsulation, Abstraction | DSA: Stack implementation | CN: ARP, ICMP | OS: Paging, Segmentation | SQL: Indexes, Views", dayB: "JS: DOM Manipulation | React: Forms, Controlled Components | Backend: MongoDB basics, connection | Automation: TestNG framework | AI/ML: Scikit-learn intro" },
  { week: 3, days: [11,12], dayA: "Java: Interfaces, Abstract Classes | DSA: Queue, Deque | CN: NAT, Firewall | OS: Deadlock concepts | SQL: Transactions, ACID", dayB: "JS: Event Handling | React: React Router basics | Backend: CRUD operations with MongoDB | Automation: Assertions, Test structure | AI/ML: Linear Regression" },
  { week: 4, days: [13,14], dayA: "Java: Exception Handling | DSA: Recursion basics | CN: Load balancing | OS: File systems | SQL: Window functions", dayB: "JS: Async, Callbacks | React: Context API | Backend: Authentication basics (JWT) | Automation: Page Object Model | AI/ML: Logistic Regression" },
  { week: 4, days: [15,16], dayA: "Java: Collections - ArrayList, LinkedList | DSA: Binary Search | CN: CDN, Caching | OS: Disk scheduling | SQL: Performance tuning", dayB: "JS: Promises, async/await | React: Custom Hooks | Backend: Password hashing (bcrypt) | Automation: Data-driven testing | AI/ML: Decision Trees" },
  { week: 5, days: [17,18], dayA: "Java: HashMap, TreeMap | DSA: Hashing problems | CN: Network security basics | OS: Virtual memory | SQL: Complex joins", dayB: "JS: Fetch API, Axios | React: Redux basics | Backend: File upload, Multer | Automation: Cross-browser testing | AI/ML: Random Forest" },
  { week: 5, days: [19,20], dayA: "Java: HashSet, TreeSet | DSA: Sliding Window technique | CN: SSL/TLS | OS: Cache memory | SQL: Query optimization", dayB: "React: Redux Toolkit | Backend: Error handling, validation | Automation: Headless browser testing | AI/ML: KNN, SVM basics" },
  { week: 6, days: [21,22], dayA: "Java: Streams, Lambda | DSA: Two Pointers | CN: Load balancers | OS: Thrashing | SQL: Stored procedures", dayB: "React: Performance optimization | Backend: API documentation (Swagger) | Automation: Parallel execution | AI/ML: Clustering (K-Means)" },
  { week: 6, days: [23,24], dayA: "Java: Multithreading basics | DSA: Binary Tree basics | CN: CDN architecture | OS: RAID levels | SQL: Triggers, Functions", dayB: "React: Testing (Jest basics) | Backend: Rate limiting | Automation: CI/CD basics | AI/ML: Neural Networks intro" },
  { week: 7, days: [25,26], dayA: "Java: Thread synchronization | DSA: Tree Traversals | CN: Microservices basics | OS: Virtualization | SQL: Database normalization", dayB: "Full-Stack Project: E-commerce app (Start) | Backend: Payment gateway basics | Automation: API testing (REST Assured) | AI/ML: Deep Learning basics" },
  { week: 7, days: [27,28], dayA: "Java: Executor framework | DSA: BST problems | CN: Docker basics | OS: Cloud concepts | SQL: NoSQL vs SQL", dayB: "Full-Stack Project: E-commerce (Continue) | Backend: WebSocket basics | Automation: Mobile testing intro | AI/ML: CNN basics" },
  { week: 8, days: [29,30], dayA: "Java: Concurrency utilities | DSA: Heap/Priority Queue | CN: Kubernetes intro | OS: Interview prep | SQL: Interview questions", dayB: "Full-Stack Project: E-commerce (Polish UI) | Backend: Microservices architecture | Automation: Framework design | AI/ML: Transfer Learning" },
  { week: 8, days: [31,32], dayA: "DSA: Graph basics (BFS) | Java: Design patterns (Singleton) | CN: System design basics | OS: Revision | SQL: Revision", dayB: "Full-Stack Project: Deploy to Vercel/Heroku | Backend: Redis caching | Automation: Complete test suite | AI/ML: NLP basics (NLTK)" },
  { week: 9, days: [33,34], dayA: "DSA: Graph DFS | Java: Factory pattern | Mock interviews prep | CN: CAP theorem | OS: Mock questions", dayB: "AI/ML Project: Recommendation System (Start) | Backend: GraphQL basics | Automation: Advanced frameworks | React: Advanced patterns" },
  { week: 9, days: [35,36], dayA: "DSA: Dynamic Programming basics | Java: Observer pattern | System Design: URL shortener | CN: Revision | SQL: Revision", dayB: "AI/ML Project: Recommendation System (Continue) | Backend: Serverless basics | Full-Stack: Portfolio website | Automation: Best practices" },
  { week: 10, days: [37,38], dayA: "DSA: DP - Fibonacci, Climbing Stairs | Java: Revision + Mock tests | System Design: Design Twitter | OS: Final revision", dayB: "AI/ML Project: Complete & Deploy | Backend: AWS basics | React: Final project polish | Automation: Real-world scenarios" },
  { week: 10, days: [39,40], dayA: "DSA: DP - Knapsack problems | Java: Multithreading revision | System Design: Design Instagram | Full revision", dayB: "Complete all pending projects | Backend: Final integration | GitHub: Update all repos | LinkedIn: Update profile" },
  { week: 11, days: [41,42], dayA: "DSA: Backtracking basics | Java: Advanced OOP questions | System Design: Design Uber | Interview prep", dayB: "Mock interviews (Frontend) | Portfolio optimization | Resume updates | Cover letters" },
  { week: 11, days: [43,44], dayA: "DSA: Greedy algorithms | Java: Exception scenarios | System Design: Design WhatsApp | Behavioral prep", dayB: "Mock interviews (Backend) | GitHub showcase | LinkedIn networking | Job portal optimization" },
  { week: 12, days: [45,46], dayA: "DSA: Bit manipulation | Java: Collection edge cases | System Design: Design Netflix | Company research", dayB: "Mock interviews (Full-Stack) | Project demos ready | Technical writing | Open source contribution" },
  { week: 12, days: [47,48], dayA: "DSA: Trie data structure | Java: Stream API advanced | System Design: Design Zoom | Interview strategies", dayB: "Mock interviews (AI/ML) | Kaggle competitions | Research papers | ML model deployment" },
  { week: 13, days: [49,50], dayA: "DSA: Advanced graphs (Dijkstra) | Java: Memory management | System Design: Design YouTube | Company-specific prep", dayB: "AI/ML: Advanced topics | Backend: Scalability | React: Performance tuning | Final projects polish" },
  { week: 13, days: [51,52], dayA: "DSA: Segment trees basics | Java: JVM internals | System Design: Design Amazon | Mock system design", dayB: "Full-Stack: Microservices project | AI/ML: MLOps basics | Automation: Advanced scenarios | Portfolio final review" },
  { week: 14, days: [53,54], dayA: "DSA: Contest problems | Java: Spring Boot basics | System Design: Design Spotify | HR interview prep", dayB: "Complete Mini Project: Blog Platform | AI/ML: Model optimization | All certifications complete | Professional presence check" },
  { week: 14, days: [55,56], dayA: "DSA: Hard problems focus | Java: REST API design | System Design: Design LinkedIn | Negotiation skills", dayB: "Final Portfolio Review | All Projects Live | GitHub Profile Optimization | Job Applications Sprint" },
  { week: 15, days: [57,58], dayA: "DSA: Company-specific problems | Java: Final revision | System Design: Mock interviews | Confidence building", dayB: "Interview Masterclass | Final Mock Tests | Documentation Complete | Application Follow-ups" },
  { week: 15, days: [59,60], dayA: "DSA: Final weak areas | Java: Quick revision | All theory revision | Mental preparation", dayB: "Final System Check | All Links Working | Resume Final Version | Celebration & Reflection!" }
];

export const motivationalQuotes = [
  "Every line of code brings you closer to your dream job!",
  "Consistency beats intensity. You're building unstoppable momentum!",
  "Remember: Deloitte & Accenture noticed you before - bigger things await!",
  "Your AI/ML projects prove you can learn anything. Keep that energy!",
  "60 days of focused work = A lifetime of career opportunities!",
  "You're not just learning - you're becoming interview-ready!",
  "Each problem solved is a step closer to that offer letter!",
  "Your future self will thank you for not giving up today!",
  "From good to great - that's your journey these 60 days!",
  "Believe in the process. Trust your preparation!"
];
