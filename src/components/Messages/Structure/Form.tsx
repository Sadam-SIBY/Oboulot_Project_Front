import React from "react";

import { useAppDispatch, useAppSelector } from "../../../hooks/redux.ts";

import { RootState } from "../../../store/index.ts";
import { setValue, addMessage } from "../../../store/reducers/chat.ts";

import Button from "../../Button/Button.tsx";

export default function Form() {
  const dispatch = useAppDispatch();

  const message = useAppSelector((state: RootState) => state.chat.value);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setValue(event.target.value));
  };

  const handleClick = () => {
    if (message) {
      dispatch(addMessage());
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (message) {
      dispatch(addMessage());
    }
  };

  return (
    <form className="form-message" onSubmit={handleSubmit}>
      <input
        className="form-message-input"
        type="text"
        placeholder="Saisissez votre message..."
        value={message}
        onChange={handleChange}
      />
      <Button
        type="button"
        className="blue form-message-button"
        label={"Envoyer"}
        onClick={handleClick}
      />
    </form>
  );
}
