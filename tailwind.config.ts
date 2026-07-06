import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#07111f",
        panel: "rgba(15, 23, 42, 0.68)",
        line: "rgba(148, 163, 184, 0.18)"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 48px rgba(56, 189, 248, 0.16)",
        card: "0 24px 60px rgba(0, 0, 0, 0.28)"
      },
      backgroundImage: {
        "radial-grid":
          "radial-gradient(circle at 20% 20%, rgba(56,189,248,.18), transparent 32%), radial-gradient(circle at 78% 8%, rgba(168,85,247,.18), transparent 28%), linear-gradient(180deg, #07111f 0%, #0f172a 54%, #111827 100%)"
      }
    }
  },
  plugins: []
};

export default config;
