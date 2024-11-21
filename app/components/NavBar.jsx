"use client";
import React, { useState, useEffect  } from "react";
import Image from "next/image";
import useGeolocation from "@/app/customhooks/useGeolocation";
import useDataClima from "@/app/customhooks/useDataClima";
import palabras from "@/app/api/palabras.json";

export default function NavBar({ busqueda }) {
   const [inptBuscar, setInptBuscar] = useState(""); // Para el input de búsqueda
   const [selectCateg, setSelectCateg] = useState("categoria");
   const [selectFuente, setSelectFuente] = useState("fuentes");
   const { getGeo, geolocation: geo } = useGeolocation();
   const keyWeather = 'b7d615d9db4094bda48584cbc6a0c4cc';
   const WeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${geo.lat}&lon=${geo.lon}&appid=${keyWeather}&units=metric`;
   const {dataClima} = useDataClima(WeatherUrl);
   const [searchResults, setSearchResults] = useState([]);
   const [showResults, setShowResults] = useState(false);

   /* ----------- para actualizar búsqueda en el input ---------------------------------------*/
   useEffect(() => {
      handleSearch();
    }, [inptBuscar]);

    // ---- para habilitar que la tecla escape oculte el ul y limpie todo --------------------------------
   useEffect(() => {
      const handleKeyDown = (e) => {
         if (e.key === "Escape") {
            setShowResults(false); 
         }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => {
         document.removeEventListener("keydown", handleKeyDown);
      };
   }, []);
   // ---------------------------------------------------------------------------------------
   function handleInputChange(e) {
      setInptBuscar(e.target.value);
      setShowResults(true);
    }
  //---------------------------------------------------------------------------
   function handleSearch() {
      if (inptBuscar.trim() === "") {
        setSearchResults([]);
        return;
      }
   //----------- para buscar las palabras en el objeto json -------------------------
      const filteredPalabras = palabras
        .filter((words) =>
          words.word.toLowerCase().startsWith(inptBuscar.toLowerCase())
        )
        .slice(0, 3);
  
      setSearchResults(filteredPalabras);
    }
   /* --------------- captura la palabra seleccionada y luego limpia el resultado --------------------------- */
   function handleSelectItem(word) {
      setInptBuscar(word); 
      setSearchResults([]);
      setShowResults(false);
   }
   
   function handleDatos() {
      busqueda(selectCateg, selectFuente, inptBuscar);
   }
   
   const tiempoTranscurrido = Date.now();
   const hoy = new Date(tiempoTranscurrido);

 
   return (
      <div className="md:flex flex-row h-[22%] bg-slate-900 md:h-[14%] w-full font-bold text-xs  ">
         <div className="w-full md:w-[55%] h-[70%] md:h-full shrink-0 flex ">
            <div className="h-full w-[25%] ">
               <div className="h-[50%] w-full flex flex-col mt-5 justify-center items-center md:items-start ">
                  <Image
                     src="/Logo1T.png"
                     className="ml-4 mt-2 w-20 h-20 md:w-[90px] md:h-[90px]"
                     width={1200}
                     height={500}
                     alt="Digital News Networking"
                  ></Image>
               </div>
            </div>
            <div className="h-full  w-[75%] md:w-[75%] ml-5 flex flex-col justify-center items-center">
               <div className="w-full h-[32%] flex mt-3 justify-center mb-2 mmd:mb-0">
                     <label className="text-white text-[14px]">{hoy.toDateString() + ' ' + hoy.getHours()+':'+hoy.getMinutes()}
                     </label>
                     <label className="text-white text-[14px] ml-4">
                           {dataClima ? dataClima.name : "Cargando..."}
                     </label>
                     <label className="text-white text-[14px] ml-2">
                              {dataClima && dataClima?.main?.temp ? (
                                    dataClima?.main?.temp.toFixed(1) + ' °C'
                               ) : null}
                     </label>
                     <label className="ml-3 mr-3">
                        {dataClima && dataClima.weather && dataClima.weather[0] ? (          
                           <Image 
                                 src={`/images/weather/${dataClima.weather[0].icon}.png`}  
                                 alt="" width={1200} height={500}
                                 className="absolute w-[12px] h-[12px] " 
                                 />
                              ) : null}
                     </label>
                     <label className="text-white text-[14px] ml-2">
                              {dataClima && dataClima.weather && dataClima.weather[0] ? (
                                     dataClima.weather[0].description
                                  ) : "Cargando..."}
                     </label>
               </div>
               <div className="h-[62%] w-full flex flex-row justify-center mb-5 mt-2 md:mt-0">
                  <input
                     type="text"
                     name="buscar"
                     id="buscar"
                     value={inptBuscar}
                     className="w-[75%] h-[42px] md:w-[62%] border-gray-500 border-2 rounded-3xl rounded-r-none indent-5"
                     onChange={handleInputChange}
                  />
         
                  <button
                     className="bg-red-500 w-16 h-[42px] flex text-center rounded-r-3xl mr-4 border-gray-500 border-2"
                     onClick={handleDatos}
                  >
                     <Image
                        src="/NewsFinderT.png"
                        style=""
                        className="w-12 h-10 "
                        width={1200}
                        height={500}
                        alt="Digital News Networking"
                     ></Image>
                  </button>
               </div>
               {showResults && (
               <ul className="absolute mt-[108px] w-[55%] md:w-[25%] h-14 overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-lg z-10 mr-16 md:mr-[75px] md:z-20">
                  {searchResults.map(({ id, word }) => (
                     <li
                        key={id}
                        onClick={() => handleSelectItem(word)} 
                        className="cursor-pointer hover:bg-gray-200 p-2"
                     >
                        {word}
                     </li>
                  ))}
               </ul> )}
            </div>   

         </div>
         <div className="h-[22%] md:mb-0 md:h-full md:w-[45%] bg-slate-900 w-full flex md:flex-row justify-center items-center">
            <label
               className="mr-3 text-[12px] font-bold md:text-[14px] ml-2 md:ml-0 text-white"
               htmlFor=""
            >
               Categorías
            </label>
            <select
               id="idioma"
               className="mr-5 w-[135px] h-[28px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl indent-1 focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
               onChange={(e) => setSelectCateg(e.target.value)}
            >
               <option value="categoria" defaultValue>
                  Elige una categoría
               </option>
               <option value="business">Negocios</option>
               <option value="entertainment">Entretenimiento</option>
               <option value="general">General</option>
               <option value="health">Salud</option>
               <option value="science">Ciencia</option>
               <option value="sports">Deportes</option>
               <option value="technology">Tecnología</option>
            </select>
            <label
               className="ml-0 text-[12px] font-bold md:text-[14px] text-white"
               htmlFor=""
            >
               Fuentes:
            </label>
            <select
               id="fuente"
               className="ml-2 mr-3 w-[135px] h-[28px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl indent-1 focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
               onChange={(e) => setSelectFuente(e.target.value)}
            >
               <option value="fuentes" defaultValue>
                  Elige una fuente
               </option>
               <option value="us">Estados Unidos</option>
               <option value="ae">Emiratos Árabes Unidos</option>
               <option value="ar">Argentina</option>
               <option value="at">Austria</option>
               <option value="au">Australia</option>
               <option value="be">Bélgica</option>
               <option value="bg">Bulgaria</option>
               <option value="br">Brasil</option>
               <option value="ca">Canadá</option>
               <option value="ch">Suiza</option>
               <option value="cn">China</option>
               <option value="co">Colombia</option>
               <option value="cu">Cuba</option>
               <option value="cz">Chequia</option>
               <option value="de">Alemania</option>
               <option value="eg">Egipto</option>
               <option value="fr">Francia</option>
               <option value="gb">Reino Unido</option>
               <option value="hk">Hong Kong</option>
               <option value="hu">Hungría</option>
               <option value="id">Indonesia</option>
               <option value="ie">Irlanda</option>
               <option value="il">Israel</option>
               <option value="in">India</option>
               <option value="it">Italia</option>
               <option value="jp">Japón</option>
               <option value="kr">República de Corea</option>
               <option value="lt">Lituania</option>
               <option value="lv">Letonia</option>
               <option value="ma">Marruecos</option>
               <option value="mx">México</option>
               <option value="my">Malasia</option>
               <option value="ng">Nigeria</option>
               <option value="nl">Holanda</option>
               <option value="no">Noruega</option>
               <option value="nz">Nueva Zelandia</option>
               <option value="ph">Filipinas</option>
               <option value="pl">Polonia</option>
               <option value="pt">Portugal</option>
               <option value="ro">Rumania</option>
               <option value="rs">Serbia</option>
               <option value="ru">Rusia</option>
               <option value="sa">Arabia Saudita</option>
               <option value="se">Suecia</option>
               <option value="sg">Singapur</option>
               <option value="si">Eslovenia</option>
               <option value="sk">Eslovaquia</option>
               <option value="th">Tailandia</option>
               <option value="tr">Turquía</option>
               <option value="tw">Taiwán</option>
               <option value="ua">Ucrania</option>
               <option value="ve">Venezuela</option>
               <option value="za">Sudáfrica</option>
            </select>
         </div>
      </div>
   );
}
