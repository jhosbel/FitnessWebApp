/* eslint-disable @next/next/no-img-element */
"use client";

import { getExerciseByMuscle } from "@/api/training";
import { useTraining } from "@/context/useTraining";
import { ExerciseOne } from "@/interfaces/training.interface";
import { useEffect, useState } from "react";

interface TrainingListProps {
  onExerciseSelect: (exercise: ExerciseOne) => void;
}

export default function TrainingList({ onExerciseSelect }: TrainingListProps) {
  const { exercise } = useTraining();
  const [selectedMuscle, setSelectedMuscle] = useState("");
  const [filteredExercises, setFilteredExercises] = useState<ExerciseOne[]>([]);

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

  const handleExerciseClick = (clickedExercise: ExerciseOne) => {
    onExerciseSelect(clickedExercise);
  };

  const handleMuscleType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMuscle(e.target.value);
  };

  return (
    <div>
      <h1>Lista de Entrenamieto</h1>
      <select name="musculos" onChange={handleMuscleType}>
        <option value="">Todos</option>
        <option value="Pecho">Pecho</option>
        <option value="Biceps">Biceps</option>
        <option value="Espalda">Espalda</option>
        <option value="Cuadriceps">Cuadriceps</option>
      </select>
      <div className="grid grid-cols-3">
        {filteredExercises.map((exercise) => (
          <div
            key={exercise._id}
            className="p-4 m-4 border-solid border-gray-900 border rounded-lg hover:bg-gray-800 hover:cursor-pointer hover:text-white transition"
            onClick={() => handleExerciseClick(exercise)}
          >
            <h1 className="text-center text-2xl my-2">{exercise.name}</h1>
            <img src={exercise.image} alt={exercise.name} />
            <p>Musculo: {exercise.muscle}</p>
            <p>Equipo: {exercise.equipment}</p>
            <p>Instrucciones: {exercise.instructions}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
