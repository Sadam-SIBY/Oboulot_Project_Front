// Imports necessary functions and modules
import {
  createAsyncThunk,
  createAction,
  createReducer,
} from "@reduxjs/toolkit";

import axios from "axios";
import { RootState } from "../index.ts";

// Set the base URL for axios requests
axios.defaults.baseURL = import.meta.env.VITE_API_URL;

// Define interfaces for credentials and registration data
interface ICredentials {
  username: string;
  password: string;
}

interface IRegistration {
  lastname: string;
  firstname: string;
  email: string;
  password: string;
}

// Define the state interface for settings
interface IStateSettings {
  logged: boolean;
  credentials: ICredentials;
  registration: IRegistration;
  registered: boolean;
  messages: string[];
  token: null | string;
  error: null | string;
  loading: boolean;
}

// Define the initial state for settings
const initialState: IStateSettings = {
  logged: false,
  credentials: {
    username: "",
    password: "",
  },
  registration: {
    lastname: "",
    firstname: "",
    email: "",
    password: "",
  },
  registered: false,
  messages: [],
  token: null,
  error: null,
  loading: false,
};

// Define Redux actions
export const changeLastname = createAction<string>("settings/changeLastname");
export const changeFirstname = createAction<string>("settings/changeFirstname");
export const changeEmailValue = createAction<string>(
  "settings/changeEmailValue"
);
export const changePasswordValue = createAction<string>(
  "settings/changePasswordValue"
);

export const updateToken = createAction<string>("settings/updateToken");
export const addMessage = createAction<string>("settings/addMessage");
export const removeMessage = createAction<string>("settings/removeMessage");

export const setRegistered = createAction<boolean>("settings/setRegistered");

export const clear = createAction("settings/clear");

export const logout = createAction("settings/logout");

// Define asynchronous thunks for sign-in
export const signin = createAsyncThunk(
  "settings/signin",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const credentials = state.settings.credentials as ICredentials;

    const { data } = await axios.post(`/login_check`, credentials);

    axios.defaults.headers.common = { Authorization: `Bearer ${data.token}` };

    return data;
  }
);

// Define asynchronous thunks for sign-up
export const signup = createAsyncThunk(
  "settings/signup",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const registration = state.settings.registration as IRegistration;

    const { data } = await axios.post(`/register`, registration);

    return data;
  }
);

// Define the settings reducer
const settingsReducer = createReducer(initialState, (builder) => {
  builder
    // Handle action cases
    .addCase(changeLastname, (state, action) => {
      state.registration.lastname = action.payload;
    })
    .addCase(changeFirstname, (state, action) => {
      state.registration.firstname = action.payload;
    })
    .addCase(changeEmailValue, (state, action) => {
      state.registration.email = action.payload;
      state.credentials.username = action.payload;
    })
    .addCase(changePasswordValue, (state, action) => {
      state.registration.password = action.payload;
      state.credentials.password = action.payload;
    })
    .addCase(updateToken, (state, action) => {
      state.token = action.payload;
    })
    .addCase(addMessage, (state, action) => {
      if (!state.messages.includes(action.payload)) {
        state.messages = [...state.messages, action.payload];
      }
    })
    .addCase(removeMessage, (state, action) => {
      state.messages = state.messages.filter(
        (message) => message !== action.payload
      );
    })
    .addCase(setRegistered, (state, action) => {
      state.registered = action.payload;
    })
    .addCase(clear, (state) => {
      state.messages = [];
      state.error = null;
      state.registration.lastname = "";
      state.registration.firstname = "";
      state.registration.email = "";
      state.credentials.username = "";
      state.registration.password = "";
      state.credentials.password = "";
    })
    .addCase(signin.pending, (state) => {
      state.logged = false;
      state.error = null;
      state.loading = true;
    })
    .addCase(signin.fulfilled, (state, action) => {
      // Store the token in the state to be able to reuse it for each API request that requests it
      const { token } = action.payload;

      state.token = token;
      state.logged = true;
      state.loading = false;
    })
    .addCase(signin.rejected, (state, action) => {
      state.error = action.error.message as string;
      state.loading = false;
      state.credentials.password = "";
    })
    .addCase(signup.pending, (state) => {
      state.error = null;
      state.loading = true;
      state.registered = false;
    })
    .addCase(signup.fulfilled, (state) => {
      state.loading = false;
      state.registered = true;
      state.logged = false;
    })
    .addCase(signup.rejected, (state, action) => {
      state.error = action.error.message as string;
      state.loading = false;
      state.registered = false;
      state.registration.password = "";
    })
    .addCase(logout, (state) => {
      state.logged = false;
      state.token = null;

      // Remove the token from the axios instance headers
      axios.defaults.headers.common = {};
    });
});

export default settingsReducer;
