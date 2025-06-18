import { useBookmarks } from '@/context/context';
import { exportLocalStorage, importLocalStorage } from '@/tools';
import { Upload, Import, X } from 'lucide-react';

export default function InfoModal() {
    const { lang, modal, setModal } = useBookmarks();

    return (
        <>
            <input type="checkbox" id="info-modal" className="modal-toggle" checked={modal === 'info'} readOnly />
            <div className="modal">
                <div className="modal-box relative">
                    <label
                        htmlFor="info-modal"
                        className="btn btn-sm btn-circle absolute right-5 top-5"
                        onClick={() => setModal(null)}
                    >
                        <X />
                    </label>
                    <h3 className="text-lg font-bold mb-5">{lang.modals.howToUse.title}</h3>
                    {lang.modals.howToUse.description}{' '}
                    <h3 className="text-lg font-bold my-5">{lang.modals.info.title}</h3>
                    {lang.modals.info.description}{' '}
                    <a
                        href="https://github.com/AndreXime/LibreBookmark"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link link-primary"
                    >
                        GitHub
                    </a>
                    <h3 className="text-lg font-bold my-5">{lang.modals.storage.title}</h3>
                    <div className="flex gap-4">
                        <button
                            onClick={exportLocalStorage}
                            className="btn btn-primary border-none gap-2 mt-2 flex-1"
                            style={{
                                backgroundColor: '#2196F3',
                                color: '#fff',
                            }}
                        >
                            <Upload size={20} /> {lang.modals.storage.export}
                        </button>
                        <label
                            htmlFor="file-input"
                            className="btn btn-primary border-none gap-2 mt-2 flex-1"
                            style={{
                                backgroundColor: '#FF9800',
                                color: '#fff',
                            }}
                        >
                            <Import size={20} /> {lang.modals.storage.import}
                        </label>
                        <input
                            id="file-input"
                            type="file"
                            accept=".json"
                            onChange={importLocalStorage}
                            className="hidden" // Esconde o input real
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
