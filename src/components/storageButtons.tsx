import { exportLocalStorage, importLocalStorage } from '@/tools';
import { FaArrowAltCircleUp, FaArrowAltCircleDown } from 'react-icons/fa';

type bookmarkUseState = {
	setBookmarks: React.Dispatch<React.SetStateAction<[]>>;
};

const storageButtons: React.FC<bookmarkUseState> = ({ setBookmarks }) => {
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
				<FaArrowAltCircleUp /> Limpar
			</button>

			<button
				onClick={exportLocalStorage}
				className="btn btn-primary border-none w-full gap-2 mt-2"
				style={{
					backgroundColor: '#2196F3',
					color: '#fff',
				}}>
				<FaArrowAltCircleUp /> Exportar
			</button>

			<label
				htmlFor="file-input"
				className="btn btn-primary border-none w-full gap-2 mt-2"
				style={{
					backgroundColor: '#FF9800',
					color: '#fff',
				}}>
				<FaArrowAltCircleDown /> Importar
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
