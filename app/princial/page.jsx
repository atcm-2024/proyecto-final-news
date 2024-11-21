import React, { useState } from 'react';
import Article from '@/app/components/article'; // Compon

export default function page({data}) {

  const [open, setOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  console.log(data)
  let idArticle=""

  // Función para abrir el modal
  const openModal = (article, idArticle) => {
    setSelectedArticle({ ...article, idArticle });  // Añadimos idArticle al objeto selectedArticle
    setOpen(true); // Abre el modal
  };

// Función para cerrar el modal
const closeModal = () => {
  setOpen(false); // Cierra el modal
  setSelectedArticle(null); // Limpia el artículo seleccionado
};



  if (!data) {
    return <div>Cargando...</div>;
  }

  // Acceso al objeto data.articles 
  const articles = data.articles || data.sources // data objeto propiedad articles segú el API

  
  console.log(articles)

    return (
      <div className="w-full h-[71%] bg-slate-800 text-white flex overflow-y-auto justify-center items-center relative">
        <div className="h-full w-[95%] grid grid-cols-1 mt-12 md:grid-cols-3 gap-2 justify-center items-center">
          {articles?.length > 0 ? (
            articles.map((item, index) => {
              idArticle=item?.source?.id || item?.id || 'default-id'
            if  (idArticle!=='[Removed]' || idArticle!==null)
              {
                  let urlAlterna = "/gestion-de-negocios.jpg"; 
                  if (item?.category === "business") {
                    urlAlterna = "/gestion-de-negocios.jpg";
                  } else if (item?.category === "entertainment") {
                    urlAlterna = "/El_entretenimiento.jpg";
                  } else if (item?.category === "general") {
                    urlAlterna = "/general.jpeg";
                  } else if (item?.category === "health") {
                    urlAlterna = "/salud.jpg";
                  } else if (item?.category === "science") {
                    urlAlterna = "/ciencia.jpg";
                  } else if (item?.category === "sports") {
                    urlAlterna = "/deportes.jpg";
                  } else if (item?.category === "technology") {
                    urlAlterna = "/tecnologia.png";
                  }
      
                return (
                  <div
                      key={index}
                      className="mb-5 mt-4 flex text-xs md:text-[14px] bg-black flex-col w-[95%] border-2 border-white rounded-xl h-[95%] justify-center items-center "
                    >
                      <div className="h-1/2 w-[95%] mb-4 flex">
                      <img
                          src={item?.urlToImage || urlAlterna}
                          className=" w-full h-full mt-5 object-fill"
                          width={1200}
                          height={500}
                          alt={item?.sources?.name || "Card"}
                        />
                      </div> 
                      <div className="h-1/2  w-[95%] mt-5 flex flex-col columns-1">
                          <label className="mr-2 mt-4">
                            Title: {item?.title || item?.id}
                          </label>
                          <label className="mb-2 mt-5 mr-2">
                            Description: {item?.description}
                          </label>
                          <button id="fuente" className="mt-2 mb-7 underline cursor-pointer" 
                          onClick={() => openModal(item, idArticle)} >
                            Fuente:
                                     {item?.source?.name || item?.name || "Unknown Source"}                     
                          </button>
                        </div>  
                  </div>
                  );}
              })
              
            ) : (
              <div className="text-center w-screen text-xl text-white mt-8 overflow-x-hidden">
                <label>No se encontraron artículos con los criterios de búsqueda seleccionados.</label>
            </div>

            )}
        </div>
          {open && <Article open={open} closeModal={closeModal} data={selectedArticle} />}
      </div>
    );
  }