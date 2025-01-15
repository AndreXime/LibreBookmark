/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/components/**/*.tsx', './src/components/*.tsx', './src/app/**/*.tsx', './src/app/*.tsx'],
	theme: {
		extend: {},
	},
	plugins: [require('daisyui')],
	daisyui: {
		themes: [
			'light',
			'dark',
			'cupcake',
			'bumblebee',
			'emerald',
			'corporate',
			'synthwave',
			'retro',
			'cyberpunk',
			'valentine',
			'halloween',
			'garden',
			'forest',
			'aqua',
			'lofi',
			'coffee',
		],
		darkTheme: 'dark', // name of one of the included themes for dark mode
		base: true, // applies background color and foreground color for root element by default
		styled: true, // include daisyUI colors and design decisions for all components
		utils: true, // adds responsive and modifier utility classes
		prefix: '', // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
		themeRoot: ':root', // The element that receives theme color CSS variables
	},
};
