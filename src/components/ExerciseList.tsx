/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import { useTraining } from "@/context/useTraining";
import { ExerciseOne } from "@/interfaces/training.interface";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import useAuthAndApi from "@/app/api/training";
import Footer from "./Footer";
import { useSession } from "next-auth/react";
import Muscle from "./icons/Muscle";
import BarbellIcon from "./icons/Barbell";
import Clipboard from "./icons/Clipboard";

interface TrainingListProps {
  onExerciseSelect: (exercise: ExerciseOne) => void;
  openModal: () => void;
}

export default function TrainingList({
  onExerciseSelect,
  openModal,
}: TrainingListProps) {
  const { data: session, status } = useSession();
  const { getExerciseByMuscle } = useAuthAndApi();
  const { exercise } = useTraining();
  const [selectedMuscle, setSelectedMuscle] = useState("");
  const [filteredExercises, setFilteredExercises] = useState<ExerciseOne[]>([]);
  const [selectedExercise, setSelectedExercise] = useState<any>();
  const [open, setOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [exercisesPerPage, setExercisesPerPage] = useState(10);

  useEffect(() => {
    if (selectedMuscle) {
      // Realizar la solicitud a la API para obtener ejercicios por el tipo de músculo seleccionado
      getExerciseByMuscle(selectedMuscle)
        .then((res) => res.json())
        .then((data) => {
          setFilteredExercises(data);
        })
        .catch((error) => {
          console.error("Error al obtener ejercicios por músculo:", error);
        });
    } else {
      // Si no se ha seleccionado un músculo, mostrar todos los ejercicios
      setFilteredExercises(exercise);
    }
  }, [selectedMuscle, exercise, session]);

  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises =
    session && Array.isArray(filteredExercises)
      ? filteredExercises.slice(indexOfFirstExercise, indexOfLastExercise)
      : [];

  const handleExerciseClick = (clickedExercise: ExerciseOne) => {};

  const handleModalOpen = (clickedExercise: ExerciseOne) => {
    setSelectedExercise(clickedExercise);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleMuscleType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMuscle(e.target.value);
  };
  const splitInstructions = selectedExercise?.instructions?.split("\n");

  return (
    <article>
      <div className="flex flex-col items-center">
        <h1 className="font-bold text-2xl my-4">Lista de Ejercicios</h1>
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
      <div className="flex gap-4 justify-center my-4">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-slate-700 hover:bg-slate-800 text-white text-xs font-bold py-2 px-4 rounded disabled:opacity-30"
        >
          Anterior
        </button>
        <select
          name="exercisesPerPage"
          onChange={(e) => setExercisesPerPage(Number(e.target.value))}
          value={exercisesPerPage}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="30">30</option>
        </select>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          className="bg-slate-700 hover:bg-slate-800 text-white text-xs font-bold py-2 px-4 rounded"
        >
          Siguiente
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {Array.isArray(currentExercises) &&
          currentExercises.map((exercise) => (
            <div
              key={exercise._id}
              className="m-4 border-solid border-gray-900 border md:rounded-lg hover:cursor-pointer transition flex sm:flex-col"
              onClick={() => handleExerciseClick(exercise)}
            >
              <img
                src={exercise.image}
                alt={exercise.name}
                className="sm:rounded-t-lg w-20 sm:w-full aspect-square"
              />
              <div className="w-full flex flex-col items-center px-2 pb-2 h-full justify-around gap-2">
                <h1 className="text-center text-xs sm:text-sm my-2 font-semibold">
                  {exercise.name}
                </h1>
                <div className="flex flex-col items-center">
                  <Muscle />
                  <p className="text-sm">Musculo: {exercise.muscle}</p>
                </div>
                <div className="flex flex-col items-center">
                  <BarbellIcon />
                  <p className="text-sm">Equipo: {exercise.equipment}</p>
                </div>
                <div className="w-full flex justify-around sm:flex-col">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white text-xs font-bold py-2 px-4 rounded  sm:mb-2"
                    onClick={() => handleModalOpen(exercise)}
                  >
                    Mas Info
                  </button>
                  <button
                    className="bg-slate-700 hover:bg-slate-800 text-white text-xs font-bold py-2 px-4 rounded"
                    onClick={() => onExerciseSelect(exercise)}
                  >
                    Agregar
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
      <Modal isOpen={open} onClose={handleCloseModal}>
        {selectedExercise && (
          <div className="flex gap-4">
            <div>
              <img
                src={selectedExercise.image}
                alt={selectedExercise.name}
                className="sm:w-[300px] w-full"
              />
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="font-semibold">{selectedExercise.name}</h3>
              <div className="flex gap-2">
                <Muscle />
                <p>Musculo: {selectedExercise.muscle}</p>
              </div>
              <div className="flex gap-2">
                <BarbellIcon />
                <p>{selectedExercise.equipment}</p>
              </div>
              <div className="flex gap-2">
                <Clipboard />
                <p>Instrucciones:</p>
              </div>
              <div className="max-h-40 max-w-[26rem] w-full overflow-auto">
                <ul>
                  {selectedExercise.instructions &&
                    splitInstructions.map((i: any, index: any) => (
                      <li key={index}>
                        {i} <br />
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </Modal>
      <Footer className="md:hidden p-2 text-[0.5rem] mt-4" />
    </article>
  );
}
