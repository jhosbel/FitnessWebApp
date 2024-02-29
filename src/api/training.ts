import {CompleteTrainingList, Exercise} from '../interfaces/training.interface'

const API = 'http://localhost:5000/api'



export const getExercisesRequest = () => fetch(`${API}/exercise`)
    

export const createTrainingRequest = (training: Exercise) => 
    fetch(`${API}/training`, {
        method: 'POST',
        body: JSON.stringify(training),
        headers: {
            'Content-Type': 'application/json'
        }
    })

export const getExerciseByMuscle = (e: String) => fetch(`${API}/exercise/by-muscle/${e}`)

export const createTrainingList = (trainingList: CompleteTrainingList) => fetch(`${API}/training-list`, {
    method: 'POST',
    body: JSON.stringify(trainingList),
    headers: {
        'Content-Type': 'application/json'
    }
})