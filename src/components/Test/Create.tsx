import React, { useEffect, useRef } from "react";

import { useAppDispatch, useAppSelector } from "../../hooks/redux.ts";
import Button from "../Button/Button.tsx";

import {
  addQuestion,
  deleteQuestion,
  setValue,
  clickedButton,
} from "../../store/reducers/question.ts";

import "./Create.scss";

export default function Create() {
  const dispatch = useAppDispatch();

  const exerciseList = useAppSelector((state) => state.exercise.list);
  const questionList = useAppSelector((state) => state.question.list);
  const clicked = useAppSelector((state) => state.question.button);

  const handleClickAdd = () => {
    dispatch(
      addQuestion({
        id: questionList.length + 1,
        number: questionList.length + 1,
        content: "",
        teacher_answer: "",
        exercice_id: 1,
      })
    );
    dispatch(clickedButton(true));

    setTimeout(() => {
      dispatch(clickedButton(false));
    }, 500);
  };

  const handleClickDelete = (idQuestion: number): void => {
    dispatch(deleteQuestion(idQuestion));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setValue(event.target.value));
  };

  const handleSubmitSave = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleSubmitPublish = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const containerEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    containerEndRef.current?.scrollIntoView({ behavior: "smooth" });
  });

  return (
    <div className="form__exercice">
      <div className="form__exercice-header">
        <span className="form__exercice-header__span-large">
          <p>Classe {exerciseList[0].subject}</p>
          <h1>Créer un exercice</h1>
          <p>{exerciseList[0].subject}</p>
        </span>
        <span className="form__exercice-header__span-small">
          <h1>Créer un exercice</h1>
          <div>
            <p>Classe {exerciseList[0].subject}</p>
            <p>{exerciseList[0].subject}</p>
          </div>
        </span>
      </div>
      <div className="form__exercice-title">
        <label htmlFor="title" className="weight-bold">
          Titre de l'exercice :
        </label>
        <input type="text" name="title" id="title" />
      </div>
      <div className="form__exercice-instructions">
        <label htmlFor="title" className="weight-bold">
          Instructions :
        </label>
        <textarea
          name="instruction"
          id="instruction"
          defaultValue={exerciseList[0].instruction}
        />
      </div>
      {questionList.map((question) => (
        <div className="form__exercice-infos" key={question.id}>
          <section>
            <div>
              <article>
                <label
                  htmlFor={`question-${question.number}`}
                  className="weight-bold"
                >
                  Question {question.number} :
                </label>
                <input
                  type="text"
                  name={`question-${question.number}`}
                  defaultValue={question.content}
                  onChange={handleChange}
                />
              </article>
              <article>
                <label
                  htmlFor={`answer-question-${question.number}`}
                  className="weight-bold"
                >
                  Réponse :
                </label>
                <textarea
                  name={`answer-question-${question.number}`}
                  defaultValue={question.teacher_answer}
                />
              </article>
            </div>
            <Button
              type="button"
              label="Supprimer"
              className="red button-margin-top"
              onClick={() => handleClickDelete(question.id)}
              link=""
            />
          </section>
        </div>
      ))}
      <div className="form__exercice-buttons">
        <Button
          type={"button"}
          label={"Ajouter une question"}
          className="blue button-margin-top"
          onClick={handleClickAdd}
          link=""
        />
        <div>
          <Button
            type={"submit"}
            label={"Enregistrer"}
            className="gray button-margin-top"
            onSubmit={handleSubmitSave}
            link=""
          />
          <Button
            type={"submit"}
            label={"Publier"}
            className="green button-margin-top"
            onSubmit={handleSubmitPublish}
            link=""
          />
        </div>
      </div>
      {clicked && <div ref={containerEndRef}></div>}
    </div>
  );
}
