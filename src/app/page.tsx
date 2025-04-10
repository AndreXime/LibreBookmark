'use client';
import { useEffect } from 'react';

import { getThumbnail, Icons } from '@tools/index';
import { useBookmarks } from '@/context/context';
import langStr from '@language/index';
import { EditModal, InfoModal, LangModal, StorageModal, TemasModal } from '@/components';

/* localStorage tem seguintes chaves: bookmarks, lang, theme */
export default function Home() {
	const { lang, setLang, setModal, editingBookmark, setEditingBookmark, bookmarks, setBookmarks } = useBookmarks();

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
	const addBookmark = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const url = String(formData.get('url'));
		const thumbnailUrl = String(formData.get('thumbnailUrl'));
		const title = String(formData.get('title'));

		if (url && !bookmarks.find((bm) => bm.url === url)) {
			const newEntry = {
				url,
				thumbnail: thumbnailUrl || null,
				title,
				loading: !thumbnailUrl,
			};

			// Adiciona o card antes de gerar a thumbnail automatica
			setBookmarks([...bookmarks, newEntry]);

			e.currentTarget.reset();

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
	const updateBookmark = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const updatedTitle = String(formData.get('title'));
		const updatedUrl = String(formData.get('url'));
		const updatedThumbnailUrl = String(formData.get('thumbnailUrl'));

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
								className=" flex-col flex gap-3">
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

								<label className="form-control w-full">
									<label className="input input-bordered flex items-center gap-2 w-full">
										{lang.formAddBookmark.thumbnailUrlPlaceholder}
										<input
											type="text"
											name="thumbnailUrl"
											placeholder="https://placehold.co/150x150.png"
											className="w-full placeholder-neutral-400 placeholder-opacity-50"
										/>
									</label>
									<div className="label mt-2">{lang.formAddBookmark.thumbnailHint}</div>
								</label>

								<button
									type="submit"
									className="btn btn-primary mt-3">
									<Icons.add /> {lang.formAddBookmark.addButton}
								</button>
							</form>
						</div>
						<div className="card-body col-span-1">
							<h2 className="card-title text-xl mx-auto text-center">Configurações</h2>
							<div className="grid grid-cols-2 mt-4 gap-2">
								<button
									onClick={() => setModal('info')}
									className="btn bg-base-100 shadow-xl border-none col-span-1">
									<Icons.info color="#007bff" /> {lang.buttons.infoButton}
								</button>
								<button
									onClick={() => setModal('temas')}
									className="btn bg-base-100 shadow-xl border-none col-span-1">
									<Icons.pallete color="#28a745" /> {lang.buttons.themeButton}
								</button>
								<button
									onClick={() => setModal('storage')}
									className="btn bg-base-100 shadow-xl border-none col-span-1">
									<Icons.gear color="#17a2b8" /> {lang.buttons.storageButton}
								</button>
								<button
									onClick={() => setModal('lang')}
									className="btn bg-base-100 shadow-xl border-none col-span-1">
									<Icons.language color="#ffc107" /> {lang.buttons.langButton}
								</button>
							</div>
							<h2 className="card-title text-xl mx-auto text-center my-4">{lang.howToUse.title}</h2>
							<ul>
								<li>
									<strong>{lang.howToUse.Adicione[0]} </strong> {lang.howToUse.Adicione[1]}
								</li>
								<li>
									<strong>{lang.howToUse.Visite[0]} </strong> {lang.howToUse.Visite[1]}
								</li>
								<li>
									<strong>{lang.howToUse.Personalize[0]} </strong> {lang.howToUse.Personalize[1]}
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
							className="card bg-base-100 shadow-xl">
							<a
								href={bookmark.url}
								target="_blank"
								rel="noopener noreferrer"
								className="w-full">
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
											className="text-center cursor-pointer text-xl font-bold my-2 overflow-hidden">
											{bookmark.title}
										</h1>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>

				<EditModal
					removeFuc={removeBookmark}
					updateFuc={updateBookmark}
					moveFuc={moveBookmark}
				/>
				<InfoModal />
				<StorageModal />
				<TemasModal />
				<LangModal />
			</div>
		</div>
	);
}
