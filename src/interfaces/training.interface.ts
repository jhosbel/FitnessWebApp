export interface Exercise {
    id: string;
    name: string;
    muscle: string;
    equipment: string;
    instruction: string;
    image: string;
    series: number;
    weightType: string;
    weight: number;
    breakTime: number;
    breakTimeType: string;
    note: string;
}

export interface CompleteTraining {
    exercises: Exercise[]
}

export type OnlyExercises = Omit<CompleteTraining, 'title'>

//type ExerciseOne = Omit<Exercise, 'id' | 'series' | 'weightType' | 'weight' | 'breakTime' | 'note'> ejemplo de como omitir tipos de datos sin tener que crear una interfaz nueva

export interface ExerciseOne {
    _id: string;
    name: string;
    muscle: string;
    equipment: string;
    instructions: string;
    image: string;
}

/* export interface ExercisesList {
    _id: string;
    name: string;
    muscle: string;
    equipment: string;
    instructions: string;
    image: string;
} */

export interface Training {
    exercises: Exercise[];
}