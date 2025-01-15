const strings = {
	en: {
		config: {
			infoButton: 'About',
			themeButton: 'Themes',
			storageButton: 'Manage storage',
		},
		modals: {
			info: {
				title: 'Everything you need to know',
				sourceCode: 'Source code on',
				localStorageInfo: 'All data is stored in the browser',
				noBackend: 'No back-end, 100% client-side',
				techStack: 'Next.js, Tailwind with DaisyUI',
			},
			storage: { title: 'Your Storage the way you want it' },
			themes: { title: 'Customize the site with your favorite colors!' },
			lang: { title: 'Change language to another' },
		},
		bookmark: {
			removeButton: 'Remove',
			editBookmark: 'Edit Bookmark',
			saveButton: 'Save',
			loadingThumbnail: 'Loading thumbnail',
			noImage: 'No image',
		},
		form: {
			titlePlaceholder: 'Title',
			urlPlaceholder: 'URL',
			thumbnailUrlPlaceholder: 'Thumbnail',
			thumbnailHint:
				'Leave it blank to generate automatically or you can use URLs as thumbnails that end with .png, .jpeg, .svg, .webp',
			addButton: 'Add',
		},
	},
	ptbr: {
		config: {
			infoButton: 'Sobre',
			themeButton: 'Temas',
			storageButton: 'Gerenciar',
		},
		modals: {
			info: {
				title: 'Tudo o que você precisa saber',
				sourceCode: 'Código fonte no',
				localStorageInfo: 'Todos os dados são armazenados no navegador',
				noBackend: 'Sem back-end, 100% cliente',
				techStack: 'Next.js, Tailwind com DaisyUI',
			},
			storage: { title: 'Seu Storage do jeito que você quer' },
			themes: { title: 'Deixe o site com as cores que você mais gosta!' },
			lang: { title: 'Mude a linguagem para outra' },
		},
		bookmark: {
			removeButton: 'Remover',
			editBookmark: 'Editar Bookmark',
			saveButton: 'Salvar',
			loadingThumbnail: 'Carregando thumbnail',
			noImage: 'Sem imagem',
		},
		form: {
			titlePlaceholder: 'Título',
			urlPlaceholder: 'URL',
			thumbnailUrlPlaceholder: 'Thumbnail',
			thumbnailHint:
				'Deixe branco para gerar automaticamente ou você pode usar URLs como thumbnail que terminam com .png, .jpeg, .svg, .webp',
			addButton: 'Adicionar',
		},
	},
};

export default strings;
