import {
  CalendarData,
  CompleteTrainingList,
  Exercise,
} from "../interfaces/training.interface";

const API = "http://localhost:5000/api";

/* --------EXERCISE--------- */
export const getExercisesRequest = () => fetch(`${API}/exercise`);
export const getExerciseOne = (id: string) => fetch(`${API}/exercise/${id}`);
export const getExerciseByMuscle = (e: String) =>
  fetch(`${API}/exercise/by-muscle/${e}`);
/* --------TRAINING--------- */
export const createTrainingRequest = (training: Exercise) =>
  fetch(`${API}/training`, {
    method: "POST",
    body: JSON.stringify(training),
    headers: {
      "Content-Type": "application/json",
    },
  });
/* --------TRAINING-LIST--------- */
export const getTrainingList = () => fetch(`${API}/training-list`);
export const getTrainingListOne = (id: string) =>
  fetch(`${API}/training-list/${id}`);
export const createTrainingList = (trainingList: CompleteTrainingList) =>
  fetch(`${API}/training-list`, {
    method: "POST",
    body: JSON.stringify(trainingList),
    headers: {
      "Content-Type": "application/json",
    },
  });
/* --------CALENDAR--------- */
export const getCalendarData = () => fetch(`${API}/calendar-data`);
export const createCalendarData = (calendarData: CalendarData) =>
  fetch(`${API}/calendar-data`, {
    method: "POST",
    body: JSON.stringify(calendarData),
    headers: {
      "Content-Type": "application/json",
    },
  });
