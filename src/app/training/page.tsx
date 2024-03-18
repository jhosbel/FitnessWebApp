"use client"
/* eslint-disable @next/next/no-img-element */

import { useState } from "react";
import { useSession } from "next-auth/react";
import CalendarData from "@/components/CalendarData";
import TrainingData from "@/components/TrainingData";
import Link from "next/link";

export default function Training() {
  const { data: session, status } = useSession();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const openCalendarData = () => {
    setIsVisible(!isVisible);
  };

  if (status === "loading") {
    return (
      <div className="h-screen w-full sm:w-4/5 right-0 absolute sm:p-24">
        <p>Cargando...</p>
      </div>
    )
  }

  if (session && session.user && session.user.email) {
    return (
      <main className="h-screen w-full sm:w-4/5 right-0 absolute sm:p-24">
        <section className="mt-20 flex flex-col-reverse items-center sm:flex-col sm:mt-0">
          <CalendarData />
        </section>
        <p onClick={openCalendarData}>Crear lista de Entrenamiento</p>
        {isVisible && <TrainingData />}
        <Link href={'/training/createdlist'}>Cambiar pagina</Link>
      </main>
    );
  } else {
    return <div>No estas autenticado</div>
  }

}
