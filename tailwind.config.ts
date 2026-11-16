import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    './src/ui/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#EEF2FF',
          100: '#E0E7FF',
          500: '#4F46E5',
          600: '#4338CA',
          700: '#3730A3',
        },
      },
      boxShadow: {
        xs: '0 1px 2px rgba(15, 23, 42, 0.05)',
        soft: '0 1px 2px rgba(15, 23, 42, 0.04), 0 4px 12px -2px rgba(15, 23, 42, 0.04)',
        'soft-hover':
          '0 4px 12px -2px rgba(15, 23, 42, 0.06), 0 18px 36px -8px rgba(79, 70, 229, 0.10)',
        glass: '0 20px 50px -12px rgba(15, 23, 42, 0.14)',
      },
      backdropBlur: {
        xs: '2px',
      },
      keyframes: {
        pageEnter: {
          '0%': { opacity: '0', transform: 'translateY(12px) scale(0.99)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        authEnter: {
          '0%': { opacity: '0', transform: 'translateY(24px) scale(0.96)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95) translateY(6px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        toastDrain: {
          '0%': { transform: 'scaleX(1)' },
          '100%': { transform: 'scaleX(0)' },
        },
      },
      animation: {
        'page-enter': 'pageEnter 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        'auth-enter': 'authEnter 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-in': 'fadeIn 0.22s ease-out',
        'scale-in': 'scaleIn 0.24s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-in-right': 'slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-up': 'slideUp 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
        shimmer: 'shimmer 2.2s infinite linear',
        'float-slow': 'floatSlow 4s ease-in-out infinite',
        'toast-drain': 'toastDrain 3.8s linear forwards',
      },
    },
  },
  plugins: [],
};

export default config;
