import { nanoid } from "nanoid";
import { createAction, createReducer } from "@reduxjs/toolkit";
import { IMessage } from "../../types/types";

interface IStateChat {
  messages: IMessage[];
  value: string;
}

const initialState: IStateChat = {
  messages: [
    {
      id: nanoid(),
      author: "Moi",
      picture: "./src/assets/user.png",
      content: "Hello",
    },
    {
      id: nanoid(),
      author: "Moi",
      picture: "./src/assets/user.png",
      content: "ça va ?",
    },
  ],
  value: "",
};

export const setValue = createAction<string>("chat/set-value");

export const addMessage = createAction("chat/add-message");

const chatReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setValue, (state, action) => {
      state.value = action.payload;
    })
    .addCase(addMessage, (state) => {
      state.messages.push({
        id: nanoid(),
        author: "Moi",
        picture: "./src/assets/user.png",
        content: state.value,
      });
      state.value = "";
    });
});

export default chatReducer;
