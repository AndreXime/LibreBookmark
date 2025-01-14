const getThumbnail = async (url) => {
	const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
		url
	)}&screenshot=true`;

	try {
		const response = await fetch(apiUrl);
		const data = await response.json();

		if (data.lighthouseResult && data.lighthouseResult.audits['final-screenshot']) {
			return `data:image/jpeg;base64,${data.lighthouseResult.audits['final-screenshot'].details.data.replace(
				/^data:image\/jpeg;base64,/,
				''
			)}`;
		}
		return null; // Sem thumbnail
	} catch (error) {
		console.error('Erro ao buscar thumbnail:', error);
		return null;
	}
};

export default getThumbnail;
