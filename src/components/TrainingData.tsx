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
import TrainingList from "@/components/ExerciseList";
import TrainingForm from "@/components/TrainingForm";
import Modal from "@/components/Modal";
/* import useAuthAndApi from "../api/training"; */
import { useSession } from "next-auth/react";
import CalendarData from "@/components/CalendarData";
import useAuthAndApi from "@/app/api/training";
import { useRouter } from "next/navigation";

export default function Training() {
  const { data: session } = useSession();
  const { createTrainingList, getExerciseOne } = useAuthAndApi();
  const { setTrainingData } = useTraining();
  const [selectedExercise, setSelectedExercise] = useState<ExerciseOne[]>([]);
  const [selectedModalExercise, setSelectedModalExercise] =
    useState<ExerciseOne>();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [title, setTitle] = useState("");
  const [trainingList, setTrainingList] = useState<CompleteTrainingList>({
    title: "",
    exercises: [],
    userEmail: "",
    userId: "",
  });
  const [open, setOpen] = useState<boolean>(false);
  const [exerInfo, setExerInfo] = useState<any>();
  const [isAdding, setIsAdding] = useState<boolean>(false);

  const router = useRouter();

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
    setIsAdding(false);
    setTrainingList({
      title: title,
      exercises: exercises,
      userEmail: session?.user?.email || "",
      userId: session?.user?.id || "",
    });
    createTrainingList({
      title: title,
      exercises: exercises,
      userEmail: session?.user?.email || "",
      userId: session?.user?.id || "",
    });
    setIsAdding(true);
    setSelectedExercise([]);
    router.push("/training");
  };

  const openModal = async (exerciseId: string) => {
    const res = await getExerciseOne(exerciseId);
    const data = await res.json();
    setExerInfo(data);
    setOpen(true);
  };

  const splitInstructions = exerInfo?.instructions?.split("\n");

  return (
    <main>
      <section className="mt-20 flex flex-col-reverse items-center sm:flex-col sm:mt-0">
        <form onSubmit={handleTrainingList}>
          <input
            type="text"
            className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2 text-white text-xs sm:text-base"
            placeholder="Titulo del Entrenamiento"
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            className="bg-slate-700 hover:bg-slate-800 px-3 block py-2 w-full text-white transition rounded-lg disabled:bg-opacity-75 disabled:bg-green-500"
            disabled={isAdding}
          >
            {isAdding ? "Lista Creada" : "Crear Lista"}
          </button>
        </form>
        {selectedExercise.length > 0 && (
          <div className="flex flex-col">
            <h2 className="text-center">Ejercicios Seleccionados</h2>
            <div className="flex sm:grid grid-cols-2 overflow-x-scroll sm:overflow-x-hidden sm:grid-cols-3 max-w-[375px] sm:max-w-full">
              {selectedExercise.map((exercise) => (
                <div
                  key={exercise._id}
                  className="my-2 mx-12 sm:m-2 flex flex-col items-center justify-between"
                >
                  <h1 className="text-center text-base sm:text-2xl my-2">
                    {exercise.name}
                  </h1>
                  <div className="flex flex-col items-center">
                    <img src={exercise.image} alt={exercise.name} />
                    <p>Musculo: {exercise.muscle}</p>
                    <p>Equipo: {exercise.equipment}</p>
                    {/* <p>Instrucciones: {exercise.instructions}</p> */}
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2 text-xs sm:text-base"
                      onClick={() => openModal(exercise._id)}
                    >
                      Mas info
                    </button>
                    <TrainingForm
                      id={exercise._id}
                      name={exercise.name}
                      muscle={exercise.muscle}
                      equipment={exercise.equipment}
                      instruction={exercise.instructions}
                      image={exercise.image}
                      onTrainingChange={handleTrainingChange}
                    />
                    <span
                      onClick={() => handleCloseClick(exercise._id)}
                      className="bg-red-600 px-3 block py-2 w-full text-white hover:bg-opacity-75 transition rounded-lg mt-2 text-center cursor-pointer"
                    >
                      Quitar
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <div>
          <img
            src={exerInfo?.image}
            alt={exerInfo?.name}
            className="sm:w-36 w-full"
          />
          <p>{exerInfo?.name}</p>
          <br />
          <p>Musculo: {exerInfo?.muscle}</p>
          <br />
          <p>Equipo: {exerInfo?.equipment}</p>
          <br />
          <p>Instrucciones:</p>
          <br />
          <div className="max-h-40 max-w-[22rem] w-full overflow-auto">
            <ul>
              {splitInstructions.map((i: any, index: any) => (
                  <li key={index}>
                    {i} <br />
                  </li>
                ))}
            </ul>
          </div>
        </div>
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
