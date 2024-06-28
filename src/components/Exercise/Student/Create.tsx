import { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IoIosClose } from "react-icons/io";
import { Link } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../hooks";

import {
  fetchCreateStudentAnswers,
  setAnswer,
  setArrayAnswerLength,
} from "../../../store/reducers/answer";

import {
  fetchExerciseGroup,
  fetchGroupList,
} from "../../../store/reducers/group.ts";
import {
  fetchExercise,
  fetchExerciseUser,
  fetchExerciseUserIsDone,
  setExerciseUser,
} from "../../../store/reducers/exercise";
import { fetchQuestionList } from "../../../store/reducers/question";

import Button from "../../Button/Button.tsx";
import Loading from "../../Loading/Loading.tsx";

import "./Student.scss";

export default function Create() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const idExercise = location.pathname.split("/")[2];

  let parsedIdExercise: number = 0;

  if (idExercise) {
    parsedIdExercise = parseInt(idExercise);
  }

  const [modal, setModal] = useState(false);

  const questionList = useAppSelector((state) => state.question.listUpdate);
  const answerList = useAppSelector((state) => state.answer.list);
  const idUser = useAppSelector((state) => state.user.userData.id);

  const loading = useAppSelector((state) => state.exercise.loading);

  const groupList = useAppSelector((state) => state.group.list);
  const exerciseUserList = useAppSelector(
    (state) => state.exercise.exerciseUserList
  );

  const filteredExerciseUserList = exerciseUserList.filter((exerciseUser) => {
    return exerciseUser.exercise_id === parsedIdExercise;
  });

  const groupExercise = useAppSelector(
    (state) => state.group.listGroupExercises
  );

  const groupExerciseData = groupExercise.find(
    (exercise) => exercise.exercise_id === parsedIdExercise
  );

  const filteredGroup = groupList.find((group) => {
    return group.id === groupExerciseData?.group_id;
  });

  const studentAnswer = useMemo(() => {
    return answerList.map((answer) => answer.studentAnswer);
  }, [answerList]);

  const handleChangeAnswer = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    id: number,
    idQuestion: number
  ) => {
    dispatch(
      setAnswer({
        id: idQuestion,
        userId: idUser,
        studentAnswer: event.target.value,
        questionId: id,
      })
    );
  };

  const handleModalClose = () => {
    setModal(false);
    navigate(`/tableau-de-bord`);
  };

  const handleClick = () => {
    dispatch(fetchCreateStudentAnswers());
    dispatch(
      setExerciseUser({
        exerciseId: parsedIdExercise,
        userId: idUser,
        isDone: true,
      })
    );

    setTimeout(() => {
      dispatch(fetchExerciseUserIsDone(filteredExerciseUserList[0].id));
      dispatch(fetchExerciseUser());
    }, 1000);

    setModal(true);
  };

  useEffect(() => {
    dispatch(fetchExercise(parsedIdExercise));
    dispatch(fetchQuestionList(parsedIdExercise));
  }, [dispatch, parsedIdExercise]);

  useEffect(() => {
    dispatch(fetchExerciseUser());
    dispatch(fetchExerciseGroup());
    dispatch(fetchGroupList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setArrayAnswerLength(questionList.length));
  }, [dispatch, questionList]);

  const sortedQuestionList = questionList
    .slice()
    .sort((a, b) => a.number - b.number);

  return (
    <div className="container__student-exercise">
      {loading && <Loading />}
      {groupExerciseData && (
        <>
          <div className="form__exercice-header">
            <span className="form__exercice-header__span-large">
              <p>{filteredGroup && filteredGroup.name}</p>
              <h1>Correction de l'exercice {groupExerciseData.title}</h1>
              <p>{groupExerciseData.subject}</p>
            </span>
            <span className="form__exercice-header__span-small">
              <h1>Correction de l'exercice {groupExerciseData.title}</h1>
              <div>
                <p>Classe : {filteredGroup && filteredGroup.name}</p>
                <p>Matière : {groupExerciseData.subject}</p>
              </div>
            </span>
          </div>
          <p className="container__student-exercise__instruction">
            {groupExerciseData.instruction}
          </p>
          {sortedQuestionList.map((question) => (
            <div key={question.id}>
              <p>
                Question {question.number} : {question.content}{" "}
              </p>
              <textarea
                name={`answer-question-${question.number}`}
                placeholder="Réponse"
                onChange={(event) =>
                  handleChangeAnswer(event, question.id, question.number)
                }
                value={studentAnswer[question.number - 1]}
              />
            </div>
          ))}
          <div className="container__student-exercise__button">
            <Button
              type={"button"}
              label={"Valider"}
              className="green button-margin-top"
              onClick={handleClick}
            />
          </div>
        </>
      )}
      {modal && (
        <div className="registered">
          <div className="registered__modal">
            <button
              className="registered__modal-close"
              onClick={handleModalClose}
            >
              <IoIosClose />
            </button>
            <p>Vos réponses ont été enregistrées !</p>
            <p>
              <Link
                className="color-black"
                to={`/exercices/${parsedIdExercise}/correction`}
              >
                Vous pouvez trouver la correction juste ici ! (en cliquant sur
                la phrase)
              </Link>
            </p>
            <p>
              Ou en fermant cette fenêtre, vous serez redirigé vers le tableau
              de bord.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
