/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				brand: {
					bg: '#F7FAFF',
					surface: '#FFFFFF',
					'text-primary': '#0B1220',
					'text-secondary': '#445069',
					border: '#E6ECF5',
					'accent-cyan': '#2563EB',
					'accent-indigo': '#14B8A6',
				},
			},
		},
	},
	plugins: [],
}
