import { getExercisesRequest } from "@/api/training";
import { CompleteTraining, ExerciseOne } from "@/interfaces/training.interface";
import {
  createContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";

interface TrainingContextValue {
  exercise: ExerciseOne[];
  trainingData: CompleteTraining;
  setTrainingData: Dispatch<SetStateAction<CompleteTraining>>;
}

export const TrainingContext = createContext<TrainingContextValue>({
  exercise: [],
  trainingData: {
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
  },
  setTrainingData: () => {},
});

interface Props {
  children: React.ReactNode;
}

export const TrainingProvider: React.FC<Props> = ({ children }) => {
  const [exercise, setExercise] = useState<ExerciseOne[]>([]);
  const [trainingData, setTrainingData] = useState<CompleteTraining>({
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

  const updateTrainingData = (newData: any) => {
    setTrainingData((prevData) => ({ ...prevData, ...newData }));
  };

  useEffect(() => {
    getExercisesRequest()
      .then((res) => res.json())
      .then((data) => {
        setExercise(data), console.log(data);
      });
  }, []);

  return (
    <TrainingContext.Provider
      value={{ exercise, trainingData, setTrainingData }}
    >
      {children}
    </TrainingContext.Provider>
  );
};
