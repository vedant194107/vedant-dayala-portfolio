import { ProfileData } from '@/types';

/**
 * ============================================================================
 * DIGITAL ATELIER / AHMEDABAD NIGHT WORKSHOP — PROFILE CONFIGURATION
 * ============================================================================
 * Edit this file to update your personal information, links, and story.
 */
export const profileData: ProfileData = {
  name: 'Vedant Dayala',
  role: 'Creative Frontend & Full-Stack Developer',
  location: 'Ahmedabad, Gujarat, India',
  coordinates: '23.0225° N, 72.5714° E',
  timezone: 'Asia/Kolkata (IST)',
  bioHeadline: 'I build digital experiences with code, motion, and curiosity.',
  bioConcise:
    'Developer based in Ahmedabad, crafting fast, expressive web experiences with React, Node, and modern web technologies.',
  bioStory: [
    'Growing up in Ahmedabad—a city where centuries-old sandstone stepwell geometry coexists with cutting-edge modernist architecture—taught me to respect both structural integrity and handcrafted nuance. In the digital realm, I bring that same sensibility to code.',
    'I operate as a creative engineer: bridging the gap between rigorous full-stack architecture and fluid, tactile user interfaces. I believe software should not feel like an sterile spreadsheet, but an intentional physical instrument designed for human hands.',
    'From architecting robust TypeScript and Node.js REST services to orchestrating 60fps animations with React Three Fiber and GSAP, my focus is delivering performant, accessible digital artifacts that leave a lasting impression.',
  ],
  email: 'vedantdayala@example.com', // Replace with your email address
  github: 'https://github.com/vedantdayala', // Replace with your GitHub URL
  linkedin: 'https://linkedin.com/in/vedantdayala', // Replace with your LinkedIn URL
  resumeUrl: '/resume.pdf', // Place your resume PDF in public/resume.pdf
  availability: {
    status: 'available',
    label: 'Ahmedabad, India · Available for meaningful work',
  },
  exploring: [
    {
      title: 'Spatial & 3D Web',
      description: 'Procedural geometries, low-power WebGL shaders, and tactile Three.js interaction models.',
      tag: 'Creative Dev',
    },
    {
      title: 'Interaction & Micro-Physics',
      description: 'Spring physics, gestural interfaces, and haptic web feedback using GSAP & Framer Motion.',
      tag: 'UI/UX Craft',
    },
    {
      title: 'Edge & Full-Stack Systems',
      description: 'Sub-millisecond API response times, streaming SSR, and resilient Node.js backends.',
      tag: 'Architecture',
    },
    {
      title: 'Design Systems & Tokens',
      description: 'Building chiseled, tokenized UI component libraries with strict accessibility standards.',
      tag: 'Engineering',
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
      value: 'React / Node / TS',
      detail: 'Next.js, Tailwind, R3F',
    },
    {
      label: 'Focus',
      value: 'Full-Stack & 3D',
      detail: 'Fast, Accessible, Tactile',
    },
    {
      label: 'Status',
      value: 'Open for Roles',
      detail: 'Full-time & High-Impact Contracts',
    },
  ],
};
