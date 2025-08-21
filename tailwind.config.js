module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	plugins: [
		require('@catppuccin/tailwindcss')({
			prefix: 'ctp',
			defaultFlavour: 'mocha',
		}),
	],
	safelist: [
		'bg-ctp-text',
		'bg-ctp-mantle',
		'h-1/2',
		'h-1/3',
		'h-1/4',
		'h-1/5',
		'h-1/6',
	],
};
