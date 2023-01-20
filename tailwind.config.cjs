/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{tsx,md,mdx}'],
	theme: {
		extend: {},
		fontWeight: {
			bold: 600
		}
	},
	corePlugins: {
		preflight: false,
	},
	plugins: [],
}
