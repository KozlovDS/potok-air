import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        background: {
          DEFAULT: "#f4f6f9;",
          foreground: "#f9fbfc",
        },
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "#030813",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "#6f737a",
          foreground: "#6d7a80",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "#0291EB",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
      },
      borderRadius: {
        lg: "32px",
        md: "12px",
        sm: "8px",
      },
      boxShadow: {
        header: "0 0 41px 0 rgba(171, 171, 171, 0.25)",
      },
      backgroundImage: {
        "custom-gradient": "linear-gradient(178deg, #0fa8e0 0%, #0291eb 100%)",
        "custom-gradient-hover": "linear-gradient(178deg, #0291eb 0%, #0fa8e0 100%)",
      },
      transitionDuration: {
        DEFAULT: "200ms", // Замените '300ms' на нужное Вам значение
      },
      fontSize: {
        base: ["1rem", "1"],
      },
    },
    screens: {
      mobile: "375px",

      tablet: "768px",
      // => @media (min-width: 640px) { ... }

      laptop: "1440px",
      // => @media (min-width: 1024px) { ... }

      desktop: "1920px",
      // => @media (min-width: 1280px) { ... }
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
