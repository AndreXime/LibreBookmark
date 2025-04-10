import { useBookmarks } from '@/context/context';
import { StorageButtons } from '..';

export default function StorageModal() {
	const { lang, modal, setModal, setBookmarks } = useBookmarks();
	return (
		<>
			<input
				type="checkbox"
				id="storage-modal"
				className="modal-toggle"
				checked={modal === 'storage'}
				readOnly
			/>
			<div className="modal">
				<div className="modal-box relative">
					<label
						htmlFor="storage-modal"
						className="btn btn-sm btn-circle absolute right-2 top-2"
						onClick={() => setModal(null)}>
						✕
					</label>
					<h3 className="text-lg font-bold mb-4">{lang.modals.storage.title}</h3>
					<StorageButtons
						lang={lang.modals.storage}
						setBookmarks={setBookmarks}
					/>
				</div>
			</div>
		</>
	);
}
