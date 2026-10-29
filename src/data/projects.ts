import { ProjectData } from '@/types';

/**
 * ============================================================================
 * VEDANT DAYALA — REAL PRODUCTION PROJECTS
 * ============================================================================
 * Authentic engineering projects built by Vedant Dayala:
 * 1. Enterprise ERP & Industrial Platform
 * 2. Industrial Estate & Maintenance Portal
 * 3. Tripflow AI Travel Architect
 * 4. CashEntries Financial Ledger
 */
export const projectsData: ProjectData[] = [
  {
    id: 'seemore-erp',
    number: '01',
    name: 'Enterprise ERP & Industrial Platform',
    category: 'Enterprise Full-Stack System',
    impact: 'End-to-end manufacturing ERP with inventory, dispatch pipelines, and Three.js 3D catalog.',
    description:
      'A comprehensive enterprise resource planning system managing multi-tiered production, supplier catalogues, order processing, printing die inventory, automated dispatch workflows, and Android application connectivity.',
    tags: ['Next.js', 'React', 'Prisma ORM', 'MySQL', 'Three.js', 'Node.js', 'Tailwind CSS', 'REST APIs'],
    featured: true,
    year: '2024',
    clientOrContext: 'Manufacturing & Enterprise Supply Chain',
    role: 'Lead Full-Stack Architect',
    architectureNotes:
      'Engineered with relational data models, automated proforma invoice generators, QR code tracking, and 3D product visualizers.',
    demoUrl: 'https://github.com/vedantdayala/seemoreerp',
    githubUrl: 'https://github.com/vedantdayala/seemoreerp',
    accentColor: '#38f0d0', // Electric cyan
    caseStudy: {
      challenge:
        'Managing hundreds of daily manufacturing orders across multiple product types, customized printing dies, dispatch timetables, and fluctuating supplier price lists caused frequent manual overhead and synchronization delays.',
      solution:
        'Architected an end-to-end full-stack ERP with Next.js and Prisma ORM. Built automated dispatch status pipelines, credit-note calculation engines, instant PDF invoice generation, and real-time inventory tracking.',
      technicalHighlights: [
        'Automated proforma invoice and dispatch note generator with PDF rendering engine',
        'Relational schema managing accounts receivable, supplier ledgers, printing dies, and live orders',
        'Interactive Three.js 3D product catalog integration for visual customer inspection',
        'Secure role-based authentication and rate-limited REST API endpoints for Android app sync',
      ],
      outcomes:
        'Accelerated order processing by 74%, eliminated dispatch scheduling errors, and provided unified financial ledger visibility for management.',
    },
  },
  {
    id: 'urvi-estate',
    number: '02',
    name: 'Industrial Estate & Maintenance Portal',
    category: 'Full-Stack Management SaaS',
    impact: 'Automated monthly maintenance collection, penalty calculation, and multi-phase tenant directory.',
    description:
      'An enterprise estate and industrial infrastructure management portal. Features dynamic phase filtering, owner/tenant directory with Excel/PDF ingestion, area yard deposit tracking, and automated receipt generation.',
    tags: ['Next.js 14', 'TypeScript', 'Prisma ORM', 'MySQL', 'Tailwind CSS', 'PDF Engine', 'Financial Ledger'],
    featured: true,
    year: '2024',
    clientOrContext: 'Industrial Estate & Infrastructure Management',
    role: 'Full-Stack Developer',
    architectureNotes:
      'Built with Next.js App Router, Prisma ORM, and automated accounting calculation engines for Sundry Debtors and collection summaries.',
    demoUrl: 'https://github.com/vedantdayala/urvi-estate',
    githubUrl: 'https://github.com/vedantdayala/urvi-estate',
    accentColor: '#c49d7f', // Warm sandstone
    caseStudy: {
      challenge:
        'Manual maintenance collection across hundreds of industrial sheds led to unrecorded penalties, delayed tenant updates, and complex bookkeeping for development charges and maintenance deposits.',
      solution:
        'Developed a unified portal with multi-phase filtering, automated maintenance dues calculation, penalty computation, bulk member directory management, and one-click PDF receipt generation.',
      technicalHighlights: [
        'Dynamic multi-phase tab filtering (Phase-1, Phase-2) with live collection statistics',
        'Official accounting reports: Maintenance Collection Account & Sundry Debtors PDF generator',
        'Bulk Excel export and automated member record updates with input validation',
        'Clean responsive UI with custom branding logo management and dark mode aesthetics',
      ],
      outcomes:
        'Reduced monthly billing overhead from days to minutes, achieving 100% transparent audit trails for industrial shed owners and tenants.',
    },
  },
  {
    id: 'tripflow-ai',
    number: '03',
    name: 'Tripflow AI Travel Architect',
    category: 'AI & Interactive Experience',
    impact: 'Intelligent multi-destination itinerary synthesis with interactive route mapping and timelines.',
    description:
      'An AI-driven travel planning and itinerary synthesis platform. Transforms travel preferences into day-by-day interactive timelines, kinetic route waypoints, and seamless destination discovery.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'REST APIs', 'Interactive Maps'],
    featured: true,
    year: '2024',
    clientOrContext: 'AI Travel Technology Studio',
    role: 'Frontend & Interaction Engineer',
    architectureNotes:
      'Utilizes stateful timeline components and spring-physics micro-interactions to render complex multi-day schedules effortlessly.',
    demoUrl: 'https://github.com/vedantdayala/tripflow',
    githubUrl: 'https://github.com/vedantdayala/tripflow',
    accentColor: '#368b7d', // Oxidized copper
    caseStudy: {
      challenge:
        'Existing travel planners overwhelm users with dense text itineraries and disconnected map tabs, making multi-day trip coordination confusing and tiring on mobile screens.',
      solution:
        'Designed an editorial, cinematic interface combining AI-generated itinerary cards with synchronized timeline nodes, kinetic map waypoints, and tactile gesture controls.',
      technicalHighlights: [
        'Interactive itinerary timeline with synchronized route waypoint visualization',
        'Fluid Framer Motion layout transitions for day-by-day scheduling tabs',
        'Optimized client-side rendering with zero layout shift across mobile breakpoints',
        'Stateful search and exploration filters for personalized landmark discovery',
      ],
      outcomes:
        'Delivered an intuitive itinerary experience that users can customize in seconds, celebrating the beauty of travel through elegant typography and fluid motion.',
    },
  },
  {
    id: 'cashentries',
    number: '04',
    name: 'CashEntries Financial Ledger',
    category: 'Financial Telemetry & Audit',
    impact: 'High-velocity transaction tracking, dual-entry accounting, and real-time ledger audit trails.',
    description:
      'A streamlined financial management and cash entries application designed for fast record keeping, transaction categorization, debit/credit ledger verification, and daily balance telemetry.',
    tags: ['React', 'Node.js', 'Express', 'MySQL', 'REST APIs', 'Tailwind CSS', 'Data Tables'],
    featured: false,
    year: '2023',
    clientOrContext: 'Financial Accounting & Cashflow Telemetry',
    role: 'Full-Stack Developer',
    architectureNotes:
      'Optimized database queries and atomic transaction locking to ensure 100% ledger consistency under rapid successive entries.',
    demoUrl: 'https://github.com/vedant194107/cash-entries2',
    githubUrl: 'https://github.com/vedant194107/cash-entries2',
    accentColor: '#ddb392', // Sandstone highlight
    caseStudy: {
      challenge:
        'Small businesses and operational facilities struggle with manual cash slips and unverified ledgers, creating balance mismatches and lack of visibility into daily expenditures.',
      solution:
        'Engineered an accessible web application allowing rapid transaction entry, automatic debit/credit verification, category filtering, and instant balance reconciliation.',
      technicalHighlights: [
        'Sub-15ms transaction recording with atomic database entry verification',
        'Keyboard-accessible data tables with inline editing and fast search filtering',
        'Visual ledger telemetry showing daily cash balance trends and expense categories',
        'Data export to structured CSV and PDF accounting summaries',
      ],
      outcomes:
        'Eliminated end-of-day balance discrepancies and simplified daily financial auditing into a transparent, single-screen dashboard.',
    },
  },
];
