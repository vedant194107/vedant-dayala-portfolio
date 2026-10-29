# Vedant Dayala — Digital Atelier & Portfolio
> *An original, award-quality developer portfolio rooted in the creative direction of the "Ahmedabad Night Workshop".*

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-R3F-black?style=flat&logo=three.js)](https://threejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 🏛️ Concept & Creative Direction

**The Digital Atelier / Ahmedabad Night Workshop**

Ahmedabad, India's first UNESCO World Heritage City, is renowned for its historic stepwell geometry (*Adalaj*), Louis Kahn’s brick arches at IIM, and an enduring tradition of handcrafted textiles and metal casting.

This portfolio reinterprets those principles for the modern web:
- **Palette**: Obsidian black (`#07090c`), charcoal, deep indigo, warm Dholpur sandstone (`#c49d7f`), oxidized copper patina (`#368b7d`), and electric cyan highlights (`#38f0d0`).
- **Tactile Materials**: Layered chiseled panels, hairline architectural coordinate grids, fine noise grain, and zero generic neon bloat.
- **The Builder's Relic**: Central interactive 3D sculpture formed from layered concentric brushed metal, sandstone rings, and crystalline core geometry, reacting organically to pointer movements.
- **Audio Feedback**: Procedural Web Audio API analog synthesizer providing subtle tactile feedback (toggleable in navigation).

---

## 🛠️ Stack & Architecture

- **Framework**: [Next.js](https://nextjs.org/) 14 (App Router) + [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with a custom Atelier design token theme
- **3D & Spatial**: [Three.js](https://threejs.org/), [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber), and [@react-three/drei](https://github.com/pmndrs/drei)
- **Motion & Physics**: [Framer Motion](https://www.framer.com/motion/) + [GSAP](https://greensock.com/)
- **Icons**: Custom accessible SVGs & [Lucide Icons](https://lucide.dev/)
- **SEO & Structured Data**: Dynamic metadata, OpenGraph, Twitter Cards, Sitemap, Robots, and Schema.org `Person` JSON-LD

---

## 📂 Project Organization

```text
src/
├── app/
│   ├── fonts/           # Local Geist font binaries
│   ├── lab/             # Experimental R&D Sandbox (/lab)
│   ├── globals.css      # Custom styling, noise overlays, scrollbars
│   ├── layout.tsx       # Root layout with fonts, JSON-LD, metadata
│   ├── not-found.tsx    # Custom 404 screen
│   ├── page.tsx         # Atelier main floor (one-page journey)
│   ├── robots.ts        # Dynamic robots.txt
│   └── sitemap.ts       # Dynamic sitemap.xml
├── components/
│   ├── layout/          # Navbar, Footer, NoiseOverlay
│   ├── sections/        # Hero, About, Projects, Toolbox, Journey, Contact
│   ├── three/           # BuildersRelic, CanvasFallback, SceneContainer
│   └── ui/              # Button, ProjectCard, CaseStudyModal, TimeDisplay, ScrollCue, BrandIcons
├── data/
│   ├── profile.ts       # Developer bio, links, location, coordinates, explore items
│   ├── projects.ts      # Reusable project catalog & case study data
│   ├── skills.ts        # Skills grouped by category with code snippets
│   └── journey.ts       # Timeline milestones
├── hooks/
│   ├── useAudioEffect.ts   # Web Audio API procedural sound synthesizer
│   ├── useMediaQuery.ts    # Responsive breakpoint hook
│   └── useReducedMotion.ts # prefers-reduced-motion listener
├── lib/
│   ├── utils.ts         # Class merging and string formatting
│   └── webgl.ts         # WebGL & device power detection
└── types/
    └── index.ts         # TypeScript interfaces
```

---

## 🚀 Quickstart & Local Setup

### Prerequisites
- Node.js `18.18+` or `20+`
- npm `9+` (or pnpm / yarn)

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
npm run start
```

---

## ✏️ How to Customize

All content is cleanly decoupled from UI components. You can customize the entire portfolio from the `src/data/` directory:

### 1. Update Profile Information (`src/data/profile.ts`)
```typescript
export const profileData = {
  name: 'Your Name',
  role: 'Creative Frontend & Full-Stack Developer',
  location: 'Ahmedabad, Gujarat, India',
  email: 'your.email@example.com',
  github: 'https://github.com/yourusername',
  linkedin: 'https://linkedin.com/in/yourusername',
  resumeUrl: '/resume.pdf',
  // ...
};
```

### 2. Add or Edit Projects (`src/data/projects.ts`)
Projects feed into both the project cards and the deep-dive **Case Study Modal**:
```typescript
{
  id: 'project-slug',
  number: '01',
  name: 'Project Title',
  category: 'Full-Stack Web App',
  impact: 'One-line metric or impact statement',
  description: 'Detailed description...',
  tags: ['React', 'Next.js', 'Node.js', 'Tailwind'],
  demoUrl: 'https://...',
  githubUrl: 'https://...',
  accentColor: '#38f0d0',
  caseStudy: {
    challenge: '...',
    solution: '...',
    technicalHighlights: ['...', '...'],
    outcomes: '...',
  },
}
```

### 3. Add or Edit Toolbox Skills (`src/data/skills.ts`)
Add skills to `frontend`, `backend`, `creative`, or `workflow` trays with custom code snippets.

### 4. Update Milestones (`src/data/journey.ts`)
Add education, work experience, open-source projects, and learning milestones to the illuminated path.

---

## 🔌 Connecting the Contact Form to Production

The contact form in `src/components/sections/ContactSection.tsx` includes complete client-side validation and simulated dispatch.

To connect it to an email provider:

### Option A: Resend (Recommended)
1. Install Resend:
   ```bash
   npm install resend
   ```
2. Create `src/app/api/contact/route.ts`:
   ```typescript
   import { Resend } from 'resend';
   const resend = new Resend(process.env.RESEND_API_KEY);

   export async function POST(req: Request) {
     const { name, email, subject, message } = await req.json();
     await resend.emails.send({
       from: 'Atelier Signal <onboarding@resend.dev>',
       to: 'your.email@example.com',
       subject: `[Atelier Signal] ${subject}`,
       text: `From: ${name} (${email})\n\n${message}`,
     });
     return Response.json({ success: true });
   }
   ```
3. Update `handleSubmit` in `ContactSection.tsx` to `fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) })`.

### Option B: Formspree
Set the `<form action="https://formspree.io/f/your_form_id" method="POST">`.

---

## ☁️ Deploying to Vercel

This repository is optimized for one-click deployment on [Vercel](https://vercel.com):

1. Push your repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: initial digital atelier portfolio"
   git remote add origin https://github.com/yourusername/portfolio.git
   git push -u origin main
   ```
2. Go to [Vercel](https://vercel.com/new) and click **Import Project**.
3. Select your repository. Framework preset: **Next.js**.
4. Click **Deploy**. Vercel will automatically build and distribute the site to edge locations worldwide.

---

## ♿ Accessibility & Performance Commitments

- **Reduced Motion**: Full support for `(prefers-reduced-motion: reduce)` via media queries and the `useReducedMotion` hook. Automatically swaps the 3D canvas with an elegant procedural SVG geometric projection.
- **Graceful WebGL Fallback**: If WebGL is disabled or unavailable on the client device, `CanvasFallback.tsx` renders automatically without crashing or showing an empty canvas.
- **Keyboard Navigation**: All interactive elements (project case studies, skill inspector, navigation, mobile drawer) are fully navigable via `Tab`, `Shift+Tab`, `Enter`, `Space`, and `Escape`.
- **Contrast Ratios**: Verified high contrast against dark obsidian surfaces meeting WCAG AA standards.
- **Core Web Vitals**:
  - React Three Fiber dynamically imported with `ssr: false` to ensure zero SSR hydration overhead.
  - IntersectionObserver pauses the WebGL render loop (`frameloop="never"`) whenever the 3D canvas scrolls out of viewport, preserving battery life and GPU cycles.
  - Capped DPR (`Math.min(window.devicePixelRatio, 1.8)`).
