// Imports necessary functions from react-redux and types from the store
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store";

// Defines custom hooks with specified types for RootState and AppDispatch
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
