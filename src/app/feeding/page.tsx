/* eslint-disable @next/next/no-img-element */
"use client";
import Modal from "@/components/Modal";
import FullCalendar from "@fullcalendar/react";
import { useEffect, useState } from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import allLocales from "@fullcalendar/core/locales-all";
import { DateSelectArg } from "@fullcalendar/core";
import { getTrainingList, getTrainingListOne } from "@/api/training";

export default function Feeding() {
  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<any>();
  const [data2, setData2] = useState<any>();
  const [titleList, setTitleList] = useState<string>("");
  const [trainingLingId, setTrainingListId] = useState<string>('')
  const event = [{ title: "Lunes de piernas", start: new Date() }];

  function createEventId() {
    let eventGuid = 0;
    return String(eventGuid++);
  }

  useEffect(() => {
    getTrainingListOne(trainingLingId)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setTitleList(data.title);
      });
      getTrainingList()
      .then((res2) => res2.json())
      .then((data2) => {
        setData2(data2)
      })
  }, [trainingLingId]);

  const handleModalOpen = (clickedExercise: any) => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    
    setOpen(false);
  };

  console.log(data);
  console.log(data2);
  console.log(trainingLingId);

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    let title = titleList;
    let calendarApi = selectInfo.view.calendar;
    console.log(selectInfo);
    calendarApi.unselect(); // clear date selectio

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  };

  return (
    <div className="h-screen absolute right-0 w-4/5 bg-slate-50">
      <h1>Proximamente</h1>
      <div className="w-2/4 h-2/4">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          weekends={false}
          /* events={data && data.exercises.map((exercise: any) => ({
            id: exercise._id,
            title: exercise.name,
            start: exercise.date, // Ajusta esto según la propiedad que contiene la fecha del ejercicio
          }))} */
          eventClick={handleModalOpen}
          locales={allLocales}
          locale={"es"}
          editable={true}
          selectable={true}
          select={handleDateSelect}
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
        {data2 && (
          <div className="flex justify-around mt-20">
            {data2.map((list: any) => (
              <div key={data2._id} className="hover:bg-slate-500" onClick={() => setTrainingListId(list._id)}>
                <h1>{list.title}</h1>
                <div className="flex flex-col">
                  {list.exercises.map((e:any) => (
                    <div key={e._id} className="flex my-4">
                      <img src={e.image} alt={e.name} className="w-40"/>
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
