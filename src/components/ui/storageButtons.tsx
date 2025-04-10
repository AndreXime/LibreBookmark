import { Bookmark } from '@/context/context';
import { exportLocalStorage, importLocalStorage } from '@/tools';
import { IconImport, IconExport, IconClear } from '@tools/Icons';

type langStorage = {
	title: string;
	import: string;
	export: string;
	clear: string;
};

type bookmarkUseState = {
	setBookmarks: (bookmarks: Bookmark[]) => void;
	lang: langStorage;
};

const storageButtons: React.FC<bookmarkUseState> = ({ setBookmarks, lang }) => {
	const clearLocalStorage = () => {
		localStorage.removeItem('bookmarks');
		setBookmarks([]);
	};

	return (
		<>
			<button
				onClick={clearLocalStorage}
				className="btn btn-primary border-none w-full gap-2 mt-4"
				style={{
					backgroundColor: '#D999F3',
					color: '#fff',
				}}>
				<IconClear size={20} /> {lang.clear}
			</button>

			<button
				onClick={exportLocalStorage}
				className="btn btn-primary border-none w-full gap-2 mt-2"
				style={{
					backgroundColor: '#2196F3',
					color: '#fff',
				}}>
				<IconExport size={20} /> {lang.export}
			</button>

			<label
				htmlFor="file-input"
				className="btn btn-primary border-none w-full gap-2 mt-2"
				style={{
					backgroundColor: '#FF9800',
					color: '#fff',
				}}>
				<IconImport size={20} /> {lang.import}
			</label>

			<input
				id="file-input"
				type="file"
				accept=".json"
				onChange={importLocalStorage}
				className="hidden" // Esconde o input real
			/>
		</>
	);
};

export default storageButtons;
