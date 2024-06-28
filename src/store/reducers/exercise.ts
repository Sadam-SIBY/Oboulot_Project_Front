import {
  createAsyncThunk,
  createAction,
  createReducer,
} from "@reduxjs/toolkit";

import axios from "axios";
import { RootState } from "../index.ts";

// config axios
axios.defaults.baseURL = import.meta.env.VITE_API_URL;

// import types from '../../types';
import { IExercise, IUserExercise, IGroup } from "../../types/types";

interface Exercise {
  title: string;
  instruction: string;
  subject: string;
}

interface ExerciseUser {
  exerciseId: number;
  userId: number;
  isDone: boolean;
}

interface QuestionCorrected {
  id: number;
  number: number;
  content: string;
  teacher_answer: string;
  exercise_id: number;
}

interface AnswerCorrected {
  id: number;
  question_id: number;
  user_id: number;
  student_answer: string;
  is_done: number;
}

interface ExerciseCorrected {
  questions: QuestionCorrected[];
  answers: AnswerCorrected[];
}

interface IStateExercise {
  list: IExercise[];
  exerciseCorrected: ExerciseCorrected;
  exerciseUser: ExerciseUser;
  exerciseUserList: IUserExercise[];
  groupList: IGroup[];
  data: Exercise;
  idExercise: number;
  lastIdExercise: { id: number };
  create: boolean;
  createState: boolean;
  createStateFinal: boolean;
  update: boolean;
  updateState: boolean;
  delete: boolean;
  deleteState: boolean;
  publish: boolean;
  publishState: boolean;
  exerciseGroup: boolean;
  exerciseGroupState: boolean;
  message: string;
  error: null | string;
  loading: boolean;
}

const initialState: IStateExercise = {
  list: [],
  exerciseCorrected: {
    questions: [],
    answers: [],
  },
  exerciseUser: { exerciseId: 0, userId: 0, isDone: false },
  exerciseUserList: [],
  groupList: [],
  data: {
    title: "",
    instruction: "",
    subject: "",
  },
  idExercise: 0,
  lastIdExercise: { id: 0 },
  create: false,
  createState: false,
  createStateFinal: false,
  update: false,
  updateState: false,
  delete: false,
  deleteState: false,
  publish: false,
  publishState: false,
  exerciseGroup: false,
  exerciseGroupState: false,
  message: "",
  error: null,
  loading: false,
};

export const setTitle = createAction<string>("exercise/setTitle");
export const setSubject = createAction<string>("exercise/setSubject");
export const setInstruction = createAction<string>("exercise/setInstruction");

export const setExerciseUser = createAction<ExerciseUser>(
  "exercise/setExerciseUser"
);
export const setMessage = createAction<string>("exercise/setMessage");
export const setIdExercise = createAction<number>("exercise/setIdExercise");

export const setModalCreate = createAction<boolean>("exercise/setModalCreate");
export const setModalCreateState = createAction<boolean>(
  "exercise/setModalCreateState"
);
export const setModalCreateStateFinal = createAction<boolean>(
  "exercise/setModalCreateStateFinal"
);
export const setModalUpdate = createAction<boolean>("exercise/setModalUpdate");
export const setModalUpdateState = createAction<boolean>(
  "exercise/setModalUpdateState"
);
export const setModalDelete = createAction<boolean>("exercise/setModalDelete");
export const setModalDeleteState = createAction<boolean>(
  "exercise/setModalDeleteState"
);

export const setModalPublish = createAction<boolean>(
  "exercise/setModalPublish"
);
export const setModalPublishState = createAction<boolean>(
  "exercise/setModalPublishState"
);

export const setModalExerciseGroup = createAction<boolean>(
  "student/setModalExerciseGroup"
);
export const setModalExerciseGroupState = createAction<boolean>(
  "student/setModalExerciseGroupState"
);

export const clearGroupList = createAction("group/clearGroupList");

export const clear = createAction("exercise/clear");

export const fetchExercise = createAsyncThunk(
  "exercise/api-get-exercise",
  async (idExercise: number) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/exercises/${idExercise}`
    );
    return response.data;
  }
);

export const fetchExerciseLastId = createAsyncThunk(
  "exercise/api-exercise-last-id",
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/exercises/lastid`
    );
    return response.data;
  }
);

export const fetchExerciseList = createAsyncThunk(
  "exercise/api-exercise-list",
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/exercises`
    );
    return response.data;
  }
);

export const fetchGroupListFromExercise = createAsyncThunk(
  "exercise/api-exercise-group-list",
  async (idExercise: number) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/exercises/${idExercise}/groups`
    );
    return response.data;
  }
);

export const fetchExerciseUser = createAsyncThunk(
  "exercise/api-exercise-user",
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/userexercise/`
    );
    return response.data;
  }
);

export const fetchExerciseUserIsDone = createAsyncThunk(
  "exercise/api-exercise-user-is-done",
  async (id: number, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const exerciseUser = state.exercise.exerciseUser;

    const { data } = await axios.put(`/userexercise/${id}/edit`, exerciseUser);

    return data;
  }
);

export const fetchExerciseCorrection = createAsyncThunk(
  "exercise/api-exercise-correction",
  async (idExercise: number) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/exercises/${idExercise}/answers`
    );
    return response.data;
  }
);

export const fetchExerciseCreate = createAsyncThunk(
  "exercise/api-exercice-create",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;

    const { data } = await axios.post(`/exercises/create`, {
      title: state.exercise.data.title,
      instruction: state.exercise.data.instruction,
      subject: state.exercise.data.subject,
    });

    return data;
  }
);

export const fetchExerciseUpdate = createAsyncThunk(
  "exercise/api-exercise-update",
  async (idExercise: number, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const exerciseData = state.exercise.data;

    const { data } = await axios.put(
      `/exercises/${idExercise}/edit`,
      exerciseData
    );

    return data;
  }
);

export const fetchExerciseDelete = createAsyncThunk(
  "exercise/api-exercise-delete",
  async (idExercise: number) => {
    const { data } = await axios.delete(`/exercises/${idExercise}/delete`);

    return data;
  }
);

const exerciseReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setTitle, (state, action) => {
      state.data.title = action.payload;
    })
    .addCase(setSubject, (state, action) => {
      state.data.subject = action.payload;
    })
    .addCase(setInstruction, (state, action) => {
      state.data.instruction = action.payload;
    })
    .addCase(setExerciseUser, (state, action) => {
      const { exerciseId, userId, isDone } = action.payload;

      state.exerciseUser.exerciseId = exerciseId;
      state.exerciseUser.userId = userId;
      state.exerciseUser.isDone = isDone;
    })
    .addCase(setMessage, (state, action) => {
      state.message = action.payload;
    })
    .addCase(setIdExercise, (state, action) => {
      state.idExercise = action.payload;
    })
    .addCase(setModalCreate, (state, action) => {
      state.create = action.payload;
    })
    .addCase(setModalCreateState, (state, action) => {
      state.createState = action.payload;
    })
    .addCase(setModalCreateStateFinal, (state, action) => {
      state.createStateFinal = action.payload;
    })
    .addCase(setModalUpdate, (state, action) => {
      state.update = action.payload;
    })
    .addCase(setModalUpdateState, (state, action) => {
      state.updateState = action.payload;
    })
    .addCase(setModalDelete, (state, action) => {
      state.delete = action.payload;
    })
    .addCase(setModalDeleteState, (state, action) => {
      state.deleteState = action.payload;
    })
    .addCase(setModalPublish, (state, action) => {
      state.publish = action.payload;
    })
    .addCase(setModalPublishState, (state, action) => {
      state.publishState = action.payload;
    })
    .addCase(setModalExerciseGroup, (state, action) => {
      state.exerciseGroup = action.payload;
    })
    .addCase(setModalExerciseGroupState, (state, action) => {
      state.exerciseGroupState = action.payload;
    })
    .addCase(clearGroupList, (state) => {
      state.groupList = [];
    })
    .addCase(clear, (state) => {
      state.data.title = "";
      state.data.instruction = "";
      state.data.subject = "";

      state.message = "";
    })
    .addCase(fetchExercise.pending, (state) => {
      console.log("pending");
      state.error = null;
      state.loading = true;
    })
    .addCase(fetchExercise.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    })
    .addCase(fetchExercise.rejected, (state, action) => {
      state.error = action.error.message as string;
      state.loading = false;
    })
    .addCase(fetchExerciseLastId.pending, (state) => {
      console.log("pending");
      state.error = null;
      state.loading = true;
    })
    .addCase(fetchExerciseLastId.fulfilled, (state, action) => {
      state.lastIdExercise = action.payload;
      state.loading = false;
    })
    .addCase(fetchExerciseLastId.rejected, (state, action) => {
      state.error = action.error.message as string;
      state.loading = false;
    })
    .addCase(fetchExerciseList.pending, (state) => {
      console.log("pending");
      state.error = null;
      state.loading = true;
    })
    .addCase(fetchExerciseList.fulfilled, (state, action) => {
      state.list = action.payload;
      state.error = null;
      state.loading = false;
    })
    .addCase(fetchExerciseList.rejected, (state, action) => {
      state.error = action.error.message as string;
      state.loading = false;
    })
    .addCase(fetchGroupListFromExercise.pending, (state) => {
      console.log("pending");
      state.error = null;
      state.loading = true;
    })
    .addCase(fetchGroupListFromExercise.fulfilled, (state, action) => {
      state.groupList = action.payload;
      state.loading = false;
    })
    .addCase(fetchGroupListFromExercise.rejected, (state, action) => {
      state.error = action.error.message as string;
      state.loading = false;
    })
    .addCase(fetchExerciseUser.pending, (state) => {
      console.log("pending");
      state.error = null;
      state.loading = true;
    })
    .addCase(fetchExerciseUser.fulfilled, (state, action) => {
      state.exerciseUserList = action.payload;
      state.loading = false;
    })
    .addCase(fetchExerciseUser.rejected, (state, action) => {
      state.error = action.error.message as string;
      state.loading = false;
    })
    .addCase(fetchExerciseUserIsDone.pending, (state) => {
      console.log("pending");
      state.error = null;
      state.loading = true;
    })
    .addCase(fetchExerciseUserIsDone.fulfilled, (state, action) => {
      state.exerciseUser = action.payload;
      state.loading = false;
    })
    .addCase(fetchExerciseUserIsDone.rejected, (state, action) => {
      state.error = action.error.message as string;
      state.loading = false;
    })
    .addCase(fetchExerciseCorrection.pending, (state) => {
      console.log("pending");
      state.error = null;
      state.loading = true;
    })
    .addCase(fetchExerciseCorrection.fulfilled, (state, action) => {
      state.exerciseCorrected = action.payload;
      state.loading = false;
    })
    .addCase(fetchExerciseCorrection.rejected, (state, action) => {
      state.error = action.error.message as string;
      state.loading = false;
    })
    .addCase(fetchExerciseCreate.pending, (state) => {
      console.log("pending");
      state.error = null;
      state.loading = true;
    })
    .addCase(fetchExerciseCreate.fulfilled, (state, action) => {
      const { title, instruction, subject } = action.payload;

      if (title && instruction && subject) {
        state.data.title = title;
        state.data.instruction = instruction;
        state.data.subject = subject;
      }
      state.loading = false;
    })
    .addCase(fetchExerciseCreate.rejected, (state, action) => {
      state.error = action.error.message as string;
      state.loading = false;
    })
    .addCase(fetchExerciseUpdate.pending, (state) => {
      console.log("pending");
      state.error = null;
      state.loading = true;
    })
    .addCase(fetchExerciseUpdate.fulfilled, (state, action) => {
      const { title, instruction, subject } = action.payload;

      if (title && instruction && subject) {
        state.data.title = title;
        state.data.instruction = instruction;
        state.data.subject = subject;
      }
      state.loading = false;
    })
    .addCase(fetchExerciseUpdate.rejected, (state, action) => {
      state.error = action.error.message as string;
      state.loading = false;
    })
    .addCase(fetchExerciseDelete.pending, (state) => {
      console.log("pending");
      state.error = null;
      state.loading = true;
    })
    .addCase(fetchExerciseDelete.fulfilled, (state) => {
      state.loading = false;
    })
    .addCase(fetchExerciseDelete.rejected, (state, action) => {
      state.error = action.error.message as string;
      state.loading = false;
    });
});

export default exerciseReducer;
