'use client';
import { useState, useEffect } from 'react';

import { langStr, getThumbnail } from '@tools/index';
import { ThemeButtons, LangButtons, StorageButtons } from '@components/index';
import Icons from '@tools/Icons';

/* localStorage tem seguintes chaves: bookmarks, lang, theme */

export default function Home() {
	const [bookmarks, setBookmarks] = useState([]);
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
	const addBookmark = async (e) => {
		e.preventDefault();

		const formData = new FormData(e.target);
		const url = formData.get('url');
		const thumbnailUrl = formData.get('thumbnailUrl');
		const title = formData.get('title');

		if (url && !bookmarks.find((bm) => bm.url === url)) {
			const newEntry = {
				url,
				thumbnail: thumbnailUrl || null,
				title,
				loading: !thumbnailUrl,
			};

			// Adiciona o card antes de gerar a thumbnail automatica
			setBookmarks([...bookmarks, newEntry]);

			e.target.reset();

			// Se a thumbnail não for fornecida, tenta gerar automaticamente
			if (!thumbnailUrl) {
				const thumbnail = await getThumbnail(url);
				setBookmarks((prevBookmarks) =>
					prevBookmarks.map((bm) => (bm.url === url ? { ...bm, thumbnail, loading: false } : bm))
				);
			}
		}
	};

	// Remove um bookmark
	const removeBookmark = (url: string) => {
		setBookmarks(bookmarks.filter((bookmark) => bookmark.url !== url));
	};

	// Edita um bookmark com um modal
	const updateBookmark = (e) => {
		e.preventDefault();

		const formData = new FormData(e.target);
		const updatedTitle = formData.get('title');
		const updatedUrl = formData.get('url');
		const updatedThumbnailUrl = formData.get('thumbnailUrl');

		setBookmarks((prevBookmarks) =>
			prevBookmarks.map((bm) =>
				bm.url === editingBookmark.url
					? {
							...bm,
							title: updatedTitle,
							url: updatedUrl,
							thumbnail: updatedThumbnailUrl || bm.thumbnail,
					  }
					: bm
			)
		);

		setEditingBookmark(null); // Fecha o modal
	};

	// Mover um bookmark para cima ou para baixo
	const moveBookmark = (url: string, direction: 'up' | 'down') => {
		const currentIndex = bookmarks.findIndex((bookmark) => bookmark.url === url);
		const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;

		// Copia a lista, remove no indice antigo e adiciona no novo indice
		const updatedBookmarks = [...bookmarks];
		const [movedBookmark] = updatedBookmarks.splice(currentIndex, 1);
		updatedBookmarks.splice(newIndex, 0, movedBookmark);

		// Atualiza o estado
		setBookmarks(updatedBookmarks);
	};

	return (
		<div className="min-h-screen bg-base-200 p-6">
			<div className="max-w-6xl mx-auto">
				{/* Card para Adicionar Bookmark */}
				<div className="collapse collapse-plus bg-base-100 shadow-xl mb-6">
					<input type="checkbox" />
					<div className="collapse-title text-xl font-medium">LibreBookmarks</div>
					<div className="collapse-content grid grid-cols-1 md:grid-cols-3">
						<div className="card-body col-span-2">
							<form
								onSubmit={addBookmark}
								className="form-control flex-col gap-4">
								<label className="input input-bordered flex items-center gap-2 w-full">
									{lang.form.titlePlaceholder}
									<input
										type="text"
										name="title"
										placeholder="ChatGPT"
										className="w-full placeholder-neutral-400 placeholder-opacity-50"
										required
									/>
								</label>
								<label className="input input-bordered flex items-center gap-2">
									{lang.form.urlPlaceholder}
									<input
										type="text"
										name="url"
										placeholder="https://chatgpt.com"
										className="w-full placeholder-neutral-400 placeholder-opacity-50"
										required
									/>
								</label>

								<label className="form-control w-full">
									<label className="input input-bordered flex items-center gap-2">
										{lang.form.thumbnailUrlPlaceholder}
										<input
											type="text"
											name="thumbnailUrl"
											placeholder="https://placehold.co/150x150.png"
											className="w-full placeholder-neutral-400 placeholder-opacity-50"
										/>
									</label>
									<div className="label">
										<span className="label-text-alt">{lang.form.thumbnailHint}</span>
									</div>
								</label>

								<button
									type="submit"
									className="btn btn-primary">
									<Icons.add /> {lang.form.addButton}
								</button>
							</form>
						</div>
						<div className="card-body col-span-1">
							<h2 className="card-title text-xl mx-auto text-center">Configurações</h2>
							<div className="grid grid-cols-2 mt-4 gap-2">
								<button
									onClick={() => setModal('info')}
									className="btn border-none col-span-1">
									<Icons.info color="#007bff" /> {lang.config.infoButton}
								</button>
								<button
									onClick={() => setModal('temas')}
									className="btn border-none col-span-1">
									<Icons.pallete color="#28a745" /> {lang.config.themeButton}
								</button>
								<button
									onClick={() => setModal('storage')}
									className="btn border-none col-span-1">
									<Icons.gear color="#17a2b8" /> {lang.config.storageButton}
								</button>
								<button
									onClick={() => setModal('lang')}
									className="btn border-none col-span-1">
									<Icons.language color="#ffc107" /> Idiomas
								</button>
							</div>
							<h2 className="card-title text-xl mx-auto text-center my-4">Como usar</h2>
							<ul>
								<li>
									<strong>Adicione: </strong>Preencha o formulario para salvar seus sites.
								</li>
								<li>
									<strong>Visite: </strong>Clique nas imagens geradas para acessar os sites salvos.
								</li>
								<li>
									<strong>Personalize: </strong>Clique no nome do site para remover, mover ou editar nome ou url.
								</li>
							</ul>
						</div>
					</div>
				</div>

				{/* Lista de Bookmarks */}
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
					{bookmarks.map((bookmark, index) => (
						<div
							key={index}
							className="card bg-base-300 shadow-xl">
							<a
								href={bookmark.url}
								target="_blank"
								rel="noopener noreferrer"
								className="w-full">
								<figure>
									{/* Se a thumbnail está carregando ou não disponível, mostra um placeholder */}
									{bookmark.loading ? (
										<div className="w-full h-32 bg-gray-300 flex items-center justify-center">
											<span className="text-gray-500">{lang.bookmark.loadingThumbnail}</span>
										</div>
									) : bookmark.thumbnail ? (
										<img
											src={bookmark.thumbnail}
											alt="Thumbnail"
											className="w-full h-32 object-cover bg-base-200"
										/>
									) : (
										<div className="w-full h-32 bg-gray-300 flex items-center justify-center">
											<span className="text-gray-500">{lang.bookmark.noImage}</span>
										</div>
									)}
								</figure>
							</a>
							<div className="card-body p-0 flex items-center justify-center">
								<div className="w-full h-full">
									<div className="card-actions justify-center">
										<h1
											onClick={() => setEditingBookmark(bookmark)}
											className="text-center cursor-pointer text-xl font-bold my-2 overflow-hidden">
											{bookmark.title}
										</h1>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>

				{/* Modal de edição */}
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
						<h3 className="text-lg font-bold mb-4">{lang.bookmark.editBookmark}</h3>
						{editingBookmark && (
							<form
								onSubmit={updateBookmark}
								className="form-control gap-4 mt-4">
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
										<Icons.save /> {lang.bookmark.saveButton}
									</button>
									<button
										onClick={() => removeBookmark(editingBookmark.url)}
										className="btn btn-error w-full">
										<Icons.trash /> Remover
									</button>
								</div>
								<div className="card-actions grid grid-cols-2">
									<button
										onClick={() => moveBookmark(editingBookmark.url, 'up')}
										className="btn btn-outline">
										<Icons.arrowLeft /> Mover para esquerda
									</button>
									<button
										onClick={() => moveBookmark(editingBookmark.url, 'down')}
										className="btn btn-outline">
										Mover para direita <Icons.arrowRight />
									</button>
								</div>
							</form>
						)}
					</div>
				</div>

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
							<ul className="list-disc list-inside">
								<li>
									{lang.modals.info.sourceCode}{' '}
									<a
										href="https://github.com/seu-usuario/librebookmarks"
										target="_blank"
										rel="noopener noreferrer"
										className="link link-primary">
										GitHub
									</a>
								</li>
								<li>{lang.modals.info.localStorageInfo}</li>
								<li>{lang.modals.info.noBackend}</li>
								<li>{lang.modals.info.techStack}</li>
							</ul>
						)}
					</div>
				</div>

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
						{modal === 'storage' && <StorageButtons setBookmarks={setBookmarks} />}
					</div>
				</div>

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
						{modal === 'lang' && (
							<LangButtons
								setLang={setLang}
								langStr={langStr}
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
