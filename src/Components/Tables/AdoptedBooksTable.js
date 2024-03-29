import React from 'react';
import MaterialTable from 'material-table';
import api from '../../services/api';
import Cookies from 'js-cookie';
import Localization from '../MaterialTable-Props/material-table-txt-traduction';

export default function AdoptedBooksTable() {
  const [state, setState] = React.useState({
    columns: [
      { title: 'Livro', field: 'name' },
      { title: 'Disciplina', field: 'school_subject' },
      { title: 'Turma', field: 'class' },
      { title: 'Ano letivo', field: 'school_year' },
    ],
    data: [],
  });

  async function deleteSubject(id) {
    const { data } = await api.delete('/adopted-books/' + id);
    console.log(data);
  }

  /*async function addSubjects(subject){
    const {data} = await api.post('/school-subjects',{school_subject:subject});
    console.log(data);
  }

  async function EditSubjects(subject,id){
    const {data} = await api.post('/school-subjects/'+id,{school_subject:subject,active:false});
    console.log(data);
  }*/

  const tableRef = React.createRef();
  return (
    <>
      <MaterialTable
        title=" "
        tableRef={tableRef}
        columns={state.columns}
        localization={Localization}
        actions={[
          {
            icon: 'refresh',
            tooltip: 'Refresh Data',
            isFreeAction: true,
            onClick: () => tableRef.current && tableRef.current.onQueryChange(),
          },
        ]}
        data={(query) =>
          new Promise((resolve, reject) => {
            let url =
              (process.env.REACT_APP_API_HOST || 'http://localhost:8085') +
              '/adopted-books?current_school_year=true';
            url += '&limit=' + query.pageSize;
            url += '&page=' + (query.page + 1);
            url += '&search=' + query.search;
            fetch(url, {
              headers: {
                method: 'GET',
                Authorization: 'Bearer ' + Cookies.get('token'),
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
        /*actions={[
        {
          icon: 'add',
          tooltip: 'Add User',
          isFreeAction: true,
          onClick: (event) => alert("You want to add a new row")
        }
      ]}*/
        editable={{
          /*onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                console.log("Data:",newData)
                addSubjects(newData.school_subject);
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState((prevState) => {
                  EditSubjects(newData.school_subject,oldData.id)
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),*/
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                setState((prevState) => {
                  deleteSubject(oldData.id);
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
}
