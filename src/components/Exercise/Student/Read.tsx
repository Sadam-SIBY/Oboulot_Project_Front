import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../hooks";

import {
  fetchExerciseGroup,
  fetchGroupList,
} from "../../../store/reducers/group.ts";
import { fetchExerciseCorrection } from "../../../store/reducers/exercise";

import Button from "../../Button/Button.tsx";

import "./Student.scss";

export default function Read() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const idExercise = location.pathname.split("/")[2];

  let parsedIdExercise: number = 0;

  if (idExercise) {
    parsedIdExercise = parseInt(idExercise);
  }

  const groupList = useAppSelector((state) => state.group.list);
  const exerciseCorrected = useAppSelector(
    (state) => state.exercise.exerciseCorrected
  );
  const groupExercise = useAppSelector(
    (state) => state.group.listGroupExercises
  );

  const groupExerciseData = groupExercise.find(
    (exercise) => exercise.exercise_id === parsedIdExercise
  );

  const filteredGroup = groupList.find((group) => {
    return group.id === groupExerciseData?.group_id;
  });

  const handleClick = () => {
    navigate(`/tableau-de-bord`);
  };

  useEffect(() => {
    dispatch(fetchExerciseCorrection(parsedIdExercise));
  }, [dispatch, parsedIdExercise]);

  useEffect(() => {
    dispatch(fetchExerciseGroup());
    dispatch(fetchGroupList());
  }, [dispatch]);

  return (
    <div className="container__student-exercise">
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
          {exerciseCorrected.questions.map((question) => {
            const answer = exerciseCorrected.answers.find(
              (answer) => answer.question_id === question.id
            );

            if (answer) {
              return (
                <section
                  key={question.id}
                  className="container__student-exercise__section"
                >
                  <p className="container__student-exercise__section-question">
                    <strong>Question {question.number} :</strong>{" "}
                    {question.content}
                  </p>
                  <p>
                    <strong>Réponse :</strong> {answer.student_answer}
                  </p>
                  <p>
                    <strong>Correction :</strong> {question.teacher_answer}
                  </p>
                </section>
              );
            }
          })}
          <div className="container__student-exercise__button">
            <Button
              type={"button"}
              label={"Revenir au tableau de bord"}
              className="purple button-margin-top"
              onClick={handleClick}
            />
          </div>
        </>
      )}
    </div>
  );
}
