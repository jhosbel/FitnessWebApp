/* eslint-disable @next/next/no-img-element */
"use client";
import {
  CompleteTrainingList,
  Exercise,
  ExerciseOne,
} from "@/interfaces/training.interface";
import TrainingList from "../components/ExerciseList";
import TrainingForm from "../components/TrainingForm";
import { TrainingProvider } from "@/context/TrainingContext";
import { useState } from "react";
import { useTraining } from "@/context/useTraining";
import { createTrainingList } from "@/api/training";

export default function Home() {
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
    <main className="w-4/5 absolute right-0 flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Bienvenidos a MI Fitness App</h1>
    </main>
  );
}
