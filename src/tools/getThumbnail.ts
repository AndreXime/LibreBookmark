const getThumbnail = async (url: string): Promise<string | null> => {
	try {
		const res = await fetch(`/api/thumbnail?url=${encodeURIComponent(url)}`);
		const data = await res.json();

		if (res.ok && data.thumbnail) {
			return data.thumbnail;
		}

		console.error('Erro:', data.error);
		return null;
	} catch (error) {
		console.error('Erro ao gerar thumbnail:', error);
		return null;
	}
};

export default getThumbnail;
