import {
  createAsyncThunk,
  createAction,
  createReducer,
} from "@reduxjs/toolkit";

import axios from "axios";
import { RootState } from "../index.ts";

// import types from '../../types';
import { IUser } from "../../types/types";

interface IStateUser {
  list: IUser[];
  data: {
    email: string;
    firstname: string;
    lastname: string;
  };
  userData: IUser;
  oldPassword: string;
  newPassword: string;
  edit: boolean;
  editPassword: boolean;
  update: boolean;
  updatePassword: boolean;
  connected: boolean;
  error: null | string;
  loading: boolean;
}

const initialState: IStateUser = {
  list: [],
  data: {
    email: "",
    firstname: "",
    lastname: "",
  },
  userData: {
    id: 0,
    roles: [],
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    picture: null,
    groups: [],
    answers: [],
    messages: [],
  },
  oldPassword: "",
  newPassword: "",
  edit: false,
  editPassword: false,
  update: false,
  updatePassword: false,
  connected: false,
  error: null,
  loading: false,
};

export const changeFirstname = createAction<string>("user/changeFirstname");
export const changeLastname = createAction<string>("user/changeLastname");
export const changeEmail = createAction<string>("user/changeEmail");

export const setOldPassword = createAction<string>("user/setOldPassword");
export const setNewPassword = createAction<string>("user/setNewPassword");

export const editMode = createAction<boolean>("user/editMode");
export const editPasswordMode = createAction<boolean>("user/editPasswordMode");

export const updateMode = createAction<boolean>("user/updateMode");
export const updatePasswordMode = createAction<boolean>(
  "user/updatePasswordMode"
);

export const clear = createAction("user/clear");

export const isConnected = createAction<boolean>("user/isConnected");

export const fetchGetUserProfile = createAsyncThunk(
  "user/api-get-user-profile",
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/users/profile`
    );
    return response.data;
  }
);

export const fetchPutUserProfile = createAsyncThunk(
  "user/api-put-user-profile",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const { id } = state.user.userData;
    const userData = state.user.data;

    const { data } = await axios.put(
      `${import.meta.env.VITE_API_URL}/users/${id}/edit`,
      userData
    );

    axios.defaults.headers.common = { Authorization: `Bearer ${data}` };

    return data;
  }
);

export const fetchPutUserProfilePassword = createAsyncThunk(
  "user/api-put-user-profile-password",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const { id } = state.user.userData;
    const oldPassword = state.user.oldPassword;
    const newPassword = state.user.newPassword;

    const { data } = await axios.put(
      `${import.meta.env.VITE_API_URL}/users/${id}/edit-password`,
      { oldPassword: oldPassword, newPassword: newPassword }
    );

    axios.defaults.headers.common = { Authorization: `Bearer ${data}` };

    return data;
  }
);

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeFirstname, (state, action) => {
      state.data.firstname = action.payload;
    })
    .addCase(changeLastname, (state, action) => {
      state.data.lastname = action.payload;
    })
    .addCase(changeEmail, (state, action) => {
      state.data.email = action.payload;
    })
    .addCase(setOldPassword, (state, action) => {
      state.oldPassword = action.payload;
    })
    .addCase(setNewPassword, (state, action) => {
      state.newPassword = action.payload;
    })
    .addCase(editMode, (state, action) => {
      state.edit = action.payload;
      state.update = false;
    })
    .addCase(editPasswordMode, (state, action) => {
      state.editPassword = action.payload;
      state.update = false;
    })
    .addCase(updateMode, (state, action) => {
      state.update = action.payload;
    })
    .addCase(updatePasswordMode, (state, action) => {
      state.updatePassword = action.payload;
    })
    .addCase(clear, (state) => {
      state.edit = false;
      state.editPassword = false;
    })
    .addCase(isConnected, (state, action) => {
      state.connected = action.payload;
    })
    .addCase(fetchGetUserProfile.pending, (state) => {
      // Vide l'erreur
      state.error = null;
      // Change le statut du chargement à true
      state.loading = true;
    })
    .addCase(fetchGetUserProfile.fulfilled, (state, action) => {
      state.userData = action.payload;
      // Change le statut du chargement à false
      state.loading = false;
    })
    .addCase(fetchGetUserProfile.rejected, (state, action) => {
      state.error = action.error.message as string;
      // Change le statut du chargement à false
      state.loading = false;
    })
    .addCase(fetchPutUserProfile.pending, (state) => {
      console.log("pending");
      // Vide l'erreur
      state.error = null;
      // Change le statut du chargement à true
      state.loading = true;
    })
    .addCase(fetchPutUserProfile.fulfilled, (state, action) => {
      state.update = true;
      state.edit = false;

      // Change le statut de connecté à true
      const { lastname, firstname, email } = action.payload;

      if (lastname && firstname && email) {
        state.data.lastname = lastname;
        state.data.firstname = firstname;
        state.data.email = email;
      }

      // Change le statut du chargement à false
      state.loading = false;
    })
    .addCase(fetchPutUserProfile.rejected, (state, action) => {
      state.error = action.error.message as string;
      // Change le statut du chargement à false
      state.loading = false;
    })
    .addCase(fetchPutUserProfilePassword.pending, (state) => {
      console.log("pending");

      // Vide l'erreur
      state.error = null;
      // Change le statut du chargement à true
      state.loading = true;
    })
    .addCase(fetchPutUserProfilePassword.fulfilled, (state) => {
      state.updatePassword = true;

      state.error = null;
      // Change le statut du chargement à false
      state.loading = false;
    })
    .addCase(fetchPutUserProfilePassword.rejected, (state) => {
      state.error = "Le mot de passe actuel est incorrect. Veuillez réessayer.";

      // Change le statut du chargement à false
      state.loading = false;
    });
});

export default userReducer;
