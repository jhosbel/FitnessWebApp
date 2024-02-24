import { useContext } from "react";
import { TrainingContext } from "./TrainingContext";

export const useTraining = () => {
  const context = useContext(TrainingContext);
  if (!context)
    throw new Error("Los ejercicios deben estar dentro de un TrainingProvider");
  return context;
};
