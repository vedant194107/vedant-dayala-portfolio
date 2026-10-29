import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, Cinzel, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { profileData } from '@/data/profile';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#07090c',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://vedantdayala.dev'),
  title: {
    default: `${profileData.name} — Full Stack Developer | Digital Atelier`,
    template: `%s | ${profileData.name}`,
  },
  description: `${profileData.bioConcise} Based in ${profileData.location}. Specializing in React, Next.js, Three.js, Node.js, and tactile digital craftsmanship.`,
  keywords: [
    'Vedant Dayala',
    'Creative Developer',
    'Frontend Developer Ahmedabad',
    'Full-Stack Developer India',
    'React Developer',
    'Next.js Portfolio',
    'Three.js WebGL Developer',
    'GSAP Animation Specialist',
    'Node.js REST APIs',
    'Digital Atelier',
  ],
  authors: [{ name: profileData.name, url: 'https://vedantdayala.dev' }],
  creator: profileData.name,
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://vedantdayala.dev',
    title: `${profileData.name} — Digital Atelier`,
    description: profileData.bioHeadline,
    siteName: `${profileData.name} Portfolio`,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: `${profileData.name} — Digital Atelier / Ahmedabad Night Workshop`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${profileData.name} — Digital Atelier`,
    description: profileData.bioHeadline,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Schema.org Person & ProfessionalService JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profileData.name,
    jobTitle: profileData.role,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Ahmedabad',
      addressRegion: 'Gujarat',
      addressCountry: 'IN',
    },
    url: 'https://vedantdayala.dev',
    sameAs: [profileData.github, profileData.linkedin],
    description: profileData.bioConcise,
  };

  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${cinzel.variable} ${jetbrainsMono.variable} font-sans bg-obsidian-950 text-foreground selection:bg-cyanAccent/30 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
