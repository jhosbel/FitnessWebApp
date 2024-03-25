/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import useAuthAndApi from "@/app/api/training";
import { useTraining } from "@/context/useTraining";
import {
  CreateExerciseOne,
  ExerciseOne,
} from "@/interfaces/training.interface";
import { useSession } from "next-auth/react";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

const CreatedExercise = () => {
  const { exercise } = useTraining();
  const { data: session, status } = useSession();
  const { getExerciseByMuscle, createExercise, getExercisesRequest } =
    useAuthAndApi();
  const [open, setOpen] = useState<boolean>(false);
  const [newExercise, setNewExercise] = useState<CreateExerciseOne>({
    image: "",
    name: "",
    muscle: "",
    equipment: "",
    instructions: "",
  });
  const [selectedMuscle, setSelectedMuscle] = useState("");
  const [filteredExercises, setFilteredExercises] = useState<ExerciseOne[]>([]);

  useEffect(() => {
    if (selectedMuscle) {
      getExerciseByMuscle(selectedMuscle)
        .then((res) => res.json())
        .then((data) => {
          setFilteredExercises(data);
        })
        .catch((error) => {
          console.error("Error al obtener ejercicios por músculo:", error);
        });
    } else {
      getExercisesRequest()
        .then((res) => res.json())
        .then((data) => {
          setFilteredExercises(data);
        });
    }
  }, [selectedMuscle, exercise, status]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewExercise((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createExercise(newExercise);
    console.log(newExercise);
  };

  const handleMuscleType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMuscle(e.target.value);
  };

  return (
    <section className="flex flex-col bg-slate-200">
      <h1>Dashboard</h1>
      <select name="musculos" onChange={handleMuscleType}>
        <option value="" className="text-xs">
          Todos
        </option>
        <option value="Pecho" className="text-xs">
          Pecho
        </option>
        <option value="Biceps" className="text-xs">
          Biceps
        </option>
        <option value="Espalda" className="text-xs">
          Espalda
        </option>
        <option value="Cuadriceps" className="text-xs">
          Cuadriceps
        </option>
      </select>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Images"
          name="image"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Nombre"
          name="name"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Musculo"
          name="muscle"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Equipo"
          name="equipment"
          onChange={handleChange}
        />
        <textarea
          cols={30}
          rows={10}
          placeholder="Instrucciones"
          name="instructions"
          onChange={handleChange}
        ></textarea>
        <button>Enviar</button>
      </form>
      <div>
        {Array.isArray(filteredExercises) &&
          filteredExercises.map((exe) => (
            <div key={exe._id}>
              <img src={exe.image} alt={exe.name} />
              <p>{exe.name}</p>
              <p>{exe.muscle}</p>
              <p>{exe.equipment}</p>
              <p>{exe.instructions}</p>
            </div>
          ))}
      </div>
    </section>
  );
};

export default CreatedExercise;
