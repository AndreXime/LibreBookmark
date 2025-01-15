type NestedStrings = {
	[key: string]: string | NestedStrings;
};

type LangButtonsProps = {
	setLang: React.Dispatch<React.SetStateAction<NestedStrings>>;
	langStr: Record<string, NestedStrings>; // Modificado para refletir a estrutura aninhada
};

const LangButtons: React.FC<LangButtonsProps> = ({ setLang, langStr }) => {
	const languageChange = (language: string) => {
		setLang(langStr[language]);
		localStorage.setItem('lang', language);
	};

	return (
		<div className="grid grid-cols-2 gap-4">
			<button
				onClick={() => languageChange('en')}
				className="btn gap-2 col-span-1 flex items-center justify-center px-4 py-2 rounded-lg"
				style={{
					backgroundColor: '#0033A0', // Azul dos EUA
					color: '#fff',
				}}>
				<span className="text-xl">🇺🇸</span> English
			</button>

			<button
				onClick={() => languageChange('ptbr')}
				className="btn gap-2 col-span-1 flex items-center justify-center px-4 py-2 rounded-lg"
				style={{
					backgroundColor: '#006600', // Verde do Brasil
					color: '#fff',
				}}>
				<span className="text-xl">🇧🇷</span> Português
			</button>

			<button
				onClick={() => languageChange('es')}
				className="btn btn-disabled cursor-not-allowed gap-2 col-span-1 flex items-center justify-center px-4 py-2 rounded-lg">
				<span className="text-xl">🇪🇸</span> Español
			</button>

			<button
				onClick={() => languageChange('zh')}
				className="btn btn-disabled cursor-not-allowed gap-2 col-span-1 flex items-center justify-center px-4 py-2 rounded-lg">
				<span className="text-xl">🇨🇳</span> 中文
			</button>
		</div>
	);
};

export default LangButtons;
