'use client';

import { useBookmarks } from '@/context/context';
import { EditModal, InfoModal, LangModal, TemasModal } from '@/components';
import { Brush, Languages, Plus, Settings } from 'lucide-react';

export default function Home() {
    const { lang, setModal, setEditingBookmark, bookmarks, addBookmark } = useBookmarks();

    return (
        <div className="min-h-screen bg-base-200 p-6">
            <div className="max-w-6xl mx-auto">
                {/* Card para Adicionar Bookmark */}
                <div className="collapse collapse-plus bg-base-100 shadow-xl mb-6">
                    <input type="checkbox" />
                    <div className="collapse-title text-xl font-medium">LibreBookmarks</div>
                    <div className="collapse-content grid grid-cols-1 md:grid-cols-3">
                        <div className="card-body col-span-2">
                            <form onSubmit={addBookmark} className=" flex-col flex gap-3">
                                <label className="input input-bordered flex items-center gap-2 w-full">
                                    {lang.formAddBookmark.titlePlaceholder}
                                    <input
                                        type="text"
                                        name="title"
                                        placeholder="ChatGPT"
                                        className="w-full placeholder-neutral-400 placeholder-opacity-50"
                                        required
                                    />
                                </label>
                                <label className="input input-bordered flex items-center gap-2 w-full">
                                    {lang.formAddBookmark.urlPlaceholder}
                                    <input
                                        type="text"
                                        name="url"
                                        placeholder="https://chatgpt.com"
                                        className="w-full placeholder-neutral-400 placeholder-opacity-50"
                                        required
                                    />
                                </label>

                                <button type="submit" className="btn btn-primary mt-3">
                                    <Plus /> {lang.formAddBookmark.addButton}
                                </button>
                            </form>
                        </div>
                        <div className="card-body col-span-1">
                            <div className="grid gap-4">
                                <button
                                    onClick={() => setModal('info')}
                                    className="btn bg-base-100 shadow-xl border-none p-5"
                                >
                                    <Settings color="#007bff" /> {lang.buttons.infoButton}
                                </button>
                                <button
                                    onClick={() => setModal('temas')}
                                    className="btn bg-base-100 shadow-xl border-none p-5"
                                >
                                    <Brush color="#28a745" /> {lang.buttons.themeButton}
                                </button>

                                <button
                                    onClick={() => setModal('lang')}
                                    className="btn bg-base-100 shadow-xl border-none p-5"
                                >
                                    <Languages color="#ffc107" /> {lang.buttons.langButton}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Lista de Bookmarks */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {bookmarks.map((bookmark) => (
                        <div key={bookmark.id} className="card bg-base-100 shadow-xl">
                            <a href={bookmark.url} target="_blank" rel="noopener noreferrer" className="w-full">
                                <figure>
                                    {/* Se a thumbnail está carregando ou não disponível, mostra um placeholder */}
                                    {bookmark.loading ? (
                                        <div className="w-full h-32 bg-gray-300 flex items-center justify-center">
                                            <span className="text-gray-500">{lang.imageBookmark.loadingThumbnail}</span>
                                        </div>
                                    ) : bookmark.thumbnail ? (
                                        <img
                                            src={bookmark.thumbnail}
                                            alt="Thumbnail"
                                            className="w-full h-32 object-cover bg-base-200"
                                        />
                                    ) : (
                                        <div className="w-full h-32 bg-gray-300 flex items-center justify-center">
                                            <span className="text-gray-500">{lang.imageBookmark.noImage}</span>
                                        </div>
                                    )}
                                </figure>
                            </a>
                            <div className="card-body p-0 flex items-center justify-center">
                                <div className="w-full h-full">
                                    <div className="card-actions justify-center">
                                        <h1
                                            onClick={() => setEditingBookmark(bookmark)}
                                            className="text-center cursor-pointer text-xl font-bold my-2 overflow-hidden"
                                        >
                                            {bookmark.title}
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <EditModal />
                <InfoModal />
                <TemasModal />
                <LangModal />
            </div>
        </div>
    );
}
