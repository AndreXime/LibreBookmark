const ptbr = {
	buttons: {
		infoButton: 'Sobre',
		themeButton: 'Temas',
		storageButton: 'Gerenciar',
		langButton: 'Idiomas',
	},
	howToUse: {
		title: 'Como usar',
		Adicione: ['Adicione:', 'Preencha o formulario para salvar seus sites.'],
		Visite: ['Visite:', 'Clique nas imagens geradas para acessar os sites salvos.'],
		Personalize: [
			'Personalize:',
			'Clique no nome do site para remover, mover ou editar. Experimente os diversos temas disponiveis',
		],
	},
	modals: {
		info: {
			title: 'Tudo o que você precisa saber',
			description: [
				'Código fonte no',
				'Todos os dados são armazenados no navegador',
				'Sem back-end, 100% cliente',
				'Next.js, Tailwind com DaisyUI',
			],
		},
		storage: {
			title: 'Organize seu armazenamento do seu jeito',
			import: 'Importar',
			export: 'Exportar',
			clear: 'Limpar',
		},
		themes: { title: 'Deixe o site com as cores que você mais gosta!' },
		lang: { title: 'Mude para outra linguagem' },
	},
	editBookmark: {
		title: 'Editar bookmark',
		removeButton: 'Remover',
		saveButton: 'Salvar',
		moveTitle: 'Mover de lugar',
		moveRight: 'Direita',
		moveLeft: 'Esquerda',
	},
	imageBookmark: { loadingThumbnail: 'Carregando thumbnail', noImage: 'Sem imagem' },
	formAddBookmark: {
		titlePlaceholder: 'Título',
		urlPlaceholder: 'URL',
		thumbnailUrlPlaceholder: 'Thumbnail',
		thumbnailHint: 'Deixe branco para gerar o servidor gerar uma thumbnail ou use uma URL de imagem como thumbnail',
		addButton: 'Adicionar',
	},
};
export default ptbr;
