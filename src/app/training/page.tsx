/* eslint-disable @next/next/no-img-element */

"use client";
import {
  CompleteTrainingList,
  Exercise,
  ExerciseOne,
} from "@/interfaces/training.interface";
import { TrainingProvider } from "@/context/TrainingContext";
import { useState } from "react";
import { useTraining } from "@/context/useTraining";
import { createTrainingList } from "@/api/training";
import TrainingList from "@/components/ExerciseList";
import TrainingForm from "@/components/TrainingForm";

export default function Training() {
  const { setTrainingData } = useTraining();
  const [selectedExercise, setSelectedExercise] = useState<ExerciseOne[]>([]);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [title, setTitle] = useState("");
  const [trainingList, setTrainingList] = useState<CompleteTrainingList>({
    title: "",
    exercises: [],
  });

  const handleExerciseClick = (clickedExercise: ExerciseOne) => {
    const { _id, equipment, instructions, muscle, name, image } =
      clickedExercise;
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
          reps: 0,
          weight: 0,
          weightType: "",
        },
      ],
    });
  };
  const handleCloseClick = (exerciseId: any) => {
    setSelectedExercise(
      selectedExercise.filter((exercise) => exercise._id !== exerciseId)
    );
  };

  const handleTrainingChange = (newTraining: Exercise) => {
    setExercises((prevExercises) => [...prevExercises, newTraining]);
  };

  const handleTrainingList = (e: any) => {
    e.preventDefault();
    setTrainingList({
      title: title,
      exercises: exercises,
    });
    createTrainingList({
      title: title,
      exercises: exercises,
    });
  };
  return (
    <main className="h-screen w-full sm:w-4/5 right-0 absolute sm:p-24">
      <section className="mt-20 sm:mt-0">
        <form onSubmit={handleTrainingList}>
          <input
            type="text"
            className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2 text-white"
            placeholder="Titulo del Entrenamiento"
            onChange={(e) => setTitle(e.target.value)}
          />
          <button className="bg-indigo-500 px-3 block py-2 w-full text-white hover:bg-opacity-75 transition rounded-lg disabled:bg-opacity-75 disabled:bg-green-500">
            Crear Lista
          </button>
        </form>
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
                  <span onClick={() => handleCloseClick(exercise._id)}>
                    Cerrar
                  </span>
                  <TrainingForm
                    id={exercise._id}
                    name={exercise.name}
                    muscle={exercise.muscle}
                    equipment={exercise.equipment}
                    instruction={exercise.instructions}
                    image={exercise.image}
                    onTrainingChange={handleTrainingChange}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
      <section>
        <TrainingProvider>
          <TrainingList onExerciseSelect={handleExerciseClick} />
        </TrainingProvider>
      </section>
    </main>
  );
}
