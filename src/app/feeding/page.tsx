/* eslint-disable @next/next/no-img-element */
"use client";
import Modal from "@/components/Modal";
import FullCalendar from "@fullcalendar/react";
import { useEffect, useState } from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import allLocales from "@fullcalendar/core/locales-all";
import { DateSelectArg, EventInput } from "@fullcalendar/core";
import {
  createCalendarData,
  getCalendarData,
  getTrainingList,
  getTrainingListOne,
} from "@/api/training";

export default function Feeding() {
  /* const {calendarData} = useTraining() */
  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<any>();
  const [traininigList, setTrainingList] = useState<any>();
  const [calendarData, setCalendarData] = useState<any>();
  const [titleList, setTitleList] = useState<string>("");
  const [trainingListId, setTrainingListId] = useState<any>({
    id: "",
    title: "",
  });

  function createEventId() {
    let eventGuid = 0;
    return String(eventGuid++);
  }

  useEffect(() => {
    /* getTrainingListOne(trainingListId)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setTitleList(data.title);
      }); */
    getTrainingList()
      .then((res) => res.json())
      .then((data) => setTrainingList(data));
    getCalendarData()
      .then((res) => res.json())
      .then((data) => setCalendarData(data));
  }, [trainingListId]);

  const handleModalOpen = async (clickedExercise: any) => {
    let id = clickedExercise.event.id;
    const res = await getTrainingListOne(id);
    const data = await res.json();
    setData(data);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  /* const fecha = new Date().toISOString().replace(/T.*$/, "");
  console.log(fecha);
  console.log(data);
  console.log(titleList);
  console.log(traininigList);
  console.log(trainingListId);
  console.log(calendarData); */

  const handleDateSelect = async (selectInfo: DateSelectArg) => {
    const { startStr } = selectInfo;
    let calendarApi = selectInfo.view.calendar;
    if (!trainingListId) return;
    if (trainingListId.id === "") {
      return alert("ID no proporcionado");
    }
    await createCalendarData({
      id: trainingListId.id,
      start: startStr,
      title: trainingListId.title,
    });
    if (trainingListId) {
      /* const newCalendaData = {...calendarData, event}
      setCalendarData(newCalendaData) */
      calendarApi.addEvent({
        id: trainingListId.id,
        title: trainingListId.title,
        start: selectInfo.startStr,
      });
    }
    // let title = titleList;
    // let calendarApi = selectInfo.view.calendar;
    // console.log(selectInfo);
    // const data2 = {
    //   id: trainingLingId,
    //   title: data.title,
    //   start: selectInfo.startStr
    // }
    // /* createCalendarData(data2) */
    // calendarApi.unselect(); // clear date selectio

    // if (title) {
    //   calendarApi.addEvent({
    //     id: trainingLingId,
    //     title: data.title,
    //     start: selectInfo.startStr,
    //     /* end: selectInfo.endStr,
    //     allDay: selectInfo.allDay, */
    //   });
    // }
  };

  return (
    <div className="h-screen absolute right-0 w-4/5 bg-slate-50">
      <h1>Proximamente</h1>
      <div className="w-2/4 h-2/4">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          weekends={false}
          eventClick={handleModalOpen}
          locales={allLocales}
          locale={"es"}
          editable={true}
          selectable={true}
          select={handleDateSelect}
          events={calendarData}
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
        {traininigList && (
          <div className="flex justify-around mt-20">
            {traininigList.map((list: any) => (
              <div
                key={traininigList._id}
                className="hover:bg-slate-500"
                onClick={() =>
                  setTrainingListId({ id: list._id, title: list.title })
                }
              >
                <h1>{list.title}</h1>
                <div className="flex flex-col">
                  {list.exercises.map((e: any) => (
                    <div key={e._id} className="flex my-4">
                      <img src={e.image} alt={e.name} className="w-40" />
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
}
