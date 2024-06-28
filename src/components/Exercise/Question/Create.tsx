import React, { useEffect, useRef, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../hooks/redux.ts";

import {
  fetchQuestionCreate,
  addQuestion,
  deleteQuestion,
  clickedButton,
  setQuestion,
  setAnswer,
  setMessage,
  clear,
  setLoading,
} from "../../../store/reducers/question.ts";

import {
  fetchExercise,
  fetchExerciseUpdate,
  setModalCreate,
  setModalCreateStateFinal,
  setTitle,
  setSubject,
  setInstruction,
} from "../../../store/reducers/exercise.ts";

import Button from "../../Button/Button.tsx";
import Loading from "../../Loading/Loading.tsx";

import "./Question.scss";

export default function Create() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { idExercise } = useParams();

  let parsedIdExercise: number = 0;

  if (idExercise) {
    parsedIdExercise = parseInt(idExercise);
  }

  const modalExerciseCreate = useAppSelector((state) => state.exercise.create);

  const title = useAppSelector((state) => state.exercise.data.title);
  const subject = useAppSelector((state) => state.exercise.data.subject);
  const instruction = useAppSelector(
    (state) => state.exercise.data.instruction
  );

  const [initialValues] = useState({
    title: title,
    subject: subject,
    instruction: instruction,
  });

  const clicked = useAppSelector((state) => state.question.button);
  const message = useAppSelector((state) => state.question.message);
  const loading = useAppSelector((state) => state.question.loading);
  const questionList = useAppSelector((state) => state.question.list);

  const content = useMemo(() => {
    return questionList.map((question) => question.content);
  }, [questionList]);

  const teacherAnswer = useMemo(() => {
    return questionList.map((question) => question.teacherAnswer);
  }, [questionList]);

  const handleClickAdd = () => {
    dispatch(addQuestion(parsedIdExercise));
    dispatch(clickedButton(true));

    setTimeout(() => {
      dispatch(clickedButton(false));
    }, 500);
  };

  const handleClickDelete = (idQuestion: number): void => {
    dispatch(deleteQuestion(idQuestion));
  };

  const handleChangeQuestion = (
    event: React.ChangeEvent<HTMLInputElement>,
    idQuestion: number
  ) => {
    dispatch(setQuestion({ id: idQuestion, content: event.target.value }));
  };

  const handleChangeAnswer = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    idQuestion: number
  ) => {
    dispatch(setAnswer({ id: idQuestion, teacherAnswer: event.target.value }));
  };

  const handleClickSave = () => {
    if (title && instruction && subject) {
      dispatch(setLoading(true));

      const titleChanged = initialValues.title !== title;
      const subjectChanged = initialValues.subject !== subject;
      const instructionChanged = initialValues.instruction !== instruction;

      if (titleChanged || subjectChanged || instructionChanged) {
        dispatch(fetchExerciseUpdate(parsedIdExercise));
      }

      setTimeout(() => {
        dispatch(setLoading(true));
        if (questionList) {
          dispatch(fetchQuestionCreate());
        }

        // Après la création des questions, mettre à jour le state pour afficher le modal
        dispatch(setModalCreate(!modalExerciseCreate));
        dispatch(setModalCreateStateFinal(true));
        dispatch(setLoading(false));
      }, 3000);
    } else {
      dispatch(setMessage("Veuillez remplir tous les champs"));
    }
  };

  const handleClickCancel = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate("/tableau-de-bord");
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setTitle(event.target.value));
  };

  const handleChangeTextarea = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    dispatch(setInstruction(event.target.value));
  };

  const handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSubject(event.target.value));
  };

  useEffect(() => {
    dispatch(clear());
  }, []);

  useEffect(() => {
    dispatch(fetchExercise(parsedIdExercise));
  }, [dispatch, parsedIdExercise]);

  useEffect(() => {
    if (modalExerciseCreate) {
      navigate("/tableau-de-bord");
      dispatch(setModalCreate(false));
    }
  }, [modalExerciseCreate, dispatch, navigate]);

  const containerEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    containerEndRef.current?.scrollIntoView({ behavior: "smooth" });
  });

  return (
    <div className="form__exercice" key={parsedIdExercise}>
      {loading && <Loading />}
      <h1>Créer un exercice</h1>
      {message && (
        <div className="forms__container-message">
          <p>{message}</p>
        </div>
      )}
      <div className="form__exercice-section">
        <label htmlFor="title" className="weight-bold">
          Titre :
        </label>
        <input
          type="text"
          name="title"
          id="title"
          className="forms__container-input__border"
          onChange={handleChangeInput}
          value={title}
        />
      </div>
      <div className="form__exercice-section">
        <label htmlFor="subject" className="weight-bold">
          Matière :
        </label>
        <select
          name="subject"
          id="subject"
          className="forms__container-input__border"
          onChange={handleChangeSelect}
          value={subject}
        >
          <option value=""></option>
          <option value="Anglais">Anglais</option>
          <option value="Économie">Économie</option>
          <option value="Français">Français</option>
          <option value="Géographie">Géographie</option>
          <option value="Histoire">Histoire</option>
          <option value="Informatique">Informatique</option>
          <option value="Mathématiques">Mathématiques</option>
          <option value="Physique-chimie">Physique-chimie</option>
          <option value="Sport">Sport</option>
          <option value="SVT">SVT</option>
          <option value="Technologie">Technologie</option>
        </select>
      </div>
      <div className="form__exercice-section">
        <label htmlFor="instruction" className="weight-bold">
          Instructions :
        </label>
        <textarea
          name="instruction"
          id="instruction"
          className="forms__container-input__border"
          onChange={handleChangeTextarea}
          value={instruction}
        />
      </div>
      {questionList.map((question) => (
        <div
          className="form__exercice-infos"
          key={`${question.id}-${question.number}`}
        >
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
                  onChange={(event) =>
                    handleChangeQuestion(event, question.number)
                  }
                  value={content[question.number - 1]}
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
                  onChange={(event) =>
                    handleChangeAnswer(event, question.number)
                  }
                  value={teacherAnswer[question.number - 1]}
                />
              </article>
            </div>
            <Button
              type="button"
              label="Supprimer"
              className="red button-margin-top"
              onClick={() => handleClickDelete(question.id)}
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
        />
        <div>
          <Button
            type={"button"}
            label={"Créer"}
            className="green button-margin-top"
            onClick={handleClickSave}
          />
          <Button
            type={"button"}
            label={"Annuler"}
            className="gray button-margin-top"
            onClick={handleClickCancel}
          />
        </div>
      </div>
      {clicked && <div ref={containerEndRef}></div>}
    </div>
  );
}
