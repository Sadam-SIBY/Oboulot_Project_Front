import { v4 as uuidv4 } from "uuid";

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
import { IQuestion } from "../../types/types";

interface Question {
  id: number;
  content: string;
}

interface Answer {
  id: number;
  teacherAnswer: string;
}

interface QuestionUpdate {
  id: number;
  content: string;
}

interface AnswerUpdate {
  id: number;
  teacher_answer: string;
}

interface QuestionData {
  id: number;
  number: number;
  content: string;
  teacher_answer: string;
  exercise_id: number;
}

interface IStateQuestion {
  list: IQuestion[];
  listUpdate: QuestionData[];
  button: boolean;
  message: string;
  delete: boolean;
  deleteState: boolean;
  error: null | string;
  loading: boolean;
  firstTime: boolean;
}

const initialState: IStateQuestion = {
  list: [],
  listUpdate: [],
  button: false,
  message: "",
  delete: false,
  deleteState: false,
  error: null,
  loading: false,
  firstTime: true,
};

export const clickedButton = createAction<boolean>("question/clickedButton");
export const setFirstTime = createAction<boolean>("question/setFirstTime");
export const setQuestion = createAction<Question>("question/setQuestion");
export const setAnswer = createAction<Answer>("question/setAnswer");

export const setQuestionUpdate = createAction<QuestionUpdate>(
  "question/setQuestionUpdate"
);
export const setAnswerUpdate = createAction<AnswerUpdate>(
  "question/setAnswerUpdate"
);

export const addQuestion = createAction<number>("question/addQuestion");
export const addQuestionUpdate = createAction<number>(
  "question/addQuestionUpdate"
);
export const deleteQuestion = createAction<number>("question/deleteQuestion");

export const setMessage = createAction<string>("question/setMessage");
export const setLoading = createAction<boolean>("question/setLoading");

export const setModalDelete = createAction<boolean>("question/setModalDelete");
export const setModalDeleteState = createAction<boolean>(
  "question/setModalDeleteState"
);

export const clear = createAction("question/clear");

export const fetchQuestionList = createAsyncThunk(
  "exercise/api-question-list",
  async (idExercise: number) => {
    const { data } = await axios.get(`/exercises/${idExercise}/questions`);

    return data;
  }
);

export const fetchQuestionCreate = createAsyncThunk(
  "exercise/api-question-create",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const questionList = state.question.list.map(({ id, ...data }) => data);

    const responses = await Promise.all(
      questionList.map((question) => axios.post(`/questions/create`, question))
    );

    const data = responses.map((response) => response.data);

    return data;
  }
);

export const fetchQuestionUpdate = createAsyncThunk(
  "exercise/api-question-update",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;

    const questionListUpdate = state.question.listUpdate.map(
      ({ exercise_id, ...data }) => data
    );

    const responses = await Promise.all(
      questionListUpdate.map((question) =>
        axios.put(`/questions/${question.id}/edit`, {
          number: question.number,
          content: question.content,
          teacherAnswer: question.teacher_answer,
        })
      )
    );

    const data = responses.map((response) => response.data);

    return data;
  }
);

export const fetchQuestionDelete = createAsyncThunk(
  "exercise/api-question-delete",
  async (idQuestion: number) => {
    const { data } = await axios.delete(`/questions/${idQuestion}/delete`);

    return data;
  }
);

const questionReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(clickedButton, (state, action) => {
      state.button = action.payload;
    })
    .addCase(setFirstTime, (state, action) => {
      state.firstTime = action.payload;
    })
    .addCase(addQuestion, (state, action) => {
      const exerciseId = action.payload;

      state.list.push({
        id: parseInt(uuidv4()),
        number: state.list.length + 1,
        content: "",
        teacherAnswer: "",
        exerciseId: exerciseId,
      });
    })
    .addCase(addQuestionUpdate, (state, action) => {
      const exerciseId = action.payload;
      const questionNumber = state.firstTime
        ? state.listUpdate.length + 1
        : state.list[state.list.length - 1].number + 1;

      state.list.push({
        id: parseInt(uuidv4()),
        number: questionNumber,
        content: "",
        teacherAnswer: "",
        exerciseId: exerciseId,
      });
    })
    .addCase(deleteQuestion, (state, action) => {
      const questionIndex = state.list.findIndex(
        (question) => question.id === action.payload
      );
      state.list.splice(questionIndex, 1);
      state.list.forEach((question, index) => {
        question.number = index + state.listUpdate.length + 1;
      });
    })
    .addCase(setMessage, (state, action) => {
      state.message = action.payload;
    })
    .addCase(setLoading, (state, action) => {
      state.loading = action.payload;
    })
    .addCase(setModalDelete, (state, action) => {
      state.delete = action.payload;
    })
    .addCase(setModalDeleteState, (state, action) => {
      state.deleteState = action.payload;
    })
    .addCase(setQuestion, (state, action) => {
      const { id, content } = action.payload;

      if (state.list[id - 1]) {
        state.list[id - 1].content = content;
      }
    })
    .addCase(setAnswer, (state, action) => {
      const { id, teacherAnswer } = action.payload;

      if (state.list[id - 1]) {
        state.list[id - 1].teacherAnswer = teacherAnswer;
      }
    })
    .addCase(setQuestionUpdate, (state, action) => {
      const { id, content } = action.payload;

      if (state.listUpdate[id - 1]) {
        state.listUpdate[id - 1].content = content;
      }
    })
    .addCase(setAnswerUpdate, (state, action) => {
      const { id, teacher_answer } = action.payload;

      if (state.listUpdate[id - 1]) {
        state.listUpdate[id - 1].teacher_answer = teacher_answer;
      }
    })
    .addCase(clear, (state) => {
      state.list = [];
      state.listUpdate = [];

      state.firstTime = true;
      state.message = "";
    })
    .addCase(fetchQuestionList.pending, (state) => {
      console.log("pending");
      state.error = null;
      state.loading = true;
    })
    .addCase(fetchQuestionList.fulfilled, (state, action) => {
      state.listUpdate = action.payload;
      state.error = null;
      state.loading = false;
    })
    .addCase(fetchQuestionList.rejected, (state, action) => {
      state.error = action.error.message as string;
      state.loading = false;
    })
    .addCase(fetchQuestionCreate.pending, (state) => {
      console.log("pending");
      state.error = null;
      state.loading = true;
    })
    .addCase(fetchQuestionCreate.fulfilled, (state, action) => {
      state.list = action.payload;
      state.error = null;
      state.loading = false;
    })
    .addCase(fetchQuestionCreate.rejected, (state, action) => {
      state.error = action.error.message as string;
      state.loading = false;
    })
    .addCase(fetchQuestionUpdate.pending, (state) => {
      console.log("pending");
      state.error = null;
      state.loading = true;
    })
    .addCase(fetchQuestionUpdate.fulfilled, (state, action) => {
      state.listUpdate = action.payload;
      state.error = null;
      state.loading = false;
    })
    .addCase(fetchQuestionUpdate.rejected, (state, action) => {
      state.error = action.error.message as string;
      state.loading = false;
    })
    .addCase(fetchQuestionDelete.pending, (state) => {
      console.log("pending");
      state.error = null;
      state.loading = true;
    })
    .addCase(fetchQuestionDelete.fulfilled, (state) => {
      state.error = null;
      state.loading = false;
    })
    .addCase(fetchQuestionDelete.rejected, (state, action) => {
      state.error = action.error.message as string;
      state.loading = false;
    });
});

export default questionReducer;
