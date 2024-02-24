"use client";

import { useTraining } from "@/context/useTraining";
import { ExerciseOne } from "@/interfaces/training.interface";
import { useState } from "react";

interface TrainingListProps {
  onExerciseSelect: (exercise: ExerciseOne) => void;
}

export default function TrainingList({ onExerciseSelect }: TrainingListProps) {
  const { exercise } = useTraining();
  
  const handleExerciseClick = (clickedExercise: ExerciseOne) => {
    onExerciseSelect(clickedExercise);
  };

  return (
    <div>
      <h1>Lista de Entrenamieto</h1>
      <div className="grid grid-cols-3">
        {exercise.map((exercise) => (
          <div
            key={exercise._id}
            className="p-4 m-4 border-solid border-gray-900 border rounded-lg hover:bg-gray-800 hover:cursor-pointer hover:text-white transition"
            onClick={() => handleExerciseClick(exercise)}
          >
            <p>{exercise._id}</p>
            <p>Nombre: {exercise.name}</p>
            <p>Musculo: {exercise.muscle}</p>
            <p>Equipo: {exercise.equipment}</p>
            <p>Instrucciones: {exercise.instructions}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
