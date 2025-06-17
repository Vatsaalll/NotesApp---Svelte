/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: 'hsl(0 0% 100%)',
          dark: 'hsl(240 10% 3.9%)'
        },
        foreground: {
          DEFAULT: 'hsl(240 10% 3.9%)',
          dark: 'hsl(0 0% 98%)'
        },
        card: {
          DEFAULT: 'hsl(0 0% 100%)',
          dark: 'hsl(240 10% 3.9%)',
          foreground: {
            DEFAULT: 'hsl(240 10% 3.9%)',
            dark: 'hsl(0 0% 98%)'
          }
        },
        primary: {
          DEFAULT: 'hsl(240 9% 13%)',
          dark: 'hsl(0 0% 98%)',
          foreground: {
            DEFAULT: 'hsl(0 0% 98%)',
            dark: 'hsl(240 5.9% 10%)'
          }
        },
        secondary: {
          DEFAULT: 'hsl(240 4.8% 95.9%)',
          dark: 'hsl(240 3.7% 15.9%)',
          foreground: {
            DEFAULT: 'hsl(240 5.9% 10%)',
            dark: 'hsl(0 0% 98%)'
          }
        },
        muted: {
          DEFAULT: 'hsl(240 4.8% 95.9%)',
          dark: 'hsl(240 3.7% 15.9%)',
          foreground: {
            DEFAULT: 'hsl(240 3.8% 46.1%)',
            dark: 'hsl(240 5% 64.9%)'
          }
        },
        accent: {
          DEFAULT: 'hsl(240 4.8% 95.9%)',
          dark: 'hsl(240 3.7% 15.9%)',
          foreground: {
            DEFAULT: 'hsl(240 5.9% 10%)',
            dark: 'hsl(0 0% 98%)'
          }
        },
        destructive: {
          DEFAULT: 'hsl(0 84.2% 60.2%)',
          dark: 'hsl(0 62.8% 30.6%)',
          foreground: {
            DEFAULT: 'hsl(0 0% 98%)',
            dark: 'hsl(0 0% 98%)'
          }
        },
        border: {
          DEFAULT: 'hsl(240 5.9% 90%)',
          dark: 'hsl(240 3.7% 15.9%)'
        },
        input: {
          DEFAULT: 'hsl(240 5.9% 90%)',
          dark: 'hsl(240 3.7% 15.9%)'
        },
        ring: {
          DEFAULT: 'hsl(240 5.9% 10%)',
          dark: 'hsl(240 4.9% 83.9%)'
        }
      },
      borderRadius: {
        lg: '0.5rem',
        md: 'calc(0.5rem - 2px)',
        sm: 'calc(0.5rem - 4px)'
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'slide-in': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' }
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        },
        'spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        }
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out',
        'slide-in': 'slide-in 0.3s ease-out',
        'scale-in': 'scale-in 0.2s ease-out',
        'spin': 'spin 1s linear infinite'
      }
    }
  },
  plugins: []
}