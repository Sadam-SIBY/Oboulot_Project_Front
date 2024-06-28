import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../hooks/redux.ts";

import {
  fetchStudentList,
  setMessage,
  clear,
} from "../../../store/reducers/student.ts";

import {
  fetchStudentAddGroup,
  fetchStudentListFromGroup,
  setSelectedUser,
  setModalGroupStudent,
  fetchGroup,
} from "../../../store/reducers/group.ts";

import Button from "../../Button/Button.tsx";
import Loading from "../../Loading/Loading.tsx";

import "./Modal.scss";

export default function ModalGroupStudents() {
  const dispatch = useAppDispatch();
  const { idGroup } = useParams();

  const loading = useAppSelector((state) => state.student.loading);
  const message = useAppSelector((state) => state.student.message);

  const userList = useAppSelector((state) => state.student.list);
  const usersFromGroup = useAppSelector((state) => state.group.userList);
  const groupData = useAppSelector((state) => state.group.groupData);

  const selectedStudent = useAppSelector((state) => state.group.selectedUser);
  const modalGroupStudents = useAppSelector(
    (state) => state.group.groupStudent
  );

  let parsedIdGroup: number = 0;

  if (idGroup) {
    parsedIdGroup = parseInt(idGroup);
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const idStudent = parseInt(event.target.value);

    if (event.target.checked) {
      dispatch(setSelectedUser(idStudent));
    }
  };

  const handleSubmitButton = () => {
    if (selectedStudent !== 0) {
      dispatch(fetchStudentAddGroup(parsedIdGroup));
      dispatch(setModalGroupStudent(!modalGroupStudents));
    } else {
      dispatch(setMessage("Veuillez sélectionner un élève !"));
    }
  };

  const handleSubmitCreate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    handleSubmitButton();
  };

  useEffect(() => {
    dispatch(fetchGroup(parsedIdGroup));
    dispatch(fetchStudentListFromGroup(parsedIdGroup));
  }, [dispatch, parsedIdGroup]);

  useEffect(() => {
    dispatch(clear());
    dispatch(fetchStudentList());
    dispatch(setSelectedUser(0));
  }, [dispatch]);

  const filteredUserList = userList.filter(
    (user) => !usersFromGroup.some((userData) => userData.id === user.id)
  );

  return (
    <div className="group__modal">
      <div className="group__modal-content">
        {loading && <Loading />}
        <h2>Ajouter un élève à la classe {groupData.name}</h2>
        <form
          className="group__modal-content__form"
          onSubmit={handleSubmitCreate}
        >
          {message && (
            <div className="forms__container-message">
              <p>{message}</p>
            </div>
          )}
          <div className="group__modal-content__form-section">
            {filteredUserList.map((user) => (
              <div key={user.id}>
                <input
                  type="radio"
                  name={"options"}
                  value={user.id}
                  onChange={handleChange}
                  className="forms__container-input__border"
                />
                <label
                  htmlFor={"options"}
                >{`${user.firstname} ${user.lastname}`}</label>
              </div>
            ))}
          </div>
          <div className="group__modal-content__form-buttons">
            <Button
              type={"submit"}
              label={"Ajouter"}
              className="green button-margin-top"
              onSubmit={handleSubmitButton}
            />
            <Button
              type={"button"}
              label={"Annuler"}
              className="gray button-margin-top"
              onClick={() => {
                dispatch(setModalGroupStudent(!modalGroupStudents));
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
