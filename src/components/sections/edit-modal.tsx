import { useBookmarks } from '@/context/context';
import { ArrowLeft, ArrowRight, Save, Trash, X } from 'lucide-react';

export default function EditModal() {
    const { lang, editingBookmark, setEditingBookmark, updateBookmark, moveBookmark, removeBookmark } = useBookmarks();

    return (
        <>
            <input type="checkbox" id="edit-modal" className="modal-toggle" checked={!!editingBookmark} readOnly />
            <div className="modal">
                <div className="modal-box relative">
                    <label
                        htmlFor="info-modal"
                        className="btn btn-sm btn-circle absolute right-5 top-5"
                        onClick={() => setEditingBookmark(null)}
                    >
                        <X />
                    </label>
                    <h3 className="text-lg font-bold mb-4">{lang.editBookmark.title}</h3>
                    {editingBookmark && (
                        <form onSubmit={updateBookmark} className="flex flex-col gap-3 mt-4">
                            <input
                                type="text"
                                name="title"
                                defaultValue={editingBookmark.title}
                                placeholder="Título"
                                className="input input-bordered w-full"
                            />
                            <input
                                type="text"
                                name="url"
                                defaultValue={editingBookmark.url}
                                placeholder="URL"
                                className="input input-bordered w-full"
                                required
                            />
                            <div className="card-actions grid grid-cols-2">
                                <button type="submit" className="btn btn-primary">
                                    <Save /> {lang.editBookmark.saveButton}
                                </button>
                                <button
                                    onClick={() => removeBookmark(editingBookmark.id)}
                                    className="btn btn-error w-full"
                                >
                                    <Trash /> {lang.editBookmark.removeButton}
                                </button>
                            </div>
                            <span className="text-center font-bold text-lg">{lang.editBookmark.moveTitle}</span>
                            <div className="card-actions grid grid-cols-2">
                                <button
                                    onClick={() => moveBookmark(editingBookmark.id, 'up')}
                                    className="btn btn-outline text-nowrap"
                                >
                                    <ArrowLeft /> {lang.editBookmark.moveLeft}
                                </button>
                                <button
                                    onClick={() => moveBookmark(editingBookmark.id, 'down')}
                                    className="btn btn-outline"
                                >
                                    {lang.editBookmark.moveRight} <ArrowRight />
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </>
    );
}
