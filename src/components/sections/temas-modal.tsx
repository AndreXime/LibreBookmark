import { useBookmarks } from '@/context/context';
import { ThemeButtons } from '..';

export default function TemasModal() {
	const { lang, modal, setModal } = useBookmarks();
	return (
		<>
			<input
				type="checkbox"
				id="temas-modal"
				className="modal-toggle"
				checked={modal === 'temas'}
				readOnly
			/>
			<div className="modal">
				<div className="modal-box relative">
					<label
						htmlFor="temas-modal"
						className="btn btn-sm btn-circle absolute right-2 top-2"
						onClick={() => setModal(null)}>
						✕
					</label>
					<h3 className="text-lg font-bold mb-4">{lang.modals.themes.title}</h3>
					{modal === 'temas' && (
						<div>
							<ThemeButtons />
						</div>
					)}
				</div>
			</div>
		</>
	);
}
