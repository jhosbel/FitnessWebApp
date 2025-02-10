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
import Modal from "./Modal";
import Update from "./icons/Update";
import Delete from "./icons/Delete";
import Swal from "sweetalert2";

const imagePlaceholder =
  "https://media.istockphoto.com/id/1147544807/es/vector/no-imagen-en-miniatura-gr%C3%A1fico-vectorial.jpg?s=612x612&w=0&k=20&c=Bb7KlSXJXh3oSDlyFjIaCiB9llfXsgS7mHFZs6qUgVk=";

interface DataRow {
  _id: string;
  image: string;
  name: string;
  muscle: string;
  equipment: string;
  instructions: string;
}

const CreatedExercise = () => {
  const { exercise } = useTraining();
  const { data: session, status } = useSession();
  const {
    getExerciseByMuscle,
    createExercise,
    getExercisesRequest,
    deleteExercise,
    updateExercise,
    getExerciseOne,
  } = useAuthAndApi();
  const [newExercise, setNewExercise] = useState<CreateExerciseOne>({
    image: "",
    name: "",
    muscle: "",
    equipment: "",
    instructions: "",
  });
  const [updateOneExercise, setUpdateOneExercise] = useState({
    image: "",
    name: "",
    muscle: "",
    equipment: "",
    instructions: "",
  });
  const [selectedMuscle, setSelectedMuscle] = useState("");
  const [filteredExercises, setFilteredExercises] = useState<ExerciseOne[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [exerciseId, setExerciseId] = useState("");

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
  }, [selectedMuscle, exercise, status, newExercise]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewExercise((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUpdateOneExercise((prev) => ({ ...prev, [name]: value }));
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
    setFilteredExercises((prevExercises: any) => [
      ...prevExercises,
      newExercise,
    ]);
  };

  const onSubmitUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const getExercise = await getExerciseOne(exerciseId);
    const res = await getExercise.json();
    console.log(res.name);
    try {
      const updateFinal = { ...updateOneExercise };
      if (!updateFinal.image && res.image) {
        updateFinal.image = res.image;
      }
      if (!updateFinal.name && res.name) {
        updateFinal.name = res.name;
      }
      if (!updateFinal.muscle && res.muscle) {
        updateFinal.muscle = res.muscle;
      }
      if (!updateFinal.equipment && res.equipment) {
        updateFinal.equipment = res.equipment;
      }
      if (!updateFinal.instructions && res.instructions) {
        updateFinal.instructions = res.instructions;
      }
      updateExercise(exerciseId, updateFinal);
      setFilteredExercises((prevExercises: any) => [
        ...prevExercises,
        newExercise,
      ]);
      setOpen(false);
    } catch (error) {
      console.error("nada de nada", error);
    }
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
    {
      cell: (row) => (
        <div className="flex gap-[5px]">
          <span onClick={() => exerciseId !== "" && openModal()}>
            <Update className="text-yellow-500 cursor-pointer" />
          </span>
          <span onClick={() => exerciseId !== "" && deleteOneExercise()}>
            <Delete className="text-red-600 cursor-pointer" />
          </span>
        </div>
      ),

      allowOverflow: true,
      button: true,
      width: "56px",
    },
  ];

  const openModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const deleteOneExercise = async () => {
    const confirmDelete = await Swal.fire({
      title: "Estas seguro!?",
      text: "No podras revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, deseo borrarlo!",
    });
    if (confirmDelete.isConfirmed) {
      deleteExercise(exerciseId)
        .then(() => {
          setFilteredExercises((prevExercises) =>
            prevExercises.filter((exercise) => exercise._id !== exerciseId)
          );
          Swal.fire({
            title: "Borrado!",
            text: "Ejercicio borrado",
            icon: "success",
          });
        })
        .catch((error) => {
          console.error("Error al borrar el ejercicio:", error);
        });
    }
  };

  const ExpandedComponent: React.FC<ExpanderComponentProps<DataRow>> = ({
    data,
  }) => {
    const splitInstructions = data?.instructions?.split("\n");
    return (
      <div className="flex">
        <div>
          <img src={data.image} alt={data.name} />
        </div>
        <div className="max-w-[20rem] max-h-[20rem] overflow-auto">
          <p>{data.name}</p>
          <br />
          <p>{data.muscle}</p>
          <br />
          <p>{data.equipment}</p>
          <br />
          <ul>
            {data.instructions &&
              splitInstructions.map((i, index) => (
                <li key={index}>
                  {i} <br />
                </li>
              ))}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <section
      className={`flex flex-col max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg justify-center p-10 flex-1`}
    >
      <div className="flex flex-col md:flex-row">
        <div className="flex flex-col items-center justify-center gap-8 flex-1">
          <img
            src={
              newExercise.image === "" ? imagePlaceholder : newExercise.image
            }
            alt="exercise avatar"
            className="h-48 w-48 rounded-md"
          />
          <form onSubmit={onSubmit} className="max-w-md mx-auto">
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                placeholder=" "
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                name="image"
                onChange={handleChange}
                value={newExercise.image}
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
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                name="name"
                onChange={handleChange}
                value={newExercise.name}
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
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                name="muscle"
                onChange={handleChange}
                value={newExercise.muscle}
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
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                name="equipment"
                onChange={handleChange}
                value={newExercise.equipment}
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
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                name="instructions"
                onChange={handleChange}
                value={newExercise.instructions}
              />
              <label
                htmlFor="instructions"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Instrucciones
              </label>
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
          <h1 className="text-2xl my-4 md:mt-0 text-center">Lista de ejercicios</h1>
          <div className="flex flex-col gap-4">
            <div>
              <span>Filtrar por musculo: </span>
              <select name="musculos" onChange={handleMuscleType}>
                <option value="" className="text-xs">
                  Todos
                </option>
                <option value="Trapecio" className="text-xs">
                  Trapecio
                </option>
                <option value="Espalda" className="text-xs">
                  Espalda
                </option>
                <option value="Pecho" className="text-xs">
                  Pecho
                </option>
                <option value="Hombro" className="text-xs">
                  Hombro
                </option>
                <option value="Triceps" className="text-xs">
                  Triceps
                </option>
                <option value="Biceps" className="text-xs">
                  Biceps
                </option>
                <option value="Abdomen" className="text-xs">
                  Abdomen
                </option>
                <option value="Cuadriceps" className="text-xs">
                  Cuadriceps
                </option>
                <option value="Isquiotibiales" className="text-xs">
                  Isquiotibiales
                </option>
              </select>
            </div>
          </div>
          <DataTable
            columns={columns}
            data={filteredExercises}
            expandableRows
            expandableRowsComponent={ExpandedComponent}
            selectableRows
            onSelectedRowsChange={(data) => {
              if (data.selectedRows.length > 0) {
                setExerciseId(data.selectedRows[0]._id);
              } else {
                setExerciseId("");
              }
            }}
            /* onRowClicked={(data) => console.log(data)} */
            clearSelectedRows={exerciseId === ''}
            selectableRowsSingle
            highlightOnHover
            pagination
            paginationPerPage={10}
            responsive
          />
        </div>
      </div>
      <Modal isOpen={open} onClose={handleCloseModal}>
        <div className="flex flex-col items-center gap-4">
          <img
            src={
              newExercise.image === "" ? imagePlaceholder : newExercise.image
            }
            alt="exercise avatar"
            className="h-48 w-48 rounded-md"
          />
          <form onSubmit={onSubmitUpdate} className="max-w-md mx-auto">
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                placeholder=" "
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                name="image"
                onChange={handleUpdateChange}
                value={updateOneExercise.image}
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
                onChange={handleUpdateChange}
                value={updateOneExercise.name}
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
                onChange={handleUpdateChange}
                value={updateOneExercise.muscle}
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
                onChange={handleUpdateChange}
                value={updateOneExercise.equipment}
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
                onChange={handleUpdateChange}
                value={updateOneExercise.instructions}
              />
              <label
                htmlFor="instructions"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Instrucciones
              </label>
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
              Actualizar ejercicio
            </button>
          </form>
        </div>
      </Modal>
    </section>
  );
};

export default CreatedExercise;
