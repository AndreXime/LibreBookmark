import { useBookmarks } from '@/context/context';

export default function InfoModal() {
	const { lang, modal, setModal } = useBookmarks();
	return (
		<>
			<input
				type="checkbox"
				id="info-modal"
				className="modal-toggle"
				checked={modal === 'info'}
				readOnly
			/>
			<div className="modal">
				<div className="modal-box relative">
					<label
						htmlFor="info-modal"
						className="btn btn-sm btn-circle absolute right-2 top-2"
						onClick={() => setModal(null)}>
						✕
					</label>
					<h3 className="text-lg font-bold mb-4">{lang.modals.info.title}</h3>
					{modal === 'info' && (
						<ul className="list-disc list-inside gap-4">
							<li>
								{lang.modals.info.description[0]}
								<a
									href="https://github.com/AndreXime/LibreBookmark"
									target="_blank"
									rel="noopener noreferrer"
									className="link link-primary">
									GitHub
								</a>
							</li>
							<li>{lang.modals.info.description[1]}</li>
							<li>{lang.modals.info.description[2]}</li>
							<li>{lang.modals.info.description[3]}</li>
						</ul>
					)}
				</div>
			</div>
		</>
	);
}
