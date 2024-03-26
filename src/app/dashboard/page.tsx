/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import CreatedExercise from "@/components/CreatedExercise";
import UsersData from "@/components/UsersData";
import { useSession } from "next-auth/react";

const Dashboard = () => {
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
        <h1 className="text-2xl text-slate-700 focus:outline-none rounded-lg px-5 py-2.5 text-center inline-flex items-center self-center font-bold sm:mt-10">
          Crear nuevo ejercicio
        </h1>
        <CreatedExercise />
        <h1 className="text-2xl text-slate-700 focus:outline-none rounded-lg px-5 py-2.5 text-center inline-flex items-center mb-2 self-center font-bold">
          Datos de usuario
        </h1>
        <UsersData />
      </main>
    );
  } else {
    return <div>No estas autenticado</div>;
  }
};

export default Dashboard;
