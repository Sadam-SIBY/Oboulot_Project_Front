// Import the configureStore function from Redux Toolkit
import { configureStore } from "@reduxjs/toolkit";
// Import the combined reducer from the reducers file
import reducer from "./reducers";

// Configure the Redux store with the combined reducer
const store = configureStore({
  reducer,
});

export default store;

// Define types for the RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
