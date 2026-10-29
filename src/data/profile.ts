import { ProfileData } from '@/types';

/**
 * ============================================================================
 * DIGITAL ATELIER / AHMEDABAD NIGHT WORKSHOP — PROFILE CONFIGURATION
 * ============================================================================
 * Edit this file to update your personal information, links, and story.
 */
export const profileData: ProfileData = {
  name: 'Vedant Dayala',
  role: 'Full Stack Developer',
  location: 'Ahmedabad, Gujarat, India',
  coordinates: '23.0225° N, 72.5714° E',
  timezone: 'Asia/Kolkata (IST)',
  bioHeadline: 'Vedant Dayala — Full Stack Developer building robust web systems with code, motion, and precision.',
  bioConcise:
    'Full Stack Developer based in Ahmedabad, crafting high-performance web applications, enterprise ERP platforms, and expressive interactive experiences with Next.js, React, Node.js, and modern databases.',
  bioStory: [
    'I am Vedant Dayala, a Full Stack Developer based in Ahmedabad, Gujarat. I specialize in building complete, production-ready web platforms, enterprise management software, and responsive user interfaces that solve real-world operational problems.',
    'My hands-on experience includes architecting end-to-end enterprise manufacturing suites handling inventory, order processing, automated dispatch pipelines, and billing ledgers—as well as comprehensive industrial estate management portals built with Next.js 14 and Prisma ORM.',
    'Whether developing frontend interfaces with React, TypeScript, and Tailwind CSS or building backend REST APIs and relational MySQL databases, I focus on clean architecture, reliable performance, and intuitive user experiences.',
  ],
  email: 'vedantdayala@gmail.com', // Update with your preferred email anytime
  github: 'https://github.com/vedantdayala', // Replace with your GitHub URL
  linkedin: 'https://linkedin.com/in/vedantdayala', // Replace with your LinkedIn URL
  resumeUrl: '/resume.pdf', // Place your resume PDF in public/resume.pdf
  availability: {
    status: 'available',
    label: 'Ahmedabad, India · Available for Full-Time & Contract Roles',
  },
  exploring: [
    {
      title: 'Enterprise Full-Stack Systems',
      description: 'Building production enterprise platforms and management SaaS suites with Next.js App Router, Prisma ORM, and MySQL.',
      tag: 'Full-Stack',
    },
    {
      title: 'Frontend & Responsive UI',
      description: 'Crafting clean, accessible, and fast web applications with React, TypeScript, and Tailwind CSS.',
      tag: 'Frontend',
    },
    {
      title: 'Backend & REST APIs',
      description: 'Engineering secure Express and Node.js microservices with rate limiting, validation, and atomic transactions.',
      tag: 'Backend',
    },
    {
      title: 'Database & Financial Ledgers',
      description: 'Relational data modeling, billing calculations, automated PDF invoice engines, and audit logging.',
      tag: 'Databases',
    },
  ],
  specifications: [
    {
      label: 'Home Base',
      value: 'Ahmedabad, IN',
      detail: 'UTC+05:30 (IST)',
    },
    {
      label: 'Primary Stack',
      value: 'Next.js / TS / Node',
      detail: 'Prisma, MySQL, React',
    },
    {
      label: 'Focus',
      value: 'Full Stack & 3D',
      detail: 'Fast, Accessible, Robust',
    },
    {
      label: 'Status',
      value: 'Open for Roles',
      detail: 'Full-time & Contracts',
    },
  ],
};
