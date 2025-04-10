import type { Metadata } from 'next';
import './global.css';
import { BookmarksProvider } from '@/context/context';

export const metadata: Metadata = {
	title: 'LibreBookmark',
	description: 'Um gereciandor que armazena todos os dados no navegador',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html>
			<BookmarksProvider>
				<body>{children}</body>
			</BookmarksProvider>
		</html>
	);
}
