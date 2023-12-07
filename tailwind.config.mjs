/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				primary: {
          DEFAULT: 'rgb(var(--color-primary) / <alpha-value>)',
          dark: 'rgb(var(--color-primary-dark) / <alpha-value>)',
          light: 'rgb(var(--color-primary-light) / <alpha-value>)',
        },
				black: 'rgb(var(--color-black) / <alpha-value>)',
				white: 'rgb(var(--color-white) / <alpha-value>)',
			},
			fontFamily: {
        helvetica: ['Helvetica', 'sans-serif'],
      },
		},
	},
	plugins: [],
}
