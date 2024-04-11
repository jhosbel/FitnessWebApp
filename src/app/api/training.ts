import { useSession } from "next-auth/react";
import {
  CalendarData,
  CompleteTrainingList,
  CreateExerciseOne,
  Exercise,
} from "../../interfaces/training.interface";

export const useAuthAndApi = () => {
  const { data: session, status } = useSession();

  /* ----------USERS---------- */

  const getAllUsers = () =>
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${session?.user?.token}`,
      },
    });

  const getOneUser = (id: string) =>
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${id}`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${session?.user?.token}`,
      },
    });

  const updateUser = (id: string, body: any) =>
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${id}`, {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${session?.user?.token}`,
      },
    });

  /* --------USER CONFIG-------- */

  const getOneUserConfig = (id: string) =>
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user-config/${id}`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${session?.user?.token}`,
      },
    });

  const updateOneUserConfig = (id: string, body: any) =>
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user-config/${id}`, {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${session?.user?.token}`,
      },
    });

  const updateUserPassword = (body: any) =>
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/change-password`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${session?.user?.token}`,
      },
    });

  /* --------EXERCISE--------- */
  const getExercisesRequest = () =>
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/exercise`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${session?.user?.token}`,
      },
    });
  const getExerciseOne = (id: string) =>
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/exercise/${id}`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${session?.user?.token}`,
      },
    });
  const getExerciseByMuscle = (e: String) =>
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/exercise/by-muscle/${e}`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${session?.user?.token}`,
      },
    });
  const createExercise = (exercise: CreateExerciseOne) =>
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/exercise`, {
      method: "POST",
      body: JSON.stringify(exercise),
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${session?.user?.token}`,
      },
    });

  const updateExercise = (id: string, body: any) =>
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/exercise/${id}`, {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${session?.user?.token}`,
      },
    });

  const deleteExercise = (id: string) =>
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/exercise/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${session?.user?.token}`,
      },
    });
  /* --------TRAINING--------- */
  const createTrainingRequest = (training: Exercise) =>
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/training`, {
      method: "POST",
      body: JSON.stringify(training),
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${session?.user?.token}`,
      },
    });
  /* --------TRAINING-LIST--------- */
  const getTrainingList = () =>
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/training-list`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${session?.user?.token}`,
      },
    });

  const getTrainingListOne = (id: string) =>
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/training-list/${id}`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${session?.user?.token}`,
      },
    });

  const createTrainingList = (trainingList: CompleteTrainingList) =>
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/training-list`, {
      method: "POST",
      body: JSON.stringify(trainingList),
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${session?.user?.token}`,
      },
    });
  /* --------CALENDAR--------- */
  const getCalendarData = () =>
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/calendar-data`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${session?.user?.token}`,
      },
    });
  const createCalendarData = (calendarData: CalendarData) =>
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/calendar-data`, {
      method: "POST",
      body: JSON.stringify(calendarData),
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${session?.user?.token}`,
      },
    });
  /* ------------NOTIFICATION--------------- */
  const getNotifications = (id: string) =>
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/notification/${id}`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${session?.user?.token}`,
      },
    });
  return {
    session,
    status,
    getAllUsers,
    getExercisesRequest,
    getExerciseOne,
    getExerciseByMuscle,
    createTrainingRequest,
    getTrainingList,
    getTrainingListOne,
    createTrainingList,
    getCalendarData,
    createCalendarData,
    createExercise,
    getOneUserConfig,
    updateOneUserConfig,
    getOneUser,
    updateUser,
    updateUserPassword,
    deleteExercise,
    updateExercise,
    getNotifications,
  };
};

export default useAuthAndApi;
