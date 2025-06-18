'use client';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import langStr from '@language/index';
import { getThumbnail } from '@/tools';

export interface Bookmark {
    id: string;
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
    addBookmark: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
    removeBookmark: (url: string) => void;
    updateBookmark: (e: React.FormEvent<HTMLFormElement>) => void;
    moveBookmark: (url: string, direction: 'up' | 'down') => void;
}

const BookmarksContext = createContext<BookmarksContextType | undefined>(undefined);

export const BookmarksProvider = ({ children }: { children: ReactNode }) => {
    const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
    const [editingBookmark, setEditingBookmark] = useState(null); // Um bookmark está sendo editado
    const [modal, setModal] = useState(''); // Para abrir modals usar info storage temas lang
    const [lang, setLang] = useState(langStr.ptbr);

    // Carrega bookmarks, linguagem tema e boomarks
    useEffect(() => {
        const lang = localStorage.getItem('lang') || navigator.language.startsWith('pt') ? 'ptbr' : 'en';
        setLang(langStr[lang]);

        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);

        const storedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
        setBookmarks(storedBookmarks);
    }, []);

    // Atualiza o Local Storage quando os bookmarks mudam
    useEffect(() => {
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }, [bookmarks]);

    // Adiciona um novo bookmark e busca thumbnail
    const addBookmark = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const url = String(formData.get('url'));
        const title = String(formData.get('title'));

        if (url && !bookmarks.find((bm) => bm.url === url)) {
            const newEntry = {
                id: String(Date.now()),
                url,
                thumbnail: null,
                title,
                loading: true,
            };

            // Adiciona o card antes de gerar a thumbnail automatica
            setBookmarks([...bookmarks, newEntry]);

            e.currentTarget.reset();

            // Se a thumbnail não for fornecida, tenta gerar automaticamente
            const thumbnail = await getThumbnail(url);
            setBookmarks((prevBookmarks) =>
                prevBookmarks.map((bm) => (bm.url === url ? { ...bm, thumbnail, loading: false } : bm))
            );
        }
    };

    // Remove um bookmark
    const removeBookmark = (id: string) => {
        setBookmarks(bookmarks.filter((bookmark) => bookmark.id !== id));
    };

    // Edita um bookmark com um modal
    const updateBookmark = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const updatedTitle = String(formData.get('title'));
        const updatedUrl = String(formData.get('url'));

        setBookmarks((prevBookmarks) =>
            prevBookmarks.map((bm) =>
                bm.url === editingBookmark.url
                    ? {
                          ...bm,
                          title: updatedTitle,
                          url: updatedUrl,
                      }
                    : bm
            )
        );

        setEditingBookmark(null); // Fecha o modal
    };

    // Mover um bookmark para cima ou para baixo
    const moveBookmark = (id: string, direction: 'up' | 'down') => {
        const currentIndex = bookmarks.findIndex((bookmark) => bookmark.id === id);
        const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
        if (newIndex < 0 || newIndex >= bookmarks.length) return;

        const updatedBookmarks = [...bookmarks];
        const [movedBookmark] = updatedBookmarks.splice(currentIndex, 1);
        updatedBookmarks.splice(newIndex, 0, movedBookmark);

        setBookmarks(updatedBookmarks);
    };

    return (
        <BookmarksContext.Provider
            value={{
                addBookmark,
                removeBookmark,
                updateBookmark,
                moveBookmark,
                bookmarks,
                setBookmarks,
                editingBookmark,
                setEditingBookmark,
                modal,
                setModal,
                lang,
                setLang,
            }}
        >
            {children}
        </BookmarksContext.Provider>
    );
};

export const useBookmarks = () => {
    const context = useContext(BookmarksContext);
    if (!context) throw new Error('useBookmarks deve ser usado dentro de BookmarksProvider');
    return context;
};
