'use client'
import NavBar from "@/app/components/NavBar"
import Principal from "@/app/princial/page"
import Footer from "@/app/components/Footer"
import useData from "@/app/customhooks/useData"
import { useState } from "react"

/* 6d186839ad29470b8d03d552e54bfb0b */
/* 0784d12507a8483e8fb5ab2ffeba9932 */

export default function Home() {

  const [open, setOpen] = useState(false);
  const [selectCateg, setSelectCateg] = useState("categoria");
  const [selectFuente, setSelectFuente] = useState('fuentes');
  const [inputBuscar, setinputBuscar] = useState('');
    /* ------------- URL * ------------------------------ */
  let url = 'https://newsapi.org/v2/'
  const key='&apiKey=0784d12507a8483e8fb5ab2ffeba9932'
  /* ------------------------------------------------------------- */
  //top-headliness
  function busqueda(categoria, fuentes, buscar) {
    setSelectCateg(categoria);
    setSelectFuente(fuentes);
    setinputBuscar(buscar);
  }

  function toggleModal() {
    setOpen(prevState => !prevState);
  }

  if (inputBuscar.trim()!=="" && selectCateg === "categoria" && selectFuente === "fuentes")
    { const urlInput = "everything?q=" + inputBuscar.toLowerCase() + "&sortBy=popularity"
      url = url + urlInput
    }
  /* ------------------------------------------------------------------------------------ */
  if (inputBuscar.trim()!=="" && selectCateg !== "categoria" && selectFuente === "fuentes")
    { const urlInput = "everything?q=" + inputBuscar.toLowerCase() + "&category=" + selectCateg 
      url = url + urlInput
    }
  /* --------------------------------------------------------------------------- */
  if (inputBuscar.trim()!=="" && selectFuente !== "fuentes" && selectCateg === "categoria")
    { const urlInput = "everything?q=" + inputBuscar.toLowerCase() + "&country=" + selectFuente
      url = url + urlInput
    }
  /* --------------------------------------------------------------------------- */
  if (inputBuscar.trim()!=="" && selectFuente !== "fuentes" && selectCateg !== "categoria")
    { const urlInput = "everything?q=" + inputBuscar.toLowerCase() + "&country=" + selectFuente +  "&category=" + selectCateg
      url = url + urlInput
    }
  /* -------------------------------------------------------------------------------------- */
  if ((selectCateg !== "categoria" || selectFuente !== "fuentes") && inputBuscar==="" ) {
    const Urltop = "top-headlines/sources?" 
      url = url+Urltop} 
    /* ----------------------------------------------------------- */
  if (selectCateg !== "categoria" && selectFuente === "fuentes" && inputBuscar==="") {
      const UrlCatego = "category=" +selectCateg
      url=url+UrlCatego} 
    /* ------------------------------------------------------------- */
  if (selectFuente !== "fuentes" && selectCateg === "categoria" && inputBuscar==="") 
     {const urlFuentes = "country=" + selectFuente
      url=url+urlFuentes
     }
  /* ------------------------------------------------------------------------- */
  if (selectCateg !== "categoria" && selectFuente !== "fuentes" && inputBuscar==="") {
    const Urlidiofuente = "category="+selectCateg + "&country="+ selectFuente 
    url=url+Urlidiofuente} 
  /* -------------------------------------------------------------------------- */ 
  if (selectCateg === "categoria" && selectFuente === "fuentes" && inputBuscar==="") {
      url=url+"top-headlines?country=us"
    }

    url=url+key

    console.log(url)

  const { data } = useData(url);

  
    /*console.log(data) -------------- aqui si me muestra el val0r*/
   /* console.log(url)*/
  return (


    <div className="h-screen w-full">
      <NavBar
        busqueda={busqueda} />
       <Principal 
        openModal={toggleModal}
         data={data}/>
      <Footer />
    </div>

  )
}
