const API = 'http://localhost:5000/api'

interface Exercise {
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

interface Training {
    title: string;
    exercises: Exercise[];
}

export const createTrainingRequest = (training: Training) => 
    fetch(`${API}/training`, {
        method: 'POST',
        body: JSON.stringify(training),
        headers: {
            'Content-Type': 'application/json'
        }
    })
