import { SkillItem } from '@/types';

/**
 * ============================================================================
 * DIGITAL ATELIER — WORKBENCH & TOOL CONSTELLATION
 * ============================================================================
 * Each skill includes technical depth, real atelier use-case, and
 * architecture notes for the interactive workbench.
 */
export const skillsData: SkillItem[] = [
  // --- FRONTEND ---
  {
    id: 'react',
    name: 'React',
    category: 'frontend',
    categoryLabel: 'Frontend Engineering',
    proficiencyLevel: 'Expert',
    iconName: 'Atom',
    description: 'Component architecture, custom hooks, concurrent mode, and declarative state orchestration.',
    atelierUseCase:
      'The foundational canvas for constructing modular, resilient user interfaces with strict boundary management.',
    yearsOfPractice: '3+ Years',
    codeSnippet: 'const useAtelierState = () => useSyncExternalStore(store.subscribe, store.getSnapshot);',
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'frontend',
    categoryLabel: 'Frontend Engineering',
    proficiencyLevel: 'Expert',
    iconName: 'FileCode2',
    description: 'Strict type safety, generics, union discriminating models, and API contract enforcement.',
    atelierUseCase:
      'Acts as the structural mortar across the entire atelier codebase, guaranteeing runtime confidence and self-documenting APIs.',
    yearsOfPractice: '3+ Years',
    codeSnippet: 'type StrictContract<T> = T extends { id: infer U } ? Readonly<T> : never;',
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'frontend',
    categoryLabel: 'Frontend Engineering',
    proficiencyLevel: 'Advanced',
    iconName: 'Layers',
    description: 'App Router architecture, React Server Components (RSC), static generation, and edge routing.',
    atelierUseCase:
      'Powering high-performance web applications with sub-second time-to-first-byte (TTFB) and optimal SEO.',
    yearsOfPractice: '2+ Years',
    codeSnippet: 'export const revalidate = 3600; // ISR for cached high-throughput endpoints',
  },
  {
    id: 'vite',
    name: 'Vite',
    category: 'frontend',
    categoryLabel: 'Frontend Engineering',
    proficiencyLevel: 'Expert',
    iconName: 'Zap',
    description: 'Lightning-fast ES modules development server, rollup bundling, and custom plugin pipelines.',
    atelierUseCase:
      'The rapid prototyping workbench for standalone WebGL canvas experiments and micro-interaction prototypes.',
    yearsOfPractice: '2+ Years',
    codeSnippet: 'export default defineConfig({ plugins: [react(), glsl()] });',
  },
  {
    id: 'javascript',
    name: 'JavaScript (ESNext)',
    category: 'frontend',
    categoryLabel: 'Frontend Engineering',
    proficiencyLevel: 'Expert',
    iconName: 'Code',
    description: 'Deep understanding of event loops, closures, memory management, microtasks, and Web APIs.',
    atelierUseCase:
      'The bedrock language driving all client and server executions without unnecessary abstraction overhead.',
    yearsOfPractice: '4+ Years',
    codeSnippet: 'const debounced = (fn, ms) => (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms); };',
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: 'frontend',
    categoryLabel: 'Frontend Engineering',
    proficiencyLevel: 'Expert',
    iconName: 'Palette',
    description: 'Utility-first design tokens, responsive breakpoints, arbitrary values, and design system creation.',
    atelierUseCase:
      'Crafting custom themes reflecting Ahmedabad sandstone, oxidized copper, and chiseled dark surfaces with zero CSS bloat.',
    yearsOfPractice: '3+ Years',
    codeSnippet: 'className="border border-sandstone-500/20 bg-obsidian-900/80 backdrop-blur-md"',
  },
  {
    id: 'html-css',
    name: 'HTML5 & CSS3',
    category: 'frontend',
    categoryLabel: 'Frontend Engineering',
    proficiencyLevel: 'Expert',
    iconName: 'FileText',
    description: 'Semantic landmarks, ARIA accessibility, CSS Grid, container queries, custom properties, and subgrid.',
    atelierUseCase:
      'Ensuring that every surface of the atelier adheres to W3C standards, keyboard accessibility, and screen reader clarity.',
    yearsOfPractice: '4+ Years',
    codeSnippet: 'grid-template-columns: repeat(auto-fit, minmax(clamp(280px, 30vw, 420px), 1fr));',
  },

  // --- BACKEND ---
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'backend',
    categoryLabel: 'Backend & Systems',
    proficiencyLevel: 'Advanced',
    iconName: 'Server',
    description: 'Asynchronous event-driven I/O, streams, buffers, file systems, and worker threads.',
    atelierUseCase:
      'Handling background jobs, real-time telemetry processing, and building scalable serverless or containerized backends.',
    yearsOfPractice: '2+ Years',
    codeSnippet: 'pipeline(readableStream, transformStream, writableStream, (err) => { ... });',
  },
  {
    id: 'express',
    name: 'Express.js',
    category: 'backend',
    categoryLabel: 'Backend & Systems',
    proficiencyLevel: 'Advanced',
    iconName: 'TerminalSquare',
    description: 'RESTful API routing, middleware chaining, error boundaries, rate limiting, and security headers.',
    atelierUseCase:
      'Engineering predictable, secure microservice endpoints serving high-velocity JSON payloads.',
    yearsOfPractice: '2+ Years',
    codeSnippet: 'router.use(helmet(), rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));',
  },
  {
    id: 'rest-apis',
    name: 'REST APIs & Integrations',
    category: 'backend',
    categoryLabel: 'Backend & Systems',
    proficiencyLevel: 'Expert',
    iconName: 'Network',
    description: 'Resource design, status code hygiene, payload optimization, OpenAPI documentation, and webhooks.',
    atelierUseCase:
      'Connecting client interfaces to third-party services, databases, and authentication providers with zero friction.',
    yearsOfPractice: '3+ Years',
    codeSnippet: 'GET /api/v1/projects?limit=10&status=published -> HTTP 200 OK + ETag',
  },

  // --- CREATIVE WEB ---
  {
    id: 'threejs',
    name: 'Three.js & R3F',
    category: 'creative',
    categoryLabel: 'Creative & Spatial Web',
    proficiencyLevel: 'Advanced',
    iconName: 'Box',
    description: 'WebGL scene graphs, custom geometries, procedural shaders, camera frustums, and lighting rigs.',
    atelierUseCase:
      'Forming "The Builder\'s Relic" and spatial architectural sculptures that ground the digital atelier in physical presence.',
    yearsOfPractice: '2+ Years',
    codeSnippet: '<mesh ref={meshRef}><octahedronGeometry args={[1.5, 0]} /><meshStandardMaterial metalness={0.8} /></mesh>',
  },
  {
    id: 'gsap',
    name: 'GSAP & ScrollTrigger',
    category: 'creative',
    categoryLabel: 'Creative & Spatial Web',
    proficiencyLevel: 'Advanced',
    iconName: 'Sliders',
    description: 'Precision timeline animation, scroll-driven visual choreography, SVG morphing, and inertia smoothing.',
    atelierUseCase:
      'Guiding the visitor through the story with architectural pacing without ever hijacking native browser scrolling.',
    yearsOfPractice: '2+ Years',
    codeSnippet: 'gsap.timeline({ scrollTrigger: { trigger: el, scrub: 1 } }).fromTo(...)',
  },
  {
    id: 'framer-motion',
    name: 'Framer Motion',
    category: 'creative',
    categoryLabel: 'Creative & Spatial Web',
    proficiencyLevel: 'Expert',
    iconName: 'Activity',
    description: 'Spring physics, layout animations, exit transitions, and accessible reduced-motion choreography.',
    atelierUseCase:
      'Creating tactile UI responses: button depressions, modal reveals, tab switches, and hover depth.',
    yearsOfPractice: '3+ Years',
    codeSnippet: '<motion.div whileHover={{ y: -4, scale: 1.02 }} transition={{ type: "spring", stiffness: 400 }} />',
  },

  // --- WORKFLOW & DEVOPS ---
  {
    id: 'git-github',
    name: 'Git & GitHub',
    category: 'workflow',
    categoryLabel: 'Workflow & Tooling',
    proficiencyLevel: 'Expert',
    iconName: 'GitBranch',
    description: 'Trunk-based development, rebase workflows, GitHub Actions CI/CD pipelines, and pull request reviews.',
    atelierUseCase:
      'Version control discipline maintaining clean, semantic commit histories and automated testing releases.',
    yearsOfPractice: '3+ Years',
    codeSnippet: 'git commit -m "feat(atelier): introduce procedural sandstone shader with fallback"',
  },
  {
    id: 'responsive-design',
    name: 'Responsive & Accessible UI',
    category: 'workflow',
    categoryLabel: 'Workflow & Tooling',
    proficiencyLevel: 'Expert',
    iconName: 'MonitorSmartphone',
    description: 'Mobile-first fluid layouts, clamp() typography, WCAG AA contrast compliance, and keyboard navigation.',
    atelierUseCase:
      'Ensuring the atelier renders flawlessly from 320px compact screens to 4K ultrawide monitors.',
    yearsOfPractice: '4+ Years',
    codeSnippet: 'font-size: clamp(1rem, 0.8rem + 1vw, 1.35rem);',
  },
  {
    id: 'figma-prototyping',
    name: 'Figma & Design Systems',
    category: 'workflow',
    categoryLabel: 'Workflow & Tooling',
    proficiencyLevel: 'Advanced',
    iconName: 'LayoutGrid',
    description: 'Auto-layout, design tokens, interactive components, wireframing, and pixel-precise design translation.',
    atelierUseCase:
      'Translating abstract architectural ideas into chiseled vector blueprints before writing a single line of CSS.',
    yearsOfPractice: '3+ Years',
    codeSnippet: 'Design Tokens -> Tailwind Theme -> Reusable React Component Primitives',
  },
  {
    id: 'vercel-deployment',
    name: 'Vercel & Cloud Deployment',
    category: 'workflow',
    categoryLabel: 'Workflow & Tooling',
    proficiencyLevel: 'Advanced',
    iconName: 'Cloud',
    description: 'Continuous deployment, preview environments, edge middleware, and Core Web Vitals optimization.',
    atelierUseCase:
      'Deploying zero-config, globally distributed builds optimized for ultra-low latency across global edges.',
    yearsOfPractice: '2+ Years',
    codeSnippet: 'vercel deploy --prod -> Global Edge CDN distribution in seconds',
  },
];
