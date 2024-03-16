/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */

"use client";
import Modal from "@/components/Modal";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import useAuthAndApi from "@/app/api/training";

const CalendarData = () => {
  const { data: session } = useSession();
  const {
    getTrainingList,
    getCalendarData,
    getTrainingListOne,
    createCalendarData,
  } = useAuthAndApi();
  const [value, onChange] = useState<any>(new Date());
  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<any>();
  const [trainingList, setTrainingList] = useState<any>();
  const [calendarData, setCalendarData] = useState<any[]>([]);
  const [trainingListId, setTrainingListId] = useState<any>({
    id: "",
    title: "",
  });

  useEffect(() => {
    getTrainingList()
      .then((res) => res.json())
      .then((data) => setTrainingList(data));
    getCalendarData()
      .then((res) => res.json())
      .then((data) => setCalendarData(data));
  }, [trainingListId, trainingList]);

  const handleModalOpen = async (clickedExercise: any) => {
    let id = clickedExercise.id;
    const res = await getTrainingListOne(id);
    const data = await res.json();
    setData(data);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleDayClick = async (value: any) => {
    const fechaFormateada = format(value, "yyyy,MM,dd");
    if (!trainingListId || trainingListId.id === "") return;

    const confirmCreateEvent = window.confirm("¿Deseas crear el evento?");
    if (!confirmCreateEvent) return; // Si el usuario cancela, no se crea el evento

    await createCalendarData({
      id: trainingListId.id,
      start: fechaFormateada,
      title: trainingListId.title,
      userEmail: session?.user.email || "",
      userId: session?.user?.id || "",
    });

    setTrainingListId({ id: "", title: "" });

    const updatedCalendarData = await getCalendarData().then((res) =>
      res.json()
    );
    setCalendarData(updatedCalendarData);

    await getTrainingList()
      .then((res) => res.json())
      .then((data) => setTrainingList(data));
  };

  // Función para renderizar los eventos en el calendario
  const tileContent = ({ date, view }: any) => {
    if (view === "month" && calendarData) {
      const event = calendarData.find((event: any) => {
        const eventStartDate = new Date(format(event.start, "yyyy,MM,dd"));
        return eventStartDate.toDateString() === date.toDateString();
      });
      return event ? (
        <p
          className="p-1 hover:border  hover:bg-sky-500/40 transition rounded-xl"
          onClick={() => handleModalOpen(event)}
        >
          {event.title}
        </p>
      ) : null;
    }
  };

  return (
    <div className="relative right-0 w-full">
      <div className="w-full flex justify-center items-center">
        <Calendar
          onChange={onChange}
          value={value}
          onClickDay={handleDayClick}
          tileContent={tileContent}
          locale="es"
        />
        <Modal isOpen={open} onClose={handleCloseModal}>
          {data && (
            <div key={data._id} className="bg-slate-200 flex w-full h-full">
              {data.exercises?.map((exercise: any) => (
                <div key={exercise._id}>
                  <img src={exercise.image} alt={exercise.name} />
                  <p>{exercise.name}</p>
                  <p>{exercise.muscle}</p>
                  <p>{exercise.equipment}</p>
                  <p>{exercise.instructions}</p>
                  <p>Series: {exercise.series}</p>
                  <div className="flex">
                    <p>Peso: {exercise.weight}</p>
                    <p>{exercise.weightType}</p>
                  </div>
                  <p>Repeticiones: {exercise.reps}</p>
                </div>
              ))}
            </div>
          )}
        </Modal>
      </div>
      <div>
        {trainingList && (
          <div className="flex flex-col justify-around mt-20">
            {Array.isArray(trainingList) &&
              trainingList.map((list: any) => (
                <div
                  key={list._id}
                  className="hover:bg-slate-500"
                  onClick={() =>
                    setTrainingListId({ id: list._id, title: list.title })
                  }
                >
                  <h1>{list.title}</h1>
                  <div className="flex flex-row">
                    {list.exercises.map((e: any) => (
                      <div key={e._id} className="flex my-4">
                        <img
                          src={e.image}
                          alt={e.name}
                          className="w-24 rounded-full"
                        />
                        <div>
                          <p>{e.name}</p>
                          <p>{e.muscle}</p>
                          <p>{e.equipment}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarData;
