export interface BlogSection {
  heading?: string
  paragraphs: string[]
}

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: string
  tags: string[]
  content: BlogSection[]
}

export const blogPosts: BlogPost[] = [
  {
    slug: "kafka-rabbitmq-school-management",
    title: "Running event-driven microservices with Kafka and RabbitMQ in a real school platform",
    excerpt:
      "How I used Apache Kafka and RabbitMQ to decouple a School Management System — and what I learned about latency, RBAC, and message design.",
    date: "Nov 2026",
    readTime: "6 min read",
    tags: ["Kafka", "RabbitMQ", "Node.js", "Architecture"],
    content: [
      {
        paragraphs: [
          "In my end-of-studies internship at Syberno, I built the back end of a School Management System: 500+ student, teacher, and grade records flowing through Node.js services on top of MySQL. The interesting part was not the CRUD — it was making five modules stop talking to each other directly.",
          "My first version was a classic monolith. Every feature — attendance, grading, scheduling — updated the database and pushed notifications in the same request cycle. It worked, but a slow email send delayed a teacher's entire grading flow. That coupling was the real bug.",
        ],
      },
      {
        heading: "Kafka and RabbitMQ, one job each",
        paragraphs: [
          "I split the system into event-driven microservices and gave the two brokers different roles. Apache Kafka became the event log: grade changes, enrollment events, attendance updates published as immutable facts that any service could consume at its own pace.",
          "RabbitMQ handled the point-to-point work — emails, PDF report generation, notification fan-out — where every message needed guaranteed delivery exactly once. Queuing them meant a teacher never waited for an SMTP server again.",
        ],
      },
      {
        heading: "What I took away",
        paragraphs: [
          "Event-driven architecture is less about the tools and more about the contract: once I defined clear, versioned event payloads, adding a new consumer became a zero-risk change. The second lesson was RBAC — with multi-role workflows for admins, teachers, and students, JWT authentication combined with role-based access control earned its complexity.",
          "The result was a system where a grade update takes milliseconds to process regardless of what else the platform is doing. That decoupling is the difference between an app and a system.",
        ],
      },
    ],
  },
  {
    slug: "gemini-ai-language-learning-platform",
    title: "Building an AI-powered language learning platform with Google Gemini",
    excerpt:
      "Designing Linguvo: personalized AI-generated exercises for A1–C2 learners, a native-speaker matching algorithm, and gamification that actually works.",
    date: "Oct 2026",
    readTime: "5 min read",
    tags: ["AI", "Gemini", "React", "Node.js"],
    content: [
      {
        paragraphs: [
          "Most language apps serve the same generic exercises to a beginner and an advanced learner alike. Linguvo started from a simple question: what if the exercises generated themselves, tuned to your exact level and mistakes?",
          "I built the platform with React, Node.js, Express, and Supabase, with Google Gemini AI generating stories, quizzes, and exercises for A1 through C2 proficiency levels. The prompt design mattered as much as the code: the model receives the learner's level, recent mistakes, and the target grammar point, then returns structured exercises the app validates before saving.",
        ],
      },
      {
        heading: "Matching humans, not just content",
        paragraphs: [
          "The second pillar is a matchmaking algorithm for language exchange: pairing a native Arabic speaker learning French with a French speaker learning Arabic, weighted by proficiency, interests, and availability. Real-time notifications through Supabase make the connection immediate instead of buried in tabs.",
        ],
      },
      {
        heading: "Gamification that measures something",
        paragraphs: [
          "XP tracking, interactive missions, and structured courses are only worth their complexity if they change behavior — so I wired them to engagement metrics rather than vibes. Users who complete a daily mission return measurably more often, and that loop convinced me gamification is a retention tool, not decoration.",
          "The takeaway: AI becomes genuinely useful in education when it is constrained by structure — levels, validation, feedback — instead of just generating text into a void.",
        ],
      },
    ],
  },
  {
    slug: "evdev-kernel-level-input-linux",
    title: "Locking Linux input at the kernel level — how Trayock works",
    excerpt:
      "Why X11-level keyboard locks can be bypassed, and how I built a Python system-tray lock that grabs the keyboard and mouse with evdev.",
    date: "Sep 2026",
    readTime: "4 min read",
    tags: ["Python", "Linux", "evdev", "Systems"],
    content: [
      {
        paragraphs: [
          "Walk away from your laptop in a co-working space and you want one thing: nothing you left on screen is reachable. Most Linux locking tools stop at X11 shortcuts — and X11 shortcuts can be bypassed by a second keyboard or by simply having a shell on the tty.",
          "Trayock locks the single source of truth: the input devices themselves. Using Python's evdev library, it takes exclusive grabs on the keyboard and mouse. At the kernel input layer, exclusive grabs tell the kernel that only Trayock reads these devices — other processes, display managers included, see nothing.",
        ],
      },
      {
        heading: "The panic hatch",
        paragraphs: [
          "A lock that can lock you out is worse than no lock. The hard problem was escaping my own grab. The solution is a global key listener that reacts to Ctrl+Alt+Shift+L no matter what — the one combination guaranteed to release the devices, deliberately resistant to the grab itself.",
          "Shipped as a system-tray padlock icon (AppIndicator) with Makefile packaging, it is a small tool, but it taught me more about how Linux handles input than years of using shortcuts ever did. Sometimes the right level of abstraction is one floor below where everyone else stopped digging.",
        ],
      },
    ],
  },
]
