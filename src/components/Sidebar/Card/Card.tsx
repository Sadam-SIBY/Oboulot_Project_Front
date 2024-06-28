import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux.ts";
import { fetchGroupList } from "../../../store/reducers/group.ts";
import { IExercise, IGroupExercise, IUserExercise } from "../../../types/types";

// import { setModalPublish } from "../../../store/reducers/exercise.ts";

// import Button from "../../Button/Button.tsx";
// import ModalPublish from "../../Exercise/Modal/ModalPublish.tsx";

interface Props {
  exercise?: IExercise;
  exerciseData?: IGroupExercise;
  exerciseUserData?: IUserExercise;
  modal: boolean;
  onClick: () => void;
}

export default function Card({
  exercise,
  exerciseData,
  exerciseUserData,
}: // modal,
// onClick,
Props) {
  const dispatch = useAppDispatch();

  const groupList = useAppSelector((state) => state.group.list);

  const filteredGroup = groupList.find((group) => {
    return group.id === exerciseData?.group_id;
  });

  useEffect(() => {
    dispatch(fetchGroupList());
  }, [dispatch]);

  return (
    <>
      <tr>
        {exercise && (
          <>
            <td>{exercise.title}</td>
            <td></td>
          </>
        )}
        {exerciseData && (
          <>
            <td>{exerciseData.title}</td>
            <td>{filteredGroup && filteredGroup.name}</td>
          </>
        )}
        {exerciseUserData && (
          <>
            <td>{exerciseUserData.title}</td>
            <td></td>
          </>
        )}
        {/* <td>
          <div className="logos">
            <div className="logos__container">
              <Button
                type="button"
                className="white"
                label={<RiSendPlaneFill />}
                onClick={handleClickPublish}
              />
            </div>
            {modalPublish && modal && <ModalPublish exercise={exercise} />}
          </div>
        </td> */}
      </tr>
    </>
  );
}
