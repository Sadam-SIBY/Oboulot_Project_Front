import { useAppSelector } from "../../../hooks/redux.ts";

import Sidebar from "../../Sidebar/Sidebar.tsx";
import Table from "../Table/Table.tsx";

import "./List.scss";

export default function List() {
  const groupList = useAppSelector((state) => state.group.list);

  return (
    <div className="container__with-sidebar">
      <h1>Liste des classes</h1>
      <div className="container__content">
        <Sidebar />
        <div className="container__list">
          <section className="container__list-section">
            <Table
              titles={["Nom", "Niveau", "Description", " "]}
              groupList={groupList}
              isDashboard={false}
            />
          </section>
        </div>
      </div>
    </div>
  );
}
