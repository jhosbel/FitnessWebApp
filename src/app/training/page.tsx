"use client";
/* eslint-disable @next/next/no-img-element */

import { useSession } from "next-auth/react";
import CalendarData from "@/components/CalendarData";
import Link from "next/link";
import PlusIcon from "@/components/icons/PlusIcon";

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
      <main className="h-auto w-full sm:w-4/5 right-0 absolute sm:p-12 flex flex-col bg-slate-200">
        <Link
          href={"/training/createdlist"}
          className={`
          text-slate-800 
          bg-[#F7BE38] 
          hover:bg-[#F7BE38]/90 
          focus:ring-4 
          focus:outline-none 
          focus:ring-[#F7BE38]/50 
          rounded-lg
          text-xs 
          md:text-sm 
          px-5 
          py-2.5 
          text-center 
          inline-flex 
          items-center 
          dark:focus:ring-[#F7BE38]/50  
          self-end 
          font-bold 
          gap-2
          relative
          top-[4.5rem]
          md:top-0
          right-[6.5rem]
          md:right-20
          `}
        >
          <PlusIcon />
          Crear nueva lista
        </Link>
        <section className="mt-20 flex flex-col-reverse items-center sm:flex-col sm:mt-8">
          <CalendarData />
        </section>
      </main>
    );
  } else {
    return <div>No estas autenticado</div>;
  }
}
