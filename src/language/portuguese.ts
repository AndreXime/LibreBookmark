const ptbr = {
    buttons: {
        infoButton: 'Sobre',
        themeButton: 'Temas',
        langButton: 'Idiomas',
    },
    modals: {
        info: {
            title: 'Tudo o que você precisa saber',
            description: `
				O site roda quase tudo no seu navegador — os dados ficam só com você!
                A única exceção é a captura de screenshot do site favorito,
				que usa uma api do proprio site. O código fonte está no
				`,
        },
        storage: {
            title: 'Organize seu armazenamento do seu jeito',
            import: 'Importar',
            export: 'Exportar',
        },
        howToUse: {
            title: 'Como usar o esse site',
            description: `
                Para salvar seus favoritos você precisa fornecer um nome e a URL, depois disso o proprio site vai gerar um thumbnail para você.
                Depois disso você pode mover ou editar seus favoritos clicando no nome do favorito no card gerado.
            `,
        },
        themes: { title: 'Deixe o site com as cores que você mais gosta!' },
        lang: { title: 'Mude para outra linguagem' },
    },
    editBookmark: {
        title: 'Editar favorito',
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
        addButton: 'Adicionar',
    },
};
export default ptbr;
