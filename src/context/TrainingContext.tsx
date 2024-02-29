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
  exerciseList: any[];
  setExerciseList: Dispatch<SetStateAction<any[]>>;
}

export const TrainingContext = createContext<TrainingContextValue>({
  exercise: [],
  trainingData: {
    exercises: [
      {
        id: "",
        name: "",
        muscle: "",
        equipment: "",
        instruction: "",
        image: "",
        series: 0,
        reps: 0,
        weightType: "Kg",
        weight: 0,
        breakTime: 0,
        breakTimeType: "Seg",
        note: "",
      },
    ],
  },
  setTrainingData: () => {},
  exerciseList: [],
  setExerciseList: () => {},
});

interface Props {
  children: React.ReactNode;
}

export const TrainingProvider: React.FC<Props> = ({ children }) => {
  const [exercise, setExercise] = useState<ExerciseOne[]>([]);
  const [trainingData, setTrainingData] = useState<CompleteTraining>({
    exercises: [
      {
        id: "",
        name: "",
        muscle: "",
        equipment: "",
        instruction: "",
        image: "",
        series: 0,
        reps: 0,
        weightType: "Kg",
        weight: 0,
        breakTime: 0,
        breakTimeType: "Seg",
        note: "",
      },
    ],
  });
  const [exerciseList, setExerciseList] = useState<any>([])

  useEffect(() => {
    getExercisesRequest()
      .then((res) => res.json())
      .then((data) => {
        setExercise(data);
      });
  }, []);

  return (
    <TrainingContext.Provider
      value={{
        exercise,
        trainingData,
        setTrainingData,
        exerciseList,
        setExerciseList,
      }}
    >
      {children}
    </TrainingContext.Provider>
  );
};
