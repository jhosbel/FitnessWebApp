/* eslint-disable @next/next/no-img-element */
"use client";
import { ExerciseOne, Training } from "@/interfaces/training.interface";
import TrainingList from "../components/ExerciseList";
import TrainingForm from "../components/TrainingForm";
import { TrainingProvider } from "@/context/TrainingContext";
import { FormEvent, useState } from "react";
import { useTraining } from "@/context/useTraining";
import { createTrainingRequest } from "@/api/training";

export default function Home() {
  const { trainingData, setTrainingData } = useTraining();
  const [selectedExercise, setSelectedExercise] = useState<ExerciseOne[]>([]);
  console.log(selectedExercise);

  const handleExerciseClick = (clickedExercise: ExerciseOne) => {
    const { _id, equipment, instructions, muscle, name, image } = clickedExercise;
    setSelectedExercise([...selectedExercise, clickedExercise]);
    setTrainingData({
      exercises: [
        {
          id: _id,
          name: name,
          muscle: muscle,
          equipment: equipment,
          instruction: instructions,
          image: image,
          breakTime: 0,
          breakTimeType: "",
          note: "",
          series: 0,
          weight: 0,
          weightType: "",
        },
      ],
    });
  };
  const handleCloseClick = (exerciseId: any) => {
    setSelectedExercise(selectedExercise.filter(exercise => exercise._id !== exerciseId));
  };
  console.log(trainingData);
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
                <h1 className="text-center text-2xl my-2">{exercise.name}</h1>
                <img src={exercise.image} alt={exercise.name} />
                <p>Musculo: {exercise.muscle}</p>
                <p>Equipo: {exercise.equipment}</p>
                <p>Instrucciones: {exercise.instructions}</p>
                <span onClick={() => handleCloseClick(exercise._id)}>Cerrar</span>
                <TrainingForm
                  id={exercise._id}
                  name={exercise.name}
                  muscle={exercise.muscle}
                  equipment={exercise.equipment}
                  instruction={exercise.instructions}
                  image={exercise.image}
                />
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
