/** @type {import('tailwindcss').Config} */
module.exports = {
	//content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	content: ['./src/**/*.{astro,jsx,md,mdx,ts,tsx}'],
	theme: {
		darkMode: "class",
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
