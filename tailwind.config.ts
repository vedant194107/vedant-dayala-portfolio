import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/data/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#07090c',
        foreground: '#e6eaf0',
        obsidian: {
          950: '#040507',
          900: '#07090c',
          850: '#0b0e13',
          800: '#0f131a',
          700: '#151b24',
          600: '#1d2532',
        },
        charcoal: {
          900: '#12151b',
          800: '#181d26',
          700: '#212733',
          600: '#2c3444',
          500: '#3d485e',
        },
        indigoAtelier: {
          950: '#080a14',
          900: '#0d1222',
          800: '#141a30',
          700: '#1c2442',
        },
        sandstone: {
          50: '#faf6f2',
          100: '#f4ede4',
          200: '#eadbc9',
          300: '#ddc2a7',
          400: '#cfa685',
          500: '#c49d7f', // Primary Warm Sandstone
          600: '#b08160',
          700: '#92664b',
          800: '#75523f',
          900: '#5f4335',
        },
        copper: {
          50: '#eef8f6',
          100: '#d7f0ec',
          200: '#b3e2d9',
          300: '#83ccc1',
          400: '#4fb0a4',
          500: '#368b7d', // Primary Oxidized Copper Patina
          600: '#2b7065',
          700: '#255952',
          800: '#204843',
          900: '#1c3e3a',
          950: '#0b2320',
        },
        cyanAccent: {
          DEFAULT: '#38f0d0',
          hover: '#5bf5db',
          muted: '#25a892',
          glow: 'rgba(56, 240, 208, 0.15)',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      backgroundImage: {
        'atelier-radial':
          'radial-gradient(circle at 50% 0%, rgba(54, 139, 125, 0.12) 0%, rgba(196, 157, 127, 0.05) 35%, rgba(7, 9, 12, 0) 70%)',
        'sandstone-gradient':
          'linear-gradient(135deg, rgba(196, 157, 127, 0.15) 0%, rgba(54, 139, 125, 0.05) 100%)',
        'copper-sheen':
          'linear-gradient(180deg, rgba(54, 139, 125, 0.2) 0%, rgba(7, 9, 12, 0.8) 100%)',
      },
      boxShadow: {
        atelier: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        glowSandstone: '0 0 25px -5px rgba(196, 157, 127, 0.25)',
        glowCopper: '0 0 25px -5px rgba(54, 139, 125, 0.3)',
        glowCyan: '0 0 30px -5px rgba(56, 240, 208, 0.35)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.85' },
        },
        scrolldown: {
          '0%': { transform: 'translateY(0)', opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { transform: 'translateY(12px)', opacity: '0' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        pulseGlow: 'pulseGlow 3s ease-in-out infinite',
        scrolldown: 'scrolldown 2s cubic-bezier(0.65, 0, 0.35, 1) infinite',
      },
    },
  },
  plugins: [],
};

export default config;
