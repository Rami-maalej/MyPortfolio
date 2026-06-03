export interface NavLink {
  label: string
  href: string
}

export interface Skill {
  name: string
  category: 'frontend' | 'backend' | 'database' | 'languages' | 'tools' | 'ai-cloud'
  level: number
  icon?: string
}

export interface Project {
  title: string
  description: string
  tech: string[]
  highlights: string[]
  date: string
  gradient: string
}

export interface Experience {
  role: string
  company: string
  location: string
  period: string
  type: string
  achievements: string[]
}

export interface Education {
  degree: string
  institution: string
  location: string
  period: string
}

export interface Certification {
  name: string
  issuer: string
}

export interface Achievement {
  title: string
  description: string
  icon: string
}

export interface SocialLink {
  label: string
  href: string
  icon: string
}
