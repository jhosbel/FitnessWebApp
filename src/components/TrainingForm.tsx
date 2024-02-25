"use client";

import { createTrainingRequest } from "@/api/training";
import { useTraining } from "@/context/useTraining";
import { CompleteTraining } from "@/interfaces/training.interface";
import { ChangeEvent, FormEvent, useState } from "react";

export default function TrainingForm() {
  const { exercise } = useTraining();

  const [training, setTraning] = useState<CompleteTraining>({
    exercises: [
      {
        id: "65d639026e0b13c60dda0c3e",
        name: "Press Banca",
        muscle: "Pecho",
        equipment: "Mancuernas",
        series: 0,
        weightType: "Kg",
        weight: 0,
        breakTime: 0,
        breakTimeType: "Seg",
        note: "",
      },
    ],
  });

  const [index, setIndex] = useState<number>(0);

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
  };

  return (
    <div>
      <div>
        <h1>Lista de Ejercicios</h1>
      </div>
      <form onSubmit={handleSubmit} className="text-white">
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
          onChange={(e) => handleWeightTypeChange(e, index)}
        >
          <option value="Kg">Kg</option>
          <option value="Lbs">Lbs</option>
        </select>
        <input
          type="text"
          name="breakTime"
          className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2"
          placeholder="Tiempo de descanso"
          onChange={handleExerciseChange}
        />
        <select
          name="breakTimeType"
          className="text-black"
          onChange={(e) => handleBreakTimeTypeChange(e, index)}
        >
          <option value="Seg">Seg</option>
          <option value="Min">Min</option>
        </select>
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
