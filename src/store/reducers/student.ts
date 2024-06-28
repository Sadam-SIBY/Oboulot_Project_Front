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
import { IUser } from "../../types/types";

interface Student {
  lastname: string;
  firstname: string;
  email: string;
  password: string;
}

interface IStateStudent {
  list: IUser[];
  data: Student;
  idStudent: number;
  create: boolean;
  createState: boolean;
  message: string;
  error: null | string;
  loading: boolean;
}

const initialState: IStateStudent = {
  list: [],
  data: { lastname: "", firstname: "", email: "", password: "" },
  idStudent: 0,
  create: false,
  createState: false,
  message: "",
  error: null,
  loading: false,
};

export const setLastname = createAction<string>("student/setLastname");
export const setFirstname = createAction<string>("student/setFirstname");
export const setEmail = createAction<string>("student/setEmail");
export const setPassword = createAction<string>("student/setPassword");

export const setMessage = createAction<string>("student/setMessage");
export const setIdStudent = createAction<number>("student/setIdStudent");

export const setModalCreate = createAction<boolean>("student/setModalCreate");
export const setModalCreateState = createAction<boolean>(
  "student/setModalCreateState"
);

export const clear = createAction("student/clear");

export const fetchStudentList = createAsyncThunk(
  "student/api-student-list",
  async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/users`);

    return response.data;
  }
);

export const fetchStudentCreate = createAsyncThunk(
  "student/api-student-create",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const studentData = state.student.data;

    const { data } = await axios.post(`/users/create`, studentData);

    return data;
  }
);

const studentReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setLastname, (state, action) => {
      state.data.lastname = action.payload;
    })
    .addCase(setFirstname, (state, action) => {
      state.data.firstname = action.payload;
    })
    .addCase(setEmail, (state, action) => {
      state.data.email = action.payload;
    })
    .addCase(setPassword, (state, action) => {
      state.data.password = action.payload;
    })
    .addCase(setMessage, (state, action) => {
      state.message = action.payload;
    })
    .addCase(setIdStudent, (state, action) => {
      state.idStudent = action.payload;
    })
    .addCase(setModalCreate, (state, action) => {
      state.create = action.payload;
    })
    .addCase(setModalCreateState, (state, action) => {
      state.createState = action.payload;
    })
    .addCase(clear, (state) => {
      state.data.lastname = "";
      state.data.firstname = "";
      state.data.email = "";
      state.data.password = "";

      state.message = "";
    })
    .addCase(fetchStudentList.pending, (state) => {
      console.log("pending");
      state.error = null;
      state.loading = true;
    })
    .addCase(fetchStudentList.fulfilled, (state, action) => {
      state.list = action.payload;
      state.loading = false;
    })
    .addCase(fetchStudentList.rejected, (state, action) => {
      state.error = action.error.message as string;
      state.loading = false;
    })
    .addCase(fetchStudentCreate.pending, (state) => {
      console.log("pending");
      state.createState = false;
      state.error = null;
      state.loading = true;
    })
    .addCase(fetchStudentCreate.fulfilled, (state, action) => {
      const { lastname, firstname, email, password } = action.payload;

      if (lastname && firstname && email && password) {
        state.data.lastname = "";
        state.data.firstname = "";
        state.data.email = "";
        state.data.password = "";
      }

      state.createState = true;
      state.loading = false;
    })
    .addCase(fetchStudentCreate.rejected, (state, action) => {
      state.createState = false;
      state.message = action.error.message as string;
      state.loading = false;
    });
});

export default studentReducer;
