export interface ProfileData {
  name: string;
  role: string;
  location: string;
  coordinates: string;
  timezone: string;
  bioHeadline: string;
  bioConcise: string;
  bioStory: string[];
  email: string;
  github: string;
  linkedin: string;
  resumeUrl: string;
  availability: {
    status: 'available' | 'limited' | 'busy';
    label: string;
  };
  exploring: {
    title: string;
    description: string;
    tag: string;
  }[];
  specifications: {
    label: string;
    value: string;
    detail: string;
  }[];
}

export interface ProjectData {
  id: string;
  number: string;
  name: string;
  category: string;
  impact: string;
  description: string;
  tags: string[];
  featured: boolean;
  year: string;
  clientOrContext: string;
  role: string;
  architectureNotes: string;
  metrics?: string;
  demoUrl?: string;
  githubUrl?: string;
  accentColor: string;
  caseStudy: {
    challenge: string;
    solution: string;
    technicalHighlights: string[];
    outcomes: string;
  };
}

export type SkillCategory = 'frontend' | 'backend' | 'creative' | 'workflow';

export interface SkillItem {
  id: string;
  name: string;
  category: SkillCategory;
  categoryLabel: string;
  proficiencyLevel: 'Expert' | 'Advanced' | 'Proficient';
  iconName: string;
  description: string;
  atelierUseCase: string;
  yearsOfPractice: string;
  codeSnippet?: string;
}

export interface JourneyMilestone {
  id: string;
  year: string;
  period: string;
  title: string;
  roleOrDegree: string;
  organization: string;
  location: string;
  type: 'education' | 'experience' | 'product' | 'open-source' | 'milestone';
  description: string;
  keyAchievements: string[];
  tags: string[];
}
