'use client'
import { useEffect, useState } from "react"
import { fetchData } from "@/utils/fetchData"

export default function useDataClima(url) {
    const [dataClima, setDataClima] = useState({})

    useEffect(()=>{
        fetchData(url)
            .then((rs)=>setDataClima(rs))
            .catch((error)=>console.log(error))
    },[url])
    return {dataClima}
}


