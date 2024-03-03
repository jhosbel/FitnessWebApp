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
import { createTrainingList, getExerciseOne } from "@/api/training";
import TrainingList from "@/components/ExerciseList";
import TrainingForm from "@/components/TrainingForm";
import Modal from "@/components/Modal";

export default function Training() {
  const { setTrainingData } = useTraining();
  const [selectedExercise, setSelectedExercise] = useState<ExerciseOne[]>([]);
  const [selectedModalExercise, setSelectedModalExercise] =
    useState<ExerciseOne>();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [title, setTitle] = useState("");
  const [trainingList, setTrainingList] = useState<CompleteTrainingList>({
    title: "",
    exercises: [],
  });
  const [open, setOpen] = useState<boolean>(false);
  const [exerInfo, setExerInfo] = useState<any>()

  const handleExerciseClick = (clickedExercise: ExerciseOne) => {
    const { _id, equipment, instructions, muscle, name, image } =
      clickedExercise;
    setSelectedExercise([...selectedExercise, clickedExercise]);
    setSelectedModalExercise(clickedExercise);
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

  const openModal = async (exerciseId: string) => {
    const res = await getExerciseOne(exerciseId)
    const data = await res.json()
    setExerInfo(data)
    setOpen(true);
  };


  return (
    <main className="h-screen w-full sm:w-4/5 right-0 absolute sm:p-24">
      <section className="mt-20 flex flex-col-reverse items-center sm:flex-col sm:mt-0">
        <form onSubmit={handleTrainingList}>
          <input
            type="text"
            className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2 text-white text-xs sm:text-base"
            placeholder="Titulo del Entrenamiento"
            onChange={(e) => setTitle(e.target.value)}
          />
          <button className="bg-indigo-500 px-3 block py-2 w-full text-white hover:bg-opacity-75 transition rounded-lg disabled:bg-opacity-75 disabled:bg-green-500">
            Crear Lista
          </button>
        </form>
        {selectedExercise.length > 0 && (
          <div className="flex flex-col">
            <h2>Ejercicios Seleccionados</h2>
            <div className="flex sm:grid grid-cols-2 overflow-x-scroll sm:overflow-x-hidden sm:grid-cols-3 max-w-[375px] sm:max-w-full">
              {selectedExercise.map((exercise) => (
                <div key={exercise._id} className="my-2 mx-12 sm:m-2 flex flex-col items-center justify-between">
                  <h1 className="text-center text-base sm:text-2xl my-2">{exercise.name}</h1>
                  <div>
                    <img src={exercise.image} alt={exercise.name} />
                    <p>Musculo: {exercise.muscle}</p>
                    <p>Equipo: {exercise.equipment}</p>
                    {/* <p>Instrucciones: {exercise.instructions}</p> */}
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2 text-xs sm:text-base"
                    onClick={() => openModal(exercise._id)}
                    >
                      Mas info
                    </button>
                    {/* <span onClick={() => handleCloseClick(exercise._id)}>
                      Cerrar
                    </span> */}
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
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <img
          src={exerInfo?.image}
          alt={exerInfo?.name}
          className="w-36 sm:w-full"
        />
        <p>{exerInfo?.name}</p>
        <p>{exerInfo?.muscle}</p>
        <p>Equipo: {exerInfo?.equipment}</p>
        <details>
          <summary>Ver Instrucciones:</summary>
          <p>Instrucciones: {exerInfo?.instructions}</p>
        </details>
      </Modal>
      <section>
        <TrainingProvider>
          <TrainingList
            onExerciseSelect={handleExerciseClick}
            openModal={() => setOpen(true)}
          />
        </TrainingProvider>
      </section>
    </main>
  );
}
