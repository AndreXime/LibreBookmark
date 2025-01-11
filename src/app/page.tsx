"use client"
import { useState, useEffect } from "react";
import { FaTrash, FaEdit, FaArrowAltCircleDown, FaArrowAltCircleUp } from 'react-icons/fa';

import type { bookmark } from "@/types";
import { strings } from "@/strings";
import { exportLocalStorage, importLocalStorage } from "@/localStorageExport";

const getThumbnail = async (url) => {
  const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
    url
  )}&screenshot=true`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.lighthouseResult && data.lighthouseResult.audits["final-screenshot"]) {
      return `data:image/jpeg;base64,${data.lighthouseResult.audits["final-screenshot"].details.data.replace(
        /^data:image\/jpeg;base64,/,
        ""
      )}`;
    }
    return null; // Sem thumbnail
  } catch (error) {
    console.error("Erro ao buscar thumbnail:", error);
    return null;
  }
};

export default function Home() {
  const [bookmarks, setBookmarks] = useState([]);
  const [editingBookmark, setEditingBookmark] = useState(null); // Um bookmark está sendo editado
  const [theme, setTheme] = useState("dark");
  const [lang, setLang] = useState(strings.ptbr);
  
  const languageChange = (language?: string) => {
    if (language) {
      setLang(strings[language]);
      window.localStorage.setItem("lang", language);
    } else {
      const lang = navigator.language.startsWith("pt") ? "ptbr" : "en";
      setLang(strings[lang]);
      window.localStorage.setItem("lang", lang);
    }
  };

  // Carrega bookmarks, linguagem tema e boomarks
  useEffect(() => {
    languageChange();

    const savedTheme = window.localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);

    const storedBookmarks = JSON.parse(window.localStorage.getItem("bookmarks")) || [];
    setBookmarks(storedBookmarks);
  }, []);

  // Atualiza o Local Storage quando os bookmarks mudam
  useEffect(() => {
    window.localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    window.localStorage.setItem("theme", newTheme);
  };

  // Adiciona um novo bookmark e busca thumbnail
  const addBookmark = async (e) => {
    e.preventDefault();
  
    const formData = new FormData(e.target);
    const url = formData.get("url");
    const thumbnailUrl = formData.get("thumbnailUrl");
    const title = formData.get("title");
  
    if (url && !bookmarks.find((bm) => bm.url === url)) {
      const newEntry = {
        url,
        thumbnail: thumbnailUrl || null,
        title,
        loading: true,
      };
  
      // Adiciona o card antes de gerar a thumbnail automatica
      setBookmarks([...bookmarks, newEntry]);
  
      // Se a thumbnail não for fornecida, tenta gerar automaticamente
      if (!thumbnailUrl) {
        const thumbnail = await getThumbnail(url);
        setBookmarks((prevBookmarks) =>
          prevBookmarks.map((bm) =>
            bm.url === url ? { ...bm, thumbnail, loading: false } : bm
          )
        );
      }
  
      e.target.reset();
    }
  };

  // Remove um bookmark
  const removeBookmark = (url) => {
    setBookmarks(bookmarks.filter((bookmark) => bookmark.url !== url));
  };

  // Edita um bookmark com um modal
  const updateBookmark = (e) => {
    e.preventDefault();
  
    const formData = new FormData(e.target);
    const updatedTitle = formData.get("title");
    const updatedUrl = formData.get("url");
    const updatedThumbnailUrl = formData.get("thumbnailUrl");
  
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
  

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Card para Adicionar Bookmark */}
        <div className="collapse collapse-plus bg-base-100 shadow-xl mb-6">
          <input type="checkbox" className="peer" />
          <div className="collapse-title text-xl font-medium">
            LibreBookmarks
          </div>
          <div className="collapse-content grid grid-cols-1 md:grid-cols-3">
            <div className="card-body col-span-2">
            <form onSubmit={addBookmark} className="form-control flex-col gap-4">
              <input
                type="text"
                name="title"
                placeholder={lang.form.titlePlaceholder}
                className="input input-bordered w-full"
                required
              />
              <input
                type="text"
                name="url"
                placeholder={lang.form.urlPlaceholder}
                className="input input-bordered w-full"
                required
              />
              <input
                type="text"
                name="thumbnailUrl"
                placeholder={lang.form.thumbnailUrlPlaceholder}
                className="input input-bordered w-full"
              />
              <button type="submit" className="btn btn-primary">
                {lang.form.addButton}
              </button>
            </form>
            </div>
            <div className="card-body col-span-1">
              <h2 className="card-title text-xl text-center">{lang.card.information}</h2>
              <ul className="list-disc list-inside">
                <li>
                  {lang.card.sourceCode}{" "}
                  <a
                    href="https://github.com/seu-usuario/librebookmarks"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link link-primary"
                  >
                    GitHub
                  </a>
                </li>
                <li>{lang.card.localStorageInfo}</li>
                <li>{lang.card.noBackend}</li>
                <li>{lang.card.techStack}</li>
                <div className="grid grid-cols-2 mt-4 gap-2">
                  <button onClick={toggleTheme} className="btn btn-accent border-none col-span-2">
                    { theme === "light" ? lang.card.themeButton.light : lang.card.themeButton.dark }
                  </button>
                
                  <button
                    onClick={() => { languageChange("en") }}
                    className="btn btn-primary border-none gap-2 col-span-2 lg:col-span-1 mt-2"
                    style={{
                      backgroundColor: '#0033A0', // Azul dos EUA
                      color: '#fff',
                    }}>
                    <span className="text-xl">🇺🇸</span> English
                  </button>
                  <button
                    onClick={() => { languageChange("ptbr") }}
                    className="btn btn-primary border-none gap-2 col-span-2 lg:col-span-1 mt-2"
                    style={{
                      backgroundColor: '#00A859', // Verde do Brasil
                      color: '#fff',
                    }}>
                    <span className="text-xl">🇧🇷</span> Português
                  </button>
                  <button
                    onClick={exportLocalStorage}
                    className="btn btn-primary border-none gap-2 col-span-2 lg:col-span-1 mt-2"
                    style={{
                      backgroundColor: '#2196F3',
                      color: '#fff',
                    }}
                  >
                    <FaArrowAltCircleUp/> Exportar
                  </button>

                  <label htmlFor="file-input" className="btn btn-primary border-none gap-2 col-span-2 lg:col-span-1 mt-2"
                    style={{
                      backgroundColor: '#FF9800',
                      color: '#fff',
                    }}>
                    <FaArrowAltCircleDown/> Importar
                  </label>
                  <input
                    id="file-input"
                    type="file"
                    accept=".json"
                    onChange={importLocalStorage}
                    className="hidden" // Esconde o input real
                  />
                </div>
              </ul>
            </div>
          </div>
        </div>

        {/* Lista de Bookmarks */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {bookmarks.map((bookmark: bookmark, index) => (
            <div key={index} className="card bg-base-300 card- shadow-xl">
              <a
                href={bookmark.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
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
                      className="w-full h-32 object-cover"
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
                  <h1 className="text-center text-xl font-bold my-2">{bookmark.title}</h1>
                  <div className="card-actions grid grid-cols-2 gap-2">
                    <button
                      onClick={() => removeBookmark(bookmark.url)}
                      className="btn btn-ghost w-full"
                    >
                      <FaTrash color="#ff5733" />
                    </button>
                    <button
                      onClick={() => setEditingBookmark(bookmark)}
                      className="btn btn-ghost w-full"
                    >
                      <FaEdit color="#33a9ff" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal de edição */}
        <input type="checkbox"
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
              onClick={() => setEditingBookmark(null)}
            >
              ✕
            </label>
            <h3 className="text-lg font-bold">{lang.bookmark.editBookmark}</h3>
            {editingBookmark && (
              <form onSubmit={updateBookmark} className="form-control gap-4 mt-4">
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
                <button type="submit" className="btn btn-primary">
                {lang.bookmark.saveButton}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


