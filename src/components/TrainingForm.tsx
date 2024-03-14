"use client";

/* import { createTrainingRequest } from "@/app/api/training";
import { useTraining } from "@/context/useTraining"; */
import {
  CompleteTraining,
  Exercise,
  ExerciseOne,
} from "@/interfaces/training.interface";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";

interface Props {
  id: string;
  name: string;
  muscle: string;
  equipment: string;
  instruction: string;
  image: string;
  onTrainingChange: (newTraining: Exercise) => void;
}

export default function TrainingForm({
  id,
  name,
  muscle,
  equipment,
  instruction,
  image,
  onTrainingChange,
}: Props) {
  const [training, setTraning] = useState<Exercise>({
    id,
    name,
    muscle,
    equipment,
    instruction,
    image,
    series: 0,
    reps: 0,
    weightType: "Kg",
    weight: 0,
    breakTime: 0,
    breakTimeType: "Seg",
    note: "",
  });
  const [index, setIndex] = useState<number>(0);
  const [isAdding, setIsAdding] = useState<boolean>(false);

  const handleExerciseChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setTraning((prevTraining) => ({
      ...prevTraining,
      [name]: value,
    }));
  };

  const handleWeightTypeChange = (
    e: ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    setTraning((prevTraining) => ({
      ...prevTraining,
      [name]: value,
    }));
  };

  const handleBreakTimeTypeChange = (
    e: ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    setTraning((prevTraining) => ({
      ...prevTraining,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsAdding(false);
    onTrainingChange(training);
    setIsAdding(true);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="text-white">
        <input
          type="number"
          name="series"
          className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2 text-xs sm:text-base"
          placeholder="Numero de series"
          onChange={handleExerciseChange}
        />
        <div className="flex justify-between gap-2 items-center">
          <input
            type="number"
            name="weight"
            className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2 text-xs sm:text-base"
            placeholder="Peso"
            onChange={handleExerciseChange}
          />
          <select
            name="weightType"
            className="text-black w-64 sm:w-20 text-center p-2 rounded-md h-12"
            onChange={(e) => handleWeightTypeChange(e, index)}
          >
            <option value="Kg">Kg</option>
            <option value="Lbs">Lbs</option>
          </select>
        </div>
        <input
            type="number"
            name="reps"
            className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2 text-xs sm:text-base"
            placeholder="Repeticiones"
            onChange={handleExerciseChange}
          />
        <div className="flex justify-between gap-2 items-center">
          <input
            type="text"
            name="breakTime"
            className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2 text-xs sm:text-base"
            placeholder="Tiempo de descanso"
            onChange={handleExerciseChange}
          />
          <select
            name="breakTimeType"
            className="text-black w-64 sm:w-20 text-center p-2 rounded-md h-12"
            onChange={(e) => handleBreakTimeTypeChange(e, index)}
          >
            <option value="Seg">Seg</option>
            <option value="Min">Min</option>
          </select>
        </div>
        <textarea
          name="note"
          rows={3}
          className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2 text-xs sm:text-base"
          placeholder="Descripcion de la rutina"
          onChange={handleExerciseChange}
        ></textarea>
        <button
          className="bg-indigo-500 px-3 block py-2 w-full text-white hover:bg-opacity-75 transition rounded-lg disabled:bg-opacity-75 disabled:bg-green-500"
          disabled={isAdding}
        >
          {isAdding ? "Agregado" : "Agregar"}
        </button>
      </form>
    </div>
  );
}
