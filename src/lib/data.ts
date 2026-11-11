import type { NavLink, Skill, Project, Experience, Education, Certification, Achievement, SocialLink } from '@/types'

export const personalInfo = {
  name: 'Rami Maalej',
  email: 'rami.maalej.2002@gmail.com',
  phone: '+216 54 903 705',
  location: 'Sfax, Tunisia',
  linkedin: 'https://linkedin.com/in/rami-maalej-70203425b',
  github: 'https://github.com/Rami-maalej',
  title: 'Full-Stack Developer & Computer Science Graduate',
  tagline: 'Crafting Digital Excellence Through Code & Creativity',
  summary: 'Results-driven Full-Stack Developer with hands-on experience building scalable web and mobile applications. Proficient in React, Node.js, Flutter, and Python, with a strong background in system architecture, real-time messaging (Kafka, RabbitMQ), and AI integration. Proven ability to deliver end-to-end solutions across retail, education, and language-learning domains.',
  brandStatement: 'Bridging the gap between elegant design and robust engineering to create digital experiences that inspire and perform.',
  usp: 'Full-stack developer who combines AI integration, event-driven architecture, and cinematic UI to build applications that feel like experiences.',
}

export const siteUrl = 'https://rami-maalej.ct.ws'

export const navLinks: NavLink[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
]

export const skills: Skill[] = [
  { name: 'React.js', category: 'frontend', level: 95 },
  { name: 'Tailwind CSS', category: 'frontend', level: 92 },
  { name: 'Framer Motion', category: 'frontend', level: 85 },
  { name: 'Flutter / Dart', category: 'frontend', level: 80 },
  { name: 'Node.js', category: 'backend', level: 90 },
  { name: 'Express.js', category: 'backend', level: 88 },
  { name: 'REST APIs', category: 'backend', level: 90 },
  { name: 'Apache Kafka', category: 'backend', level: 75 },
  { name: 'RabbitMQ', category: 'backend', level: 72 },
  { name: 'MySQL', category: 'database', level: 85 },
  { name: 'Firebase', category: 'database', level: 78 },
  { name: 'Supabase', category: 'database', level: 80 },
  { name: 'Sequelize ORM', category: 'database', level: 82 },
  { name: 'JavaScript', category: 'languages', level: 95 },
  { name: 'Python', category: 'languages', level: 82 },
  { name: 'Ruby', category: 'languages', level: 65 },
  { name: 'Dart', category: 'languages', level: 78 },
  { name: 'Git', category: 'tools', level: 90 },
  { name: 'Docker', category: 'tools', level: 75 },
  { name: 'JWT Auth', category: 'tools', level: 88 },
  { name: 'RBAC', category: 'tools', level: 85 },
  { name: 'Odoo ERP', category: 'tools', level: 60 },
  { name: 'Google Gemini AI', category: 'ai-cloud', level: 82 },
  { name: 'Ollama', category: 'ai-cloud', level: 75 },
  { name: 'ApexCharts', category: 'ai-cloud', level: 70 },
  { name: 'PyScript', category: 'ai-cloud', level: 65 },
]

export const projects: Project[] = [
  {
    title: 'Linguvo',
    description: 'AI-Powered Language Learning Platform',
    tech: ['React', 'Node.js', 'Express', 'Google Gemini AI', 'Supabase'],
    highlights: [
      'Built full-stack platform using Google Gemini AI to generate personalized stories and exercises for A1-C2 proficiency levels',
      'Developed native-speaker matching algorithm and real-time notification system via Supabase for seamless language exchange',
      'Integrated gamified elements — XP tracking, interactive missions, and structured courses — driving measurable user engagement',
    ],
    date: 'June 2023',
    gradient: 'from-blue-600 via-purple-600 to-pink-600',
  },
  {
    title: 'SuperVib',
    description: 'AI-Powered Developer IDE',
    tech: ['Ollama', 'AI Code Generation', 'Custom IDE Architecture'],
    highlights: [
      'Designed intelligent IDE with real-time AI assistance and automated code generation',
      'Implemented smart debugging powered by Ollama for enhanced developer productivity',
      'Created clean, customizable interface with integrated project management workflows',
    ],
    date: '2024',
    gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
  },
  {
    title: 'Gamafa',
    description: 'Multi-Game Mobile Application',
    tech: ['Flutter', 'Dart', 'Android'],
    highlights: [
      'Built 30-game offline arcade hub — from Wordle, Sudoku, and Chess to Pac-Man — with smooth navigation and a responsive cartoon UI',
      'Achieved fully local performance with no internet dependency required',
      'Optimized for seamless cross-device experience on Android platforms',
    ],
    date: '2024',
    gradient: 'from-orange-500 via-red-500 to-rose-500',
  },
  {
    title: 'Invo',
    description: 'Inventory Management Application',
    tech: ['Flutter', 'Firebase', 'Google Auth', 'Barcode Scanner'],
    highlights: [
      'Developed mobile inventory app with barcode scanning and real-time Firebase sync',
      'Implemented secure Google OAuth authentication for user management',
      'Designed intuitive stock management interface with real-time updates',
    ],
    date: '2024',
    gradient: 'from-indigo-500 via-violet-500 to-purple-500',
  },
  {
    title: 'School Management System',
    description: 'Enterprise Education Platform',
    tech: ['Node.js', 'React', 'MySQL', 'Kafka', 'RabbitMQ'],
    highlights: [
      'Architected system handling 500+ student, teacher, and grade records',
      'Implemented event-driven microservices via Apache Kafka and RabbitMQ, reducing processing latency',
      'Engineered RBAC and JWT authentication for multi-role workflows',
    ],
    date: 'Jan 2026',
    gradient: 'from-sky-500 via-blue-500 to-indigo-500',
  },
  {
    title: 'Retail Management & POS System',
    description: 'Point-of-Sale & Inventory Platform',
    tech: ['React', 'Node.js', 'MySQL', 'ApexCharts', 'Framer Motion'],
    highlights: [
      'Built system with real-time inventory tracking and automated invoicing',
      'Integrated sales analytics with ApexCharts for data-driven insights',
      'Implemented Sequelize ORM for robust product, order, and returns management',
    ],
    date: 'Jul 2025',
    gradient: 'from-amber-500 via-yellow-500 to-orange-500',
  },
  {
    title: 'anchor',
    description: 'Action-First Skill Protocol for AI Coding Assistants',
    tech: ['Prompt Engineering', 'Claude', 'Cursor', 'OpenCode', 'Gemini CLI'],
    highlights: [
      'Engineered an ADHD-friendly skill that forces AI assistants to lead with the answer and take action first instead of burying intent',
      'Packaged as a portable protocol installable across Claude, Cursor, Gemini, Codex, Qwen, and OpenCode ecosystems',
      'Defined strict response rules — direct answers, one-shot execution, minimal filler — validated across multiple assistant runtimes',
    ],
    date: 'Sep 2026',
    gradient: 'from-cyan-500 via-sky-500 to-blue-600',
  },
  {
    title: 'Budgetly',
    description: 'Personal Finance Tracking App',
    tech: ['Flutter', 'Dart', 'Riverpod', 'Hive', 'fl_chart'],
    highlights: [
      'Built an offline-first expense tracker storing all data locally with Hive — no accounts or cloud dependency required',
      'Visualized spending analytics with fl_chart and location-aware views via flutter_map',
      'Managed app-wide state with Riverpod across a clean multi-platform UI targeting mobile, web, and desktop',
    ],
    date: 'May 2026',
    gradient: 'from-green-500 via-emerald-500 to-teal-500',
  },
  {
    title: 'Bullwize',
    description: 'Free Invoice Generator for Freelancers',
    tech: ['React', 'Vite', 'Express', 'PostgreSQL', 'Docker', 'react-pdf'],
    highlights: [
      'Built a full invoicing platform with branded invoices, multi-currency line items, tax & discounts, and Draft → Sent → Paid tracking',
      'Automated overdue-payment reminders and public invoice links so clients can view bills without creating an account',
      'Delivered one-command Docker Compose setup with auto migrations, seeded demo data, and server-side PDF generation',
    ],
    date: 'Sep 2026',
    gradient: 'from-teal-500 via-green-500 to-lime-500',
  },
  {
    title: 'pkgmap',
    description: 'Linux Package Inventory CLI — Published on PyPI',
    tech: ['Python', 'CLI', 'PyPI', 'JSON / CSV Export'],
    highlights: [
      'Scans installed packages across RPM, DNF, Pacman, DEB, Flatpak, Snap, AppImage, pipx, and npm with per-package disk sizes',
      'Renders colored terminal reports grouped by package family and exports JSON / CSV summaries',
      'Added interactive uninstall-by-number workflow; packaged and published to PyPI',
    ],
    date: 'Aug 2026',
    gradient: 'from-violet-500 via-purple-500 to-indigo-600',
  },
  {
    title: 'Quizverse',
    description: '3D LAN Multiplayer Quiz Game',
    tech: ['React', 'TypeScript', 'Three.js', 'Socket.IO', 'zod'],
    highlights: [
      'Built a LAN multiplayer quiz with host lobby, PIN + QR-code room joining, and live player sync over Socket.IO',
      'Crafted 3D visuals using Three.js / @react-three/fiber with zod-validated game state and sqlite persistence',
    ],
    date: 'Oct 2026',
    gradient: 'from-fuchsia-500 via-pink-500 to-rose-500',
  },
  {
    title: 'Trayock',
    description: 'Kernel-Level System Tray Lock for Linux',
    tech: ['Python', 'evdev', 'AppIndicator', 'Linux'],
    highlights: [
      'Locks keyboard and mouse at kernel level via exclusive evdev grabs — resistant to bypasses that defeat X11-level shortcuts',
      'Ships a padlock system-tray icon with Makefile packaging and a Ctrl+Alt+Shift+L panic escape hatch',
    ],
    date: 'Sep 2026',
    gradient: 'from-slate-600 via-gray-700 to-zinc-800',
  },
]

export const experiences: Experience[] = [
  {
    role: 'Full-Stack Developer Intern (PFE)',
    company: 'Syberno',
    location: 'Sfax, Tunisia',
    period: 'Jan 2026 – Jun 2026',
    type: 'Internship',
    achievements: [
      'Architected and delivered a full School Management System handling 500+ student, teacher, and grade records using Node.js, React, and MySQL',
      'Implemented event-driven microservices via Apache Kafka and RabbitMQ, decoupling core modules and reducing processing latency',
      'Engineered role-based access control (RBAC) and JWT authentication securing multi-role workflows for administrators, teachers, and students',
      'Designed a responsive UI with Tailwind CSS ensuring consistent cross-device rendering',
    ],
  },
  {
    role: 'Full-Stack Developer Intern',
    company: 'Syberno',
    location: 'Sfax, Tunisia',
    period: 'Jul 2025 – Sep 2025',
    type: 'Internship',
    achievements: [
      'Built a Retail Management & Point-of-Sale (POS) System integrating real-time inventory tracking, automated invoicing, and sales analytics',
      'Developed a secure React + Node.js application with JWT authentication and Tailwind CSS + Framer Motion for optimized UX',
      'Implemented Sequelize ORM with MySQL for robust product, order, and returns management across all retail workflows',
    ],
  },
]

export const education: Education[] = [
  {
    degree: 'Bachelor of Science in Computer Science',
    institution: 'ISIMS',
    location: 'Sfax, Tunisia',
    period: 'Sep 2023 – Jun 2026',
  },
  {
    degree: 'Baccalaureate in Computer Science',
    institution: 'Lycée 15 Novembre 1955',
    location: 'Sfax, Tunisia',
    period: '',
  },
]

export const certifications: Certification[] = [
  { name: 'PyScript Fundamentals 101', issuer: 'Udemy' },
  { name: 'Flutter Development', issuer: 'Orange Digital Center' },
]

export const achievements: Achievement[] = [
  {
    title: 'Full-Stack Architecture',
    description: 'Architected and delivered enterprise-grade systems handling 500+ records with event-driven microservices',
    icon: '🏗️',
  },
  {
    title: 'AI Integration',
    description: 'Integrated Google Gemini AI and Ollama for intelligent language learning and code generation platforms',
    icon: '🤖',
  },
  {
    title: 'Event-Driven Systems',
    description: 'Implemented Apache Kafka and RabbitMQ for decoupled, scalable microservice communication',
    icon: '⚡',
  },
  {
    title: 'Multi-Platform Development',
    description: 'Built applications across web (React) and mobile (Flutter) platforms with consistent quality',
    icon: '📱',
  },
]

export const socialLinks: SocialLink[] = [
  { label: 'Email', href: 'mailto:rami.maalej.2002@gmail.com', icon: 'mail' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/rami-maalej-70203425b', icon: 'linkedin' },
  { label: 'GitHub', href: 'https://github.com/Rami-maalej', icon: 'github' },
]
