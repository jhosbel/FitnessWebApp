/* eslint-disable @next/next/no-img-element */
"use client";

import Footer from "@/components/Footer";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <main className="w-full md:w-4/5 absolute right-0 flex min-h-screen flex-col items-center justify-between bg-slate-200 text-slate-700">
      <section className="flex flex-col md:flex-row mt-20">
        <div className="flex-1 px-4 md:px-8 flex flex-col gap-4">
          <h2 className="text-3xl md:text-7xl font-bold">
            Planifica tus entrenamientos de manera organizada con C-Fitness
          </h2>
          <p>
            Accede a calendarios personalizados y listas de ejercicios para
            alcanzar tus metas de fitness.
          </p>
        </div>
        <div className="flex-1 mt-6 flex items-end">
          <img
            src="https://images.unsplash.com/photo-1554344728-7560c38c1720?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzMzczODV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MTA5MDA3NTd8&ixlib=rb-4.0.3&q=80&w=1080"
            alt="training-man"
            className="md:rounded-l-2xl"
          />
        </div>
      </section>
      <section className="flex flex-col gap-12 mt-8 md:mt-20">
        <div className="text-center px-4 md:px-32 flex flex-col gap-4">
          <h2 className="font-bold text-base md:text-5xl">
            Planifica tus entrenamientos de manera organizada con C-Fitness
          </h2>
          <p>
            Planifica tu entrenamiento de forma personal, crea tus listas de
            entrenamiento a través de nuestros ejercicios para alcanzar tus
            metas de fitness.
          </p>
        </div>
        <div className="flex flex-col gap-4 md:gap-0 md:flex-row items-center">
          <div className="flex-1">
            <img
              src="https://images.unsplash.com/photo-1517963879433-6ad2b056d712?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzMzczODV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MTA5MDA3NTd8&ixlib=rb-4.0.3&q=80&w=1080"
              alt="imagen-barra"
              className="md:rounded-r-2xl"
            />
          </div>
          <div className="flex-1 px-4 md:px-8 gap-4 flex flex-col">
            <h3 className="font-bold text-center text-lg md:text-3xl">
              Calendarios personalizados
            </h3>
            <p className="text-sm md:text-base">
              Con C-Fitness, puedes acceder a nuestras herramientas para
              personalizar tu entrenamiento de manera que se adaptan a tus
              necesidades y metas de fitness. Ya no tendrás que preocuparte por
              buscar una manera de planificar tus entrenamientos, nuestro
              producto lo hace por ti.
            </p>
          </div>
        </div>
        <div className="flex flex-col-reverse gap-4 md:gap-0 md:flex-row items-center">
          <div className="flex-1 px-4 md:px-8 gap-4 flex flex-col">
            <h3 className="font-bold text-center text-lg md:text-3xl">
              Listas de ejercicios
            </h3>
            <p className="text-sm md:text-base">
              Nuestro producto también te proporciona listas de ejercicios
              detalladas para cada entrenamiento. Esto te ayudará a seguir un
              plan de ejercicios efectivo y maximizar tus resultados.
            </p>
          </div>
          <div className="flex-1">
            <img
              src="https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzMzczODV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MTA5MDA3NTd8&ixlib=rb-4.0.3&q=80&w=1080"
              alt="carrera_jpg"
              className="md:rounded-l-2xl"
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 md:gap-0 md:flex-row items-center">
          <div className="flex-1">
            <img
              src="https://images.unsplash.com/photo-1571008887538-b36bb32f4571?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzMzczODV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MTA5MDA3NTd8&ixlib=rb-4.0.3&q=80&w=1080"
              alt="carrera"
              className="md:rounded-r-2xl"
            />
          </div>
          <div className="flex-1 px-4 md:px-8 gap-4 flex flex-col">
            <h3 className="font-bold text-center text-lg md:text-3xl">
              Organización y seguimiento
            </h3>
            <p className="text-sm md:text-base">
              C-Fitness te permite organizar tus entrenamientos de manera
              eficiente y realizar un seguimiento de tu progreso. Podrás ver tus
              avances y ajustar tu plan según sea necesario para alcanzar tus
              metas de fitness.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4 md:gap-0 md:flex-row items-center p-4 md:p-12">
          <div className="flex-1 p-4 md:px-16 gap-4 flex flex-col md:p-28 rounded-2xl border border-slate-800 items-center justify-center">
            <h3 className="font-bold text-center text-lg md:text-6xl">
              Únete a nuestra comunidad de fitness.
            </h3>
            <p className="text-sm md:text-lg mt-8 text-center">
              <span className="italic">
                “Unirme a CalendarioFit fue la mejor decisión que tomé. No solo
                me ha ayudado a planificar mis entrenamientos, sino que también
                me ha permitido alcanzar mis metas de fitness de manera más
                efectiva.”
              </span>
              - Graham Robinson
            </p>
            {!session ? (
              <Link
                href={"/register"}
                className={`
            text-white
            bg-slate-700 
            hover:bg-slate-800/90 
            focus:ring-4 
            focus:outline-none 
            focus:ring-slate-800/50 
            rounded-lg
            text-base 
            md:text-4xl 
            px-5 md:px-10
            py-4 md:py-9 
            text-center 
            inline-flex 
            items-center 
            dark:focus:ring-slate-800/50  
            font-bold 
            gap-2
            transition-all duration-300 ease-in-out
            mt-8
            `}
              >
                Únete Ya!
              </Link>
            ) : (
              <Link
                href={"/training/createdlist"}
                className={`
            text-white
            bg-slate-700 
            hover:bg-slate-700/90 
            focus:ring-4 
            focus:outline-none 
            focus:ring-slate-800/50 
            rounded-lg
            text-base 
            md:text-4xl 
            px-5 md:px-10
            py-4 md:py-9 
            text-center 
            inline-flex 
            items-center 
            dark:focus:ring-slate-800/50  
            font-bold 
            gap-2
            transition-all duration-300 ease-in-out
            mt-8
            `}
              >
                Crea Tu lista de entrenamiento Ya!
              </Link>
            )}
          </div>
        </div>
      </section>
      <Footer className="md:hidden p-2 text-[0.5rem] mt-4" />
    </main>
  );
}
