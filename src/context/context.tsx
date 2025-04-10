'use client';
import { createContext, useContext, useState, ReactNode } from 'react';
import langStr from '@language/index';

export interface Bookmark {
	url: string;
	thumbnail: string | null;
	title: string;
	loading: boolean;
}

interface BookmarksContextType {
	bookmarks: Bookmark[];
	setBookmarks: React.Dispatch<React.SetStateAction<Bookmark[]>>;
	editingBookmark: Bookmark | null;
	setEditingBookmark: React.Dispatch<React.SetStateAction<Bookmark>>;
	modal: string;
	setModal: React.Dispatch<React.SetStateAction<string>>;
	lang: typeof langStr.ptbr;
	setLang: React.Dispatch<React.SetStateAction<typeof langStr.ptbr>>;
}

const BookmarksContext = createContext<BookmarksContextType | undefined>(undefined);

export const BookmarksProvider = ({ children }: { children: ReactNode }) => {
	const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
	const [editingBookmark, setEditingBookmark] = useState(null); // Um bookmark está sendo editado
	const [modal, setModal] = useState(''); // Para abrir modals usar info storage temas lang
	const [lang, setLang] = useState(langStr.ptbr);

	return (
		<BookmarksContext.Provider
			value={{
				bookmarks,
				setBookmarks,
				editingBookmark,
				setEditingBookmark,
				modal,
				setModal,
				lang,
				setLang,
			}}>
			{children}
		</BookmarksContext.Provider>
	);
};

export const useBookmarks = () => {
	const context = useContext(BookmarksContext);
	if (!context) throw new Error('useBookmarks deve ser usado dentro de BookmarksProvider');
	return context;
};
