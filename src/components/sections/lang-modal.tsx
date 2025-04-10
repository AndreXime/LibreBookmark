import { useBookmarks } from '@/context/context';
import { LangButtons } from '..';
import langStr from '@language/index';

export default function LangModal() {
	const { lang, modal, setModal, setLang } = useBookmarks();
	return (
		<>
			<input
				type="checkbox"
				id="lang-modal"
				className="modal-toggle"
				checked={modal === 'lang'}
				readOnly
			/>
			<div className="modal">
				<div className="modal-box relative">
					<label
						htmlFor="lang-modal"
						className="btn btn-sm btn-circle absolute right-2 top-2"
						onClick={() => setModal(null)}>
						✕
					</label>
					<h3 className="text-lg font-bold mb-4">{lang.modals.lang.title}</h3>
					<LangButtons
						setLang={setLang}
						langStr={langStr}
					/>
				</div>
			</div>
		</>
	);
}
