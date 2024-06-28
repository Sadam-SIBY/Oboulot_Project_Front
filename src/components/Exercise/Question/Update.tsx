import React, { useEffect, useRef, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosClose } from "react-icons/io";

import { useAppDispatch, useAppSelector } from "../../../hooks/redux.ts";

import {
  fetchQuestionList,
  fetchQuestionCreate,
  fetchQuestionUpdate,
  setModalDelete,
  setModalDeleteState,
  setQuestion,
  setQuestionUpdate,
  setAnswer,
  setAnswerUpdate,
  setMessage,
  setLoading,
  addQuestionUpdate,
  deleteQuestion,
  clickedButton,
  clear,
  setFirstTime,
} from "../../../store/reducers/question.ts";

import {
  fetchExercise,
  fetchExerciseUpdate,
  setModalUpdate,
  setModalUpdateState,
  setTitle,
  setSubject,
  setInstruction,
} from "../../../store/reducers/exercise.ts";

import Button from "../../Button/Button.tsx";
import Loading from "../../Loading/Loading.tsx";
import ModalDeleteQuestion from "./Delete.tsx";

import "./Question.scss";

export default function Create() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { idExercise } = useParams();

  const [idQuestion, setIdQuestion] = useState(0);

  let parsedIdExercise: number = 0;

  if (idExercise) {
    parsedIdExercise = parseInt(idExercise);
  }

  const modalExerciseUpdate = useAppSelector((state) => state.exercise.update);
  const modalQuestionDelete = useAppSelector((state) => state.question.delete);
  const modalQuestionDeleteState = useAppSelector(
    (state) => state.question.deleteState
  );

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
  const questionListUpdate = useAppSelector(
    (state) => state.question.listUpdate
  );

  const content = useMemo(() => {
    return questionList.map((question) => question.content);
  }, [questionList]);

  const teacherAnswer = useMemo(() => {
    return questionList.map((question) => question.teacherAnswer);
  }, [questionList]);

  const contentUpdate = useMemo(() => {
    return questionListUpdate.map((question) => question.content);
  }, [questionListUpdate]);

  const teacherAnswerUpdate = useMemo(() => {
    return questionListUpdate.map((question) => question.teacher_answer);
  }, [questionListUpdate]);

  const handleDeleteModalCloseQuestion = () => {
    dispatch(setModalDeleteState(false));
    dispatch(fetchQuestionList(parsedIdExercise));
  };

  const handleClickAdd = () => {
    dispatch(addQuestionUpdate(parsedIdExercise));
    dispatch(setFirstTime(false));
    dispatch(clickedButton(true));

    setTimeout(() => {
      dispatch(clickedButton(false));
    }, 500);
  };

  const handleClickDeleteUpdate = (idQuestion: number): void => {
    setIdQuestion(idQuestion);
    dispatch(setModalDelete(true));
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

  const handleChangeQuestionUpdate = (
    event: React.ChangeEvent<HTMLInputElement>,
    idQuestion: number
  ) => {
    dispatch(
      setQuestionUpdate({ id: idQuestion, content: event.target.value })
    );
  };

  const handleChangeAnswerUpdate = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    idQuestion: number
  ) => {
    dispatch(
      setAnswerUpdate({ id: idQuestion, teacher_answer: event.target.value })
    );
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
        if (questionListUpdate) {
          dispatch(fetchQuestionUpdate());
        }
        if (questionList) {
          dispatch(fetchQuestionCreate());
        }

        // Après la création des questions, mettre à jour le state pour afficher le modal
        dispatch(setModalUpdate(!modalExerciseUpdate));
        dispatch(setModalUpdateState(true));
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
    dispatch(fetchQuestionList(parsedIdExercise));
  }, [dispatch, parsedIdExercise]);

  useEffect(() => {
    if (modalExerciseUpdate) {
      navigate("/tableau-de-bord");
      dispatch(setModalUpdate(false));
    }
  }, [modalExerciseUpdate, dispatch, navigate]);

  const containerEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    containerEndRef.current?.scrollIntoView({ behavior: "smooth" });
  });

  return (
    <div className="form__exercice" key={parsedIdExercise + 1}>
      {loading && <Loading />}
      <h1>Modifier l'exercice {title}</h1>
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
      {questionListUpdate.map((question, index) => (
        <div className="form__exercice-infos" key={`${question.id}-${index}`}>
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
                    handleChangeQuestionUpdate(event, question.number)
                  }
                  value={contentUpdate[question.number - 1]}
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
                    handleChangeAnswerUpdate(event, question.number)
                  }
                  value={teacherAnswerUpdate[question.number - 1]}
                />
              </article>
            </div>
            <Button
              type="button"
              label="Supprimer"
              className="red button-margin-top"
              onClick={() => handleClickDeleteUpdate(question.id)}
            />
          </section>
        </div>
      ))}
      {questionList.map((question, index) => (
        <div className="form__exercice-infos" key={`${question.id}-${index}`}>
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
                  onChange={(event) => handleChangeQuestion(event, index + 1)}
                  value={content[index]}
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
                  onChange={(event) => handleChangeAnswer(event, index + 1)}
                  value={teacherAnswer[index]}
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
            label={"Enregistrer"}
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
      {modalQuestionDelete && <ModalDeleteQuestion id={idQuestion} />}
      {modalQuestionDeleteState && (
        <div className="registered">
          <div className="registered__modal">
            <button
              className="registered__modal-close"
              onClick={handleDeleteModalCloseQuestion}
            >
              <IoIosClose />
            </button>
            <p>La question a été supprimée avec succès !</p>
          </div>
        </div>
      )}
    </div>
  );
}
