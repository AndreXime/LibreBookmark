const ThemeButtons: React.FC = () => {
	const toggleTheme = (newTheme: string) => {
		document.documentElement.setAttribute('data-theme', newTheme);
		localStorage.setItem('theme', newTheme);
	};

	const themes = [
		'light',
		'dark',
		'cupcake',
		'bumblebee',
		'emerald',
		'corporate',
		'synthwave',
		'retro',
		'cyberpunk',
		'valentine',
		'halloween',
		'garden',
		'forest',
		'aqua',
		'lofi',
		'coffee',
	];

	return (
		<div className="grid grid-cols-2 gap-4">
			{themes.map((theme) => (
				<button
					key={theme}
					onClick={() => toggleTheme(theme)}
					className="btn w-full text-center capitalize">
					{theme}
				</button>
			))}
		</div>
	);
};

export default ThemeButtons;
