export const exportLocalStorage = () => {
	const data = JSON.stringify(window.localStorage); // Converte o window.localStorage para string JSON
	const blob = new Blob([data], { type: 'application/json' }); // Cria um blob para o arquivo
	const url = URL.createObjectURL(blob); // Cria a URL para o arquivo

	// Cria um link temporário para fazer o download
	const a = document.createElement('a');
	a.href = url;
	a.download = 'librebookmark.json'; // Nome do arquivo
	a.click(); // Inicia o download
	URL.revokeObjectURL(url); // Limpa o URL temporário
};

export const importLocalStorage = (event) => {
	const file = event.target.files[0]; // Obtém o arquivo carregado
	if (file) {
		const reader = new FileReader();

		reader.onload = () => {
			try {
				// Verifica se reader.result é uma string
				const result = reader.result;
				if (typeof result === 'string') {
					const importedData = JSON.parse(result); // Converte o conteúdo do arquivo em um objeto
					for (const key in importedData) {
						if (importedData.hasOwnProperty(key)) {
							window.localStorage.setItem(key, importedData[key]); // Restaura os itens no window.localStorage
						}
					}
					alert('localStorage importado com sucesso!');
				} else {
					alert('Erro: o arquivo não é um JSON válido!');
				}
			} catch {
				alert('Erro ao importar o arquivo!');
			}
		};

		reader.readAsText(file); // Lê o arquivo como texto
	}
};
