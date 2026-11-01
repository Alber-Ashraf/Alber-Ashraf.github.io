export interface LocationInfo {
  city: string;
  region: string;
  country: string;
  countryCode: string;
  militaryStatus: string;
  remotePreference: string;
}

export interface LinksInfo {
  github: string;
  linkedin: string;
  portfolio: string;
}

export interface SummariesInfo {
  fullstack: string;
  backend: string;
  executive: string;
  detailed: string;
  detailed_backend: string;
}

export interface BasicsInfo {
  name: string;
  headline: string;
  email: string;
  phone: string;
  location: LocationInfo;
  links: LinksInfo;
  summaries: SummariesInfo;
}

export interface SkillCategory {
  category: string;
  skills: string;
}

export interface LanguageSkill {
  name: string;
  level: string;
  keywords: string[];
}

export interface SkillsInfo {
  categories: SkillCategory[];
  languages: LanguageSkill[];
}

export interface ExperienceHighlight {
  text: string;
  metrics?: Record<string, string>;
  categories?: string[];
  tier?: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  employmentType: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  tagline: string;
  highlights: ExperienceHighlight[];
  technologies: string[];
}

export interface ArchitectureLayer {
  name: string;
  tech: string;
  pattern: string;
  responsibilities: string[];
}

export interface CaseStudy {
  problem: string;
  solution: string;
  architectureDecisions: string[];
}

export interface KeyModule {
  name: string;
  description: string;
  capabilities: string[];
}

export interface ProjectItem {
  id: string;
  name: string;
  subtitle: string;
  scope: 'Full-Stack Solution' | 'Backend Architecture';
  badge: string;
  role: string;
  featured: boolean;
  tier: string;
  url: string;
  localPath: string;
  summary: string;
  metrics: string;
  highlights: string[];
  caseStudy: CaseStudy;
  technologies: string[];
  hasFrontend?: boolean;
  liveUrl?: string;
  isPrivateApi?: boolean;
  productOverview?: string;
  keyModules?: KeyModule[];
  architectureLayers?: ArchitectureLayer[];
  backendHighlights?: string[];
  frontendHighlights?: string[];
  securityAndCloudHighlights?: string[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  startDate: string;
  graduationDate: string;
  gpa: string;
  honors: string;
  location: string;
}

export interface CertificationItem {
  name: string;
  year: string;
}

export interface CertificationGroup {
  provider: string;
  items: CertificationItem[];
}

export interface CertificationsInfo {
  summary: string;
  groups: CertificationGroup[];
}

export interface LanguageItem {
  name: string;
  proficiency: string;
}

export interface MasterProfile {
  version: string;
  updatedAt: string;
  basics: BasicsInfo;
  skills: SkillsInfo;
  experience: ExperienceItem[];
  projects: ProjectItem[];
  education: EducationItem[];
  certifications: CertificationsInfo;
  languages: LanguageItem[];
}
