import type { Metadata } from 'next';
import '../styles/global.css';

export const metadata: Metadata = {
	title: 'LibreBookmark',
	description: 'Um gereciandor que armazena todos os dados no navegador',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html>
			<body>{children}</body>
		</html>
	);
}
