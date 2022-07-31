/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      body: ["Noto Sans", "sans-serif"]
    }
  },
  plugins: [require("@tailwindcss/typography")]
};
