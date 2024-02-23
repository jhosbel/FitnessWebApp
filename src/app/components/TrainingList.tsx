"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";

interface Exercise {
    id: string;
    series: number;
    weight: number;
    weightType: string;
    breakTime: number;
    description: string;
}

export default function TrainingList() {
  const [exercise, setExercise] = useState<Exercise[]>([]);

  const request = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/training');
        const exercises: Exercise[] = response.data[0].exercises;
        setExercise(exercises);
    } catch (error) {
        console.error('Error al hacer la solicitud:', error);
    }
}

  useEffect(() => {
    request();
  }, []);

  return (
    <div>
      <h1>Lista de Entrenamieto</h1>
      <div>{exercise.map((exercise, i) => (
        <div key={i} className="p-4 m-4 border-solid border-gray-800 border rounded-lg">
            <p>ID: {exercise.id}</p>
            <p>Series: {exercise.series}</p>
            <p>Peso: {exercise.weight} {exercise.weightType}</p>
            <p>Tiempo de descanso: {exercise.breakTime}</p>
            <p>Descripción: {exercise.description}</p>
        </div>
      ))}</div>
    </div>
  );
}
