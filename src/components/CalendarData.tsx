"use client";
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */

import Modal from "@/components/Modal";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import useAuthAndApi from "@/app/api/training";
import CheckIcon from "./icons/CheckIcon";
import Swal from "sweetalert2";

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
  const [selectedList, setSelectedList] = useState(null);

  //console.log("Training: ", trainingList);
  //console.log("CalendarData: ", calendarData);
  //console.log("Training List: ", trainingListId);

  useEffect(() => {
    getTrainingList()
      .then((res) => res.json())
      .then((data) => setTrainingList(data));
    getCalendarData()
      .then((res) => res.json())
      .then((data) => setCalendarData(data));
  }, []);

  const handleModalOpen = async (clickedExercise: any) => {
    let id = clickedExercise.trainingListId;
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

    const confirmCreateEvent = await Swal.fire({
      title: "Estás seguro?",
      text: "No podrás revertir esto.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, deseo crearla",
      cancelButtonText: "Cancelar",
    });
    if (!confirmCreateEvent.isConfirmed) {
      // Si el usuario cancela, no se crea el evento
      setTrainingListId({ id: "", title: "" });
      setSelectedList(null);
      return;
    }

    const newEvent = {
      start: fechaFormateada,
      title: trainingListId.title,
      userEmail: session?.user.email || "",
      userId: session?.user?.id || "",
      trainingListId: trainingListId.id,
    };

    try {
      await createCalendarData(newEvent);
      await getCalendarData().then((res) =>
        res.json()
      );
      setCalendarData((prevData) => [...prevData, newEvent]);

      await getTrainingList()
        .then((res) => res.json())
        .then((data) => setTrainingList(data));
    } catch (error) {
      console.error("Error al crear el evento: ", error);
    }

    setTrainingListId({ id: "", title: "" });
    setSelectedList(null);
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

  const handleListClick = async (listId: any) => {
    if (listId === selectedList) {
      setSelectedList(null);
    } else {
      setSelectedList(listId);
    }
  };

  return (
    <div className="relative right-0 w-full mt-10">
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
            <div
              key={data.id}
              className="bg-slate-200 flex flex-col w-full h-full gap-4"
            >
              {data.exercises?.map((exercise: any, index: any) => (
                <div key={index} className="flex gap-2 md:gap-8 text-slate-600">
                  <img
                    src={exercise.image}
                    alt={exercise.name}
                    className="h-16 md:h-auto md:w-36 rounded-sm"
                  />
                  <div>
                    <p className="text-[0.5rem] md:text-base">
                      {exercise.name}
                    </p>
                    <div>
                      <p className="text-[0.5rem] md:text-base">
                        {exercise.muscle}
                      </p>
                      <p className="text-[0.5rem] md:text-base">
                        {exercise.equipment}
                      </p>
                      <p className="text-[0.5rem] md:text-base">
                        {exercise.instructions}
                      </p>
                      <p className="text-[0.5rem] md:text-base">
                        Series: {exercise.series}
                      </p>
                      <div className="flex gap-1">
                        <p className="text-[0.5rem] md:text-base">
                          Peso: {exercise.weight}
                        </p>
                        <p className="text-[0.5rem] md:text-base">
                          {exercise.weightType}
                        </p>
                      </div>
                      <p className="text-[0.5rem] md:text-base">
                        Repeticiones: {exercise.reps}
                      </p>
                    </div>
                  </div>
                  <div className="max-h-16 md:max-h-40 max-w-28 md:max-w-60 overflow-auto">
                    <p className="text-[0.5rem] md:text-base">
                      {exercise.note}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Modal>
      </div>
      <div className="mt-8">
        <h1 className="text-2xl text-slate-700 focus:outline-none rounded-lg px-5 py-2.5 text-center inline-flex items-center mb-2 self-end font-bold">
          Lista de entrenamiento
        </h1>
        {trainingList && (
          <div className="flex flex-col justify-around my-8 gap-6">
            {Array.isArray(trainingList) &&
              trainingList.map((list: any, i: any) => {
                return (
                  <div key={i}>
                    <div
                      className={`hover:bg-[#bfbfbf60] border-2 border-[#334155] rounded-2xl px-4 cursor-pointer list-select ${
                        list.id === selectedList ? "selected" : ""
                      }`}
                      onClick={() => {
                        setTrainingListId({ id: list.id, title: list.title });
                        handleListClick(list.id);
                      }}
                    >
                      <div
                        className={`h-[8.5rem] md:h-40 w-full backdrop-blur-sm bg-[#39ff396b] absolute rounded-2xl hidden gap-4 justify-center left-0 items-center cursor-pointer list-select ${
                          list.id === selectedList ? "selected" : ""
                        }`}
                        onClick={() => {
                          setTrainingListId({});
                          setSelectedList(null);
                        }}
                      >
                        <div className="flex gap-0 md:gap-4 justify-center items-center h-full">
                          <CheckIcon className="h-12 w-8 md:w-12 text-[#185918]" />
                          <span
                            className="text-base md:text-4xl font-bold text-[#185918]"
                            onClick={() => {
                              setTrainingListId({});
                              setSelectedList(null);
                            }}
                          >
                            Seleccionado
                          </span>
                        </div>
                      </div>
                      <h1 className="text-center text-[#334155] font-bold text-xl">{list.title}</h1>
                      <div className="flex flex-row mt-2">
                        {list.exercises.map((e: any, index: any) => (
                          <div
                            key={index}
                            className="flex flex-col md:flex-row my-4 items-center md:items-stretch text-center md:text-start px-1 "
                          >
                            <img
                              src={e.image}
                              alt={e.name}
                              className="w-12 md:w-24 h-12 md:h-24 rounded-full"
                            />
                            <p className="md:hidden text-[0.5rem]">{e.name}</p>
                            <div className="hidden md:block">
                              <p className="text-[#334155] font-bold">{e.name}</p>
                              <p className="text-[#334155]">{e.muscle}</p>
                              <p className="text-[#334155]">{e.equipment}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarData;
