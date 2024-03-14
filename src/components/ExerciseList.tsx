/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import { useTraining } from "@/context/useTraining";
import { ExerciseOne } from "@/interfaces/training.interface";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import useAuthAndApi from "@/app/api/training";

interface TrainingListProps {
  onExerciseSelect: (exercise: ExerciseOne) => void;
  openModal: () => void;
}

export default function TrainingList({
  onExerciseSelect,
  openModal,
}: TrainingListProps) {
  const {getExerciseByMuscle} = useAuthAndApi()
  const { exercise } = useTraining();
  const [selectedMuscle, setSelectedMuscle] = useState("");
  const [filteredExercises, setFilteredExercises] = useState<ExerciseOne[]>([]);
  const [selectedExercise, setSelectedExercise] = useState<any>();
  const [open, setOpen] = useState<boolean>(false);

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
  }, [selectedMuscle, exercise]);

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

  return (
    <article>
      <div className="flex flex-col items-center">
        <h1>Lista de Entrenamieto</h1>
        <select name="musculos" onChange={handleMuscleType}>
          <option value="">Todos</option>
          <option value="Pecho">Pecho</option>
          <option value="Biceps">Biceps</option>
          <option value="Espalda">Espalda</option>
          <option value="Cuadriceps">Cuadriceps</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {Array.isArray(filteredExercises) && filteredExercises.map((exercise) => (
          <div
            key={exercise._id}
            className="m-4 border-solid border-gray-900 border rounded-lg hover:bg-gray-800 hover:cursor-pointer hover:text-white transition flex sm:flex-col"
            onClick={() => handleExerciseClick(exercise)}
          >
            <img
              src={exercise.image}
              alt={exercise.name}
              className="sm:rounded-t-lg w-20 sm:w-full aspect-square"
            />
            <div className="w-full flex flex-col items-center px-2 pb-2 h-full justify-around">
              <h1 className="text-center text-base sm:text-lg my-2">
                {exercise.name}
              </h1>
              <p className="text-sm">{exercise.muscle}</p>
              <p className="text-sm">{exercise.equipment}</p>
              <div className="w-full flex justify-around sm:flex-col">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white text-xs font-bold py-2 px-4 rounded  sm:mb-2"
                  onClick={() => handleModalOpen(exercise)}
                >
                  Mas Info
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white text-xs font-bold py-2 px-4 rounded"
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
          <div>
            <img src={selectedExercise.image} alt={selectedExercise.name} />
            <p>{selectedExercise.name}</p>
            <p>{selectedExercise.muscle}</p>
            <p>{selectedExercise.equipment}</p>
            <p>{selectedExercise.instructions}</p>
          </div>
        )}
      </Modal>
    </article>
  );
}
