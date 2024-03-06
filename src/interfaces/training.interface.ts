export interface Exercise {
  id: string;
  name: string;
  muscle: string;
  equipment: string;
  instruction: string;
  image: string;
  series: number;
  reps: number;
  weightType: string;
  weight: number;
  breakTime: number;
  breakTimeType: string;
  note: string;
}

export interface CompleteTraining {
  exercises: Exercise[];
}

export interface CompleteTrainingList {
  title: string;
  exercises: Exercise[];
}

export type OnlyExercises = Omit<CompleteTraining, "title">;

export interface ExerciseOne {
  _id: string;
  name: string;
  muscle: string;
  equipment: string;
  instructions: string;
  image: string;
}

export interface CalendarData {
  id: string;
  title: string;
  start: string;
}
