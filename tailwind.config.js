/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
				fadeIn: {
					"0%": { opacity: "0" },
					"100%": { opacity: "100" },
				},
				slideUp: {
					"0%": { marginTop: "1000px" },
					"100%": { marginTop: "0" },
				},
				slideLeft: {
					"0%": { translateX: "1000px" },
					"100%": { translateX: "0" },
				},
				slideRight: {
					"0%": { marginRight: "1000px" },
					"100%": { marginRight: "0" },
				},
				lightpulse: {
					"0%": { borderColor: "rgba(255,255,255,0)" },
					"50%": { borderColor: "rgba(255,255,255,0.5)" },
					"100%": { borderColor: "rgba(255,255,255,0)" },
				},
				pulseblue: {
					"0%": { backgroundColor: "rgb(22,22,22)" },
					"50%": { backgroundColor: "rgb(37,99,235)" },
					"100%": { backgroundColor: "rgb(22,22,22)" },
				},
			},
			animation: {
				fadeIn: "fadeIn 0.3s ease-in-out",
				slideUp: "slideUp 0.3s ease-in-out",
				slideLeft: "slideLeft 0.3s linear",
				slideRight: "slideRight 0.3s linear",
				lightpulse: "lightpulse 2.5s infinite",
				pulseblue: "pulseblue 2.5s infinite",
			},
    },
  },
  plugins: [],
}
