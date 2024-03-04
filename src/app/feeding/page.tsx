"use client";
import Modal from "@/components/Modal";
import FullCalendar from "@fullcalendar/react";
import { useState } from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import allLocales from "@fullcalendar/core/locales-all";
import { DateSelectArg } from "@fullcalendar/core";

export default function Feeding() {
  const [open, setOpen] = useState<boolean>(false);
  const event = [{ title: "Lunes de piernas", start: new Date() }];

  function createEventId() {
    let eventGuid = 0
    return String(eventGuid++)
  }

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    let title = 'Jhosbel'
    let calendarApi = selectInfo.view.calendar
    console.log(selectInfo)
    calendarApi.unselect() // clear date selectio

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      })
    }
  }

  return (
    <div className="h-screen absolute right-0 w-4/5 bg-slate-50">
      <h1>Proximamente</h1>
      <div className="w-2/4 h-2/4">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          weekends={false}
          events={event}
          locales={allLocales}
          locale={"es"}
          editable={true}
          selectable={true}
          select={handleDateSelect}
        />
      </div>
    </div>
  );
}
