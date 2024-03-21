/* eslint-disable @next/next/no-img-element */
"use client";

export default function Home() {
  return (
    <main className="w-full md:w-4/5 absolute right-0 flex min-h-screen flex-col items-center justify-between bg-slate-200 text-slate-700">
      <section className="flex flex-col md:flex-row mt-20">
        <div className="flex-1 px-4 md:px-8 flex flex-col gap-4">
          <h2 className="text-base md:text-7xl font-bold">
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
      <section className="flex flex-col gap-20 mt-20">
        <div className="text-center px-4 md:px-32 flex flex-col gap-4">
          <h2 className="font-bold text-base md:text-5xl">
            Planifica tus entrenamientos de manera organizada con C-Fitness
          </h2>
          <p>Accede a calendarios personalizados y listas de ejercicios para alcanzar tus metas de fitness.</p>
        </div>
        <div className="flex flex-col md:flex-row items-center">
          <div className="flex-1">
            <img
              src="https://images.unsplash.com/photo-1517963879433-6ad2b056d712?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzMzczODV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MTA5MDA3NTd8&ixlib=rb-4.0.3&q=80&w=1080"
              alt="imagen-barra"
              className="md:rounded-r-2xl"
            />
          </div>
          <div className="flex-1 px-4 md:px-16 gap-4 flex flex-col">
            <h3 className="font-bold text-center text-3xl">Calendarios personalizados</h3>
            <p>
              Con C-Fitness, puedes acceder a calendarios personalizados que
              se adaptan a tus necesidades y metas de fitness. Ya no tendrás que
              preocuparte por planificar tus entrenamientos, nuestro producto lo
              hace por ti.
            </p>
          </div>
        </div>
        <div className="flex flex-col-reverse md:flex-row items-center">
          <div className="flex-1 px-4 md:px-16 gap-4 flex flex-col">
            <h3 className="font-bold text-center text-3xl">Listas de ejercicios</h3>
            <p>
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
        <div className="flex flex-col md:flex-row items-center">
          <div className="flex-1">
            <img
              src="https://images.unsplash.com/photo-1571008887538-b36bb32f4571?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzMzczODV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MTA5MDA3NTd8&ixlib=rb-4.0.3&q=80&w=1080"
              alt="carrera"
              className="md:rounded-r-2xl"
            />
          </div>
          <div className="flex-1 px-4 md:px-16 gap-4 flex flex-col">
            <h3 className="font-bold text-center text-3xl">Organización y seguimiento</h3>
            <p>
              C-Fitness te permite organizar tus entrenamientos de manera
              eficiente y realizar un seguimiento de tu progreso. Podrás ver tus
              avances y ajustar tu plan según sea necesario para alcanzar tus
              metas de fitness.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
