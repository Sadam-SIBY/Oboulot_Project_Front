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
import { IExercise, IGroup, IUser, IGroupExercise } from "../../types/types";

interface GroupExercises {
  idGroup: number;
  idExercise: number;
}

interface IStateGroup {
  list: IGroup[];
  exerciseList: IExercise[];
  userList: IUser[];
  listGroupExercises: IGroupExercise[];
  selectedUser: number;
  selectedExercise: { idExercise: number };
  data: { name: string; description: string; level: string };
  dataGroupExercises: GroupExercises;
  groupData: IGroup;
  idGroup: number;
  create: boolean;
  createState: boolean;
  update: boolean;
  updateState: boolean;
  delete: boolean;
  deleteState: boolean;
  groupStudent: boolean;
  groupStudentState: boolean;
  groupExercise: boolean;
  groupExerciseState: boolean;
  message: string;
  error: null | string;
  loading: boolean;
}

const initialState: IStateGroup = {
  list: [],
  exerciseList: [],
  userList: [],
  listGroupExercises: [],
  selectedUser: 0,
  selectedExercise: { idExercise: 0 },
  data: { name: "", description: "", level: "" },
  dataGroupExercises: {
    idGroup: 0,
    idExercise: 0,
  },
  groupData: {
    id: 0,
    name: "",
    level: "",
    description: "",
    groupExercises: [],
    user: [],
  },
  idGroup: 0,
  create: false,
  createState: false,
  update: false,
  updateState: false,
  delete: false,
  deleteState: false,
  groupStudent: false,
  groupStudentState: false,
  groupExercise: false,
  groupExerciseState: false,
  message: "",
  error: null,
  loading: false,
};

export const setName = createAction<string>("group/setName");
export const setLevel = createAction<string>("group/setLevel");
export const setDescription = createAction<string>("group/setDescription");

export const setIdGroup = createAction<number>("group/setIdGroup");
export const setMessage = createAction<string>("group/setMessage");

export const setSelectedUser = createAction<number>("student/setSelectedUser");
export const setSelectedExercise = createAction<number>(
  "student/setSelectedExercise"
);

export const setIdGroupExercise = createAction<GroupExercises>(
  "exercise/setIdGroupExercise"
);

export const setModalCreate = createAction<boolean>("group/setModalCreate");
export const setModalCreateState = createAction<boolean>(
  "group/setModalCreateState"
);
export const setModalUpdate = createAction<boolean>("group/setModalUpdate");
export const setModalUpdateState = createAction<boolean>(
  "group/setModalUpdateState"
);
export const setModalDelete = createAction<boolean>("group/setModalDelete");
export const setModalDeleteState = createAction<boolean>(
  "group/setModalDeleteState"
);

export const setModalGroupStudent = createAction<boolean>(
  "student/setModalGroupStudent"
);
export const setModalGroupStudentState = createAction<boolean>(
  "student/setModalGroupStudentState"
);

export const setModalGroupExercise = createAction<boolean>(
  "student/setModalGroupExercise"
);
export const setModalGroupExerciseState = createAction<boolean>(
  "student/setModalGroupExerciseState"
);

export const clearExerciseList = createAction("group/clearExerciseList");

export const clear = createAction("group/clear");

export const fetchGroup = createAsyncThunk(
  "group/api-get-group",
  async (idGroup: number) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/groups/${idGroup}`
    );
    return response.data;
  }
);

export const fetchGroupList = createAsyncThunk(
  "group/api-group-list",
  async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/groups`);
    return response.data;
  }
);

export const fetchExerciseListFromGroup = createAsyncThunk(
  "group/api-exercise-list-from-group",
  async (idGroup: number) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/groups/${idGroup}/exercises`
    );
    return response.data;
  }
);

export const fetchStudentListFromGroup = createAsyncThunk(
  "group/api-student-list-from-group",
  async (idGroup: number) => {
    const { data } = await axios.get(`/groups/${idGroup}/users`);

    return data;
  }
);

export const fetchExerciseGroup = createAsyncThunk(
  "group/api-exercise-group",
  async () => {
    const { data } = await axios.get(`/groupexercises`);

    return data;
  }
);

export const fetchExerciseAddGroup = createAsyncThunk(
  "group/api-exercise-add-group",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const selectedGroupExercise = state.group.dataGroupExercises;

    const { data } = await axios.post(
      `/groupexercises/create`,
      selectedGroupExercise
    );

    return data;
  }
);

export const fetchStudentAddGroup = createAsyncThunk(
  "group/api-student-add-group",
  async (idGroup: number, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const selectedUserStudent = state.group.selectedUser;

    const { data } = await axios.put(`/groups/${idGroup}/add`, {
      userId: selectedUserStudent,
    });

    return data;
  }
);

export const fetchGroupCreate = createAsyncThunk(
  "group/api-group-create",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const groupData = state.group.data;

    const { data } = await axios.post(`/groups/create`, groupData);

    return data;
  }
);

export const fetchGroupUpdate = createAsyncThunk(
  "group/api-group-update",
  async (idGroup: number, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const groupData = state.group.data;

    const { data } = await axios.put(`/groups/${idGroup}/edit`, groupData);

    return data;
  }
);

export const fetchGroupDelete = createAsyncThunk(
  "group/api-group-delete",
  async (idGroup: number) => {
    const { data } = await axios.delete(`/groups/${idGroup}/delete`);

    return data;
  }
);

const groupReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setName, (state, action) => {
      state.data.name = action.payload;
    })
    .addCase(setLevel, (state, action) => {
      state.data.level = action.payload;
    })
    .addCase(setDescription, (state, action) => {
      state.data.description = action.payload;
    })
    .addCase(setIdGroup, (state, action) => {
      state.idGroup = action.payload;
    })
    .addCase(setMessage, (state, action) => {
      state.message = action.payload;
    })
    .addCase(setSelectedUser, (state, action) => {
      const userId = action.payload;

      state.selectedUser = userId;
    })
    .addCase(setSelectedExercise, (state, action) => {
      const idExercise = action.payload;

      state.selectedExercise = { idExercise: idExercise };
    })
    .addCase(setIdGroupExercise, (state, action) => {
      const { idGroup, idExercise } = action.payload;
      state.dataGroupExercises.idGroup = idGroup;
      state.dataGroupExercises.idExercise = idExercise;
    })
    .addCase(setModalCreate, (state, action) => {
      state.create = action.payload;
    })
    .addCase(setModalCreateState, (state, action) => {
      state.createState = action.payload;
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
    .addCase(setModalGroupStudent, (state, action) => {
      state.groupStudent = action.payload;
    })
    .addCase(setModalGroupStudentState, (state, action) => {
      state.groupStudentState = action.payload;
    })
    .addCase(setModalGroupExercise, (state, action) => {
      state.groupExercise = action.payload;
    })
    .addCase(setModalGroupExerciseState, (state, action) => {
      state.groupExerciseState = action.payload;
    })
    .addCase(clearExerciseList, (state) => {
      state.exerciseList = [];
    })
    .addCase(clear, (state) => {
      state.data.name = "";
      state.data.description = "";
      state.data.level = "";

      state.message = "";
    })
    .addCase(fetchGroup.pending, (state) => {
      console.log("pending");
      state.error = null;
      state.loading = true;
    })
    .addCase(fetchGroup.fulfilled, (state, action) => {
      state.groupData = action.payload;
      state.error = null;
      state.loading = false;
    })
    .addCase(fetchGroup.rejected, (state, action) => {
      state.error = action.error.message as string;
      state.loading = false;
    })
    .addCase(fetchGroupList.pending, (state) => {
      console.log("pending");
      state.error = null;
      state.loading = true;
    })
    .addCase(fetchGroupList.fulfilled, (state, action) => {
      state.list = action.payload;
      state.loading = false;
    })
    .addCase(fetchGroupList.rejected, (state, action) => {
      state.error = action.error.message as string;
      state.loading = false;
    })
    .addCase(fetchExerciseListFromGroup.pending, (state) => {
      console.log("pending");
      state.error = null;
      state.loading = true;
    })
    .addCase(fetchExerciseListFromGroup.fulfilled, (state, action) => {
      state.exerciseList = action.payload;
      state.loading = false;
    })
    .addCase(fetchExerciseListFromGroup.rejected, (state, action) => {
      state.error = action.error.message as string;
      state.loading = false;
    })
    .addCase(fetchStudentListFromGroup.pending, (state) => {
      console.log("pending");
      state.error = null;
      state.loading = true;
    })
    .addCase(fetchStudentListFromGroup.fulfilled, (state, action) => {
      state.userList = action.payload;
      state.loading = false;
    })
    .addCase(fetchStudentListFromGroup.rejected, (state, action) => {
      state.error = action.error.message as string;
      state.loading = false;
    })
    .addCase(fetchExerciseGroup.pending, (state) => {
      console.log("pending");
      state.error = null;
      state.loading = true;
    })
    .addCase(fetchExerciseGroup.fulfilled, (state, action) => {
      state.listGroupExercises = action.payload;
      state.loading = false;
    })
    .addCase(fetchExerciseGroup.rejected, (state, action) => {
      state.error = action.error.message as string;
      state.loading = false;
    })
    .addCase(fetchExerciseAddGroup.pending, (state) => {
      console.log("pending");
      state.error = null;
      state.loading = true;
    })
    .addCase(fetchExerciseAddGroup.fulfilled, (state, action) => {
      const { idGroup, idExercise } = action.payload;

      if (idExercise && idGroup) {
        state.dataGroupExercises.idGroup = idGroup;
        state.dataGroupExercises.idExercise = idExercise;
      }
      state.groupExerciseState = true;
      state.loading = false;
    })
    .addCase(fetchExerciseAddGroup.rejected, (state, action) => {
      state.error = action.error.message as string;
      state.loading = false;
    })
    .addCase(fetchStudentAddGroup.pending, (state) => {
      console.log("pending");
      state.groupStudentState = false;
      state.error = null;
      state.loading = true;
    })
    .addCase(fetchStudentAddGroup.fulfilled, (state, action) => {
      state.selectedUser = action.payload;
      state.groupStudentState = true;
      state.loading = false;
    })
    .addCase(fetchStudentAddGroup.rejected, (state, action) => {
      state.groupStudentState = false;
      state.error = action.error.message as string;
      state.loading = false;
    })
    .addCase(fetchGroupCreate.pending, (state) => {
      console.log("pending");
      state.error = null;
      state.loading = true;
    })
    .addCase(fetchGroupCreate.fulfilled, (state, action) => {
      const { name, description, level } = action.payload;

      if (name && description && level) {
        state.data.name = name;
        state.data.description = description;
        state.data.level = level;
      }

      state.loading = false;
    })
    .addCase(fetchGroupCreate.rejected, (state, action) => {
      state.error = action.error.message as string;
      state.loading = false;
    })
    .addCase(fetchGroupUpdate.pending, (state) => {
      console.log("pending");
      state.error = null;
      state.loading = true;
    })
    .addCase(fetchGroupUpdate.fulfilled, (state, action) => {
      const { name, description, level } = action.payload;

      if (name && description && level) {
        state.data.name = name;
        state.data.description = description;
        state.data.level = level;
      }

      state.loading = false;
    })
    .addCase(fetchGroupUpdate.rejected, (state, action) => {
      state.error = action.error.message as string;
      state.loading = false;
    })
    .addCase(fetchGroupDelete.pending, (state) => {
      console.log("pending");
      state.error = null;
      state.loading = true;
    })
    .addCase(fetchGroupDelete.fulfilled, (state) => {
      state.loading = false;
    })
    .addCase(fetchGroupDelete.rejected, (state, action) => {
      state.error = action.error.message as string;
      state.loading = false;
    });
});

export default groupReducer;
