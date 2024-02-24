"use client"
import { ExerciseOne } from "@/interfaces/training.interface";
import TrainingList from "../components/ExerciseList";
import TrainingForm from "../components/TrainingForm";
import { TrainingProvider } from "@/context/TrainingContext";
import { useState } from "react";

export default function Home() {
  const [selectedExercise, setSelectedExercise] = useState<ExerciseOne[]>([]);

  const handleExerciseClick = (clickedExercise: ExerciseOne) => {
    setSelectedExercise([...selectedExercise, clickedExercise]);
  };
  console.log(selectedExercise);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Fitness App</h1>
      {selectedExercise.length > 0 && (
        <div>
          <h2>Ejercicios Seleccionados</h2>
          <div className="grid grid-cols-3">
            {selectedExercise.map((exercise) => (
              <div key={exercise._id} className="m-2">
                <p>ID: {exercise._id}</p>
                <p>Nombre: {exercise.name}</p>
                <p>Musculo: {exercise.muscle}</p>
                <p>Equipo: {exercise.equipment}</p>
                <p>Instrucciones: {exercise.instructions}</p>
                <TrainingForm />
              </div>
            ))}
          </div>
        </div>
      )}
      <TrainingProvider>
        <TrainingList onExerciseSelect={handleExerciseClick} />
      </TrainingProvider>
    </main>
  );
}
