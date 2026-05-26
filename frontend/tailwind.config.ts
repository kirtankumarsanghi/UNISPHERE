import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./hooks/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "inverse-primary": "#006c49",
        "primary-fixed": "#6ffbbe",
        "tertiary-fixed-dim": "#ffb3af",
        "on-primary-fixed-variant": "#005236",
        "secondary-fixed": "#d8e2ff",
        "on-tertiary-fixed": "#410005",
        "on-surface-variant": "#bbcabf",
        "on-tertiary-container": "#711419",
        "on-secondary": "#002e6a",
        "surface-tint": "#4edea3",
        "primary-container": "#10b981",
        "on-surface": "#dde4dd",
        "primary": "#4edea3",
        "surface-container-lowest": "#09100c",
        "tertiary": "#ffb3af",
        "secondary-fixed-dim": "#adc6ff",
        "on-error-container": "#ffdad6",
        "text-gradient-start": "#ffffff",
        "surface-container-high": "#242c27",
        "primary-fixed-dim": "#4edea3",
        "surface-variant": "#2f3632",
        "secondary": "#adc6ff",
        "on-primary-container": "#00422b",
        "background": "#09100c",
        "surface-container-low": "#161d19",
        "on-tertiary-fixed-variant": "#842225",
        "outline-variant": "rgba(255,255,255,0.06)",
        "secondary-container": "#0566d9",
        "surface": "#09100c",
        "outline": "#86948a",
        "on-primary-fixed": "#002113",
        "glass-border": "rgba(255, 255, 255, 0.04)",
        "on-tertiary": "#650911",
        "surface-deep": "#050505",
        "inverse-surface": "#dde4dd",
        "on-secondary-container": "#e6ecff",
        "inverse-on-surface": "#2b322d",
        "surface-container": "#1a211d",
        "on-secondary-fixed": "#001a42",
        "tertiary-fixed": "#ffdad7",
        "tertiary-container": "#fc7c78",
        "surface-dim": "#09100c",
        "surface-container-highest": "#2f3632",
        "on-primary": "#003824",
        "on-secondary-fixed-variant": "#004395",
        "text-gradient-end": "#a0aec0",
        "error-container": "#93000a",
        "surface-bright": "#343b36",
        "on-error": "#690005",
        "error": "#ffb4ab",
        "on-background": "#dde4dd"
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      spacing: {
        "container-max": "1280px",
        "stack-md": "16px",
        "section-gap": "160px",
        "gutter": "24px",
        "stack-sm": "8px",
        "stack-lg": "32px",
        "margin-mobile": "20px",
        "margin-desktop": "64px"
      },
      fontFamily: {
        "headline-lg": ["Plus Jakarta Sans", "sans-serif"],
        "display-xl": ["Plus Jakarta Sans", "sans-serif"],
        "headline-lg-mobile": ["Plus Jakarta Sans", "sans-serif"],
        "label-caps": ["Hanken Grotesk", "sans-serif"],
        "headline-md": ["Plus Jakarta Sans", "sans-serif"],
        "body-md": ["Hanken Grotesk", "sans-serif"],
        "body-lg": ["Hanken Grotesk", "sans-serif"],
        "display": ["Plus Jakarta Sans", "sans-serif"],
        "sans": ["Hanken Grotesk", "sans-serif"]
      },
      fontSize: {
        "headline-lg": ["52px", { lineHeight: "1.1", letterSpacing: "-0.03em", fontWeight: "700" }],
        "display-xl": ["80px", { lineHeight: "1.05", letterSpacing: "-0.05em", fontWeight: "800" }],
        "headline-lg-mobile": ["36px", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" }],
        "label-caps": ["11px", { lineHeight: "1.2", letterSpacing: "0.2em", fontWeight: "600" }],
        "headline-md": ["24px", { lineHeight: "1.3", fontWeight: "600", letterSpacing: "-0.01em" }],
        "body-md": ["16px", { lineHeight: "1.7", fontWeight: "400" }],
        "body-lg": ["19px", { lineHeight: "1.6", fontWeight: "400" }]
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      }
    }
  },
  plugins: [],
};

export default config;