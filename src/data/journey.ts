import { JourneyMilestone } from '@/types';

/**
 * ============================================================================
 * VEDANT DAYALA — JOURNEY & MILESTONES
 * ============================================================================
 * An honest, chronological timeline tracing the evolution from computer
 * engineering foundations to full-stack systems architecture and creative web.
 */
export const journeyData: JourneyMilestone[] = [
  {
    id: 'm-2024-enterprise',
    year: '2024',
    period: 'Present',
    title: 'Full-Stack Architecture & Enterprise Platforms',
    roleOrDegree: 'Full-Stack Software Engineer',
    organization: 'Independent Engineering & Client Platforms',
    location: 'Ahmedabad, Gujarat, India',
    type: 'experience',
    description:
      'Architecting production enterprise management suites (Manufacturing ERP, Industrial Estate Portal), full-stack Next.js applications, and AI-driven platforms with modern TypeScript and relational databases.',
    keyAchievements: [
      'Engineered Enterprise Manufacturing ERP platform cutting order processing cycles by 74% with automated PDF generation and 3D catalog previews',
      'Architected Industrial Estate Maintenance Portal with Next.js 14 App Router, Prisma ORM, and automated billing ledgers',
      'Developed Tripflow AI interactive travel planning engine featuring synchronized route timelines and kinetic map waypoints',
    ],
    tags: ['Next.js 14', 'Prisma ORM', 'TypeScript', 'MySQL', 'Three.js', 'Tailwind CSS'],
  },
  {
    id: 'm-2023-systems',
    year: '2023',
    period: '2023 — 2024',
    title: 'Financial Telemetry & Full-Stack Systems',
    roleOrDegree: 'Full-Stack Web Developer',
    organization: 'FinTech & Operational Systems',
    location: 'Ahmedabad, India',
    type: 'experience',
    description:
      'Constructed high-velocity financial entry software (CashEntries), atomic transaction verification pipelines, and responsive management dashboards with React and Node.js.',
    keyAchievements: [
      'Built dual-entry cash accounting software ensuring 100% balance reconciliation and sub-15ms entry latency',
      'Implemented secure REST API routing, rate limiting, and structured audit export pipelines',
      'Designed responsive, keyboard-accessible data tables compliant with WCAG AA accessibility standards',
    ],
    tags: ['React', 'Node.js', 'Express', 'MySQL', 'REST APIs', 'Tailwind CSS'],
  },
  {
    id: 'm-2023-creative',
    year: '2023',
    period: 'Mid 2023',
    title: 'Creative Web, 3D & Spatial Coding',
    roleOrDegree: 'Creative Technologist / Researcher',
    organization: 'Atelier Sandbox',
    location: 'Ahmedabad, India',
    type: 'milestone',
    description:
      'Immersed in Three.js, React Three Fiber, GLSL shader mathematics, and physics-based motion with GSAP and Framer Motion. Explored how architectural heritage informs tactile digital interfaces.',
    keyAchievements: [
      'Engineered procedural materials, ambient lighting rigs, and spring-physics micro-interactions',
      'Integrated Three.js 3D product viewports into real enterprise e-commerce and catalog applications',
      'Authored zero-dependency procedural Web Audio API feedback hooks for tactile UI responses',
    ],
    tags: ['Three.js', 'React Three Fiber', 'GSAP', 'Framer Motion', 'Web Audio API'],
  },
  {
    id: 'm-2020-education',
    year: '2020 – 2024',
    period: '2020 — 2024',
    title: 'Bachelor of Technology in Computer Engineering',
    roleOrDegree: 'B.Tech in Computer Engineering',
    organization: 'Gujarat Technological University (GTU) Affiliated Institute',
    location: 'Ahmedabad, Gujarat, India',
    type: 'education',
    description:
      'Rigorous foundation in computer science: relational database management (RDBMS), data structures, algorithms, computer networks, and full-stack software development methodologies.',
    keyAchievements: [
      'Completed comprehensive coursework in software architecture, distributed databases, and web technologies',
      'Led student engineering projects focusing on real-world industrial and operational management software',
      'Graduated with First Class Distinction with a strong commitment to clean code and architectural craft',
    ],
    tags: ['Computer Engineering', 'Data Structures', 'Database Systems', 'Software Architecture', 'GTU'],
  },
];
