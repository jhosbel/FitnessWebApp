export interface Exercise {
    id: string;
    name: string;
    muscle: string;
    equipment: string;
    series: number;
    weightType: string;
    weight: number;
    breakTime: number;
    note: string;
}

//type ExerciseOne = Omit<Exercise, 'id' | 'series' | 'weightType' | 'weight' | 'breakTime' | 'note'> ejemplo de como omitir tipos de datos sin tener que crear una interfaz nueva

export interface ExerciseOne {
    _id: string;
    name: string;
    muscle: string;
    equipment: string;
    instructions: string;
}

export interface Training {
    title: string;
    exercises: Exercise[];
}