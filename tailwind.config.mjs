/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				brand: {
					bg: '#0B1020',
					surface: '#111A33',
					'text-primary': '#EAF0FF',
					'text-secondary': '#A9B4D0',
					border: '#243055',
					'accent-cyan': '#22D3EE',
					'accent-indigo': '#6366F1',
				},
			},
		},
	},
	plugins: [],
}
