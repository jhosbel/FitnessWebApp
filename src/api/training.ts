import {Training} from '../interfaces/training.interface'

const API = 'http://localhost:5000/api'



export const getExercisesRequest = () => fetch(`${API}/exercise`)
    

export const createTrainingRequest = (training: Training) => 
    fetch(`${API}/training`, {
        method: 'POST',
        body: JSON.stringify(training),
        headers: {
            'Content-Type': 'application/json'
        }
    })


    /* const request = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/training');
        const exercises: Exercise[] = response.data[0].exercises;
        setExercise(exercises);
    } catch (error) {
        console.error('Error al hacer la solicitud:', error);
    } */