import {
  createAsyncThunk,
  createAction,
  createReducer,
} from "@reduxjs/toolkit";

import axios from "axios";
import { RootState } from "../index.ts";

// import types from '../../types';

interface Question {
  id: number;
}

interface list {
  id: number;
  studentAnswer: string | number;
  userId: number;
  questionId: number;
}

interface IStateAnswer {
  list: list[];
  loading: boolean;
  error: null | string;
}

const initialState: IStateAnswer = {
  list: [],
  loading: false,
  error: null,
};

export const setArrayAnswerLength = createAction<number>(
  "answer/setArrayAnswerLength"
);

export const setAnswer = createAction<list>("answer/setAnswer");

export const setQuestionId = createAction<Question>("answer/questionid");

export const fetchCreateStudentAnswers = createAsyncThunk(
  "studentanswers/api-post",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const answerData = state.answer.list.map(({ id, ...data }) => data);

    const responses = await Promise.all(
      answerData.map((answer) => axios.post(`/answers/create`, answer))
    );

    const data = responses.map((response) => response.data);

    return data;
  }
);

const answerReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setArrayAnswerLength, (state, action) => {
      const length = action.payload;

      if (state.list.length === 0) {
        for (let i = 0; i < length; i++) {
          state.list.push({
            id: 0,
            studentAnswer: "",
            userId: 0,
            questionId: 0,
          });
        }
      }
    })
    .addCase(setAnswer, (state, action) => {
      const { id, userId, studentAnswer, questionId } = action.payload;

      if (state.list[id - 1]) {
        state.list[id - 1].userId = userId;
        state.list[id - 1].studentAnswer = studentAnswer;
        state.list[id - 1].questionId = questionId;
      }
    })
    .addCase(fetchCreateStudentAnswers.pending, (state) => {
      console.log("pending");
      state.error = null;
    })
    .addCase(fetchCreateStudentAnswers.fulfilled, (state, action) => {
      state.list = action.payload;
      state.list = [];
      state.error = null;
      state.loading = false;
    })
    .addCase(fetchCreateStudentAnswers.rejected, (state, action) => {
      state.error = action.error.message as string;
    });
});

export default answerReducer;
