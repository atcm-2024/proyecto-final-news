import React from 'react'
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="flex flex-col h-[14%] md:h-35 w-full">
        <div className="flex flex-row bg-slate-900 w-full h-12">
              <div className="grid grid-cols-3 md:flex mt-2 md:mt-1 text-[12px] md:text-sm text-slate-300 w-full h-full justify-between items-center md:items-end md:ml-28 ml-2">
                      <label className="cursor-pointer">News  APP Networks ® |</label>
                      <label className="cursor-pointer ml-3 md:ml-0"> Política de Privacidad |</label>
                      <label className="cursor-pointer">Condiciones y Usos</label>
              </div>
              <div className="flex w-0 md:w-[35%] h-full "></div>
        </div>

        <div className="flex flex-row bg-slate-900 w-full  h-8">
              <div className="flex w-full mt-3 h-full text-slate-300 md:ml-28 justify-center text-sm">
                  <h3 className="md:mr-28">Copyright © 2024 NEWS APP Network. All Rights Reserved</h3>
              </div>
        </div>
        <div className="flex flex-row h-3/4 md:w-full w-full justify-center items-center bg-slate-900">
              <div className="flex w-[50%] h-full justify-center items-center mr-5">
                  <Image src="/images/social/facebook-white.svg"
                  width={1280} height={420} className="mr-3 w-[10%] h-[28%] md:h-[35%] cursor-pointer object-contain" alt="" />
                  <Image src="/images/social/twitter-white.svg"  
                  width={1280} height={420} className="mr-3 w-[10%] h-[50%] md:h-[35%] cursor-pointer object-contain" alt="" />
                  <Image src="/images/social/instagram-white.svg"  
                  width={1280} height={420} className="mr-3 w-[10%] h-[50%] md:h-[35%] cursor-pointer object-contain" alt="" />
              </div>
              <div className="flex w-0 md:w-[50%] h-full bg-slate-900"></div>
              <div className="flex w-[70%] h-full justify-center items-center bg-slate-900">
                  <Image src="/images/apps/app-store.svg"
                    width={1280} height={420} className="md:mr-5 w-[25%] h-[40%] cursor-pointer object-contain" alt="" />
                    <Image src="/images/apps/play-store.svg"  
                    width={1280} height={420} className="ml-2 md:ml-0 w-[25%] h-[40%] cursor-pointer object-contain" alt="" />
                    <Image src="/images/apps/windows-store.svg"  
                    width={1280} height={420} className="md:mr-0 sm:mr-7 md:ml-1 w-[25%] h-[28%] md:h-[42%] cursor-pointer object-contain" alt="" />
              </div>
        </div>
  
 </footer>
  )
}
