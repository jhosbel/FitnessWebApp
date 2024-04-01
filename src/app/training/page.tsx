"use client";
/* eslint-disable @next/next/no-img-element */

import { useSession } from "next-auth/react";
import CalendarData from "@/components/CalendarData";
import Link from "next/link";
import PlusIcon from "@/components/icons/PlusIcon";
import Footer from "@/components/Footer";

export default function Training() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="h-screen w-full sm:w-4/5 right-0 absolute sm:p-12">
        <p>Cargando...</p>
      </div>
    );
  }

  if (session && session.user && session.user.email) {
    return (
      <main className="h-auto w-full sm:w-4/5 right-0 absolute flex flex-col bg-slate-200">
        <section className="flex flex-col max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg justify-center p-10 flex-1">
          <Link
            href={"/training/createdlist"}
            className={`
          text-white
          bg-slate-700 
          hover:bg-slate-800/90 
          focus:ring-4 
          focus:outline-none 
          focus:ring-slate-800/50 
          rounded-lg
          text-xs 
          md:text-sm 
          px-5 
          py-2.5 
          text-center 
          inline-flex 
          items-center 
          dark:focus:ring-slate-800/50  
          self-end 
          font-bold 
          gap-2
          relative
          top-[1.5rem]
          md:top-0
          right-[6.5rem]
          md:right-20
          transition-all duration-300 ease-in-out
          `}
          >
            <PlusIcon />
            Crear nueva lista
          </Link>
          <CalendarData />
        </section>
        <Footer className="md:hidden p-2 text-[0.5rem] mt-4" />
      </main>
    );
  } else {
    return <div>No estas autenticado</div>;
  }
}
