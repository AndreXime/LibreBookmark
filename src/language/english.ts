const en = {
	buttons: {
		infoButton: 'About',
		themeButton: 'Themes',
		storageButton: 'Manage',
		langButton: 'Languages',
	},
	howToUse: {
		title: 'How to use',
		Adicione: ['Add:', 'Fill out the form to save your websites.'],
		Visite: ['Visit:', 'Click on the generated images to access saved websites.'],
		Personalize: [
			'Personalize:',
			'Click on the site name to remove, move, or edit. Try out the various available themes.',
		],
	},
	modals: {
		info: {
			title: 'Everything you need to know',
			description: [
				'Source code on',
				'All data is stored in the browser',
				'No back-end, 100% client-side',
				'Next.js, Tailwind with DaisyUI',
			],
		},
		storage: {
			title: 'Organize your storage your way',
			import: 'Import',
			export: 'Export',
			clear: 'Clear',
		},
		themes: { title: 'Make the site look the way you like it most!' },
		lang: { title: 'Switch to another language' },
	},
	editBookmark: {
		title: 'Edit bookmark',
		removeButton: 'Remove',
		saveButton: 'Save',
		moveTitle: 'Move place',
		moveRight: 'Right',
		moveLeft: 'Left',
	},
	imageBookmark: { loadingThumbnail: 'Loading thumbnail', noImage: 'No image' },
	formAddBookmark: {
		titlePlaceholder: 'Title',
		urlPlaceholder: 'URL',
		thumbnailUrlPlaceholder: 'Thumbnail',
		thumbnailHint:
			'Leave blank to generate automatically or you can use URLs as thumbnails that end with .png, .jpeg, .svg, .webp',
		addButton: 'Add',
	},
};
export default en;
