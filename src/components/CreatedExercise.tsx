/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import useAuthAndApi from "@/app/api/training";
import { useTraining } from "@/context/useTraining";
import {
  CreateExerciseOne,
  ExerciseOne,
} from "@/interfaces/training.interface";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import DataTable, {
  ExpanderComponentProps,
  TableColumn,
} from "react-data-table-component";
const imagePlaceholder = 'https://media.istockphoto.com/id/1147544807/es/vector/no-imagen-en-miniatura-gr%C3%A1fico-vectorial.jpg?s=612x612&w=0&k=20&c=Bb7KlSXJXh3oSDlyFjIaCiB9llfXsgS7mHFZs6qUgVk='

interface DataRow {
  image: string;
  name: string;
  muscle: string;
  equipment: string;
  instructions: string;
}

const CreatedExercise = () => {
  const { exercise } = useTraining();
  const { data: session, status } = useSession();
  const { getExerciseByMuscle, createExercise, getExercisesRequest } =
    useAuthAndApi();
  const [open, setOpen] = useState<boolean>(false);
  const [newExercise, setNewExercise] = useState<CreateExerciseOne>({
    image: "",
    name: "",
    muscle: "",
    equipment: "",
    instructions: "",
  });
  const [selectedMuscle, setSelectedMuscle] = useState("");
  const [filteredExercises, setFilteredExercises] = useState<ExerciseOne[]>([]);

  useEffect(() => {
    if (selectedMuscle) {
      getExerciseByMuscle(selectedMuscle)
        .then((res) => res.json())
        .then((data) => {
          setFilteredExercises(data);
        })
        .catch((error) => {
          console.error("Error al obtener ejercicios por músculo:", error);
        });
    } else {
      getExercisesRequest()
        .then((res) => res.json())
        .then((data) => {
          setFilteredExercises(data);
        });
    }
  }, [selectedMuscle, exercise, status]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewExercise((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createExercise(newExercise);
    setNewExercise({
      image: "",
      name: "",
      muscle: "",
      equipment: "",
      instructions: "",
    });
    console.log(newExercise);
  };

  const handleMuscleType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMuscle(e.target.value);
  };

  const columns: TableColumn<DataRow>[] = [
    {
      name: "Nombre",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Musculo",
      selector: (row) => row.muscle,
      sortable: true,
    },
    {
      name: "Equipo",
      selector: (row) => row.equipment,
      sortable: true,
    },
  ];

  const ExpandedComponent: React.FC<ExpanderComponentProps<DataRow>> = ({
    data,
  }) => {
    return (
      <div className="flex">
        <div>
          <img src={data.image} alt={data.name} />
        </div>
        <div>
          <p>{data.name}</p>
          <p>{data.muscle}</p>
          <p>{data.equipment}</p>
          <p>{data.instructions}</p>
        </div>
      </div>
    );
  };

  return (
    <section
      className={`flex flex-col max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg justify-center p-10 flex-1`}
    >
      <h1>Crear un nuevo ejercicio</h1>
      <div className="flex">
        <div className="flex flex-col items-center justify-center gap-8 flex-1">
          <img src={newExercise.image === '' ? imagePlaceholder : newExercise.image } alt="algo" className="h-48 w-48 rounded-md" />
          <form onSubmit={onSubmit} className="max-w-md mx-auto">
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                placeholder=" "
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                name="image"
                onChange={handleChange}
              />
              <label
                htmlFor="image"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                URL Imagen
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                placeholder=" "
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                name="name"
                onChange={handleChange}
              />
              <label
                htmlFor="name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Nombre
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                placeholder=" "
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                name="muscle"
                onChange={handleChange}
              />
              <label
                htmlFor="muscle"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Musculo
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                placeholder=" "
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                name="equipment"
                onChange={handleChange}
              />
              <label
                htmlFor="equipment"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Equipo
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <textarea
                cols={30}
                rows={10}
                placeholder=" "
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                name="instructions"
                onChange={handleChange}
              />
              <label htmlFor="instructions" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" >Instrucciones</label>
            </div>
            <button
              className={`
                bg-slate-700 hover:bg-slate-800 
                px-3 py-2 
                block w-full 
                text-white 
                transition rounded-lg disabled:bg-opacity-75 disabled:bg-green-500 
                      `}
            >
              Crear Ejercicio
            </button>
          </form>
        </div>
        <div className="flex-1">
          <select name="musculos" onChange={handleMuscleType}>
            <option value="" className="text-xs">
              Todos
            </option>
            <option value="Pecho" className="text-xs">
              Pecho
            </option>
            <option value="Biceps" className="text-xs">
              Biceps
            </option>
            <option value="Espalda" className="text-xs">
              Espalda
            </option>
            <option value="Cuadriceps" className="text-xs">
              Cuadriceps
            </option>
          </select>
          {/* {Array.isArray(filteredExercises) &&
          filteredExercises.map((exe) => (
            <div key={exe._id}>
              <img src={exe.image} alt={exe.name} />
              <p>{exe.name}</p>
              <p>{exe.muscle}</p>
              <p>{exe.equipment}</p>
              <p>{exe.instructions}</p>
            </div>
          ))} */}
          <DataTable
            columns={columns}
            data={filteredExercises}
            expandableRows
            expandableRowsComponent={ExpandedComponent}
            selectableRows
            onSelectedRowsChange={(data) => console.log(data.selectedRows)}
            highlightOnHover
          />
        </div>
      </div>
    </section>
  );
};

export default CreatedExercise;
