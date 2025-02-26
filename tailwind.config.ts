import type { Config } from "tailwindcss";

import container from "@tailwindcss/container-queries";
import typography from "@tailwindcss/typography";
import animate from "tailwindcss-animate";
import plugin from "tailwindcss/plugin";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
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
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      containers: {
        xn: "10rem",
        nn: "12rem",
        "2xs": "14rem",
      },
      keyframes: {
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
      animation: {
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [
    animate,
    typography,
    container,
    plugin(({ addUtilities, addComponents }) => {
      addComponents({
        ".bg-layout": {
          "@apply size-full max-w-full max-h-full p-3 flex flex-col": {},
        },
      });
      addUtilities({
        ".text-balance": {
          "text-wrap": "balance",
        },
        ".text-justify": {
          width: "100%",
          "text-align": "justify",
          "text-align-last": "justify",
        },
        ".flex-center": {
          "@apply flex items-center justify-center": {},
        },
        ".screen": {
          "@apply w-screen h-screen": {},
        },
        ".mscreen": {
          "@apply w-dvw min-h-dvh": {},
        },
        ".trans-300": {
          "@apply transition-all duration-300": {},
        },
        ".trans-200": {
          "@apply transition-all duration-200": {},
        },
        ".trans-100": {
          "@apply transition-all duration-100": {},
        },
        ".drag-none": {
          "-webkit-user-drag": "none",
          "-khtml-user-drag": "none",
          "-moz-user-drag": "none",
          "-o-user-drag": "none",
          "user-drag": "none",
        },
        ".mobile": {
          "-webkit-touch-callout": "none",
          "-webkit-user-select": "none",
          "-webkit-tap-highlight-color": "rgba(0, 0, 0, 0)",
          "touch-callout": "none",
          "user-select": "none",
          "tap-highlight-color": "rgba(0, 0, 0, 0)",
        },
        ".text-2xs": {
          "font-size": "0.6rem",
          "line-height": "0.85rem",
        },
      });
    }),
  ],
} satisfies Config;
