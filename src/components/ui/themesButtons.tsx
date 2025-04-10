const ThemeButtons: React.FC = () => {
	const toggleTheme = (newTheme: string) => {
		document.documentElement.setAttribute('data-theme', newTheme);
		localStorage.setItem('theme', newTheme);
	};

	const lightThemes = [
		'light',
		'valentine',
		'retro',
		'nord',
		'cupcake',
		'garden',
		'pastel',
		'fantasy',
		'wireframe',
		'autumn',
		'lemonade',
		'bumblebee',
	];

	const darkThemes = [
		'dark',
		'halloween',
		'luxury',
		'coffee',
		'sunset',
		'forest',
		'black',
		'dracula',
		'business',
		'night',
		'dim',
		'synthwave',
	];

	return (
		<>
			{lightThemes.map((theme, index) => (
				<div
					key={`${theme} e ${darkThemes[index]}`}
					className="grid grid-cols-2 gap-4 mb-4">
					<button
						data-theme={theme}
						key={theme}
						onClick={() => toggleTheme(theme)}
						className="btn w-full text-center capitalize">
						{theme}
					</button>
					<button
						data-theme={darkThemes[index]}
						key={darkThemes[index]}
						onClick={() => toggleTheme(darkThemes[index])}
						className="btn w-full text-center capitalize">
						{darkThemes[index]}
					</button>
				</div>
			))}
		</>
	);
};

export default ThemeButtons;
