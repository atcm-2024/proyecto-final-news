import React from 'react';

export default function Article({ open, closeModal, data, position }) {
  if (!data) return null;

  const { title, description, urlToImage, source, idArticle } = data;

  let urlAlterna = "/gestion-de-negocios.jpg"; // Imagen por defecto
  if (urlToImage && urlToImage !== '[Removed]') {
    urlAlterna = urlToImage;
  }

  

  return (
    <div
      className={`fixed bg-black bg-opacity-50 z-50 flex justify-center items-start transition-all duration-300 -translate-x-1/2 top-56 left-[225px] w-[88%] md:left-[48%] md:top-[17%] md:w-[45%] md:h-[40%]`}
     
    >
      <div
        className="bg-white p-5 rounded-xl text-sm w-full h-[70] overflow-y-auto text-sky-900 flex  flex-col justify-center items-start "
        onClick={(e) => e.stopPropagation()} 
      >
        <span
          className="text-3xl text-gray-500 cursor-pointer absolute top-2 right-2"
          onClick={closeModal}
        >
          &times;
        </span>

        <h2 className="mb-4 mt-4 text-base font-bold">{title || 'Sin título'}</h2>
        <p className="mb-4">{description || 'Sin descripción disponible.'}</p>

        <img
          src={urlToImage || urlAlterna}
          alt={title || 'Imagen del artículo'}
          className="w-full h-auto mb-4 object-cover rounded-md"
        />

        <p className="mb-2">
          <strong>Fuente:</strong> {source?.name || 'Fuente desconocida'}
        </p>
        <p className="mb-2">
          <strong>ID del Artículo:</strong> {idArticle || 'No disponible'}
        </p>
      </div>
    </div>
  );
}