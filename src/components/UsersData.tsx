/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import useAuthAndApi from "@/app/api/training";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import DataTable, {
  ExpanderComponentProps,
  TableColumn,
} from "react-data-table-component";
import CustomMenu from "./CustomMenu";

interface DataRow {
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  trainingList: [
    {
      _id: string;
      title: string;
      exercises: [
        {
          name: string;
          muscle: string;
          equipment: string;
          image: string;
        }
      ];
    }
  ];
  calendarData: [
    {
      _id: string;
      title: string;
      start: string;
      userEmail: string;
    }
  ];
}

const UsersData = () => {
  const { getAllUsers } = useAuthAndApi();

  const [users, setUsers] = useState([]);

  const columns: TableColumn<DataRow>[] = [
    /* {
      cell: () => <img src={} alt="imagen" />,
      width: "56px",
    }, */
    {
      name: "Nombre",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Tipo de Usuario",
      selector: (row) => row.role,
      sortable: true,
    },
    {
      name: "Fecha de creación",
      selector: (row) => format(row.createdAt, "dd/MM/yyyy HH:mm:ss"),
    },
    {
      name: "Ultima Actualización",
      selector: (row) => format(row.updatedAt, "dd/MM/yyyy HH:mm:ss"),
    },
    /* {
		cell: row => <CustomMenu size="small" row={row} />,
		allowOverflow: true,
		button: true,
		width: '56px',
	}, */
  ];

  const ExpandedComponent: React.FC<ExpanderComponentProps<DataRow>> = ({
    data,
  }) => {
    return (
      <div>
        <p>Nombre: {data.name}</p>
        <p>Correo: {data.email}</p>
        <p>Tipo de usuario: {data.role}</p>
        <p>
          Fecha de creación: {format(data.createdAt, "dd/MM/yyyy HH:mm:ss")}
        </p>
        <p>
          Ultima actualización: {format(data.updatedAt, "dd/MM/yyyy HH:mm:ss")}
        </p>
        <div className="flex justify-around">
          <div>
            <p>Listas de entrenamiento:</p>
            {data.trainingList.map((trainingItem) => (
              <div key={trainingItem._id}>
                <p>{trainingItem.title}</p>
                {trainingItem.exercises.map((exerciseItem, i) => (
                  <div key={i}>
                    <img src={exerciseItem.image} alt={exerciseItem.name} />
                    <p>{exerciseItem.name}</p>
                    <p>{exerciseItem.muscle}</p>
                    <p>{exerciseItem.equipment}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div>
            <p>Calendarios creados:</p>
            {data.calendarData.map((calendarItem) => (
              <div key={calendarItem._id}>
                <p>{calendarItem.title}</p>
                <p>{calendarItem.start}</p>
                <p>{calendarItem.userEmail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    getAllUsers()
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <div className="flex flex-col max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg justify-center p-10 flex-1">
      <h1>Datos de los Usuarios</h1>
      <DataTable
        columns={columns}
        data={users}
        expandableRows
        expandableRowsComponent={ExpandedComponent}
        selectableRows
        onSelectedRowsChange={(data) => console.log(data.selectedRows)}
        highlightOnHover
      />
    </div>
  );
};

export default UsersData;
