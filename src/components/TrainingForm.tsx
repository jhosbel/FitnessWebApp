"use client";

import { createTrainingRequest } from "@/api/training";
import { useTraining } from "@/context/useTraining";
import { CompleteTraining, Exercise, ExerciseOne } from "@/interfaces/training.interface";
import { ChangeEvent, FormEvent, useState } from "react";

interface Props {
  id: string;
  name: string;
  muscle: string;
  equipment: string;
  instruction: string;
  image: string;
}

export default function TrainingForm({
  id,
  name,
  muscle,
  equipment,
  instruction,
  image,
}: Props) {
  const [training, setTraning] = useState<CompleteTraining>({
    exercises: [
      {
        id,
        name,
        muscle,
        equipment,
        instruction,
        image,
        series: 0,
        weightType: "Kg",
        weight: 0,
        breakTime: 0,
        breakTimeType: "Seg",
        note: "",
      },
    ],
  });
  const { setExerciseList, exerciseList } = useTraining();

  const [index, setIndex] = useState<number>(0);
  /* const [exerciseList, setExerciseList] = useState<ExerciseOne[]>([]); */

  const handleExerciseChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const index = parseInt(e.target.dataset.index || "0");
    setTraning((prevTraining) => ({
      ...prevTraining,
      exercises: prevTraining.exercises.map((exercise, i) =>
        i === index ? { ...exercise, [name]: value } : exercise
      ),
    }));
  };

  const handleWeightTypeChange = (
    e: ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    setTraning((prevTraining) => ({
      ...prevTraining,
      exercises: prevTraining.exercises.map((exercise, i) =>
        i === index ? { ...exercise, [name]: value } : exercise
      ),
    }));
  };

  const handleBreakTimeTypeChange = (
    e: ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    setTraning((prevTraining) => ({
      ...prevTraining,
      exercises: prevTraining.exercises.map((exercise, i) =>
        i === index ? { ...exercise, [name]: value } : exercise
      ),
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(training);
    const res = await createTrainingRequest(training);
    const data = await res.json();
    console.log(data);
    setExerciseList((prevExerciseList) => {
      console.log(prevExerciseList)
      const updatedList = [...prevExerciseList, ...data.exercises];
      return updatedList;
    });
  };

  console.log(exerciseList)

  return (
    <div>
      <form onSubmit={handleSubmit} className="text-white">
        <input
          type="number"
          name="series"
          className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2"
          placeholder="Numero de series"
          onChange={handleExerciseChange}
        />
        <div className="flex justify-between gap-2 items-center">
          <input
            type="number"
            name="weight"
            className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2"
            placeholder="Peso"
            onChange={handleExerciseChange}
          />
          <select
            name="weightType"
            className="text-black w-20 p-2 rounded-md h-12"
            onChange={(e) => handleWeightTypeChange(e, index)}
          >
            <option value="Kg">Kg</option>
            <option value="Lbs">Lbs</option>
          </select>
        </div>
        <div className="flex justify-between gap-2 items-center">
          <input
            type="text"
            name="breakTime"
            className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2"
            placeholder="Tiempo de descanso"
            onChange={handleExerciseChange}
          />
          <select
            name="breakTimeType"
            className="text-black w-20 p-2 rounded-md h-12"
            onChange={(e) => handleBreakTimeTypeChange(e, index)}
          >
            <option value="Seg">Seg</option>
            <option value="Min">Min</option>
          </select>
        </div>
        <textarea
          name="note"
          rows={3}
          className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2"
          placeholder="Descripcion de la rutina"
          onChange={handleExerciseChange}
        ></textarea>
        <button className="bg-indigo-500 px-3 block py-2 w-full text-white hover:bg-opacity-80 transition rounded-lg">
          Añadir
        </button>
      </form>
    </div>
  );
}
