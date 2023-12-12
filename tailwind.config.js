/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      blue: {
        100: "#EAF7FF",
        200: "#B1E0FF",
        300: "#7DC7FF",
        400: "#3396FF",
        500: "#0072EF",
        600: "#0052AA",
        700: "#00346C",
        800: "#002144",
      },
      gray: {
        20: "#F5F7FA",
        100: "#F8FAFC",
        200: "#F2F5F8",
        300: "#DCE3E9",
        400: "#C2CDD6",
        500: "#606A76",
        600: "#32373E",
        700: "#17191C",
      },
      red: {
        300: "#E71E1E",
        200: "#ED4F4F",
        100: "#FDF0F0",
      },
      orange: {
        300: "#CD4B13",
        200: "#EC6E38",
        100: "#FDF1EC",
      },
      gold: {
        300: "#986F00",
        200: "#FDCA3F",
        100: "#FFF4D5",
      },
      green: {
        300: "#1E8565",
        200: "#3AD2A3",
        100: "#E5F9F3",
      },
      text: {
        100: "#333333",
        200: "#646466",
      },
      white: "#FFFFFF",
      black: "#000000",
    },
    fontFamily: {
      base: "'ZeissMYingHei','Noto Sans SC',Consolas,Menlo,Courier,monospace",
      noto: "Noto Sans SC",
    },
    fontSize: {
      "3xs": ["0.5rem", "0.75rem"] /* 8px 12px */,
      "2xs": ["0.625rem", "1rem"] /* 10px 16px */,
      xs: ["0.75rem", "1.25rem"] /* 12px 20px */,
      sm: ["0.875rem", "1.375rem"] /* 14px 22px */,
      base: ["1rem", "1.5rem"] /* 16px 24px */,
      lg: ["1.25rem", "1.75rem"] /* 20px 28px */,
      xl: ["1.5rem", "2rem"] /* 24px 32px */,
      "2xl": ["2rem", "2.54rem"] /* 32px 40px */,
      "3xl": ["2.5rem", "3rem"] /* 40px 48px */,
      "4xl": ["3rem", "3.5rem"] /* 48px 56px */,
    },
    boxShadow: {
      sm: "0px 2px 8px rgba(25, 25, 25, 0.04)",
      DEFAULT: "2px 4px 16px rgba(25, 25, 25, 0.08)",
      lg: "4px 8px 32px rgba(25, 25, 25, 0.16)",
    },
    extend: {
      spacing: {
        13: "3.25rem" /* 52px */,
        18: "4.5rem" /* 72px */,
        25: "6.25rem" /* 100px */,
        30: "7.5rem" /* 120px */,
        34: "8.5rem" /* 136px */,
        41: "10.25rem" /* 164px */,
        45: "11.25rem" /* 180px */,
        75: "18.75rem" /* 300px */,
        85: "21.25rem" /* 340px */,
        150: "37.5rem" /* 600px */,
      },
      zIndex: {
        modal: "1000",
      },
      colors: {
        transparent: "transparent",
      },
      maxWidth: {
        "9/10": "90%",
      },
      screens: {
        "-lg": { max: "1024px" },
      },
    },
    screens: {
      md: "768px",
      lg: "1025px",
      xlg: "1301px",
    },
  },
  plugins: [],
};
