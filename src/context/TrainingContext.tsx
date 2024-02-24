import { getExercisesRequest } from "@/api/training";
import { ExerciseOne } from "@/interfaces/training.interface";
import { createContext, useState, useEffect } from "react";

interface TrainingContextValue {
  exercise: ExerciseOne[]
}

export const TrainingContext = createContext<TrainingContextValue>({
  exercise: [],
});

interface Props {
  children: React.ReactNode;
}

export const TrainingProvider: React.FC<Props> = ({ children }) => {
  const [exercise, setExercise] = useState<ExerciseOne[]>([]);

  useEffect(() => {
    getExercisesRequest()
      .then((res) => res.json())
      .then((data) => {
        setExercise(data), console.log(data);
      });
  }, []);

  return (
    <TrainingContext.Provider value={{ exercise }}>
      {children}
    </TrainingContext.Provider>
  );
};
