import { useBookmarks } from '@/context/context';
import { Icons } from '@/tools';
interface EditModal {
	removeFuc: (url: string) => void;
	moveFuc: (url: string, direction: 'up' | 'down') => void;
	updateFuc: (e: React.FormEvent<HTMLFormElement>) => void;
}
export default function EditModal({ removeFuc, moveFuc, updateFuc }: EditModal) {
	const { lang, editingBookmark, setEditingBookmark } = useBookmarks();

	return (
		<>
			<input
				type="checkbox"
				id="edit-modal"
				className="modal-toggle"
				checked={!!editingBookmark}
				readOnly
			/>
			<div className="modal">
				<div className="modal-box relative">
					<label
						htmlFor="edit-modal"
						className="btn btn-sm btn-circle absolute right-2 top-2"
						onClick={() => setEditingBookmark(null)}>
						✕
					</label>
					<h3 className="text-lg font-bold mb-4">{lang.editBookmark.title}</h3>
					{editingBookmark && (
						<form
							onSubmit={updateFuc}
							className="flex flex-col gap-3 mt-4">
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
							<input
								type="text"
								name="thumbnailUrl"
								defaultValue={editingBookmark.thumbnail}
								placeholder="URL da Thumbnail (opcional)"
								className="input input-bordered w-full"
							/>
							<div className="card-actions grid grid-cols-2">
								<button
									type="submit"
									className="btn btn-primary">
									<Icons.save /> {lang.editBookmark.saveButton}
								</button>
								<button
									onClick={() => removeFuc(editingBookmark.url)}
									className="btn btn-error w-full">
									<Icons.trash /> {lang.editBookmark.removeButton}
								</button>
							</div>
							<span className="text-center font-bold text-lg">{lang.editBookmark.moveTitle}</span>
							<div className="card-actions grid grid-cols-2">
								<button
									onClick={() => moveFuc(editingBookmark.url, 'up')}
									className="btn btn-outline text-nowrap">
									<Icons.arrowLeft /> {lang.editBookmark.moveLeft}
								</button>
								<button
									onClick={() => moveFuc(editingBookmark.url, 'down')}
									className="btn btn-outline">
									{lang.editBookmark.moveRight} <Icons.arrowRight />
								</button>
							</div>
						</form>
					)}
				</div>
			</div>
		</>
	);
}
