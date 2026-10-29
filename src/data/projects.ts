import { ProjectData } from '@/types';

/**
 * ============================================================================
 * DIGITAL ATELIER — SELECTED PROJECTS
 * ============================================================================
 * Easily edit, add, or replace projects here.
 * All project fields are strictly typed and feed into both the portfolio
 * gallery cards and the comprehensive case study drawer.
 */
export const projectsData: ProjectData[] = [
  {
    id: 'project-one',
    number: '01',
    name: 'Kavach Analytics Platform',
    category: 'Full-Stack Web App',
    impact: 'Sub-100ms dashboard data streaming with resilient Node.js microservices and React.',
    description:
      'A high-performance real-time telemetry dashboard designed for monitoring distributed systems. Features responsive data visualization, web-socket streaming, and resilient state synchronization.',
    tags: ['React', 'Node.js', 'Express', 'TypeScript', 'Tailwind CSS', 'REST APIs', 'WebSocket'],
    featured: true,
    year: '2024',
    clientOrContext: 'Enterprise Distributed Systems',
    role: 'Lead Frontend & API Architecture',
    architectureNotes:
      'Built with custom virtualized lists and memoized SVG chart rendering to handle 10,000+ continuous event ticks without dropping 60fps.',
    demoUrl: 'https://github.com/vedantdayala/kavach-analytics',
    githubUrl: 'https://github.com/vedantdayala/kavach-analytics',
    accentColor: '#38e1cb', // Electric cyan
    caseStudy: {
      challenge:
        'Large-scale enterprise monitoring tools frequently suffer from UI freezing when ingesting real-time WebSocket firehoses. The challenge was building a lightweight, zero-latency frontend that runs smoothly on standard client hardware.',
      solution:
        'Architected a chunked buffer strategy in Node.js paired with an off-main-thread Web Worker in React for telemetry ingestion. Rendered graphs using optimized SVG paths and canvas overlays rather than heavy third-party charting bloat.',
      technicalHighlights: [
        'Custom Web Worker stream parsing eliminating main-thread thread locks',
        'Express and Node.js REST API with Redis cache fallback and rate limiting',
        'Strict TypeScript schemas shared across client and server boundaries',
        'Accessible data tables with keyboard navigation and ARIA live regions',
      ],
      outcomes:
        'Reduced client CPU usage by 68% compared to legacy monitoring suites, achieving instant initial render and 99.9% uptime during peak simulation load.',
    },
  },
  {
    id: 'project-two',
    number: '02',
    name: 'Sarkhej Spatial Canvas',
    category: 'Creative Web & 3D',
    impact: 'An interactive 3D spatial experience exploring Ahmedabad stepwell geometry.',
    description:
      'A visually immersive Vite and Three.js experience translating traditional Gujarat architectural stone stepwells into a tactile, interactive digital sculpture with custom procedural GLSL shaders.',
    tags: ['Three.js', 'React Three Fiber', 'Vite', 'GLSL Shaders', 'GSAP', 'TypeScript'],
    featured: true,
    year: '2024',
    clientOrContext: 'Cultural Architectural Exploration',
    role: 'Creative Developer & 3D Engineering',
    architectureNotes:
      'Leveraged procedural geometry generation to keep bundle size under 350KB with zero external GLTF dependencies.',
    demoUrl: 'https://github.com/vedantdayala/sarkhej-canvas',
    githubUrl: 'https://github.com/vedantdayala/sarkhej-canvas',
    accentColor: '#c29b7f', // Warm sandstone
    caseStudy: {
      challenge:
        'Rendering complex architectural geometries on mobile browsers often causes battery drain, thermal throttling, and poor Core Web Vitals.',
      solution:
        'Engineered procedural instanced meshes and lightweight vertex displacement shaders instead of importing heavy 3D polygon models. Implemented adaptive DPR and dynamic draw call reduction.',
      technicalHighlights: [
        'Procedural sandstone stone-carving vertex displacement in GLSL',
        'GSAP ScrollTrigger camera choreographies with inertial damping',
        'Graceful 2D SVG fallback with prefers-reduced-motion compliance',
        'Mobile performance profile capped at 45-60fps with minimal GPU overhead',
      ],
      outcomes:
        'Delivered an award-caliber WebGL experience loading in under 1.2 seconds on 4G cellular networks, celebrated for its cultural resonance.',
    },
  },
  {
    id: 'project-three',
    number: '03',
    name: 'PulseSync API & Workspace',
    category: 'Full-Stack SaaS',
    impact: 'Modular team collaboration suite with offline-first synchronization.',
    description:
      'A responsive full-stack product with robust API integration, automated webhook dispatchers, and an ergonomic markdown workspace designed for agile development teams.',
    tags: ['Next.js', 'Node.js', 'Express', 'Tailwind CSS', 'PostgreSQL', 'REST APIs', 'Git Workflow'],
    featured: true,
    year: '2023',
    clientOrContext: 'Developer Productivity Suite',
    role: 'Full-Stack Developer',
    architectureNotes:
      'Utilized optimistic UI updates with IndexedDB local caching so developers can write and organize documentation offline.',
    demoUrl: 'https://github.com/vedantdayala/pulsesync-workspace',
    githubUrl: 'https://github.com/vedantdayala/pulsesync-workspace',
    accentColor: '#3a887a', // Oxidized copper
    caseStudy: {
      challenge:
        'Developers working in fluctuating connectivity environments experience frustrating sync conflicts and delayed UI responses when submitting work.',
      solution:
        'Implemented an optimistic mutation layer with CRDT conflict resolution, backed by a resilient Express REST service and atomic database transactions.',
      technicalHighlights: [
        'Optimistic mutations with roll-back safeguards for network dropouts',
        'Secure JWT authentication, rate-limited endpoints, and input sanitization',
        'Fluid responsive layout engineered with Tailwind CSS and fluid typography',
        'Comprehensive automated integration tests with 92% code coverage',
      ],
      outcomes:
        'Zero data-loss reported across 1,000+ simulated flaky network tests, providing instant typing latency and seamless re-sync on reconnect.',
    },
  },
  {
    id: 'project-four',
    number: '04',
    name: 'Varna Glyphs & Design Engine',
    category: 'Interaction & Tooling',
    impact: 'Generative typography playground examining Gujarati script and Latin glyphs.',
    description:
      'An open-source generative typography tool that analyzes the mathematical strokes of Gujarati calligraphy and harmonizes them with contemporary grotesque typography.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Canvas API', 'SVG Generation'],
    featured: false,
    year: '2023',
    clientOrContext: 'Open Source Typographic Lab',
    role: 'Creator & Frontend Specialist',
    architectureNotes:
      'Generates vector bezier curves dynamically based on user stroke velocity and angle inputs.',
    demoUrl: 'https://github.com/vedantdayala/varna-glyphs',
    githubUrl: 'https://github.com/vedantdayala/varna-glyphs',
    accentColor: '#d9b48f', // Pale sandstone
    caseStudy: {
      challenge:
        'Translating traditional non-Latin calligraphic stroke nuances into accurate, scalable web vector data with zero lag.',
      solution:
        'Built an SVG bezier path calculator with parameter-driven knot controls, allowing real-time parametric manipulation in the browser.',
      technicalHighlights: [
        'Vector math algorithms for cubic Bezier smoothing',
        'Framer Motion spring physics for tactile slider and knob controls',
        'Instant SVG/PNG export with custom DPI scaling',
      ],
      outcomes:
        'Adopted by indie graphic designers and students across India as an educational bridge between regional scripts and code.',
    },
  },
];
