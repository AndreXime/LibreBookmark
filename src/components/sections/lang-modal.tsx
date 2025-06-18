import { useBookmarks } from '@/context/context';
import langStr, { LanguagesSingularType } from '@language/index';
import { X } from 'lucide-react';

export default function LangModal() {
    const { lang, modal, setModal, setLang } = useBookmarks();

    const languageChange = (language: string) => {
        setLang(langStr[language] as LanguagesSingularType);
        localStorage.setItem('lang', language);
    };

    return (
        <>
            <input type="checkbox" id="lang-modal" className="modal-toggle" checked={modal === 'lang'} readOnly />
            <div className="modal">
                <div className="modal-box relative">
                    <label
                        htmlFor="info-modal"
                        className="btn btn-sm btn-circle absolute right-5 top-5"
                        onClick={() => setModal(null)}
                    >
                        <X />
                    </label>
                    <h3 className="text-lg font-bold mb-4">{lang.modals.lang.title}</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={() => languageChange('en')}
                            className="btn gap-2 col-span-1 flex items-center justify-center p-4 rounded-lg"
                            style={{
                                backgroundColor: '#0033A0', // Azul dos EUA
                                color: '#fff',
                            }}
                        >
                            🇺🇸 English
                        </button>

                        <button
                            onClick={() => languageChange('ptbr')}
                            className="btn gap-2 col-span-1 flex items-center justify-center p-4 rounded-lg"
                            style={{
                                backgroundColor: '#006600', // Verde do Brasil
                                color: '#fff',
                            }}
                        >
                            🇧🇷 Português
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
