"use client";

import { createTrainingRequest } from "@/api/training";
import { useTraining } from "@/context/useTraining";
import { ChangeEvent, FormEvent, useState } from "react";

interface Exercise {
  id: string;
  name: string;
  muscle: string;
  equipment: string;
  instructions: string;
}

interface Training {
  id: string;
  title: string;
  series: number;
  weight: number;
  weightType: string;
  breakTime: string;
  note: string;
}

export default function TrainingForm() {
  const { exercise } = useTraining();
  console.log(exercise);

  const [training, setTraning] = useState({
    title: "",
    exercises: [
      {
        id: "65d639026e0b13c60dda0c3e",
        name: "Press Banca",
        muscle: "Pecho",
        equipment: "Mancuernas",
        series: 0,
        weightType: "kg",
        weight: 0,
        breakTime: 0,
        note: "",
      },
    ],
  });

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTraning((prevTraining) => ({
      ...prevTraining,
      title: e.target.value,
    }));
  };

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(training);
    const res = await createTrainingRequest(training);
    const data = await res.json();
    console.log(data);
  };

  return (
    <div>
      <div>
        <h1>Lista de Ejercicios</h1>
      </div>
      <form onSubmit={handleSubmit} className="text-white">
        <input
          type="text"
          name="title"
          className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2"
          placeholder="Escribe el titulo"
          onChange={handleTitleChange}
        />
        <input
          type="number"
          name="series"
          className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2"
          placeholder="Numero de series"
          onChange={handleExerciseChange}
        />
        <input
          type="number"
          name="weight"
          className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2"
          placeholder="Peso"
          onChange={handleExerciseChange}
        />
        <select
          name="weightType"
          className="text-black"
          onChange={handleExerciseChange}
        >
          <option value="kg">Kg</option>
          <option value="lbs">Lbs</option>
        </select>
        <input
          type="text"
          name="breakTime"
          className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2"
          placeholder="Tiempo de descanso"
          onChange={handleExerciseChange}
        />
        <textarea
          name="note"
          rows={3}
          className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2"
          placeholder="Descripcion de la rutina"
          onChange={handleExerciseChange}
        ></textarea>
        <button className="bg-indigo-500 px-3 block py-2 w-full text-white hover:bg-opacity-80 transition rounded-lg">
          Guardar
        </button>
      </form>
    </div>
  );
}
