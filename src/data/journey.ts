import { JourneyMilestone } from '@/types';

/**
 * ============================================================================
 * DIGITAL ATELIER — JOURNEY & MILESTONES
 * ============================================================================
 * An honest, chronological timeline tracing the evolution from fundamental
 * curiosity to creative engineering and full-stack software architecture.
 */
export const journeyData: JourneyMilestone[] = [
  {
    id: 'm-2024-atelier',
    year: '2024',
    period: 'Present',
    title: 'Independent Creative & Full-Stack Development',
    roleOrDegree: 'Creative Technologist / Freelance Engineer',
    organization: 'Digital Atelier',
    location: 'Ahmedabad, India',
    type: 'experience',
    description:
      'Designing and developing custom web applications, spatial 3D interfaces, and high-performance frontend systems for forward-thinking clients and collaborative teams.',
    keyAchievements: [
      'Engineered interactive 3D WebGL experiences blending regional heritage with modern shaders',
      'Developed responsive full-stack applications with Next.js, Node.js, and TypeScript',
      'Achieved consistent 95+ Core Web Vitals across delivered client web architectures',
    ],
    tags: ['Next.js', 'React Three Fiber', 'GSAP', 'TypeScript', 'Node.js'],
  },
  {
    id: 'm-2023-fullstack',
    year: '2023',
    period: '2023 — 2024',
    title: 'Full-Stack Web Engineering & Systems',
    roleOrDegree: 'Software Development Intern / Project Lead',
    organization: 'Web Technology Solutions',
    location: 'Ahmedabad, India',
    type: 'experience',
    description:
      'Spearheaded frontend implementation and REST API development for enterprise-facing web applications. Collaborated closely with product designers to bridge the gap between design tokens and production code.',
    keyAchievements: [
      'Constructed modular React component libraries adhering to WCAG 2.1 AA accessibility standards',
      'Integrated resilient Express/Node endpoints with comprehensive validation and error handling',
      'Refactored legacy web flows to reduce page bundle sizes by over 40%',
    ],
    tags: ['React', 'Node.js', 'Express', 'REST APIs', 'Tailwind CSS'],
  },
  {
    id: 'm-2023-creative-milestone',
    year: '2023',
    period: 'Mid 2023',
    title: 'Creative Web & Spatial Coding Immersion',
    roleOrDegree: 'Independent Research & Open-Source Experiments',
    organization: 'Self-Directed Studio Lab',
    location: 'Ahmedabad, India',
    type: 'milestone',
    description:
      'Deep dive into Three.js, WebGL shader mathematics (GLSL), and physics-based motion. Built dozens of standalone micro-experiments exploring lighting, shadows, and interactive materials.',
    keyAchievements: [
      'Published open-source interactive canvas demos and procedural material templates',
      'Mastered GSAP ScrollTrigger timeline orchestration and Framer Motion spring kinetics',
      'Authored technical write-ups on managing WebGL memory cleanup in single-page apps',
    ],
    tags: ['Three.js', 'GLSL Shaders', 'GSAP', 'Vite', 'Creative Web'],
  },
  {
    id: 'm-2022-education',
    year: '2020 – 2024',
    period: '2020 — 2024',
    title: 'Bachelor of Technology in Computer Engineering',
    roleOrDegree: 'B.Tech in Computer Engineering',
    organization: 'Gujarat Technological University (GTU) Affiliated Institute',
    location: 'Ahmedabad, Gujarat, India',
    type: 'education',
    description:
      'Rigorous foundation in computer science principles: data structures, algorithms, database management, computer networks, and software engineering methodologies.',
    keyAchievements: [
      'Graduated with First Class Distinction with a focus on web systems and human-computer interaction',
      'Organized technical workshops on modern JavaScript and open-source contribution for student developers',
      'Capstoned with a real-time collaborative workspace web application',
    ],
    tags: ['Computer Engineering', 'Data Structures', 'Database Systems', 'Software Engineering'],
  },
  {
    id: 'm-2021-foundations',
    year: '2021',
    period: 'Early Foundations',
    title: 'The First Spark of the Craft',
    roleOrDegree: 'Self-Taught Exploration & Open-Source Beginnings',
    organization: 'Personal Sandbox',
    location: 'Ahmedabad, India',
    type: 'open-source',
    description:
      'Began writing first lines of HTML, CSS, and modern JavaScript. Dissected award-winning websites to understand how code, typography, and motion intertwine.',
    keyAchievements: [
      'Built first responsive client websites and interactive landing pages',
      'Adopted Git and GitHub for collaborative open-source participation',
      'Committed to the philosophy of the "Digital Atelier": software as a handcrafted discipline',
    ],
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Git', 'Responsive Design'],
  },
];
