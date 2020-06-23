import React from "react";
import MaterialTable from "material-table";
import api from "../../services/api";
import "./ComponentsStyles.css";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

export default function SchoolEnrollmentsTable() {
  const token = Cookies.get("token");
  var decoded = jwt_decode(token);
  const [state, setState] = React.useState({
    columns: [
      { title: "Nome E.E", field: "guardian_name" },
      { title: "Ano escolar", field: "school_year" },
      { title: "Nome aluno", field: "student_name" },
      { title: "Nº Aluno", field: "student_number" },
      { title: "Turma", field: "class" },
    ],
    data: [],
  });

  function deleteClasses(id) {
    api.delete("/school-enrollments/" + id);
  }

  const tableRef = React.createRef();

  if (decoded.charge === "Administrador")
    return (
      <>
        <MaterialTable
          title=" "
          tableRef={tableRef}
          columns={state.columns}
          data={(query) =>
            new Promise((resolve, reject) => {
              let url = "http://localhost:8085/school-enrollments";
              url += "?limit=" + query.pageSize;
              url += "&page=" + (query.page + 1);
              url += "&search=" + query.search;
              fetch(url, {
                headers: {
                  method: "GET",
                  Authorization: "Bearer " + Cookies.get("token"),
                },
              })
                .then((response) => response.json())
                .then((result) => {
                  resolve({
                    data: result.data,
                    page: result.page - 1,
                    totalCount: result.totalCount,
                  });
                });
            })
          }
          actions={[
            {
              icon: "refresh",
              tooltip: "Atualizar informação",
              isFreeAction: true,
              onClick: () =>
                tableRef.current && tableRef.current.onQueryChange(),
            },
          ]}
          editable={{
            onRowDelete: (oldData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  setState((prevState) => {
                    deleteClasses(oldData.id);
                    const data = [...prevState.data];
                    data.splice(data.indexOf(oldData), 1);
                    return { ...prevState, data };
                  });
                }, 600);
              }),
          }}
        />
      </>
    );
  else
    return (
      <>
        <MaterialTable
          title=" "
          columns={state.columns}
          data={(query) =>
            new Promise((resolve, reject) => {
              let url = "http://localhost:8085/school-enrollments";
              url += "?limit=" + query.pageSize;
              url += "&page=" + (query.page + 1);
              fetch(url, {
                headers: {
                  method: "GET",
                  Authorization: "Bearer " + Cookies.get("token"),
                },
              })
                .then((response) => response.json())
                .then((result) => {
                  resolve({
                    data: result.data,
                    page: result.page - 1,
                    totalCount: result.totalCount,
                  });
                });
            })
          }
        />
      </>
    );
}
