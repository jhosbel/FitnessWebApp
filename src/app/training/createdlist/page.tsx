"use client";

import TrainingData from "@/components/TrainingData";
import { useSession } from "next-auth/react";
import Link from "next/link";

const Createdlist = () => {
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
      <div className="h-auto w-full sm:w-4/5 right-0 absolute sm:p-12 flex flex-col bg-slate-200">
        <Link
          href={"/training"}
          className={`text-white 
                      bg-slate-700
                      hover:bg-slate-800/90 
                      focus:ring-4 
                      focus:outline-none 
                      focus:ring-slate-800/50 
                      rounded-lg 
                      text-sm 
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
                      top-[5rem]
                      right-[9rem]
                      md:top-0
                      md:right-0
                      transition-all duration-300 ease-in-out
                      `}
        >
          Volver
        </Link>
        <TrainingData />
      </div>
    );
  } else {
    return <div>No estas autenticado</div>;
  }
};

export default Createdlist;
